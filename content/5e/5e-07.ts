import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";

/**
 * 5E-07 : Le chantier doit fonctionner avec la ville (docs/SEANCES_5E.md,
 * ÉTAPE 9). Statut RECOMMANDÉE, compétences C2, C7, évaluation formative.
 */
export const MISSION_5E_07 = {
  id: "5E-07",
  objectifs: [
    "Organise une zone de chantier : accès engins, passage des personnes, stockage, zone interdite, sécurité.",
    "Justifie chaque zone par une contrainte de sécurité ou de circulation.",
  ],
  problematique: "Comment faire travailler les engins sans empêcher complètement les autres usages ?",
  consigneSimulation: "Associe chaque situation du Quartier des Ateliers à la zone qui lui correspond.",
} as const;

export const ASSOCIATION_5E_07_CHOICES: readonly AssociationChoice[] = [
  { id: "acces-engins", label: "Accès engins" },
  { id: "passage-personnes", label: "Passage des personnes" },
  { id: "zone-stockage", label: "Zone de stockage" },
  { id: "zone-interdite", label: "Zone interdite" },
  { id: "zone-securite", label: "Zone de sécurité (équipements obligatoires)" },
];

export const ASSOCIATION_5E_07_ITEMS: readonly AssociationItem[] = [
  {
    id: "circulation-engins",
    prompt: "Une pelle doit pouvoir circuler et manœuvrer sans obstacle.",
    correctChoiceId: "acces-engins",
  },
  {
    id: "circulation-pietons",
    prompt: "Les ouvriers doivent pouvoir se déplacer à pied sans croiser les engins.",
    correctChoiceId: "passage-personnes",
  },
  {
    id: "materiaux",
    prompt: "Les matériaux livrés attendent d’être utilisés.",
    correctChoiceId: "zone-stockage",
  },
  {
    id: "manoeuvre-danger",
    prompt: "Personne ne doit s’approcher pendant une manœuvre dangereuse de la grue.",
    correctChoiceId: "zone-interdite",
  },
  {
    id: "equipements",
    prompt: "Toute personne présente doit porter casque et gilet avant d’entrer.",
    correctChoiceId: "zone-securite",
  },
];

export const ASSOCIATION_5E_07_HINTS: readonly string[] = [
  "Repense à qui, ou à quoi, doit se trouver dans chaque zone : personnes, engins, matériaux.",
  "Une zone interdite protège d’un danger précis, comme une manœuvre en cours.",
  "Il ne reste qu’une seule zone possible pour chaque situation.",
];

export const MISSION_5E_07_TRACE = {
  title: "Plan annoté du chantier",
  prompt:
    "Recopie le plan du Quartier des Ateliers et légende chaque zone que tu as définie, avec une justification courte pour chacune.",
} as const;

export const MISSION_5E_07_BILAN =
  "Tu as organisé un chantier en respectant plusieurs contraintes de sécurité et de circulation.";
