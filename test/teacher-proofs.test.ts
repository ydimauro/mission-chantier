import { describe, expect, it } from "vitest";
import { deriveProofsFromSubmissions, mergeProofs } from "@/lib/teacher/proofs";
import type { AssessmentSubmission } from "@/lib/schemas/assessment-submission";
import type { TeacherKey } from "@/lib/schemas/teacher-key";
import type { CompetencyProof } from "@/lib/schemas/proof";

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
        scoring: { type: "auto", points: 1 },
      },
    ],
  };
}

describe("dérivation des preuves de compétence (docs/EVALUATIONS.md § 5)", () => {
  it("produit une preuve pour chaque item corrigé et déclaré dans le .mctkey", () => {
    const submissions: AssessmentSubmission[] = [
      {
        missionId: "4E-08",
        itemId: "q1",
        kind: "summative",
        seed: "seed",
        responses: "B",
        submittedAt: "2026-09-20T10:00:00.000Z",
        status: "corrected",
        score: 1,
      },
    ];
    const proofs = deriveProofsFromSubmissions(submissions, sampleKey(), "2026-09-21");
    expect(proofs).toEqual([
      {
        competency: "C8",
        mission: "4E-08",
        assessmentType: "summative",
        context: "q1",
        score: 1,
        date: "2026-09-21",
        seed: "seed",
        transfer: false,
      },
    ]);
  });

  it("ignore les dépôts non corrigés ou sans entrée correspondante", () => {
    const submissions: AssessmentSubmission[] = [
      {
        missionId: "4E-08",
        itemId: "q1",
        kind: "summative",
        responses: "B",
        submittedAt: "2026-09-20T10:00:00.000Z",
        status: "pending",
      },
      {
        missionId: "4E-08",
        itemId: "q-inconnu",
        kind: "summative",
        responses: "B",
        submittedAt: "2026-09-20T10:00:00.000Z",
        status: "corrected",
        score: 1,
      },
    ];
    expect(deriveProofsFromSubmissions(submissions, sampleKey(), "2026-09-21")).toEqual([]);
  });
});

describe("fusion des preuves", () => {
  it("remplace une preuve existante pour le même contexte plutôt que de la dupliquer", () => {
    const existing: CompetencyProof[] = [
      { competency: "C8", mission: "4E-08", assessmentType: "summative", context: "q1", score: 0, date: "2026-09-01", transfer: false },
    ];
    const incoming: CompetencyProof[] = [
      { competency: "C8", mission: "4E-08", assessmentType: "summative", context: "q1", score: 1, date: "2026-09-21", transfer: false },
    ];
    const merged = mergeProofs(existing, incoming);
    expect(merged).toHaveLength(1);
    expect(merged[0]?.score).toBe(1);
  });

  it("conserve les preuves de contextes différents", () => {
    const existing: CompetencyProof[] = [
      { competency: "C8", mission: "4E-08", assessmentType: "summative", context: "q1", score: 1, date: "2026-09-01", transfer: false },
    ];
    const incoming: CompetencyProof[] = [
      { competency: "C3", mission: "5E-04", assessmentType: "summative", context: "choix", score: 1, date: "2026-09-21", transfer: false },
    ];
    expect(mergeProofs(existing, incoming)).toHaveLength(2);
  });
});
