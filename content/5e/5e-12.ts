import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";

/**
 * 5E-12 : Mission Quartier des Ateliers (docs/SEANCES_5E.md, ÉTAPE 9).
 * Statut ESSENTIELLE (mission intégrative), compétences C2, C3, C7, C8,
 * évaluation formative sur l’ensemble du parcours de la mission. Combine
 * choix d’engins, organisation de la circulation et simulation
 * d’évacuation (réutilisation de 5E-03/5E-07/5E-08), puis boucle réflexive
 * sur le cours de 5E-00 (non notée).
 */
export const MISSION_5E_12 = {
  id: "5E-12",
  objectifs: [
    "Analyse un besoin d’organisation du chantier.",
    "Choisis les engins nécessaires à une tâche donnée.",
    "Organise la circulation sur le chantier.",
    "Simule l’évacuation des gravats et améliore ton organisation.",
  ],
  problematique: "Peux-tu organiser toi-même une partie du chantier du Quartier des Ateliers ?",
  consigneEngins: "Pour chaque tâche du chantier, choisis l’engin le plus adapté.",
  consigneCirculation: "Organise la circulation : associe chaque situation à la bonne zone.",
  consigneSimulation: "Simule l’évacuation des gravats avec les engins que tu as choisis, puis observe les résultats.",
  syntheseTitle: "Synthèse de ta mission",
  synthesePrompt:
    "Décris dans ton cours : le besoin, les contraintes, tes choix, le résultat de ta simulation et ta justification.",
  reflexionTitle: "Retour sur ton cours de la première séance",
  reflexionPrompt:
    "Ouvre ton cours à la première séance (5E-00). Relis ce que tu avais écrit. Qu’ajouterais-tu aujourd’hui ? Qu’avais-tu oublié ? Cite trois choses que tu comprends mieux maintenant.",
} as const;

export const ASSOCIATION_5E_12_ENGINS_CHOICES: readonly AssociationChoice[] = [
  { id: "pelle", label: "Pelle hydraulique" },
  { id: "tombereau", label: "Tombereau" },
  { id: "grue", label: "Grue" },
];

export const ASSOCIATION_5E_12_ENGINS_ITEMS: readonly AssociationItem[] = [
  { id: "t1", prompt: "Creuser puis charger des gravats.", correctChoiceId: "pelle" },
  { id: "t2", prompt: "Transporter des gravats jusqu’au point de collecte.", correctChoiceId: "tombereau" },
  { id: "t3", prompt: "Soulever une charge en hauteur pour la déposer sur un toit.", correctChoiceId: "grue" },
];

export const ASSOCIATION_5E_12_ENGINS_HINTS: readonly string[] = [
  "Repense à la fonction principale de chaque engin, vue en 5E-03.",
  "Élimine d’abord les engins clairement inadaptés à la tâche.",
  "Il ne reste qu’un seul engin possible pour chaque tâche.",
];

export const ASSOCIATION_5E_12_CIRCULATION_CHOICES: readonly AssociationChoice[] = [
  { id: "acces-engins", label: "Accès engins" },
  { id: "passage-personnes", label: "Passage des personnes" },
  { id: "zone-interdite", label: "Zone interdite" },
];

export const ASSOCIATION_5E_12_CIRCULATION_ITEMS: readonly AssociationItem[] = [
  { id: "c1", prompt: "Chemin réservé aux engins en manœuvre.", correctChoiceId: "acces-engins" },
  { id: "c2", prompt: "Chemin réservé aux ouvriers à pied.", correctChoiceId: "passage-personnes" },
  {
    id: "c3",
    prompt: "Zone dans laquelle personne ne doit entrer pendant les manœuvres.",
    correctChoiceId: "zone-interdite",
  },
];

export const ASSOCIATION_5E_12_CIRCULATION_HINTS: readonly string[] = [
  "Repense à qui, ou à quoi, doit se trouver dans chaque zone, comme en 5E-07.",
  "Une zone interdite protège d’un danger précis, comme une manœuvre en cours.",
  "Il ne reste qu’une seule zone possible pour chaque situation.",
];

export const MISSION_5E_12_BILAN =
  "Tu as mobilisé ce que tu as appris depuis le début du parcours pour organiser une partie du chantier : choix des engins, circulation et simulation.";
