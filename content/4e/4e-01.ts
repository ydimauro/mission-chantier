import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";

export const MISSION_4E_01 = {
  id: "4E-01",
  objectifs: [
    "Repère les principaux sous-systèmes d’une pelle hydraulique.",
    "Relie chaque sous-système à son rôle dans l’engin.",
  ],
  problematique: "Comment est organisée une pelle hydraulique à l’intérieur ?",
  consigne: "Choisis le sous-système qui correspond à chaque rôle.",
} as const;

export const ASSOCIATION_4E_01_CHOICES: readonly AssociationChoice[] = [
  { id: "moteur", label: "Moteur" },
  { id: "pompe", label: "Pompe hydraulique" },
  { id: "verin", label: "Vérin" },
  { id: "cabine", label: "Cabine et commandes" },
  { id: "chenilles", label: "Chenilles" },
  { id: "bras", label: "Bras et godet" },
];

export const ASSOCIATION_4E_01_ITEMS: readonly AssociationItem[] = [
  { id: "energie", prompt: "Fournit l’énergie mécanique à l’engin", correctChoiceId: "moteur" },
  { id: "fluide", prompt: "Met le fluide hydraulique sous pression", correctChoiceId: "pompe" },
  { id: "mouvement", prompt: "Transforme la pression du fluide en mouvement", correctChoiceId: "verin" },
  { id: "pilotage", prompt: "Permet à la personne de piloter l’engin", correctChoiceId: "cabine" },
  { id: "deplacement", prompt: "Permettent le déplacement sur le sol", correctChoiceId: "chenilles" },
  { id: "creuser", prompt: "Permet d’atteindre et de déplacer les matériaux", correctChoiceId: "bras" },
];

export const ASSOCIATION_4E_01_HINTS = [
  "Le moteur produit l’énergie mécanique, mais il ne déplace pas directement le bras.",
  "La pompe et le vérin appartiennent à la partie hydraulique de l’engin.",
  "La cabine sert à piloter, les chenilles servent à se déplacer.",
] as const;

export const MISSION_4E_01_TRACE = {
  title: "Les sous-systèmes d’une pelle hydraulique",
  prompt: "Dessine un schéma simple de la pelle et place au moins quatre légendes. Écris ensuite une phrase sur l’évolution des commandes : elles peuvent aujourd’hui associer hydraulique, électronique et assistance.",
} as const;

export const MISSION_4E_01_BILAN =
  "Tu sais repérer plusieurs sous-systèmes et expliquer leur rôle dans une pelle hydraulique.";