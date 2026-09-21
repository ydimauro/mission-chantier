import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";

export const MISSION_4E_04 = {
  id: "4E-04",
  objectifs: [
    "Construis la chaîne d’information d’une sécurité de proximité.",
    "Lis l’effet d’une condition simple sur l’action de l’engin.",
  ],
  problematique: "Comment une information devient-elle une action de l’engin ?",
  consigne: "Associe chaque étape de la chaîne d’information à son composant.",
  programme:
    "SI la distance mesurée est inférieure au seuil, ALORS le calculateur commande l’arrêt du déplacement.",
} as const;

export const ASSOCIATION_4E_04_CHOICES: readonly AssociationChoice[] = [
  { id: "capteur", label: "Capteur de proximité" },
  { id: "signal", label: "Signal électrique" },
  { id: "calculateur", label: "Calculateur" },
  { id: "commande", label: "Commande vers l’actionneur" },
  { id: "verin", label: "Vérin ou moteur" },
];

export const ASSOCIATION_4E_04_ITEMS: readonly AssociationItem[] = [
  { id: "capter", prompt: "Capter", correctChoiceId: "capteur" },
  { id: "acquerir", prompt: "Acquérir", correctChoiceId: "signal" },
  { id: "traiter", prompt: "Traiter", correctChoiceId: "calculateur" },
  { id: "commander", prompt: "Commander", correctChoiceId: "commande" },
  { id: "agir", prompt: "Agir", correctChoiceId: "verin" },
];

export const ASSOCIATION_4E_04_HINTS = [
  "Le capteur détecte, le calculateur traite l’information.",
  "Une commande transporte l’information vers un élément qui agit.",
] as const;

export const MISSION_4E_04_TRACE = {
  title: "La chaîne d’information",
  prompt: "Recopie la chaîne capter → acquérir → traiter → commander → agir. Ajoute un composant pour chaque étape et souligne la condition du programme étudié.",
} as const;

export const MISSION_4E_04_BILAN =
  "Tu sais expliquer comment une information issue d’un capteur peut conduire à une action de sécurité.";