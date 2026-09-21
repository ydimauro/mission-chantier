export type EvacuationScenario = {
  volumeM3: number;
  truckCapacityM3: number;
  truckCount: number;
  routeDistanceM: number;
  loadingMinutes: number;
  unloadingMinutes: number;
  maneuverMinutes: number;
  travelMinutesPerKm: number;
  consumptionPerKm: number;
};

export type EvacuationMeasures = {
  volumeM3: number;
  numberOfTrips: number;
  distanceM: number;
  elapsedMinutes: number;
  pedagogicalConsumption: number;
};

/**
 * Ne porte aucun texte : seul le champ en défaut est identifié. Le message
 * affiché à l’élève est construit côté composant à partir de `@content/engine`
 * (docs/SPEC.md, AGENTS.md règle 8 : contenu pédagogique séparé du code).
 */
export class InvalidScenarioFieldError extends Error {
  constructor(public readonly field: keyof EvacuationScenario) {
    super(`Invalid scenario field: ${field}`);
    this.name = "InvalidScenarioFieldError";
  }
}

function assertPositiveNumber(value: number, field: keyof EvacuationScenario): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new InvalidScenarioFieldError(field);
  }
}

export function simulateEvacuation(
  scenario: EvacuationScenario,
): EvacuationMeasures {
  assertPositiveNumber(scenario.volumeM3, "volumeM3");
  assertPositiveNumber(scenario.truckCapacityM3, "truckCapacityM3");
  assertPositiveNumber(scenario.truckCount, "truckCount");
  assertPositiveNumber(scenario.routeDistanceM, "routeDistanceM");
  assertPositiveNumber(scenario.loadingMinutes, "loadingMinutes");
  assertPositiveNumber(scenario.unloadingMinutes, "unloadingMinutes");
  assertPositiveNumber(scenario.maneuverMinutes, "maneuverMinutes");
  assertPositiveNumber(scenario.travelMinutesPerKm, "travelMinutesPerKm");
  assertPositiveNumber(scenario.consumptionPerKm, "consumptionPerKm");

  const numberOfTrips = Math.ceil(scenario.volumeM3 / scenario.truckCapacityM3);
  const rounds = Math.ceil(numberOfTrips / scenario.truckCount);
  const distanceM = numberOfTrips * scenario.routeDistanceM * 2;
  const travelMinutes = (distanceM / 1000) * scenario.travelMinutesPerKm;
  const elapsedMinutes =
    scenario.loadingMinutes +
    rounds * (scenario.unloadingMinutes + scenario.maneuverMinutes) +
    travelMinutes;

  return {
    volumeM3: scenario.volumeM3,
    numberOfTrips,
    distanceM,
    elapsedMinutes,
    pedagogicalConsumption: (distanceM / 1000) * scenario.consumptionPerKm,
  };
}
