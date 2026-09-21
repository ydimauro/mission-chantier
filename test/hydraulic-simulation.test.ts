import { describe, expect, it } from "vitest";
import { simulateHydraulicMovement } from "@/lib/simulation/hydraulic";

describe("simulation hydraulique", () => {
  it("produit une mesure qualitative de vitesse à partir de la pression et du débit", () => {
    expect(
      simulateHydraulicMovement({ pressureBar: 120, flowLitersPerMinute: 25 }),
    ).toEqual({
      pressureBar: 120,
      flowLitersPerMinute: 25,
      movementSpeed: 30,
    });
  });

  it("augmente la vitesse quand le débit augmente", () => {
    const slow = simulateHydraulicMovement({ pressureBar: 100, flowLitersPerMinute: 10 });
    const fast = simulateHydraulicMovement({ pressureBar: 100, flowLitersPerMinute: 20 });

    expect(fast.movementSpeed).toBeGreaterThan(slow.movementSpeed);
  });

  it("refuse un paramètre nul ou invalide", () => {
    expect(() => simulateHydraulicMovement({ pressureBar: 0, flowLitersPerMinute: 20 })).toThrow(
      "pressureBar",
    );
    expect(() => simulateHydraulicMovement({ pressureBar: 100, flowLitersPerMinute: Number.NaN })).toThrow(
      "flowLitersPerMinute",
    );
  });
});