import type {
  BlockProgramActionOption,
  BlockProgramComparatorOption,
  BlockProgramScenario,
  BlockProgramThresholdOption,
} from "@/components/mission/SommativeBlockProgram";

/**
 * 5E-10 : Programmer une sécurité simple (docs/SEANCES_5E.md, ÉTAPE 9).
 * Statut ESSENTIELLE, compétences C6, C9, sommative intermédiaire n° 4.
 *
 * Les choix sont intégrés dans des pseudo-blocs accessibles au clavier.
 * Cette mission garde une logique condition + action, testée sur plusieurs
 * scénarios, dans l’environnement partagé livré à l’ÉTAPE 12.
 */
export const MISSION_5E_10 = {
  id: "5E-10",
  objectifs: [
    "Construis un programme de sécurité à partir d’une condition et d’une action.",
    "Teste ton programme sur plusieurs scénarios avant de le remettre.",
  ],
  problematique: "Peux-tu programmer toi-même une sécurité simple pour un engin ?",
  consigne:
    "Choisis une condition sur la distance mesurée par le capteur arrière et l’action à déclencher, puis teste ton programme sur les trois scénarios.",
} as const;

export const BLOCK_PROGRAM_5E_10_COMPARATORS: readonly BlockProgramComparatorOption[] = [
  { id: "<", label: "inférieure à" },
  { id: "<=", label: "inférieure ou égale à" },
  { id: ">", label: "supérieure à" },
  { id: ">=", label: "supérieure ou égale à" },
];

export const BLOCK_PROGRAM_5E_10_THRESHOLDS: readonly BlockProgramThresholdOption[] = [
  { id: "1m", label: "1 m", valueM: 1 },
  { id: "2m", label: "2 m", valueM: 2 },
  { id: "3m", label: "3 m", valueM: 3 },
  { id: "4m", label: "4 m", valueM: 4 },
];

export const BLOCK_PROGRAM_5E_10_ACTIONS: readonly BlockProgramActionOption[] = [
  { id: "arreter", label: "Arrêter l’engin" },
  { id: "ralentir", label: "Ralentir l’engin" },
  { id: "avertir", label: "Déclencher une alerte sonore" },
];

export const BLOCK_PROGRAM_5E_10_SCENARIOS: readonly BlockProgramScenario[] = [
  { id: "s1", label: "Scénario 1", distanceM: 1 },
  { id: "s2", label: "Scénario 2", distanceM: 2.5 },
  { id: "s3", label: "Scénario 3", distanceM: 4 },
];

export const MISSION_5E_10_TRACE = {
  title: "Mon programme de sécurité",
  prompt: "Recopie ton programme final (condition et action) avec une légende de chaque bloc utilisé.",
} as const;

export const MISSION_5E_10_BILAN =
  "Tu as construit un programme de sécurité et testé son comportement sur plusieurs scénarios. Ton évaluation sera corrigée par ton professeur ou ta professeure.";
