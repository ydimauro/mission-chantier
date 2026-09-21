import { describe, expect, it } from "vitest";
import {
  InvalidScenarioFieldError,
  simulateEvacuation,
  type EvacuationScenario,
} from "@/lib/simulation/evacuation";

const scenario: EvacuationScenario = {
  volumeM3: 18,
  truckCapacityM3: 6,
  truckCount: 1,
  routeDistanceM: 500,
  loadingMinutes: 4,
  unloadingMinutes: 3,
  maneuverMinutes: 2,
  travelMinutesPerKm: 6,
  consumptionPerKm: 1.5,
};

describe("moteur de simulation d’évacuation", () => {
  it("calcule des mesures reproductibles pour un scénario", () => {
    expect(simulateEvacuation(scenario)).toEqual({
      volumeM3: 18,
      numberOfTrips: 3,
      distanceM: 3000,
      elapsedMinutes: 37,
      pedagogicalConsumption: 4.5,
    });
  });

  it("réduit le temps avec plusieurs engins sans changer le trajet total", () => {
    expect(
      simulateEvacuation({ ...scenario, truckCount: 2 }),
    ).toMatchObject({
      numberOfTrips: 3,
      distanceM: 3000,
      elapsedMinutes: 32,
    });
  });

  it("refuse un paramètre nul ou non fini, en identifiant le champ fautif (pas de texte dans le moteur, AGENTS.md règle 8)", () => {
    expect(() => simulateEvacuation({ ...scenario, routeDistanceM: 0 })).toThrow(
      InvalidScenarioFieldError,
    );
    try {
      simulateEvacuation({ ...scenario, routeDistanceM: 0 });
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidScenarioFieldError);
      expect((error as InvalidScenarioFieldError).field).toBe("routeDistanceM");
    }

    try {
      simulateEvacuation({ ...scenario, truckCount: Number.NaN });
    } catch (error) {
      expect((error as InvalidScenarioFieldError).field).toBe("truckCount");
    }
  });
});