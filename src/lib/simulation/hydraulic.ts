export type HydraulicScenario = {
  pressureBar: number;
  flowLitersPerMinute: number;
};

export type HydraulicMeasures = {
  pressureBar: number;
  flowLitersPerMinute: number;
  movementSpeed: number;
};

function assertPositiveNumber(value: number, field: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(field);
  }
}

/**
 * Modèle volontairement qualitatif : la vitesse augmente quand la pression
 * et le débit augmentent. Ce n’est pas une représentation physique réelle.
 */
export function simulateHydraulicMovement(scenario: HydraulicScenario): HydraulicMeasures {
  assertPositiveNumber(scenario.pressureBar, "pressureBar");
  assertPositiveNumber(scenario.flowLitersPerMinute, "flowLitersPerMinute");

  return {
    pressureBar: scenario.pressureBar,
    flowLitersPerMinute: scenario.flowLitersPerMinute,
    movementSpeed: Number(((scenario.pressureBar * scenario.flowLitersPerMinute) / 100).toFixed(1)),
  };
}