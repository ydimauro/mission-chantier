import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";

/**
 * 5E-01 : Pourquoi utilise-t-on des objets techniques sur un chantier ?
 * (docs/SEANCES_5E.md, ÉTAPE 7). Statut ESSENTIELLE, compétences C1, C2,
 * évaluation formative.
 */
export const MISSION_5E_01 = {
  id: "5E-01",
  heroIntro:
    "Sur le chantier de Givors, chaque objet technique répond à un besoin précis : creuser, transporter, protéger, soulever.",
  objectifs: [
    "Identifie des besoins présents sur un chantier.",
    "Associe chaque besoin à l’objet technique qui y répond.",
    "Repère une contrainte pour chaque situation.",
  ],
  observeText:
    "Observe à nouveau la photographie du chantier de Givors : quels besoins peux-tu deviner ?",
  problematique: "À quels besoins les objets techniques du chantier répondent-ils ?",
  consigneSimulation:
    "Dans le Quartier des Ateliers, associe chaque besoin à l’objet technique qui y répond.",
} as const;

export const ASSOCIATION_5E_01_CHOICES: readonly AssociationChoice[] = [
  { id: "pelle", label: "Pelle hydraulique" },
  { id: "tombereau", label: "Tombereau" },
  { id: "casque", label: "Casque de chantier" },
  { id: "grue", label: "Grue" },
];

export const ASSOCIATION_5E_01_ITEMS: readonly AssociationItem[] = [
  { id: "creuser", prompt: "Il faut creuser un trou dans le sol.", correctChoiceId: "pelle" },
  { id: "transporter", prompt: "Il faut transporter des gravats.", correctChoiceId: "tombereau" },
  { id: "proteger", prompt: "Il faut protéger la tête des ouvriers.", correctChoiceId: "casque" },
  { id: "soulever", prompt: "Il faut soulever une charge en hauteur.", correctChoiceId: "grue" },
];

export const ASSOCIATION_5E_01_HINTS: readonly string[] = [
  "Repense à ce que fait chaque objet technique dans la vie de tous les jours.",
  "Élimine d’abord les objets qui ne peuvent clairement pas répondre au besoin.",
  "Il ne reste qu’un seul objet technique possible pour chaque besoin.",
];

export const MISSION_5E_01_TRACE = {
  title: "Besoin, utilisateur, objet technique et contrainte",
  prompt:
    "Complète un tableau à quatre colonnes (besoin / utilisateur / objet ou système technique / contrainte) pour les quatre situations de la mission.",
} as const;

export const MISSION_5E_01_BILAN =
  "Tu as identifié des besoins de chantier et les objets techniques qui y répondent. Chaque objet existe pour une raison précise.";
