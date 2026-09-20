import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";

/**
 * 5E-05 : Matière, énergie, information (docs/SEANCES_5E.md, ÉTAPE 7).
 * Statut ESSENTIELLE, compétence C4. Contient une activité formative
 * (classification MEI) puis une évaluation sommative n° 2 distincte.
 */
export const MISSION_5E_05 = {
  id: "5E-05",
  objectifs: [
    "Distingue ce qui relève de la matière, de l’énergie et de l’information.",
    "Classe des éléments observés sur le chantier selon ces trois familles.",
  ],
  problematique: "Un chantier fait circuler bien plus que des matériaux : quoi exactement ?",
  consigneSimulation: "Classe chaque élément du Quartier des Ateliers dans la bonne famille : matière, énergie ou information.",
  consigneSommative: "Classe maintenant ces nouveaux éléments sans aide, pour ton évaluation.",
} as const;

export const ASSOCIATION_5E_05_CHOICES: readonly AssociationChoice[] = [
  { id: "matiere", label: "Matière" },
  { id: "energie", label: "Énergie" },
  { id: "information", label: "Information" },
];

export const ASSOCIATION_5E_05_ITEMS: readonly AssociationItem[] = [
  { id: "terre", prompt: "La terre creusée par la pelle.", correctChoiceId: "matiere" },
  { id: "gravats", prompt: "Les gravats chargés dans le tombereau.", correctChoiceId: "matiere" },
  { id: "materiaux", prompt: "Les matériaux de construction livrés sur le chantier.", correctChoiceId: "matiere" },
  { id: "carburant", prompt: "Le carburant qui alimente le moteur d’un engin.", correctChoiceId: "energie" },
  { id: "batterie", prompt: "La batterie d’un engin électrique.", correctChoiceId: "energie" },
  { id: "joystick", prompt: "Le joystick utilisé par le conducteur pour commander la pelle.", correctChoiceId: "information" },
  { id: "capteur", prompt: "Le capteur qui signale un obstacle à l’engin.", correctChoiceId: "information" },
];

export const ASSOCIATION_5E_05_HINTS: readonly string[] = [
  "La matière, c’est ce qu’on transporte ou qu’on transforme physiquement.",
  "L’énergie, c’est ce qui fait fonctionner un moteur ou un mécanisme.",
  "L’information, c’est ce qui sert à commander, mesurer ou signaler.",
];

export const MISSION_5E_05_TRACE = {
  title: "Matière, énergie, information",
  prompt: "Complète un tableau à trois colonnes (matière / énergie / information) avec deux exemples de ton choix pour chaque famille.",
} as const;

export const MISSION_5E_05_BILAN =
  "Tu sais maintenant reconnaître ce qui relève de la matière, de l’énergie et de l’information sur un chantier.";

export const ASSOCIATION_5E_05_SOMMATIVE_ITEMS: readonly AssociationItem[] = [
  { id: "mouvement", prompt: "Le mouvement produit par le bras de la pelle.", correctChoiceId: "energie" },
  { id: "calculateur", prompt: "Le calculateur embarqué qui traite les données de l’engin.", correctChoiceId: "information" },
  { id: "signal", prompt: "Le signal sonore de recul de l’engin.", correctChoiceId: "information" },
  { id: "sable", prompt: "Le sable stocké en tas sur le chantier.", correctChoiceId: "matiere" },
];
