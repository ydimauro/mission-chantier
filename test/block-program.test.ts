import { describe, expect, it } from "vitest";
import { evaluateCondition } from "@/lib/mission/block-program";

describe("évaluation qualitative d’un programme SI...ALORS (5E-09, 5E-10)", () => {
  it("compare correctement selon chaque opérateur", () => {
    expect(evaluateCondition(1, "<", 2)).toBe(true);
    expect(evaluateCondition(2, "<", 2)).toBe(false);
    expect(evaluateCondition(2, "<=", 2)).toBe(true);
    expect(evaluateCondition(3, ">", 2)).toBe(true);
    expect(evaluateCondition(2, ">=", 2)).toBe(true);
    expect(evaluateCondition(1, ">=", 2)).toBe(false);
  });
});
