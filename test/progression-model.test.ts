import { describe, expect, it } from "vitest";
import {
  buildStudentFileName,
  createInitialStudentFile,
  isWrongFile,
  resolveConflict,
  touchStudentFile,
} from "@/lib/progression/model";

describe("modèle de progression", () => {
  it("crée un fichier initial à la révision 0", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    expect(file.revision).toBe(0);
    expect(file.completedMissionIds).toEqual([]);
    expect(file.accommodation).toBe("standard");
  });

  it("incrémente la révision à chaque sauvegarde significative (docs/SPEC.md § 33)", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    const saved = touchStudentFile(file);
    expect(saved.revision).toBe(1);
    expect(() => new Date(saved.updatedAt).toISOString()).not.toThrow();
  });

  it("détecte un fichier appartenant à un autre code élève (docs/SPEC.md § 35)", () => {
    expect(isWrongFile("4E2-017", "4E2-018")).toBe(true);
    expect(isWrongFile("4E2-017", "4E2-017")).toBe(false);
  });

  it("construit le nom de fichier attendu, y compris la copie .bak", () => {
    expect(buildStudentFileName("4E2-017")).toBe("mission-chantier-4E2-017.mcjson");
    expect(buildStudentFileName("4E2-017", ".bak")).toBe("mission-chantier-4E2-017.mcjson.bak");
  });

  describe("résolution des conflits cache / fichier (docs/SPEC.md § 34)", () => {
    const base = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });

    it("absence de cache : le fichier importé est simplement adopté", () => {
      expect(resolveConflict(null, base)).toEqual({ type: "no-cache", incoming: base });
    });

    it("cache et fichier identiques : à jour, aucune action", () => {
      const identical = { ...base };
      expect(resolveConflict(base, identical)).toEqual({ type: "up-to-date", incoming: identical });
    });

    it("fichier plus récent que le cache", () => {
      const cache = base;
      const incoming = touchStudentFile(base);
      expect(resolveConflict(cache, incoming)).toEqual({
        type: "conflict",
        kind: "file-newer",
        cache,
        incoming,
      });
    });

    it("cache plus récent que le fichier", () => {
      const cache = touchStudentFile(base);
      const incoming = base;
      expect(resolveConflict(cache, incoming)).toEqual({
        type: "conflict",
        kind: "cache-newer",
        cache,
        incoming,
      });
    });

    it("même révision mais contenu différent : divergence, aucune fusion automatique", () => {
      const cache = { ...base, completedMissionIds: ["5E-00"] };
      const incoming = { ...base, completedMissionIds: ["5E-01"] };
      expect(resolveConflict(cache, incoming)).toEqual({
        type: "conflict",
        kind: "diverged",
        cache,
        incoming,
      });
    });

    it("même révision, même contenu dans un ordre de clés différent : reste à jour", () => {
      const incoming = JSON.parse(
        JSON.stringify(base, Object.keys(base).sort()),
      ) as typeof base;
      expect(resolveConflict(base, incoming).type).toBe("up-to-date");
    });
  });
});
