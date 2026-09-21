import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";
import type { ComparisonOption } from "@/components/mission/ComparisonTable";

export const MISSION_4E_09 = { id: "4E-09", objectifs: ["Compare plusieurs solutions selon des critères.", "Explique pourquoi une solution n’est pas parfaite sur tous les critères."], problematique: "Une solution technique peut-elle être parfaite sur tous les critères ?", consigne: "Lis le tableau, puis associe chaque constat à la solution concernée." } as const;
export const COMPARISON_4E_09_CRITERIA = ["Énergie", "Bruit", "Autonomie", "Émissions locales", "Temps de recharge", "Coût pédagogique"] as const;
export const COMPARISON_4E_09_OPTIONS: readonly ComparisonOption[] = [
  { id: "thermique", label: "Engin thermique", criteriaValues: ["Carburant", "Élevé", "Longue", "Élevées", "Aucun", "Moyen"] },
  { id: "hybride", label: "Engin hybride", criteriaValues: ["Carburant + batterie", "Moyen", "Longue", "Moyennes", "Court", "Élevé"] },
  { id: "electrique", label: "Engin électrique", criteriaValues: ["Batterie", "Faible", "Courte", "Faibles", "Long", "Élevé"] },
];
export const ASSOCIATION_4E_09_CHOICES: readonly AssociationChoice[] = [{ id: "thermique", label: "Engin thermique" }, { id: "hybride", label: "Engin hybride" }, { id: "electrique", label: "Engin électrique" }];
export const ASSOCIATION_4E_09_ITEMS: readonly AssociationItem[] = [{ id: "silence", prompt: "Produit le moins de bruit", correctChoiceId: "electrique" }, { id: "autonomie", prompt: "A la plus longue autonomie", correctChoiceId: "thermique" }, { id: "compromis", prompt: "Propose un compromis entre deux sources d’énergie", correctChoiceId: "hybride" }];
export const ASSOCIATION_4E_09_HINTS = ["Lis un critère à la fois.", "Un compromis n’est pas une solution parfaite."] as const;
export const MISSION_4E_09_TRACE = { title: "Performance et compromis", prompt: "Recopie un tableau de comparaison réduit. Écris une phrase nuancée : une solution est avantageuse sur un critère mais moins adaptée sur un autre." } as const;
export const MISSION_4E_09_BILAN = "Tu sais comparer des solutions techniques sans chercher une solution parfaite sur tous les critères.";