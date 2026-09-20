import type { ComparisonOption } from "@/components/mission/SommativeChoiceJustified";

/**
 * 5E-04 : Choisir le bon engin (docs/SEANCES_5E.md, ÉTAPE 7). Statut
 * ESSENTIELLE, compétences C2, C3, sommative intermédiaire n° 1.
 */
export const MISSION_5E_04 = {
  id: "5E-04",
  objectifs: [
    "Compare plusieurs engins selon différents critères.",
    "Choisis l’engin le plus adapté à une situation donnée.",
    "Justifie ton choix.",
  ],
  problematique: "Comment choisir un engin quand plusieurs semblent convenir ?",
  consigne:
    "Le Quartier des Ateliers doit évacuer des gravats sur un terrain boueux, jusqu’à un point de collecte éloigné.",
  question: "Quel engin choisis-tu pour cette tâche ?",
} as const;

export const MISSION_5E_04_CRITERIA = ["Masse", "Distance parcourue", "Terrain", "Coût"] as const;

export const MISSION_5E_04_OPTIONS: readonly ComparisonOption[] = [
  {
    id: "pelle",
    label: "Pelle hydraulique",
    criteriaValues: ["12 tonnes", "courte", "tous types", "élevé"],
  },
  {
    id: "tombereau",
    label: "Tombereau",
    criteriaValues: ["9 tonnes", "longue", "tous types (chenilles)", "moyen"],
  },
  {
    id: "camion",
    label: "Camion classique",
    criteriaValues: ["7 tonnes", "longue", "routes uniquement", "faible"],
  },
];

export const MISSION_5E_04_TRACE = {
  title: "Tableau de comparaison et justification",
  prompt:
    "Recopie le tableau de comparaison des trois engins, puis écris une phrase expliquant ton choix.",
} as const;

export const MISSION_5E_04_BILAN =
  "Tu as comparé plusieurs engins selon des critères précis et justifié ton choix. Ton évaluation sera corrigée par ton professeur ou ta professeure.";
