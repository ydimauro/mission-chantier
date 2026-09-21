import { describe, expect, it } from "vitest";
import { formatFrenchNumber } from "@/lib/format-number";

describe("formatFrenchNumber", () => {
  it("utilise la virgule décimale française", () => {
    expect(formatFrenchNumber(2.5)).toBe("2,5");
    expect(formatFrenchNumber(4.5)).toBe("4,5");
  });

  it("arrondit selon maximumFractionDigits", () => {
    expect(formatFrenchNumber(3, 0)).toBe("3");
    expect(formatFrenchNumber(3.14159, 2)).toBe("3,14");
  });
});
