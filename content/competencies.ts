/**
 * Catalogue des compétences C1 à C9 (docs/COMPETENCES.md § 1). Donnée de
 * référence partagée par le moteur d’évaluation (preuves, maîtrise) et par
 * l’espace professeur (à partir de l’ÉTAPE 5). Aucun contenu de mission ici.
 */

export const COMPETENCY_IDS = [
  "C1",
  "C2",
  "C3",
  "C4",
  "C5",
  "C6",
  "C7",
  "C8",
  "C9",
] as const;

export type CompetencyId = (typeof COMPETENCY_IDS)[number];

export type Competency = {
  id: CompetencyId;
  title: string;
};

export const COMPETENCIES: readonly Competency[] = [
  {
    id: "C1",
    title: "Décrire les liens entre usages et évolutions technologiques des objets et systèmes techniques.",
  },
  {
    id: "C2",
    title: "Décrire les interactions entre un objet ou système technique, son environnement et les utilisateurs.",
  },
  { id: "C3", title: "Caractériser et choisir un objet ou système technique selon différents critères." },
  {
    id: "C4",
    title:
      "Décrire et caractériser l’organisation interne d’un objet ou système technique et ses échanges avec son environnement, notamment les énergies et les données.",
  },
  { id: "C5", title: "Identifier un dysfonctionnement d’un objet technique et y remédier." },
  {
    id: "C6",
    title: "Comprendre et modifier un programme associé à une fonctionnalité d’un objet ou système technique.",
  },
  {
    id: "C7",
    title: "Imaginer, concevoir et réaliser une ou plusieurs solutions répondant à un besoin ou à des exigences.",
  },
  { id: "C8", title: "Valider des solutions techniques par des simulations ou des protocoles de tests." },
  { id: "C9", title: "Concevoir, écrire, tester et mettre au point un programme." },
];
