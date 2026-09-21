import { describe, expect, it } from "vitest";
import { computeStudentGrade } from "@/lib/evaluations/student-summary";
import type { AssessmentSubmission } from "@/lib/schemas/assessment-submission";

function submission(missionId: string, status: "pending" | "corrected", score?: number): AssessmentSubmission {
  return { missionId, itemId: "item", kind: missionId.endsWith("FINAL") ? "final" : "summative", responses: {}, submittedAt: "2026-09-21", status, score };
}

describe("résultats corrigés côté élève", () => {
  it("calcule une note intermédiaire provisoire", () => {
    expect(computeStudentGrade("5e", [submission("5E-04", "corrected", 0.75)])).toMatchObject({ noteOn20: 15, provisional: true });
  });
  it("agrège les items corrigés d’une même mission", () => {
    const results = [
      { ...submission("4E-11", "corrected", 1), itemId: "programme" },
      { ...submission("4E-11", "corrected", 0.5), itemId: "diagnostic" },
    ];
    expect(computeStudentGrade("4e", results).noteOn20).toBe(15);
  });
  it("conserve l’état en attente si un item de la mission reste à corriger", () => {
    const results = [
      { ...submission("4E-11", "corrected", 1), itemId: "programme" },
      { ...submission("4E-11", "pending"), itemId: "diagnostic" },
    ];
    expect(computeStudentGrade("4e", results).noteOn20).toBeNull();
  });
});
