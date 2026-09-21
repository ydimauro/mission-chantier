import type { PrologueContent } from "@/components/mission/PrologueGivorsSeTransforme";
import { CHANTIER_ENGIN } from "@content/givors/media";

/**
 * 4E-00 : Retour sur le chantier (docs/SEANCES_4E.md, ÉTAPE 6)
 * Statut ESSENTIELLE, ancrage réel, évaluation diagnostique uniquement.
 * Réutilise le même prologue que 5E-00, avec une scénarisation différente
 * orientée système technique (docs/SEANCES_4E.md).
 */
export const MISSION_4E_00_CONTENT: PrologueContent = {
  missionId: "4E-00",
  media: CHANTIER_ENGIN,
  heroIntro:
    "Tu vas retrouver un chantier à Givors, cette fois pour repérer les systèmes techniques qui permettent ces transformations.",
  objectifs: [
    "Observe une photographie du centre-ville de Givors.",
    "Repère les systèmes techniques à l’œuvre.",
    "Réponds à quelques questions courtes.",
  ],
  observeText: "Regarde attentivement la photographie du chantier.",
  diagnosticQuestion: "D’après toi, quels systèmes techniques interviennent sur ce chantier ?",
  diagnosticOptions: [
    { id: "engins-terrassement", label: "Des engins de terrassement" },
    { id: "systemes-hydrauliques", label: "Des systèmes hydrauliques" },
    { id: "capteurs-securite", label: "Des capteurs de sécurité" },
    { id: "transport-materiaux", label: "Des systèmes de transport de matériaux" },
    { id: "ne-sait-pas", label: "Je ne sais pas encore" },
  ],
  hypotheseText:
    "Avant d’écrire, réfléchis : quels systèmes techniques permettent de réaliser ces transformations ?",
  problematique: "Quels systèmes techniques permettent de réaliser les transformations que tu observes ?",
  traceEcriteTitle: "Retour sur le chantier",
  traceEcritePrompt:
    "Écris ta réponse personnelle à cette question : quels systèmes techniques permettent de réaliser les transformations que tu observes ?",
  bilanText:
    "Tu as observé un chantier et commencé à repérer les systèmes techniques en jeu. On y reviendra à la fin de l’année pour voir ce que tu as appris.",
};
