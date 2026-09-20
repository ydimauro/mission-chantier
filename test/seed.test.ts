import { describe, expect, it } from "vitest";
import { createSeed, pickVariant, seedToIndex } from "@/lib/evaluations/seed";

describe("graine et variantes (docs/SPEC.md § 24.3, § 29)", () => {
  it("la graine est déterministe pour un même élève, une même mission et un même item", () => {
    expect(createSeed("4E2-017", "4E-08", "q1")).toBe(createSeed("4E2-017", "4E-08", "q1"));
  });

  it("deux élèves différents obtiennent en général des graines différentes", () => {
    expect(createSeed("4E2-017", "4E-08", "q1")).not.toBe(createSeed("4E2-018", "4E-08", "q1"));
  });

  it("seedToIndex retourne toujours un index valide", () => {
    const seed = createSeed("4E2-017", "4E-08", "q1");
    const index = seedToIndex(seed, 3);
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(3);
  });

  it("le même élève retrouve toujours la même variante en rechargeant", () => {
    const variants = ["variante-A", "variante-B", "variante-C"] as const;
    const seed = createSeed("4E2-017", "4E-08", "q1");
    expect(pickVariant(variants, seed)).toBe(pickVariant(variants, seed));
  });

  it("répartit les graines sur plusieurs variantes (pas toujours la même)", () => {
    const codes = Array.from({ length: 20 }, (_, index) => `4E2-${String(index).padStart(3, "0")}`);
    const indices = new Set(codes.map((code) => seedToIndex(createSeed(code, "4E-08", "q1"), 3)));
    expect(indices.size).toBeGreaterThan(1);
  });
});
