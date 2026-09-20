import type { StudentFile } from "@/lib/schemas/student-file";
import type { AssessmentSubmission } from "@/lib/schemas/assessment-submission";
import type { TeacherKey } from "@/lib/schemas/teacher-key";
import { touchStudentFile } from "@/lib/progression/model";
import { deriveProofsFromSubmissions, mergeProofs } from "@/lib/teacher/proofs";

function submissionKey(submission: AssessmentSubmission): string {
  return `${submission.missionId}:${submission.itemId}`;
}

/**
 * Réinjecte des dépôts corrigés (automatiquement et/ou manuellement) dans
 * le fichier élève : met à jour `assessments`, fusionne les preuves de
 * compétence qui en découlent, et augmente `revision` (docs/SPEC.md § 26,
 * « mise à jour .mcjson → revision + 1 »).
 *
 * `correctedSubmissions` doit correspondre au même ensemble d’items que
 * `file.assessments` (typiquement le résultat de `autoCorrectSubmissions`
 * ou d’une correction manuelle appliquée sur `file.assessments`).
 */
export function applyCorrectedSubmissions(
  file: StudentFile,
  correctedSubmissions: readonly AssessmentSubmission[],
  key: TeacherKey,
  correctionDate: string = new Date().toISOString(),
): StudentFile {
  const previousByKey = new Map(file.assessments.map((submission) => [submissionKey(submission), submission]));

  const newlyCorrected = correctedSubmissions.filter((submission) => {
    if (submission.status !== "corrected") return false;
    const previous = previousByKey.get(submissionKey(submission));
    return previous?.status !== "corrected";
  });

  if (newlyCorrected.length === 0) return file;

  const newProofs = deriveProofsFromSubmissions(newlyCorrected, key, correctionDate);

  return touchStudentFile({
    ...file,
    assessments: [...correctedSubmissions],
    proofs: mergeProofs(file.proofs, newProofs),
  });
}
