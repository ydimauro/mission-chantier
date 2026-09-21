import type {
  BlockProgramActionOption,
  BlockProgramComparatorOption,
  BlockProgramScenario,
  BlockProgramThresholdOption,
} from "@/components/mission/SommativeBlockProgram";

export const MISSION_4E_06 = {
  id: "4E-06",
  objectifs: [
    "Construis un programme de sécurité avec une condition et une alternative.",
    "Teste ton programme sur plusieurs scénarios avant de le remettre.",
  ],
  problematique: "Peux-tu programmer une sécurité plus complète que celle vue en 5e ?",
  consigne: "Construis la sécurité du déplacement, teste les quatre scénarios, puis remets ton programme.",
} as const;

export const BLOCK_PROGRAM_4E_06_COMPARATORS: readonly BlockProgramComparatorOption[] = [
  { id: "<", label: "inférieure à" },
  { id: "<=", label: "inférieure ou égale à" },
  { id: ">", label: "supérieure à" },
  { id: ">=", label: "supérieure ou égale à" },
];

export const BLOCK_PROGRAM_4E_06_THRESHOLDS: readonly BlockProgramThresholdOption[] = [
  { id: "1m", label: "1 m", valueM: 1 },
  { id: "2m", label: "2 m", valueM: 2 },
  { id: "3m", label: "3 m", valueM: 3 },
  { id: "4m", label: "4 m", valueM: 4 },
];

export const BLOCK_PROGRAM_4E_06_ACTIONS: readonly BlockProgramActionOption[] = [
  { id: "arreter", label: "Arrêter le déplacement" },
  { id: "ralentir", label: "Ralentir le déplacement" },
  { id: "alerter", label: "Déclencher une alerte visuelle" },
];

export const BLOCK_PROGRAM_4E_06_ELSE_ACTIONS: readonly BlockProgramActionOption[] = [
  { id: "autoriser", label: "Autoriser le déplacement" },
  { id: "ralentir", label: "Maintenir un déplacement lent" },
];

export const BLOCK_PROGRAM_4E_06_SCENARIOS: readonly BlockProgramScenario[] = [
  { id: "s1", label: "Scénario 1", distanceM: 1 },
  { id: "s2", label: "Scénario 2", distanceM: 2 },
  { id: "s3", label: "Scénario 3", distanceM: 2.5 },
  { id: "s4", label: "Scénario 4", distanceM: 4 },
];

export const MISSION_4E_06_TRACE = {
  title: "Mon programme de sécurité",
  prompt: "Recopie ton programme final avec les blocs QUAND, SI, ALORS et SINON. Écris une légende courte pour chaque bloc.",
} as const;

export const MISSION_4E_06_BILAN =
  "Ton programme et ses essais ont été enregistrés. Ils seront corrigés par le professeur ou la professeure.";