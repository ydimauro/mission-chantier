/**
 * Calcul de la note /20 (docs/SPEC.md § 27, docs/EVALUATIONS.md § 6).
 *
 * Décision d’implémentation (ÉTAPE 4), documentée dans docs/EVALUATIONS.md :
 * - une sommative "not-taken" (absence) est exclue de la moyenne, jamais
 *   transformée en 0 ;
 * - la note reste "provisoire" tant qu’une sommative intermédiaire est
 *   "pending" (non corrigée) ou que la finale n’est pas encore corrigée,
 *   la finale pesant à elle seule 60 % de la note ;
 * - tant qu’aucune sommative intermédiaire n’est corrigée et que la finale
 *   ne l’est pas non plus, aucune note n’est calculable.
 */

export const INTERMEDIATE_WEIGHT = 0.4;
export const FINAL_WEIGHT = 0.6;

export type EvaluationStatus = "not-taken" | "pending" | "corrected";

export type SummativeResult = {
  id: string;
  status: EvaluationStatus;
  /** 0 à 1, uniquement renseigné si `status` vaut "corrected". */
  score: number | null;
};

export type GradeResult = {
  /** Sur 20, précision brute conservée (à arrondir à l’affichage seulement). */
  noteOn20: number | null;
  provisional: boolean;
  correctedIntermediateCount: number;
  totalIntermediateCount: number;
};

function average(values: readonly number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function computeGrade(
  intermediates: readonly SummativeResult[],
  finalResult: SummativeResult,
): GradeResult {
  const corrected = intermediates.filter(
    (result): result is SummativeResult & { score: number } =>
      result.status === "corrected" && result.score !== null,
  );
  const hasPendingIntermediate = intermediates.some((result) => result.status === "pending");
  const intermediateAverage = average(corrected.map((result) => result.score));

  const finalCorrected = finalResult.status === "corrected" && finalResult.score !== null;
  const finalScore = finalResult.score ?? 0;

  let noteOn20: number | null;
  if (finalCorrected && intermediateAverage !== null) {
    noteOn20 = (intermediateAverage * INTERMEDIATE_WEIGHT + finalScore * FINAL_WEIGHT) * 20;
  } else if (finalCorrected) {
    noteOn20 = finalScore * 20;
  } else if (intermediateAverage !== null) {
    noteOn20 = intermediateAverage * 20;
  } else {
    noteOn20 = null;
  }

  return {
    noteOn20,
    provisional: hasPendingIntermediate || finalResult.status !== "corrected",
    correctedIntermediateCount: corrected.length,
    totalIntermediateCount: intermediates.length,
  };
}

/** Affichage recommandé au demi-point (docs/SPEC.md § 27), calcul interne inchangé. */
export function roundToHalfPoint(note: number): number {
  return Math.round(note * 2) / 2;
}
