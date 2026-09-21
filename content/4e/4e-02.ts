import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";

export const MISSION_4E_02 = {
  id: "4E-02",
  objectifs: [
    "Construis une chaîne d’énergie complète.",
    "Associe chaque fonction à un composant de la pelle hydraulique.",
  ],
  problematique: "Comment l’énergie circule-t-elle jusqu’au mouvement de l’engin ?",
  consigne: "Pour chaque fonction, choisis le composant qui réalise cette fonction dans la pelle.",
} as const;

export const ASSOCIATION_4E_02_CHOICES: readonly AssociationChoice[] = [
  { id: "reservoir", label: "Réservoir de carburant" },
  { id: "distributeur", label: "Distributeur hydraulique" },
  { id: "moteur", label: "Moteur thermique" },
  { id: "flexibles", label: "Flexibles hydrauliques" },
  { id: "verin", label: "Vérin du bras" },
];

export const ASSOCIATION_4E_02_ITEMS: readonly AssociationItem[] = [
  { id: "alimenter", prompt: "Alimenter", correctChoiceId: "reservoir" },
  { id: "distribuer", prompt: "Distribuer", correctChoiceId: "distributeur" },
  { id: "convertir", prompt: "Convertir", correctChoiceId: "moteur" },
  { id: "transmettre", prompt: "Transmettre", correctChoiceId: "flexibles" },
  { id: "agir", prompt: "Agir", correctChoiceId: "verin" },
];

export const MISSION_4E_02_TRACE = {
  title: "La chaîne d’énergie complète",
  prompt: "Recopie les cinq fonctions dans l’ordre : alimenter → distribuer → convertir → transmettre → agir. Ajoute en face le composant associé de la pelle hydraulique.",
} as const;

export const MISSION_4E_02_BILAN =
  "Ta chaîne d’énergie a été enregistrée. Elle sera corrigée par le professeur ou la professeure.";