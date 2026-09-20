import type { SequencingStep } from "@/components/mission/SequencingActivity";
import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";

/**
 * 5E-06 : La chaîne d’énergie d’un engin (docs/SEANCES_5E.md, ÉTAPE 7).
 * Statut ESSENTIELLE, compétence C4. Chaîne réduite à six étapes pour
 * limiter la charge cognitive (public REP) ; le vocabulaire omis (fluide,
 * circuit hydraulique, godet) est mentionné dans le texte d’accompagnement.
 */
export const MISSION_5E_06 = {
  id: "5E-06",
  objectifs: [
    "Remets dans l’ordre les étapes de la chaîne d’énergie d’une pelle hydraulique.",
    "Identifie le premier élément à vérifier en cas de panne.",
  ],
  observeText:
    "Le mouvement du bras d’une pelle hydraulique ne vient pas de nulle part : il part d’une source d’énergie et traverse plusieurs éléments avant de devenir un mouvement.",
  problematique: "Comment l’énergie circule-t-elle depuis sa source jusqu’au mouvement du bras ?",
  consigneSimulation: "Remets dans l’ordre les six étapes de la chaîne d’énergie de la pelle hydraulique.",
  panneIntro:
    "Le bras de la pelle ne bouge plus. Un mécanicien vérifie toujours la chaîne d’énergie dans l’ordre, en commençant par le début.",
  panneQuestion: "Quel élément faut-il vérifier en premier ?",
} as const;

export const SEQUENCING_5E_06_STEPS: readonly SequencingStep[] = [
  { id: "source", label: "Source d’énergie" },
  { id: "moteur", label: "Moteur" },
  { id: "pompe", label: "Pompe" },
  { id: "verin", label: "Vérin" },
  { id: "bras", label: "Bras" },
  { id: "mouvement", label: "Mouvement" },
];

export const SEQUENCING_5E_06_CORRECT_ORDER: readonly string[] = [
  "source",
  "moteur",
  "pompe",
  "verin",
  "bras",
  "mouvement",
];

export const SEQUENCING_5E_06_HINTS: readonly string[] = [
  "Tout commence par une source d’énergie, avant même que le moteur ne tourne.",
  "Le mouvement est toujours la toute dernière étape de la chaîne.",
  "Entre le moteur et le bras, l’énergie passe par une pompe puis par un vérin.",
];

export const MISSION_5E_06_TRACE = {
  title: "La chaîne d’énergie",
  prompt:
    "Recopie le schéma de la chaîne d’énergie en six étapes (source d’énergie → moteur → pompe → vérin → bras → mouvement) et entoure l’élément qui transforme l’énergie en mouvement.",
} as const;

export const MISSION_5E_06_BILAN =
  "Tu sais reconstituer la chaîne d’énergie d’un engin, de la source d’énergie jusqu’au mouvement.";

export const ASSOCIATION_5E_06_PANNE_CHOICES: readonly AssociationChoice[] = [
  { id: "source", label: "Source d’énergie" },
  { id: "pompe", label: "Pompe" },
  { id: "verin", label: "Vérin" },
];

export const ASSOCIATION_5E_06_PANNE_ITEMS: readonly AssociationItem[] = [
  { id: "diagnostic", prompt: "Le bras ne bouge plus. Quel élément vérifier en premier ?", correctChoiceId: "source" },
];

export const ASSOCIATION_5E_06_PANNE_HINTS: readonly string[] = [
  "En panne, on vérifie toujours la chaîne depuis son tout début.",
  "Sans source d’énergie, rien ne peut fonctionner en aval.",
];
