import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";

/**
 * 5E-09 : L’engin peut-il détecter un obstacle ? (docs/SEANCES_5E.md,
 * ÉTAPE 9). Statut ESSENTIELLE, compétences C4, C6, introduction à C9,
 * évaluation formative.
 */
export const MISSION_5E_09 = {
  id: "5E-09",
  objectifs: [
    "Découvre la chaîne capteur → information → traitement → action.",
    "Lis un petit programme puis prédis l’effet d’un changement de seuil.",
  ],
  problematique: "Comment un engin détecte-t-il un obstacle derrière lui ?",
  programLines: ["SI distance du capteur < 2 m", "ALORS arrêter"] as const,
  observationIntro: "Modifie le seuil du capteur et observe l’effet pour une distance mesurée de 2,5 m.",
  observationThresholdLabel: "Seuil du capteur",
  observationButton: "Voir l’effet",
  observationOutcomeTriggered: "À 2,5 m, l’engin s’arrête.",
  observationOutcomeNotTriggered: "À 2,5 m, l’engin ne s’arrête pas.",
} as const;

export const OBSERVATION_5E_09_THRESHOLDS = [
  { id: "2m", label: "2 m", valueM: 2 },
  { id: "3m", label: "3 m", valueM: 3 },
] as const;

export const OBSERVATION_5E_09_DISTANCE_M = 2.5;

export const ASSOCIATION_5E_09_CHOICES: readonly AssociationChoice[] = [
  { id: "plus-tot", label: "Il s’arrête plus tôt (à une distance plus grande)." },
  { id: "plus-tard", label: "Il s’arrête plus tard (à une distance plus petite)." },
  { id: "rien", label: "Rien ne change." },
];

export const ASSOCIATION_5E_09_ITEMS: readonly AssociationItem[] = [
  {
    id: "prediction",
    prompt: "Le seuil passe de 2 m à 3 m. Que se passe-t-il pour l’engin ?",
    correctChoiceId: "plus-tot",
  },
];

export const ASSOCIATION_5E_09_HINTS: readonly string[] = [
  "Repense au rôle du capteur : il compare une distance mesurée à un seuil.",
  "Un seuil plus grand déclenche l’arrêt dès qu’un obstacle est un peu plus loin.",
  "Avec un seuil de 3 m, l’engin réagit dès que l’obstacle est à moins de 3 m, donc plus tôt qu’avec un seuil de 2 m.",
];

export const MISSION_5E_09_TRACE = {
  title: "Capteur, information, traitement, action",
  prompt: "Recopie le schéma capteur → information → traitement → action, avec le programme modifié (seuil à 3 m).",
} as const;

export const MISSION_5E_09_BILAN =
  "Tu as lu un programme simple et prédit correctement l’effet d’un changement de seuil sur un capteur.";
