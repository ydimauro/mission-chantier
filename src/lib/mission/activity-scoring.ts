/**
 * Correction immédiate des activités formatives d’association, de
 * classement et de remise en ordre (docs/PEDAGOGIE.md § 7.4, boucle
 * ERREUR → FEEDBACK → INDICE → NOUVEL ESSAI). Purement côté élève :
 * n’écrit jamais dans `assessments` (rien à corriger côté professeur).
 */

export type AssociationAnswers = Record<string, string>;

export type AssociationResult = {
  correctCount: number;
  total: number;
  allCorrect: boolean;
  incorrectItemIds: readonly string[];
};

export function scoreAssociation(
  items: readonly { id: string; correctChoiceId: string }[],
  answers: AssociationAnswers,
): AssociationResult {
  const incorrectItemIds = items
    .filter((item) => answers[item.id] !== item.correctChoiceId)
    .map((item) => item.id);

  return {
    correctCount: items.length - incorrectItemIds.length,
    total: items.length,
    allCorrect: incorrectItemIds.length === 0,
    incorrectItemIds,
  };
}

export type SequencingResult = {
  correctCount: number;
  total: number;
  allCorrect: boolean;
};

/**
 * `order` associe chaque identifiant d’étape à la position choisie par
 * l’élève (1, 2, 3...). Correct si elle correspond à sa position dans
 * `correctSequence`.
 */
export function scoreSequencing(
  correctSequence: readonly string[],
  order: Record<string, number>,
): SequencingResult {
  const correctCount = correctSequence.filter(
    (id, index) => order[id] === index + 1,
  ).length;

  return {
    correctCount,
    total: correctSequence.length,
    allCorrect: correctCount === correctSequence.length,
  };
}
