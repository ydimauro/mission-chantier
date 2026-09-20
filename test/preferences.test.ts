import { describe, expect, it } from "vitest";
import { DEFAULT_PREFERENCES, nextTextScale, TEXT_SCALE_STEPS } from "@/lib/preferences";

describe("préférences d’affichage (zoom applicatif, docs/SPEC.md § 43)", () => {
  it("démarre sans thème forcé, sans police adaptée et à 100 %", () => {
    expect(DEFAULT_PREFERENCES).toEqual({
      theme: null,
      dyslexiaFriendly: false,
      textScale: 100,
      projectorMode: false,
      performanceMode: false,
    });
  });

  it("propose exactement les paliers 100 / 125 / 150 %", () => {
    expect(TEXT_SCALE_STEPS).toEqual([100, 125, 150]);
  });

  it("boucle 100 % -> 125 % -> 150 % -> 100 %", () => {
    expect(nextTextScale(100)).toBe(125);
    expect(nextTextScale(125)).toBe(150);
    expect(nextTextScale(150)).toBe(100);
  });
});
