import { COMPETENCY_IDS, type CompetencyId } from "@content/competencies";
import type { StudentFile } from "@/lib/schemas/student-file";
import type { TeacherKey } from "@/lib/schemas/teacher-key";
import { computeMissionScore } from "@/lib/teacher/correction";
import { computeGrade, type GradeResult, type SummativeResult } from "@/lib/evaluations/grade";
import { computeMasteryLevel, type MasteryLevel } from "@/lib/evaluations/mastery";

/**
 * Synthèse par élève et par classe (docs/SPEC.md § 41 « calcul des
 * compétences », « calcul des notes », « synthèse classe »). Les missions
 * intermédiaires et la mission finale sont identifiées à partir des items
 * déclarés dans le `.mctkey` (aucun registre de missions n’existe encore,
 * ÉTAPE 6 et suivantes), en s’appuyant sur `kind: "summative" | "final"`.
 */

function missionIdsForKind(key: TeacherKey, kind: "summative" | "final"): string[] {
  const ids = new Set(key.entries.filter((entry) => entry.kind === kind).map((entry) => entry.missionId));
  return Array.from(ids);
}

function classifyMission(missionId: string, file: StudentFile, key: TeacherKey): SummativeResult {
  const missionSubmissions = file.assessments.filter((submission) => submission.missionId === missionId);

  if (missionSubmissions.length === 0) {
    return { id: missionId, status: "not-taken", score: null };
  }
  if (missionSubmissions.some((submission) => submission.status === "pending")) {
    return { id: missionId, status: "pending", score: null };
  }

  const score = computeMissionScore(missionId, file.assessments, key);
  return score === null
    ? { id: missionId, status: "not-taken", score: null }
    : { id: missionId, status: "corrected", score };
}

export function computeStudentGrade(file: StudentFile, key: TeacherKey): GradeResult {
  const intermediateIds = missionIdsForKind(key, "summative");
  const finalIds = missionIdsForKind(key, "final");

  const intermediates = intermediateIds.map((missionId) => classifyMission(missionId, file, key));
  const finalResult: SummativeResult =
    finalIds.length > 0
      ? classifyMission(finalIds[0] as string, file, key)
      : { id: "finale", status: "not-taken", score: null };

  return computeGrade(intermediates, finalResult);
}

export function computeStudentMastery(
  file: StudentFile,
  thresholds?: TeacherKey["masteryThresholds"],
): Record<CompetencyId, MasteryLevel> {
  const result = {} as Record<CompetencyId, MasteryLevel>;
  for (const competency of COMPETENCY_IDS) {
    result[competency] = computeMasteryLevel(file.proofs, competency, thresholds);
  }
  return result;
}

export type StudentSynthesisRow = {
  studentCode: string;
  classe: string;
  grade: GradeResult;
  mastery: Record<CompetencyId, MasteryLevel>;
};

export function computeClassSynthesis(
  files: readonly StudentFile[],
  key: TeacherKey,
): StudentSynthesisRow[] {
  return files
    .map((file) => ({
      studentCode: file.studentCode,
      classe: file.classe,
      grade: computeStudentGrade(file, key),
      mastery: computeStudentMastery(file, key.masteryThresholds),
    }))
    .sort((a, b) => a.studentCode.localeCompare(b.studentCode, "fr"));
}
