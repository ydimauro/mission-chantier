import { describe, expect, it } from "vitest";
import { hasRepeatedProtocol, runSensorTest } from "@/lib/simulation/sensor-test";

describe("moteur de protocole capteur", () => {
  it("produit des observations reproductibles essai par essai", () => {
    expect(runSensorTest(2, 1)).toEqual({ distanceM: 2, attempt: 1, detected: true });
    expect(runSensorTest(2.5, 1).detected).toBe(true);
    expect(runSensorTest(2.5, 2).detected).toBe(false);
  });

  it("demande trois distances répétées", () => {
    const measurements = [1, 1, 2, 2, 3, 3].map((distanceM, index) => runSensorTest(distanceM, index % 2 + 1));
    expect(hasRepeatedProtocol(measurements)).toBe(true);
    expect(hasRepeatedProtocol(measurements.slice(0, 5))).toBe(false);
  });
});