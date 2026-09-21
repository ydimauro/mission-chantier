import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";

export const MISSION_4E_03 = {
  id: "4E-03",
  objectifs: [
    "Fais varier la pression et le débit dans un modèle hydraulique simplifié.",
    "Observe l’effet sur la vitesse du mouvement.",
  ],
  problematique: "Comment un fluide peut-il faire bouger un bras d’acier ?",
  consigne: "Lance deux essais avec des réglages différents, puis réponds à la question d’observation.",
  limits:
    "Cette simulation simplifie notamment le sol, le fluide, les pertes, l’usure, la météo et le comportement réel.",
} as const;

export const ASSOCIATION_4E_03_CHOICES: readonly AssociationChoice[] = [
  { id: "augmente", label: "La vitesse augmente" },
  { id: "diminue", label: "La vitesse diminue" },
  { id: "identique", label: "La vitesse reste identique" },
];

export const ASSOCIATION_4E_03_ITEMS: readonly AssociationItem[] = [
  {
    id: "debit",
    prompt: "À pression égale, le débit augmente. Quel effet observes-tu ?",
    correctChoiceId: "augmente",
  },
];

export const ASSOCIATION_4E_03_HINTS = [
  "Compare deux essais où un seul paramètre change.",
  "Dans ce modèle, pression et débit font varier la vitesse du mouvement.",
] as const;

export const MISSION_4E_03_TRACE = {
  title: "Hydraulique et mouvement",
  prompt: "Recopie la chaîne pompe → fluide → distributeur → vérin → mouvement. Note les réglages de deux essais et écris ce que tu as observé.",
} as const;

export const MISSION_4E_03_BILAN =
  "Tu sais expliquer qualitativement comment la pression et le débit peuvent modifier un mouvement hydraulique.";