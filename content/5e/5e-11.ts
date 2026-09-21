import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";
import type { ComparisonOption } from "@/components/mission/ComparisonTable";

/**
 * 5E-11 : Comparer plusieurs solutions techniques (docs/SEANCES_5E.md,
 * ÉTAPE 9). Statut ESSENTIELLE, compétences C1, C3, C8, évaluation
 * formative. Toutes les valeurs du tableau sont pédagogiques fictives
 * (docs/SPEC.md § 52) : aucune citation n’est fournie à `Source`.
 */
export const MISSION_5E_11 = {
  id: "5E-11",
  objectifs: [
    "Compare un engin thermique, un engin hybride et un engin électrique.",
    "Comprends qu’il n’existe pas toujours une solution meilleure sur tous les critères.",
  ],
  problematique: "Existe-t-il un engin meilleur que les autres sur tous les critères ?",
  consigneSimulation: "Lis le tableau comparatif ci-dessous, puis réponds aux questions.",
} as const;

export const COMPARISON_5E_11_CRITERIA = [
  "Autonomie",
  "Énergie",
  "Bruit",
  "Émissions locales",
  "Durée d’utilisation",
  "Coût",
  "Recharge",
  "Contraintes d’usage",
] as const;

export const COMPARISON_5E_11_OPTIONS: readonly ComparisonOption[] = [
  {
    id: "thermique",
    label: "Engin thermique",
    criteriaValues: ["Élevée", "Carburant", "Fort", "Élevées", "Longue", "Moyen", "Aucune", "Aucune restriction"],
  },
  {
    id: "hybride",
    label: "Engin hybride",
    criteriaValues: [
      "Moyenne",
      "Carburant + électricité",
      "Moyen",
      "Moyennes",
      "Longue",
      "Élevé",
      "Occasionnelle",
      "Peu de restrictions",
    ],
  },
  {
    id: "electrique",
    label: "Engin électrique",
    criteriaValues: [
      "Faible",
      "Électricité",
      "Faible",
      "Nulles (locales)",
      "Courte",
      "Élevé",
      "Fréquente",
      "Zone avec prise nécessaire",
    ],
  },
];

export const ASSOCIATION_5E_11_CHOICES: readonly AssociationChoice[] = [
  { id: "thermique", label: "Thermique" },
  { id: "hybride", label: "Hybride" },
  { id: "electrique", label: "Électrique" },
];

export const ASSOCIATION_5E_11_ITEMS: readonly AssociationItem[] = [
  { id: "q1", prompt: "Quel engin a la plus grande autonomie ?", correctChoiceId: "thermique" },
  { id: "q2", prompt: "Quel engin ne produit aucune émission locale ?", correctChoiceId: "electrique" },
  { id: "q3", prompt: "Quel engin est le plus silencieux ?", correctChoiceId: "electrique" },
  { id: "q4", prompt: "Quel engin a besoin d’une recharge fréquente ?", correctChoiceId: "electrique" },
];

export const ASSOCIATION_5E_11_HINTS: readonly string[] = [
  "Lis une seule colonne à la fois dans le tableau.",
  "Compare les trois valeurs de la ligne du critère demandé.",
  "Une seule ligne du tableau contient la réponse à chaque question.",
];

export const MISSION_5E_11_TRACE = {
  title: "Tableau comparatif et conclusion",
  prompt:
    "Recopie le tableau comparatif rempli, puis écris une phrase de conclusion : « Il n’existe pas toujours une solution meilleure sur tous les critères. »",
} as const;

export const MISSION_5E_11_BILAN =
  "Tu as comparé trois solutions techniques selon plusieurs critères : aucune n’est la meilleure sur tous les points.";
