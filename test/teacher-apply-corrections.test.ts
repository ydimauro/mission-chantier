import { describe, expect, it } from "vitest";
import { applyCorrectedSubmissions } from "@/lib/teacher/apply-corrections";
import { createInitialStudentFile } from "@/lib/progression/model";
import type { TeacherKey } from "@/lib/schemas/teacher-key";
import type { AssessmentSubmission } from "@/lib/schemas/assessment-submission";

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

describe("réinjection des corrections dans le fichier élève (docs/SPEC.md § 26, § 33)", () => {
  it("met à jour les dépôts, fusionne les preuves et augmente la révision", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    const pending: AssessmentSubmission = {
      missionId: "4E-08",
      itemId: "q1",
      kind: "summative",
      responses: "B",
      submittedAt: "2026-09-20T10:00:00.000Z",
      status: "pending",
    };
    const withPending = { ...file, assessments: [pending] };

    const corrected: AssessmentSubmission = { ...pending, status: "corrected", score: 1 };
    const updated = applyCorrectedSubmissions(withPending, [corrected], sampleKey(), "2026-09-21");

    expect(updated.revision).toBe(withPending.revision + 1);
    expect(updated.assessments).toEqual([corrected]);
    expect(updated.proofs).toHaveLength(1);
    expect(updated.proofs[0]).toMatchObject({ competency: "C8", mission: "4E-08", score: 1 });
  });

  it("ne modifie rien si aucun dépôt n'est nouvellement corrigé", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    const alreadyCorrected: AssessmentSubmission = {
      missionId: "4E-08",
      itemId: "q1",
      kind: "summative",
      responses: "B",
      submittedAt: "2026-09-20T10:00:00.000Z",
      status: "corrected",
      score: 1,
    };
    const withCorrected = { ...file, assessments: [alreadyCorrected] };

    const updated = applyCorrectedSubmissions(withCorrected, [alreadyCorrected], sampleKey());

    expect(updated).toBe(withCorrected);
  });
});
