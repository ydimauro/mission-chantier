import type { ComparisonOption } from "@/components/mission/ComparisonTable";
import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";
import type { EvacuationScenario } from "@/lib/simulation/evacuation";

/**
 * 5E-FINAL : Nouveau chantier (docs/SEANCES_5E.md, ÉTAPE 10). Situation
 * fictive de transfert, volontairement différente de Givors (situation
 * réelle) et du Quartier des Ateliers (simulation pédagogique habituelle) :
 * l’école de Rocheval, ville fictive, n’a jamais été mentionnée ailleurs
 * dans l’application. Évaluation finale sommative et certificative
 * (docs/EVALUATIONS.md § 4.2, 60 % de la note /20), transfert évalué pour
 * C1, C2, C3, C4, C7, C8.
 */
export const MISSION_5E_FINAL = {
  id: "5E-FINAL",
  objectifs: [
    "Réutilise ce que tu as appris sur un chantier nouveau.",
    "Choisis un engin, lis des contraintes, simule une évacuation, puis conclus.",
  ],
  problematique: "Sur un nouveau chantier, sais-tu réutiliser ce que tu as appris ?",
  intro:
    "L’école de Rocheval agrandit sa cour de récréation. Un petit chantier est ouvert pour creuser une tranchée, poser une clôture et évacuer la terre retirée.",
  consigneChoix: "Choisis l’engin le plus adapté pour creuser la tranchée et évacuer la terre.",
  choixQuestion: "Quel engin choisis-tu ?",
  consigneLecture: "Lis chaque situation et indique la zone qui lui correspond.",
  consigneSimulation: "Simule l’évacuation de la terre retirée, puis conclus.",
  hypothesisLabel: "Formule ton hypothèse : combien de temps l’évacuation prendra-t-elle ?",
  conclusionLabel: "Écris ta conclusion : ton hypothèse est-elle confirmée ? Pourquoi ?",
  traceTitle: "Synthèse de ta démarche",
  tracePrompt:
    "Sur ton cahier, écris une phrase qui résume ta démarche sur cette mission : ce que tu as choisi et pourquoi.",
} as const;

export const COMPARISON_5E_FINAL_CRITERIA = ["Masse", "Terrain", "Bruit", "Coût"] as const;

export const COMPARISON_5E_FINAL_OPTIONS: readonly ComparisonOption[] = [
  { id: "mini-pelle", label: "Mini-pelle", criteriaValues: ["3 tonnes", "espace réduit", "moyen", "moyen"] },
  { id: "pelle", label: "Pelle hydraulique", criteriaValues: ["12 tonnes", "tous types", "fort", "élevé"] },
  {
    id: "brouette-motorisee",
    label: "Brouette motorisée",
    criteriaValues: ["0,5 tonne", "espace réduit", "faible", "faible"],
  },
];

export const ASSOCIATION_5E_FINAL_LECTURE_CHOICES: readonly AssociationChoice[] = [
  { id: "acces-engins", label: "Accès engins" },
  { id: "passage-personnes", label: "Passage des personnes" },
  { id: "zone-interdite", label: "Zone interdite" },
];

export const ASSOCIATION_5E_FINAL_LECTURE_ITEMS: readonly AssociationItem[] = [
  {
    id: "c1",
    prompt: "Ce chantier est juste à côté d’une école : les enfants ne doivent jamais s’approcher pendant les travaux.",
    correctChoiceId: "zone-interdite",
  },
  {
    id: "c2",
    prompt: "Les camions doivent pouvoir entrer et sortir sans bloquer la rue.",
    correctChoiceId: "acces-engins",
  },
  {
    id: "c3",
    prompt: "Les enseignants doivent pouvoir se déplacer à pied jusqu’à l’entrée de l’école.",
    correctChoiceId: "passage-personnes",
  },
];

export const SIMULATION_5E_FINAL_SCENARIO: Partial<EvacuationScenario> = {
  volumeM3: 8,
  truckCapacityM3: 4,
  truckCount: 1,
  routeDistanceM: 200,
};

export const MISSION_5E_FINAL_BILAN =
  "Tu as réutilisé, sur un chantier nouveau, ce que tu as appris depuis le début du parcours. Ton évaluation sera corrigée par ton professeur ou ta professeure.";
