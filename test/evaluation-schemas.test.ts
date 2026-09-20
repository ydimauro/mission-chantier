import { describe, expect, it } from "vitest";
import { competencyProofSchema } from "@/lib/schemas/proof";
import { assessmentSubmissionSchema } from "@/lib/schemas/assessment-submission";
import { teacherKeySchema } from "@/lib/schemas/teacher-key";

describe("schéma d'une preuve de compétence (docs/EVALUATIONS.md § 5)", () => {
  it("accepte une preuve conforme à l'exemple du cahier des charges", () => {
    const result = competencyProofSchema.safeParse({
      competency: "C8",
      mission: "4E-08",
      assessmentType: "summative",
      context: "sensor-test",
      score: 0.82,
      date: "2026-09-20",
      seed: "4E2-017:4E-08:q1",
      transfer: false,
    });
    expect(result.success).toBe(true);
  });

  it("refuse un score hors de l'intervalle 0 à 1", () => {
    const result = competencyProofSchema.safeParse({
      competency: "C8",
      mission: "4E-08",
      assessmentType: "summative",
      context: "sensor-test",
      score: 1.2,
      date: "2026-09-20",
      transfer: false,
    });
    expect(result.success).toBe(false);
  });

  it("refuse une compétence inconnue", () => {
    const result = competencyProofSchema.safeParse({
      competency: "C10",
      mission: "4E-08",
      assessmentType: "summative",
      context: "sensor-test",
      score: 0.5,
      date: "2026-09-20",
      transfer: false,
    });
    expect(result.success).toBe(false);
  });
});

describe("schéma d'un dépôt d'évaluation élève", () => {
  it("accepte un dépôt en attente de correction, sans score", () => {
    const result = assessmentSubmissionSchema.safeParse({
      missionId: "4E-08",
      itemId: "q1",
      kind: "summative",
      responses: { choix: "B" },
      submittedAt: "2026-09-20T10:00:00.000Z",
      status: "pending",
    });
    expect(result.success).toBe(true);
  });

  it("refuse un score en dehors de 0 à 1", () => {
    const result = assessmentSubmissionSchema.safeParse({
      missionId: "4E-08",
      itemId: "q1",
      kind: "summative",
      responses: {},
      submittedAt: "2026-09-20T10:00:00.000Z",
      status: "corrected",
      score: 2,
    });
    expect(result.success).toBe(false);
  });
});

describe("schéma du fichier enseignant .mctkey (docs/SPEC.md § 24.3)", () => {
  it("accepte un corrigé minimal valide", () => {
    const result = teacherKeySchema.safeParse({
      schemaVersion: 1,
      entries: [
        {
          missionId: "4E-08",
          itemId: "q1",
          variantAnswers: { "variante-A": "B" },
          scoring: { type: "auto", points: 1 },
        },
      ],
    });
    expect(result.success).toBe(true);
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
