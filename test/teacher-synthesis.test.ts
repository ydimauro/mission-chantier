import { describe, expect, it } from "vitest";
import { computeClassSynthesis, computeStudentGrade, computeStudentMastery } from "@/lib/teacher/synthesis";
import { createInitialStudentFile } from "@/lib/progression/model";
import type { TeacherKey } from "@/lib/schemas/teacher-key";
import type { AssessmentSubmission } from "@/lib/schemas/assessment-submission";
import type { CompetencyProof } from "@/lib/schemas/proof";

function sampleKey(): TeacherKey {
  return {
    schemaVersion: 1,
    entries: [
      {
        missionId: "4E-02",
        itemId: "q1",
        competency: "C4",
        kind: "summative",
        transfer: false,
        variantAnswers: [{ id: "v0", answer: "ok" }],
        scoring: { type: "auto", points: 1 },
      },
      {
        missionId: "4E-FINAL",
        itemId: "q1",
        competency: "C8",
        kind: "final",
        transfer: true,
        variantAnswers: [{ id: "v0", answer: "ok" }],
        scoring: { type: "auto", points: 1 },
      },
    ],
  };
}

function corrected(missionId: string, itemId: string, kind: "summative" | "final", score: number): AssessmentSubmission {
  return {
    missionId,
    itemId,
    kind,
    responses: "ok",
    submittedAt: "2026-09-20T10:00:00.000Z",
    status: "corrected",
    score,
  };
}

describe("note d'un élève à partir du .mctkey (docs/SPEC.md § 41)", () => {
  it("identifie les missions intermédiaires et la finale via leur kind déclaré", () => {
    const file = {
      ...createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" }),
      assessments: [corrected("4E-02", "q1", "summative", 0.8), corrected("4E-FINAL", "q1", "final", 0.9)],
    };
    const grade = computeStudentGrade(file, sampleKey());
    expect(grade.noteOn20).toBeCloseTo((0.8 * 0.4 + 0.9 * 0.6) * 20, 5);
    expect(grade.provisional).toBe(false);
  });

  it("reste provisoire sans la finale", () => {
    const file = {
      ...createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" }),
      assessments: [corrected("4E-02", "q1", "summative", 0.8)],
    };
    expect(computeStudentGrade(file, sampleKey()).provisional).toBe(true);
  });
});

describe("maîtrise d'un élève pour toutes les compétences", () => {
  it("renvoie non-evaluee pour les compétences sans preuve", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    const mastery = computeStudentMastery(file);
    expect(mastery.C1).toBe("non-evaluee");
    expect(mastery.C9).toBe("non-evaluee");
  });

  it("calcule un niveau pour une compétence avec preuves", () => {
    const proofs: CompetencyProof[] = [
      { competency: "C4", mission: "4E-02", assessmentType: "summative", context: "q1", score: 0.9, date: "2026-09-20", transfer: false },
      { competency: "C4", mission: "4E-03", assessmentType: "summative", context: "q1", score: 0.9, date: "2026-09-21", transfer: false },
    ];
    const file = { ...createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" }), proofs };
    expect(computeStudentMastery(file).C4).toBe("satisfaisante");
  });
});

describe("synthèse de classe (docs/SPEC.md § 41)", () => {
  it("trie les élèves par code", () => {
    const alice = createInitialStudentFile({ studentCode: "4E2-020", classe: "4E2", niveau: "4e" });
    const bob = createInitialStudentFile({ studentCode: "4E2-005", classe: "4E2", niveau: "4e" });
    const rows = computeClassSynthesis([alice, bob], sampleKey());
    expect(rows.map((row) => row.studentCode)).toEqual(["4E2-005", "4E2-020"]);
  });
});
