/**
 * 5E-08 : Comment évacuer les gravats ? (docs/SEANCES_5E.md, ÉTAPE 9).
 * Statut ESSENTIELLE, compétences C3, C8, sommative intermédiaire n° 3.
 * Réutilise le moteur de simulation de l’ÉTAPE 8 (EvacuationSimulation).
 */
export const MISSION_5E_08 = {
  id: "5E-08",
  objectifs: [
    "Formule une hypothèse sur l’organisation la plus efficace.",
    "Lance la simulation, mesure les résultats, ajuste si besoin.",
    "Rédige une conclusion cohérente avec le résultat mesuré.",
  ],
  problematique: "Quelle organisation permet d’évacuer les gravats le plus efficacement ?",
  consigne: "Choisis un nombre d’engins et des paramètres de trajet, puis lance la simulation autant de fois que nécessaire.",
  hypothesisLabel: "Formule ton hypothèse : quelle organisation permettra d’évacuer les gravats le plus efficacement ?",
  conclusionLabel: "Écris ta conclusion : ton hypothèse est-elle confirmée ? Pourquoi ?",
} as const;

export const MISSION_5E_08_TRACE = {
  title: "Hypothèse, résultat, conclusion",
  prompt: "Recopie ton hypothèse, le résultat de ta simulation (mesures) et ta conclusion.",
} as const;

export const MISSION_5E_08_BILAN =
  "Tu as testé une organisation d’évacuation de gravats, mesuré ses résultats et rédigé une conclusion. Ton évaluation sera corrigée par ton professeur ou ta professeure.";
