import { describe, expect, it } from "vitest";
import {
  buildClassConfigFileName,
  classConfigSchema,
  createDefaultClassConfig,
  parseClassConfigJson,
} from "@/lib/schemas/class-config";

describe("schéma du fichier classe .mcconfig (docs/SPEC.md § 24.2)", () => {
  it("accepte une configuration créée par défaut", () => {
    const config = createDefaultClassConfig("4E2", "4e");
    expect(classConfigSchema.safeParse(config).success).toBe(true);
  });

  it("refuse une durée standard supérieure à 45 minutes (docs/SPEC.md § 9)", () => {
    const config = { ...createDefaultClassConfig("4E2", "4e"), standardDurationMinutes: 50 };
    expect(classConfigSchema.safeParse(config).success).toBe(false);
  });

  it("n'accepte aucun champ d'aménagement individuel ou médical (docs/SPEC.md § 64, test 24)", () => {
    const shape = classConfigSchema.shape;
    const fields = Object.keys(shape);
    expect(fields).toEqual([
      "schemaVersion",
      "classe",
      "niveau",
      "standardDurationMinutes",
      "missionsEnabled",
      "correctionPolicy",
    ]);
    for (const field of fields) {
      expect(field.toLowerCase()).not.toMatch(/medic|sante|pap|pps|accommodation|amenagement/);
    }
  });

  it("refuse un champ supplémentaire non prévu par le schéma (protection contre un ajout accidentel)", () => {
    const config = {
      ...createDefaultClassConfig("4E2", "4e"),
      accommodations: [{ studentCode: "4E2-017", reason: "TDAH" }],
    };
    const result = classConfigSchema.strict().safeParse(config);
    expect(result.success).toBe(false);
  });

  it("construit le nom de fichier attendu", () => {
    expect(buildClassConfigFileName("4E2")).toBe("mission-chantier-4E2.mcconfig");
  });
});

describe("analyse d'un fichier .mcconfig", () => {
  it("accepte un fichier valide", () => {
    const config = createDefaultClassConfig("4E2", "4e");
    expect(parseClassConfigJson(JSON.stringify(config))).toEqual({ ok: true, config });
  });

  it("refuse un JSON mal formé", () => {
    expect(parseClassConfigJson("{ pas du json")).toEqual({
      ok: false,
      error: { type: "invalid-json" },
    });
  });

  it("refuse un fichier produit par une version future", () => {
    const config = { ...createDefaultClassConfig("4E2", "4e"), schemaVersion: 7 };
    const result = parseClassConfigJson(JSON.stringify(config));
    expect(result).toEqual({ ok: false, error: { type: "unsupported-version", foundVersion: 7 } });
  });
});
