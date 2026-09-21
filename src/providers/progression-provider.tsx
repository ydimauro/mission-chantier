"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { readStoredJson, writeStoredJson, STORAGE_KEYS } from "@/lib/storage";
import {
  getDirectoryHandle,
  getStudentFile,
  putDirectoryHandle,
  putStudentFile,
} from "@/lib/db/progression-db";
import {
  ensureReadWritePermission,
  isFileSystemAccessSupported,
  pickProgressDirectory,
  writeStudentFileToDirectory,
} from "@/lib/fs/file-system-access";
import { triggerTextDownload } from "@/lib/download";
import {
  buildStudentFileName,
  createInitialStudentFile,
  isWrongFile,
  markMissionCompleted,
  recordAssessmentSubmission,
  recordMissionResponses,
  resolveConflict,
  touchStudentFile,
  type NewStudentIdentity,
} from "@/lib/progression/model";
import { parseStudentFileJson, type StudentFileParseError } from "@/lib/schemas/migrations";
import type { StudentFile } from "@/lib/schemas/student-file";
import type { AssessmentKind } from "@/lib/schemas/proof";
import { createSeed } from "@/lib/evaluations/seed";

type ConflictKind = "cache-newer" | "file-newer" | "diverged";

type ConflictState = {
  kind: ConflictKind;
  cache: StudentFile;
  incoming: StudentFile;
};

type WrongFileState = {
  sessionCode: string;
  incoming: StudentFile;
};

type LoadedState = {
  activeStudentCode: string | null;
  file: StudentFile | null;
  folderLinked: boolean;
  fileSystemAccessSupported: boolean;
};

export type ProgressionSnapshot =
  | { status: "loading" }
  | { status: "no-identity" }
  | { status: "ready"; file: StudentFile }
  | { status: "conflict"; kind: ConflictKind; cache: StudentFile; incoming: StudentFile }
  | { status: "wrong-file"; sessionCode: string; incoming: StudentFile }
  | { status: "error" };

export type ImportOutcome =
  | { type: "adopted" }
  | { type: "up-to-date" }
  | { type: "conflict" }
  | { type: "wrong-file" }
  | { type: "error"; error: StudentFileParseError };

export type ActionResult = { ok: true } | { ok: false; reason: string };

type ProgressionContextValue = {
  snapshot: ProgressionSnapshot;
  fileSystemAccessSupported: boolean;
  folderLinked: boolean;
  createIdentity: (identity: NewStudentIdentity) => Promise<void>;
  switchStudent: () => void;
  /** Relance le chargement initial après un échec (docs/SPEC.md § 65, audit ÉTAPE 10 § 11). */
  retryLoad: () => void;
  saveNow: () => Promise<ActionResult>;
  recordResponses: (missionId: string, responses: Record<string, unknown>) => void;
  submitAssessment: (
    missionId: string,
    itemId: string,
    kind: AssessmentKind,
    responses: unknown,
  ) => Promise<ActionResult>;
  completeMission: (missionId: string) => Promise<ActionResult>;
  exportFile: () => void;
  importFile: (raw: string) => Promise<ImportOutcome>;
  chooseFolder: () => Promise<ActionResult>;
  resolveConflictChoice: (choice: "use-file" | "keep-cache") => Promise<void>;
  acknowledgeDiverged: () => void;
  cancelWrongFile: () => void;
  confirmSwitchToWrongFile: () => Promise<void>;
};

const ProgressionContext = createContext<ProgressionContextValue | null>(null);

/**
 * Délai de sécurité au-delà duquel le chargement initial est considéré en
 * échec même s’il n’a ni réussi ni levé d’erreur (audit ÉTAPE 10 bis) :
 * l’interface ne doit jamais rester indéfiniment sur « Chargement… », y
 * compris dans un cas non anticipé (ex. une requête IndexedDB « onblocked »
 * qui ne se résout ni ne rejette jamais).
 */
const LOAD_TIMEOUT_MS = 8000;

export function ProgressionProvider({ children }: { children: ReactNode }) {
  const [loadedState, setLoadedState] = useState<LoadedState | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [conflict, setConflict] = useState<ConflictState | null>(null);
  const [wrongFile, setWrongFile] = useState<WrongFileState | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Le chargement peut se conclure une seule fois : par son propre
    // dénouement (succès ou erreur) ou par le délai de sécurité, selon ce
    // qui survient en premier. Empêche le second de contredire le premier.
    let settled = false;

    const timeoutId = window.setTimeout(() => {
      if (cancelled || settled) return;
      settled = true;
      console.error(
        `Chargement de la progression au-delà de ${LOAD_TIMEOUT_MS} ms : passage en erreur pour ne jamais rester bloqué sur « Chargement… ».`,
      );
      setLoadError(true);
    }, LOAD_TIMEOUT_MS);

    void (async () => {
      try {
        const storedCode = readStoredJson<string>(STORAGE_KEYS.activeStudentCode);
        const fileSystemAccessSupported = isFileSystemAccessSupported();
        let next: LoadedState = {
          activeStudentCode: null,
          file: null,
          folderLinked: false,
          fileSystemAccessSupported,
        };

        if (storedCode) {
          const cached = await getStudentFile(storedCode);
          if (cached) {
            const handle = await getDirectoryHandle(storedCode);
            next = {
              activeStudentCode: storedCode,
              file: cached,
              folderLinked: Boolean(handle),
              fileSystemAccessSupported,
            };
          }
        }

        if (!cancelled && !settled) {
          // Lecture asynchrone de localStorage/IndexedDB au montage : le
          // premier rendu (serveur puis client) reste "loading" dans les deux
          // cas, ce qui évite toute divergence d’hydratation (même principe
          // qu’à l’ÉTAPE 1 pour les préférences d’affichage). Détecter la
          // prise en charge de File System Access ici, et pas au premier
          // rendu, pour la même raison.
          settled = true;
          setLoadedState(next);
        }
      } catch (error) {
        // IndexedDB indisponible, navigation privée restrictive, quota
        // dépassé, donnée corrompue... : sans ce filet, l’exception reste
        // une promesse rejetée non gérée, `loadedState` ne passe jamais de
        // `null` à une valeur, et toute page protégée par
        // `RequireStudentIdentity` reste bloquée sur "loading" (donc vide)
        // indéfiniment, sans aucun message (audit ÉTAPE 10 § 2, § 11).
        console.error("Échec du chargement de la progression enregistrée :", error);
        if (!cancelled && !settled) {
          settled = true;
          setLoadError(true);
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [loadAttempt]);

  const retryLoad = useCallback(() => {
    setLoadedState(null);
    setLoadError(false);
    setLoadAttempt((attempt) => attempt + 1);
  }, []);

  const adoptFile = useCallback(async (file: StudentFile) => {
    await putStudentFile(file);
    writeStoredJson(STORAGE_KEYS.activeStudentCode, file.studentCode);
    const handle = await getDirectoryHandle(file.studentCode);
    setLoadedState((prev) => ({
      activeStudentCode: file.studentCode,
      file,
      folderLinked: Boolean(handle),
      fileSystemAccessSupported: prev?.fileSystemAccessSupported ?? false,
    }));
  }, []);

  const createIdentity = useCallback(
    async (identity: NewStudentIdentity) => {
      const code = identity.studentCode.trim();
      const existing = await getStudentFile(code);
      await adoptFile(existing ?? createInitialStudentFile(identity));
    },
    [adoptFile],
  );

  const switchStudent = useCallback(() => {
    writeStoredJson(STORAGE_KEYS.activeStudentCode, null);
    setLoadedState((prev) => ({
      activeStudentCode: null,
      file: null,
      folderLinked: false,
      fileSystemAccessSupported: prev?.fileSystemAccessSupported ?? false,
    }));
    // `loadError` prime sur `loadedState` dans le calcul de `snapshot` : sans
    // cette remise à zéro, « Commencer une nouvelle progression » depuis
    // l’écran d’erreur resterait bloqué sur "error" malgré un `loadedState`
    // désormais valide (audit ÉTAPE 10 bis).
    setLoadError(false);
    setConflict(null);
    setWrongFile(null);
  }, []);

  /** Écrit un fichier déjà transformé dans IndexedDB et, si lié, dans le
   * dossier choisi (File System Access) ; utilisé par `saveNow` et
   * `completeMission` pour ne pas dupliquer cette logique. */
  const persistFile = useCallback(
    async (saved: StudentFile): Promise<void> => {
      await putStudentFile(saved);

      let folderLinked = loadedState?.folderLinked ?? false;
      if (folderLinked && loadedState?.activeStudentCode) {
        const handle = await getDirectoryHandle(loadedState.activeStudentCode);
        if (handle) {
          const permitted = await ensureReadWritePermission(handle);
          if (permitted) {
            await writeStudentFileToDirectory(handle, saved);
          } else {
            folderLinked = false;
          }
        } else {
          folderLinked = false;
        }
      }

      setLoadedState((prev) => (prev ? { ...prev, file: saved, folderLinked } : prev));
    },
    [loadedState],
  );

  const saveNow = useCallback(async (): Promise<ActionResult> => {
    if (!loadedState?.file) {
      return { ok: false, reason: "no-identity" };
    }
    await persistFile(touchStudentFile(loadedState.file));
    return { ok: true };
  }, [loadedState, persistFile]);

  /**
   * Enregistre les réponses d’une mission dans l’état en mémoire, sans
   * augmenter `revision` : ce n’est qu’au moment de `completeMission` (ou
   * d’un `saveNow` explicite) que la sauvegarde devient significative
   * (docs/SPEC.md § 33).
   */
  const recordResponses = useCallback(
    (missionId: string, responses: Record<string, unknown>) => {
      setLoadedState((prev) =>
        prev?.file ? { ...prev, file: recordMissionResponses(prev.file, missionId, responses) } : prev,
      );
    },
    [],
  );

  /**
   * Dépose une évaluation (docs/SPEC.md § 23) : jamais corrigée côté élève,
   * toujours "pending" jusqu’à la correction dans `/teacher` (ÉTAPE 5). La
   * graine est calculée ici, à partir du code élève, pour rester la seule
   * source de vérité (mêmes règles que la sélection de variante, ÉTAPE 4).
   */
  const submitAssessment = useCallback(
    async (
      missionId: string,
      itemId: string,
      kind: AssessmentKind,
      responses: unknown,
    ): Promise<ActionResult> => {
      if (!loadedState?.file) {
        return { ok: false, reason: "no-identity" };
      }
      const seed = createSeed(loadedState.file.studentCode, missionId, itemId);
      const submission = {
        missionId,
        itemId,
        kind,
        seed,
        responses,
        submittedAt: new Date().toISOString(),
        status: "pending" as const,
      };
      await persistFile(recordAssessmentSubmission(loadedState.file, submission));
      return { ok: true };
    },
    [loadedState, persistFile],
  );

  const completeMission = useCallback(
    async (missionId: string): Promise<ActionResult> => {
      if (!loadedState?.file) {
        return { ok: false, reason: "no-identity" };
      }
      await persistFile(markMissionCompleted(loadedState.file, missionId));
      return { ok: true };
    },
    [loadedState, persistFile],
  );

  const exportFile = useCallback(() => {
    if (!loadedState?.file) return;
    triggerTextDownload(
      buildStudentFileName(loadedState.file.studentCode),
      JSON.stringify(loadedState.file, null, 2),
    );
  }, [loadedState]);

  const chooseFolder = useCallback(async (): Promise<ActionResult> => {
    if (!loadedState?.activeStudentCode) {
      return { ok: false, reason: "no-identity" };
    }
    const handle = await pickProgressDirectory();
    if (!handle) {
      return { ok: false, reason: "cancelled" };
    }
    const permitted = await ensureReadWritePermission(handle);
    if (!permitted) {
      return { ok: false, reason: "permission-denied" };
    }

    await putDirectoryHandle(loadedState.activeStudentCode, handle);
    if (loadedState.file) {
      await writeStudentFileToDirectory(handle, loadedState.file);
    }
    setLoadedState((prev) => (prev ? { ...prev, folderLinked: true } : prev));
    return { ok: true };
  }, [loadedState]);

  const importFile = useCallback(
    async (raw: string): Promise<ImportOutcome> => {
      const parsed = parseStudentFileJson(raw);
      if (!parsed.ok) {
        return { type: "error", error: parsed.error };
      }
      const incoming = parsed.file;

      if (loadedState?.activeStudentCode && isWrongFile(loadedState.activeStudentCode, incoming.studentCode)) {
        setWrongFile({ sessionCode: loadedState.activeStudentCode, incoming });
        return { type: "wrong-file" };
      }

      const cache = await getStudentFile(incoming.studentCode);
      const resolution = resolveConflict(cache, incoming);

      if (resolution.type === "no-cache") {
        await adoptFile(incoming);
        return { type: "adopted" };
      }

      if (resolution.type === "up-to-date") {
        return { type: "up-to-date" };
      }

      setConflict({ kind: resolution.kind, cache: resolution.cache, incoming: resolution.incoming });
      return { type: "conflict" };
    },
    [loadedState, adoptFile],
  );

  const resolveConflictChoice = useCallback(
    async (choice: "use-file" | "keep-cache") => {
      if (!conflict) return;
      const chosen = choice === "use-file" ? conflict.incoming : conflict.cache;
      setConflict(null);
      await adoptFile(chosen);
    },
    [conflict, adoptFile],
  );

  const acknowledgeDiverged = useCallback(() => {
    setConflict(null);
  }, []);

  const cancelWrongFile = useCallback(() => {
    setWrongFile(null);
  }, []);

  const confirmSwitchToWrongFile = useCallback(async () => {
    if (!wrongFile) return;
    const incoming = wrongFile.incoming;
    setWrongFile(null);

    const cache = await getStudentFile(incoming.studentCode);
    const resolution = resolveConflict(cache, incoming);

    if (resolution.type === "conflict") {
      setConflict({ kind: resolution.kind, cache: resolution.cache, incoming: resolution.incoming });
      return;
    }
    await adoptFile(incoming);
  }, [wrongFile, adoptFile]);

  const snapshot: ProgressionSnapshot = useMemo(() => {
    if (loadError) return { status: "error" };
    if (!loadedState) return { status: "loading" };
    if (wrongFile) return { status: "wrong-file", ...wrongFile };
    if (conflict) return { status: "conflict", ...conflict };
    if (loadedState.activeStudentCode && loadedState.file) {
      return { status: "ready", file: loadedState.file };
    }
    return { status: "no-identity" };
  }, [loadedState, loadError, conflict, wrongFile]);

  const value = useMemo<ProgressionContextValue>(
    () => ({
      snapshot,
      fileSystemAccessSupported: loadedState?.fileSystemAccessSupported ?? false,
      folderLinked: loadedState?.folderLinked ?? false,
      createIdentity,
      switchStudent,
      retryLoad,
      saveNow,
      recordResponses,
      submitAssessment,
      completeMission,
      exportFile,
      importFile,
      chooseFolder,
      resolveConflictChoice,
      acknowledgeDiverged,
      cancelWrongFile,
      confirmSwitchToWrongFile,
    }),
    [
      snapshot,
      loadedState,
      createIdentity,
      switchStudent,
      retryLoad,
      saveNow,
      recordResponses,
      submitAssessment,
      completeMission,
      exportFile,
      importFile,
      chooseFolder,
      resolveConflictChoice,
      acknowledgeDiverged,
      cancelWrongFile,
      confirmSwitchToWrongFile,
    ],
  );

  return <ProgressionContext.Provider value={value}>{children}</ProgressionContext.Provider>;
}

export function useProgression(): ProgressionContextValue {
  const context = useContext(ProgressionContext);
  if (!context) {
    throw new Error("useProgression doit être utilisé dans un ProgressionProvider.");
  }
  return context;
}
