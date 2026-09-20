import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";

/**
 * 5E-03 : Quel engin pour quelle tâche ? (docs/SEANCES_5E.md, ÉTAPE 7).
 * Statut ESSENTIELLE, compétence C3, évaluation formative.
 */
export const MISSION_5E_03 = {
  id: "5E-03",
  objectifs: [
    "Découvre sept engins de chantier courants.",
    "Associe chaque engin à sa fonction principale.",
  ],
  problematique: "Comment reconnaître le bon engin pour une tâche donnée ?",
  consigneSimulation: "Associe chaque fonction à l’engin du Quartier des Ateliers qui la réalise.",
} as const;

export const ASSOCIATION_5E_03_CHOICES: readonly AssociationChoice[] = [
  { id: "pelle", label: "Pelle hydraulique" },
  { id: "bulldozer", label: "Bulldozer" },
  { id: "chargeuse", label: "Chargeuse" },
  { id: "tombereau", label: "Tombereau" },
  { id: "grue", label: "Grue" },
  { id: "compacteur", label: "Compacteur" },
  { id: "telescopique", label: "Télescopique" },
];

export const ASSOCIATION_5E_03_ITEMS: readonly AssociationItem[] = [
  { id: "f1", prompt: "Creuser et charger la terre.", correctChoiceId: "pelle" },
  { id: "f2", prompt: "Pousser de gros volumes de terre au sol.", correctChoiceId: "bulldozer" },
  {
    id: "f3",
    prompt: "Charger des matériaux et les déplacer sur de courtes distances.",
    correctChoiceId: "chargeuse",
  },
  { id: "f4", prompt: "Transporter des matériaux sur route.", correctChoiceId: "tombereau" },
  { id: "f5", prompt: "Soulever des charges en hauteur.", correctChoiceId: "grue" },
  { id: "f6", prompt: "Tasser et stabiliser le sol.", correctChoiceId: "compacteur" },
  {
    id: "f7",
    prompt: "Accéder à un point en hauteur avec du matériel.",
    correctChoiceId: "telescopique",
  },
];

export const ASSOCIATION_5E_03_HINTS: readonly string[] = [
  "Repense à la forme de chaque engin : un godet, une pelle plate, une flèche...",
  "Élimine d’abord les engins clairement destinés à une autre tâche.",
  "Il ne reste que deux ou trois engins possibles pour chaque fonction.",
];

export const MISSION_5E_03_TRACE = {
  title: "Les fonctions principales des engins",
  prompt: "Complète un tableau à deux colonnes (engin / fonction principale) pour les sept engins vus dans la mission.",
} as const;

export const MISSION_5E_03_BILAN =
  "Tu connais maintenant sept engins de chantier et leur fonction principale.";
