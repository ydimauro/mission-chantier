import { describe, expect, it } from "vitest";
import { migrateStudentFile, parseStudentFileJson } from "@/lib/schemas/migrations";
import { createInitialStudentFile } from "@/lib/progression/model";

describe("migration et analyse du fichier élève", () => {
  it("accepte un fichier valide", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    const result = migrateStudentFile(file);
    expect(result.ok).toBe(true);
  });

  it("refuse un JSON mal formé sans planter", () => {
    const result = parseStudentFileJson("{ ceci n'est pas du JSON");
    expect(result).toEqual({ ok: false, error: { type: "invalid-json" } });
  });

  it("refuse un fichier produit par une version future de l'application", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    const result = migrateStudentFile({ ...file, schemaVersion: 99 });
    expect(result).toEqual({
      ok: false,
      error: { type: "unsupported-version", foundVersion: 99 },
    });
  });

  it("refuse un fichier qui ne respecte pas le schéma, avec le détail des erreurs", () => {
    const result = migrateStudentFile({ schemaVersion: 1 });
    expect(result.ok).toBe(false);
    if (!result.ok && result.error.type === "invalid-schema") {
      expect(result.error.issues.length).toBeGreaterThan(0);
    } else {
      throw new Error("attendu : invalid-schema");
    }
  });

  it("recompose un fichier valide à partir d'un texte JSON", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    const result = parseStudentFileJson(JSON.stringify(file));
    expect(result).toEqual({ ok: true, file });
  });
});
