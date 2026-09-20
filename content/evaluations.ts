/**
 * Libellés fixes du moteur d’évaluation (ÉTAPE 4, docs/SPEC.md § 21-30).
 * Aucun énoncé de question ici : uniquement les messages génériques que le
 * cahier des charges impose mot pour mot.
 */

export const DIAGNOSTIC_NOTICE =
  "Cette activité sert à savoir ce que tu connais déjà. Elle ne compte pas dans ta note.";

export const SOMMATIVE_SUBMITTED_NOTICE =
  "Évaluation enregistrée. Ton résultat sera disponible après correction.";

export const NOTE_NON_PASSEE = "Non passée";

export const NOTE_PROVISOIRE = "Note provisoire";

export const NOTE_NON_CALCULABLE = "Note non calculable pour le moment";

export const MASTERY_LEVEL_LABELS = {
  "non-evaluee": "Non évaluée",
  insuffisante: "Maîtrise insuffisante",
  fragile: "Maîtrise fragile",
  satisfaisante: "Maîtrise satisfaisante",
  "tres-bonne": "Très bonne maîtrise",
} as const;
