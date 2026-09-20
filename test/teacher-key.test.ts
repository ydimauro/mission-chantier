import { describe, expect, it } from "vitest";
import {
  findAnswerKeyEntry,
  parseTeacherKeyJson,
  teacherKeySchema,
  type TeacherKey,
} from "@/lib/schemas/teacher-key";

function sampleKey(): TeacherKey {
  return {
    schemaVersion: 1,
    entries: [
      {
        missionId: "4E-08",
        itemId: "q1",
        competency: "C8",
        kind: "summative",
        transfer: false,
        variantAnswers: [
          { id: "variante-A", answer: "B" },
          { id: "variante-B", answer: "C" },
        ],
        scoring: { type: "auto", points: 1 },
      },
    ],
  };
}

describe("schéma du fichier enseignant .mctkey (docs/SPEC.md § 24.3)", () => {
  it("accepte un corrigé minimal valide", () => {
    expect(teacherKeySchema.safeParse(sampleKey()).success).toBe(true);
  });

  it("refuse une entrée sans compétence déclarée (docs/SPEC.md § 15)", () => {
    const key = sampleKey();
    const entryWithoutCompetency = { ...key.entries[0] } as Record<string, unknown>;
    delete entryWithoutCompetency.competency;
    const result = teacherKeySchema.safeParse({ ...key, entries: [entryWithoutCompetency] });
    expect(result.success).toBe(false);
  });

  it("refuse une entrée sans aucune variante", () => {
    const key = sampleKey();
    const result = teacherKeySchema.safeParse({
      ...key,
      entries: [{ ...key.entries[0], variantAnswers: [] }],
    });
    expect(result.success).toBe(false);
  });

  it("accepte des seuils de maîtrise personnalisés", () => {
    const result = teacherKeySchema.safeParse({
      schemaVersion: 1,
      entries: [],
      masteryThresholds: {
        minAverageForFragile: 0.3,
        minAverageForSatisfaisante: 0.6,
        minAverageForTresBonne: 0.85,
      },
    });
    expect(result.success).toBe(true);
  });

  it("refuse un schemaVersion différent de 1", () => {
    const result = teacherKeySchema.safeParse({ schemaVersion: 2, entries: [] });
    expect(result.success).toBe(false);
  });
});

describe("recherche d'une entrée du corrigé", () => {
  it("retrouve l'entrée correspondant à une mission et un item", () => {
    const key = sampleKey();
    expect(findAnswerKeyEntry(key, "4E-08", "q1")).toEqual(key.entries[0]);
  });

  it("renvoie null si aucune entrée ne correspond", () => {
    expect(findAnswerKeyEntry(sampleKey(), "4E-08", "q2")).toBeNull();
  });
});

describe("analyse d'un fichier .mctkey", () => {
  it("accepte un fichier valide", () => {
    const result = parseTeacherKeyJson(JSON.stringify(sampleKey()));
    expect(result).toEqual({ ok: true, key: sampleKey() });
  });

  it("refuse un JSON mal formé", () => {
    expect(parseTeacherKeyJson("{ pas du json")).toEqual({
      ok: false,
      error: { type: "invalid-json" },
    });
  });

  it("refuse un fichier produit par une version future", () => {
    const result = parseTeacherKeyJson(JSON.stringify({ ...sampleKey(), schemaVersion: 99 }));
    expect(result).toEqual({ ok: false, error: { type: "unsupported-version", foundVersion: 99 } });
  });
});
