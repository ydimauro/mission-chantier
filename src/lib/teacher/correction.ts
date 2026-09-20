import type { AssessmentSubmission } from "@/lib/schemas/assessment-submission";
import { findAnswerKeyEntry, type TeacherKey } from "@/lib/schemas/teacher-key";
import { pickVariant } from "@/lib/evaluations/seed";
import { deepEqual } from "@/lib/progression/model";

/**
 * Correction automatique et humaine (docs/SPEC.md § 25, § 41). Ne modifie
 * jamais un dépôt déjà corrigé : une correction n’est jamais silencieuse ni
 * répétée sans action explicite du professeur.
 */

/**
 * Corrige automatiquement les dépôts dont l’item est déclaré `scoring.type: "auto"`
 * dans le `.mctkey`. Laisse inchangés les dépôts déjà corrigés, ceux sans
 * entrée correspondante, et ceux qui nécessitent une correction humaine.
 */
export function autoCorrectSubmissions(
  submissions: readonly AssessmentSubmission[],
  key: TeacherKey,
): AssessmentSubmission[] {
  return submissions.map((submission) => {
    if (submission.status === "corrected") return submission;

    const entry = findAnswerKeyEntry(key, submission.missionId, submission.itemId);
    if (!entry || entry.scoring.type !== "auto") return submission;
    if (!submission.seed) return submission;

    const variant = pickVariant(entry.variantAnswers, submission.seed);
    const isCorrect = deepEqual(submission.responses, variant.answer);

    return { ...submission, status: "corrected", score: isCorrect ? 1 : 0 };
  });
}

/**
 * Applique une correction humaine à un dépôt précis (docs/SPEC.md § 25).
 * `score` est exprimé sur 0 à 1 ; pour les réponses ouvertes, l’interface
 * professeur propose typiquement 0, 0,5 ou 1 point ramené à cette échelle
 * (docs/SPEC.md § 25).
 */
export function applyHumanScore(submission: AssessmentSubmission, score: number): AssessmentSubmission {
  const clamped = Math.min(1, Math.max(0, score));
  return { ...submission, status: "corrected", score: clamped };
}

/**
 * Score d’une mission sommative à partir de ses items corrigés, pondéré par
 * les points de chaque item (docs/SPEC.md § 41 « calcul des notes »).
 * `null` tant qu’aucun item de cette mission n’est corrigé.
 */
export function computeMissionScore(
  missionId: string,
  submissions: readonly AssessmentSubmission[],
  key: TeacherKey,
): number | null {
  const relevant = submissions
    .filter((submission) => submission.missionId === missionId && submission.status === "corrected")
    .map((submission) => ({
      submission,
      entry: findAnswerKeyEntry(key, submission.missionId, submission.itemId),
    }))
    .filter(
      (row): row is { submission: AssessmentSubmission & { score: number }; entry: NonNullable<ReturnType<typeof findAnswerKeyEntry>> } =>
        row.entry !== null && row.submission.score !== undefined,
    );

  if (relevant.length === 0) return null;

  const totalPoints = relevant.reduce((sum, row) => sum + row.entry.scoring.points, 0);
  if (totalPoints === 0) return null;

  const earnedPoints = relevant.reduce(
    (sum, row) => sum + row.submission.score * row.entry.scoring.points,
    0,
  );

  return earnedPoints / totalPoints;
}
