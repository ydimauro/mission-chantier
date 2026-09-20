import { CURRENT_SCHEMA_VERSION, type StudentFile } from "@/lib/schemas/student-file";
import type { Level } from "@content/config";

export type NewStudentIdentity = {
  studentCode: string;
  classe: string;
  niveau: Level;
};

export function createInitialStudentFile(identity: NewStudentIdentity): StudentFile {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    revision: 0,
    updatedAt: new Date().toISOString(),
    studentCode: identity.studentCode.trim(),
    classe: identity.classe.trim(),
    niveau: identity.niveau,
    currentMissionId: null,
    completedMissionIds: [],
    responses: {},
    assessments: [],
    proofs: [],
    accommodation: "standard",
  };
}

/**
 * Marque une sauvegarde significative (docs/SPEC.md § 33) : incrémente la
 * révision et actualise l’horodatage. `updatedAt` reste une information
 * secondaire ; c’est `revision` qui porte la logique de comparaison.
 */
export function touchStudentFile(file: StudentFile): StudentFile {
  return {
    ...file,
    revision: file.revision + 1,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Un fichier importé n’est jamais fusionné automatiquement (docs/SPEC.md
 * § 35) : il appartient à un autre code élève que la session en cours.
 */
export function isWrongFile(activeStudentCode: string, incomingStudentCode: string): boolean {
  return activeStudentCode !== incomingStudentCode;
}

export function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(sortedClone(a)) === JSON.stringify(sortedClone(b));
}

// JSON.stringify est sensible à l’ordre des clés : on normalise avant de
// comparer pour ne pas signaler un « contenu différent » sur deux objets
// équivalents mais construits dans un ordre différent.
function sortedClone(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortedClone);
  }
  if (value !== null && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = sortedClone((value as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }
  return value;
}

export type ConflictResolution =
  | { type: "no-cache"; incoming: StudentFile }
  | { type: "up-to-date"; incoming: StudentFile }
  | { type: "conflict"; kind: "cache-newer"; cache: StudentFile; incoming: StudentFile }
  | { type: "conflict"; kind: "file-newer"; cache: StudentFile; incoming: StudentFile }
  | { type: "conflict"; kind: "diverged"; cache: StudentFile; incoming: StudentFile };

/**
 * Comparaison cache / fichier pour un même code élève (docs/SPEC.md § 34).
 * Ne fusionne jamais automatiquement, n’écrase jamais silencieusement.
 */
export function resolveConflict(
  cache: StudentFile | null,
  incoming: StudentFile,
): ConflictResolution {
  if (!cache) {
    return { type: "no-cache", incoming };
  }

  if (cache.revision === incoming.revision) {
    return deepEqual(cache, incoming)
      ? { type: "up-to-date", incoming }
      : { type: "conflict", kind: "diverged", cache, incoming };
  }

  if (incoming.revision > cache.revision) {
    return { type: "conflict", kind: "file-newer", cache, incoming };
  }

  return { type: "conflict", kind: "cache-newer", cache, incoming };
}

export function buildStudentFileName(studentCode: string, suffix: "" | ".bak" = ""): string {
  const safeCode = studentCode.trim().replace(/[^a-zA-Z0-9_-]+/g, "-");
  return `mission-chantier-${safeCode}.mcjson${suffix}`;
}
