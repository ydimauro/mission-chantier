import type { PrologueContent } from "@/components/mission/PrologueGivorsSeTransforme";

/**
 * 5E-00 : Que se passe-t-il à Givors ? (docs/SEANCES_5E.md, ÉTAPE 6)
 * Statut ESSENTIELLE, ancrage réel, évaluation diagnostique uniquement.
 */
export const MISSION_5E_00_CONTENT: PrologueContent = {
  missionId: "5E-00",
  heroIntro:
    "Tu vas observer un vrai chantier à Givors, puis comprendre comment des objets et des systèmes techniques permettent de transformer la ville.",
  objectifs: [
    "Observe une photographie du centre-ville de Givors.",
    "Identifie ce qui semble se passer.",
    "Réponds à quelques questions courtes.",
  ],
  observeText: "Regarde attentivement la photographie du chantier.",
  diagnosticQuestion: "Que se passe-t-il ici ?",
  diagnosticOptions: [
    { id: "on-demolit", label: "On démolit" },
    { id: "on-construit", label: "On construit" },
    { id: "on-renove", label: "On rénove" },
    { id: "on-amenage", label: "On aménage" },
    { id: "on-deplace-materiaux", label: "On déplace des matériaux" },
    { id: "on-modifie-circulation", label: "On modifie la circulation" },
    { id: "ne-sait-pas", label: "Je ne sais pas encore" },
  ],
  hypotheseText: "Avant d’écrire, réfléchis : que faudrait-il faire pour transformer ce quartier ?",
  problematique: "Comment transforme-t-on une partie d’une ville ?",
  traceEcriteTitle: "Mission Chantier : comment transforme-t-on une partie d’une ville ?",
  traceEcritePrompt:
    "Écris ta réponse personnelle à cette question : à ton avis, quelles étapes sont nécessaires pour transformer ce quartier ?",
  bilanText:
    "Tu as observé un vrai chantier et commencé à réfléchir aux étapes d’une transformation urbaine. On y reviendra à la fin de l’année pour voir ce que tu as appris.",
};
