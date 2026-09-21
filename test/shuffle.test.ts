import { describe, expect, it } from "vitest";
import { shuffleForDisplay } from "@/lib/shuffle";

describe("shuffleForDisplay", () => {
  it("mélange une copie sans modifier les données de contenu", () => {
    const choices = ["première", "deuxième", "troisième", "quatrième"];

    const shuffled = shuffleForDisplay(choices, () => 0);

    expect(shuffled).toEqual(["deuxième", "troisième", "quatrième", "première"]);
    expect(choices).toEqual(["première", "deuxième", "troisième", "quatrième"]);
  });
});