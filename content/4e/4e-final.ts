import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";
import type { ComparisonOption } from "@/components/mission/ComparisonTable";
import type { DiagnosticChoice, DiagnosticTest } from "@/components/mission/SommativeDiagnostic";

/**
 * Situation fictive de transfert, différente de Givors et du Quartier des
 * Ateliers. Toutes les caractéristiques sont des valeurs pédagogiques fictives.
 */
export const MISSION_4E_FINAL = {
  id: "4E-FINAL",
  objectifs: [
    "Mobilise tes connaissances dans une situation nouvelle.",
    "Analyse, teste et justifie tes choix techniques.",
  ],
  problematique: "Sur un espace totalement différent, sais-tu mobiliser ce que tu as appris en 4e ?",
  intro:
    "Situation fictive : la halle des Tilleuls doit recevoir une rampe d’accès et un jardin de pluie. Le chantier est proche d’un arrêt de bus et reste ouvert aux personnes à pied.",
  consigneChoix: "Choisis l’engin le plus adapté pour déplacer des dalles près de la halle.",
  choixQuestion: "Quel engin choisis-tu et pourquoi ?",
  consigneContraintes: "Lis chaque contrainte et indique la zone à organiser.",
  consigneDiagnostic: "Réalise deux tests, puis propose une cause et une solution pour le bras qui se déplace trop lentement.",
  consigneSimulation: "Formule une hypothèse, règle le système hydraulique, puis conclus à partir de la mesure obtenue.",
  hypothesisLabel: "Quelle vitesse de mouvement prévois-tu après ton réglage ?",
  conclusionLabel: "Explique ce que montre la simulation et le réglage que tu retiens.",
  traceTitle: "Synthèse de ma démarche de transfert",
  tracePrompt:
    "Dans ton cours, écris quatre phrases : ton choix d’engin, une contrainte de circulation, le test de diagnostic utile et le réglage hydraulique retenu.",
} as const;

export const COMPARISON_4E_FINAL_CRITERIA = ["Charge pédagogique", "Espace", "Précision", "Énergie pédagogique"] as const;

export const COMPARISON_4E_FINAL_OPTIONS: readonly ComparisonOption[] = [
  { id: "mini-grue", label: "Mini-grue", criteriaValues: ["600 kg", "réduit", "élevée", "batterie"] },
  { id: "chariot", label: "Chariot télescopique", criteriaValues: ["1 500 kg", "moyen", "moyenne", "carburant"] },
  { id: "camion-grue", label: "Camion-grue", criteriaValues: ["3 000 kg", "large", "moyenne", "carburant"] },
];

export const ASSOCIATION_4E_FINAL_CONSTRAINT_CHOICES: readonly AssociationChoice[] = [
  { id: "passage", label: "Passage des personnes" },
  { id: "engins", label: "Accès des engins" },
  { id: "interdite", label: "Zone interdite" },
];

export const ASSOCIATION_4E_FINAL_CONSTRAINT_ITEMS: readonly AssociationItem[] = [
  { id: "bus", prompt: "Les personnes rejoignent l’arrêt de bus à pied.", correctChoiceId: "passage" },
  { id: "dalles", prompt: "Les dalles arrivent sur le chantier par camion.", correctChoiceId: "engins" },
  { id: "levage", prompt: "Une charge est levée près de la rampe.", correctChoiceId: "interdite" },
];

export const DIAGNOSTIC_4E_FINAL_TESTS: readonly DiagnosticTest[] = [
  { id: "niveau", label: "Vérifier le niveau de fluide", result: "Le niveau de fluide est suffisant." },
  { id: "debit", label: "Vérifier le débit de la pompe", result: "Le débit mesuré est faible." },
  { id: "commande", label: "Vérifier la commande", result: "La commande transmet bien l’information." },
];

export const DIAGNOSTIC_4E_FINAL_CAUSES: readonly DiagnosticChoice[] = [
  { id: "debit-faible", label: "Débit de pompe trop faible" },
  { id: "fluide-manquant", label: "Niveau de fluide insuffisant" },
];

export const DIAGNOSTIC_4E_FINAL_SOLUTIONS: readonly DiagnosticChoice[] = [
  { id: "regler-debit", label: "Régler le débit de la pompe" },
  { id: "ajouter-fluide", label: "Ajouter du fluide" },
];

export const MISSION_4E_FINAL_BILAN =
  "Ton évaluation finale a été enregistrée. Ton résultat sera disponible après correction par ton professeur ou ta professeure.";
