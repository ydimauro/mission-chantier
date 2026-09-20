import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";

/**
 * 5E-02 : Démolir, conserver, transporter, aménager (docs/SEANCES_5E.md,
 * ÉTAPE 7). Statut RECOMMANDÉE, compétences C1, C2, C3, évaluation formative.
 */
export const MISSION_5E_02 = {
  id: "5E-02",
  objectifs: [
    "Distingue démolir, conserver, rénover, transporter, reconstruire et aménager.",
    "Associe chaque situation à la bonne catégorie d’action.",
  ],
  problematique: "Transformer un quartier signifie-t-il tout détruire ?",
  consigneSimulation: "Classe chaque situation du Quartier des Ateliers selon l’action réalisée.",
} as const;

export const ASSOCIATION_5E_02_CHOICES: readonly AssociationChoice[] = [
  { id: "demolir", label: "Démolir" },
  { id: "conserver", label: "Conserver" },
  { id: "renover", label: "Rénover" },
  { id: "transporter", label: "Transporter" },
  { id: "reconstruire", label: "Reconstruire" },
  { id: "amenager", label: "Aménager" },
];

export const ASSOCIATION_5E_02_ITEMS: readonly AssociationItem[] = [
  { id: "s1", prompt: "Un vieux bâtiment abîmé est mis à terre.", correctChoiceId: "demolir" },
  {
    id: "s2",
    prompt: "Un bâtiment historique est protégé et laissé tel quel.",
    correctChoiceId: "conserver",
  },
  { id: "s3", prompt: "Une façade ancienne est repeinte et réparée.", correctChoiceId: "renover" },
  { id: "s4", prompt: "Des gravats sont emmenés en camion.", correctChoiceId: "transporter" },
  {
    id: "s5",
    prompt: "Un nouveau bâtiment est construit à la place de l’ancien.",
    correctChoiceId: "reconstruire",
  },
  {
    id: "s6",
    prompt: "Un espace vert est créé devant les immeubles.",
    correctChoiceId: "amenager",
  },
];

export const ASSOCIATION_5E_02_HINTS: readonly string[] = [
  "Demande-toi si le bâtiment disparaît, reste, ou change juste d’aspect.",
  "« Transporter » concerne un déplacement de matériaux, pas une transformation de bâtiment.",
  "Il reste au plus deux catégories possibles pour chaque situation.",
];

export const MISSION_5E_02_TRACE = {
  title: "Besoin, fonction et solution",
  prompt: "Complète un tableau à trois colonnes (besoin / fonction / solution) pour deux situations de ton choix.",
} as const;

export const MISSION_5E_02_BILAN =
  "Tu as vu que transformer un quartier ne veut pas toujours dire détruire : on peut aussi conserver, rénover ou aménager.";
