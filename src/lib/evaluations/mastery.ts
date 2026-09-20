import type { CompetencyId } from "@content/competencies";
import type { CompetencyProof } from "@/lib/schemas/proof";

/**
 * Niveaux de maîtrise (docs/SPEC.md § 28, algorithme détaillé dans
 * docs/COMPETENCES.md § 5). Les seuils numériques ne sont jamais codés en
 * dur : ils sont fournis en paramètre (venant à terme du `.mctkey`,
 * docs/SPEC.md § 29), avec des valeurs par défaut documentées ici pour le
 * fonctionnement hors `/teacher` (ex. aperçu élève dans « Ma progression »).
 */

export type MasteryLevel = "non-evaluee" | "insuffisante" | "fragile" | "satisfaisante" | "tres-bonne";

export type MasteryThresholds = {
  minAverageForFragile: number;
  minAverageForSatisfaisante: number;
  minAverageForTresBonne: number;
};

export const DEFAULT_MASTERY_THRESHOLDS: MasteryThresholds = {
  minAverageForFragile: 0.4,
  minAverageForSatisfaisante: 0.65,
  minAverageForTresBonne: 0.8,
};

/** Seules preuves sommatives ou de transfert comptent (docs/COMPETENCES.md § 5, règle 1). */
function isEligibleProof(proof: CompetencyProof): boolean {
  return proof.assessmentType === "summative" || proof.assessmentType === "final";
}

/**
 * Détecte une preuve isolée très en retrait par rapport aux autres
 * (docs/COMPETENCES.md § 5, règle 5) : plutôt qu’un écrasement mécanique de
 * la moyenne, on plafonne alors à « Maîtrise fragile » pour laisser un
 * arbitrage humain dans `/teacher`.
 */
function hasDivergentOutlier(scores: readonly number[], gap = 0.35): boolean {
  if (scores.length < 2) return false;
  const min = Math.min(...scores);
  const others = scores.filter((score) => score !== min);
  const othersAverage = others.reduce((sum, score) => sum + score, 0) / others.length;
  return othersAverage - min >= gap;
}

export function computeMasteryLevel(
  proofs: readonly CompetencyProof[],
  competency: CompetencyId,
  thresholds: MasteryThresholds = DEFAULT_MASTERY_THRESHOLDS,
): MasteryLevel {
  const relevant = proofs.filter((proof) => proof.competency === competency && isEligibleProof(proof));

  if (relevant.length === 0) return "non-evaluee";

  const scores = relevant.map((proof) => proof.score);
  const meanScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

  if (relevant.length === 1) {
    return meanScore >= thresholds.minAverageForFragile ? "fragile" : "insuffisante";
  }

  const diverged = hasDivergentOutlier(scores);
  const hasTransferProof = relevant.some((proof) => proof.transfer);

  if (diverged) {
    return meanScore >= thresholds.minAverageForFragile ? "fragile" : "insuffisante";
  }

  if (meanScore >= thresholds.minAverageForTresBonne && hasTransferProof) {
    return "tres-bonne";
  }
  if (meanScore >= thresholds.minAverageForSatisfaisante) {
    return "satisfaisante";
  }
  if (meanScore >= thresholds.minAverageForFragile) {
    return "fragile";
  }
  return "insuffisante";
}
