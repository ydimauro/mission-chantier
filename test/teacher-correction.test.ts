import { describe, expect, it } from "vitest";
import { applyHumanScore, autoCorrectSubmissions, computeMissionScore } from "@/lib/teacher/correction";
import type { AssessmentSubmission } from "@/lib/schemas/assessment-submission";
import type { TeacherKey } from "@/lib/schemas/teacher-key";
import { createSeed } from "@/lib/evaluations/seed";

const seed = createSeed("4E2-017", "4E-08", "q1");

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
        variantAnswers: [{ id: "v0", answer: "B" }],
        scoring: { type: "auto", points: 2 },
      },
      {
        missionId: "4E-08",
        itemId: "q2-justification",
        competency: "C8",
        kind: "summative",
        transfer: false,
        variantAnswers: [{ id: "v0", answer: null }],
        scoring: { type: "human", points: 1 },
      },
    ],
  };
}

function submission(overrides: Partial<AssessmentSubmission> = {}): AssessmentSubmission {
  return {
    missionId: "4E-08",
    itemId: "q1",
    kind: "summative",
    seed,
    responses: "B",
    submittedAt: "2026-09-20T10:00:00.000Z",
    status: "pending",
    ...overrides,
  };
}

describe("correction automatique (docs/SPEC.md § 25)", () => {
  it("corrige un item auto dont la réponse correspond à la variante attendue", () => {
    const [result] = autoCorrectSubmissions([submission()], sampleKey());
    expect(result).toMatchObject({ status: "corrected", score: 1 });
  });

  it("corrige un item auto dont la réponse ne correspond pas", () => {
    const [result] = autoCorrectSubmissions([submission({ responses: "A" })], sampleKey());
    expect(result).toMatchObject({ status: "corrected", score: 0 });
  });

  it("laisse en attente un item déclaré à correction humaine", () => {
    const [result] = autoCorrectSubmissions(
      [submission({ itemId: "q2-justification", responses: "Ma réponse." })],
      sampleKey(),
    );
    expect(result?.status).toBe("pending");
  });

  it("ne recorrige jamais un dépôt déjà corrigé", () => {
    const already = submission({ status: "corrected", score: 0.5 });
    const [result] = autoCorrectSubmissions([already], sampleKey());
    expect(result).toEqual(already);
  });

  it("laisse inchangé un dépôt sans entrée correspondante dans le .mctkey", () => {
    const orphan = submission({ itemId: "q-inconnu" });
    const [result] = autoCorrectSubmissions([orphan], sampleKey());
    expect(result).toEqual(orphan);
  });
});

describe("correction humaine (docs/SPEC.md § 25)", () => {
  it("applique un score et marque le dépôt corrigé", () => {
    const result = applyHumanScore(submission({ itemId: "q2-justification" }), 0.5);
    expect(result).toMatchObject({ status: "corrected", score: 0.5 });
  });

  it("borne le score entre 0 et 1", () => {
    expect(applyHumanScore(submission(), 5).score).toBe(1);
    expect(applyHumanScore(submission(), -1).score).toBe(0);
  });
});

describe("score d'une mission sommative (docs/SPEC.md § 41)", () => {
  it("pondère les items corrigés par leurs points respectifs", () => {
    const submissions: AssessmentSubmission[] = [
      submission({ status: "corrected", score: 1 }), // 2 points
      submission({ itemId: "q2-justification", status: "corrected", score: 0.5 }), // 1 point
    ];
    // (1*2 + 0.5*1) / (2+1) = 2.5/3
    expect(computeMissionScore("4E-08", submissions, sampleKey())).toBeCloseTo(2.5 / 3, 5);
  });

  it("renvoie null tant qu'aucun item n'est corrigé", () => {
    expect(computeMissionScore("4E-08", [submission()], sampleKey())).toBeNull();
  });

  it("ignore les items encore en attente dans le calcul", () => {
    const submissions: AssessmentSubmission[] = [
      submission({ status: "corrected", score: 1 }),
      submission({ itemId: "q2-justification", status: "pending" }),
    ];
    expect(computeMissionScore("4E-08", submissions, sampleKey())).toBeCloseTo(1, 5);
  });
});
