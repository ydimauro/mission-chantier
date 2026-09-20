import { describe, expect, it } from "vitest";
import { isIndiceExhausted, nextIndiceLevel } from "@/lib/mission/indice";
import { formatElapsedMinutes } from "@/lib/mission/timer";

describe("aides progressives (docs/PEDAGOGIE.md § 7.3)", () => {
  it("révèle un indice de plus à chaque appel", () => {
    expect(nextIndiceLevel(0, 3)).toBe(1);
    expect(nextIndiceLevel(1, 3)).toBe(2);
    expect(nextIndiceLevel(2, 3)).toBe(3);
  });

  it("ne dépasse jamais le nombre maximal d'indices disponibles", () => {
    expect(nextIndiceLevel(3, 3)).toBe(3);
  });

  it("détecte l'épuisement des indices", () => {
    expect(isIndiceExhausted(2, 3)).toBe(false);
    expect(isIndiceExhausted(3, 3)).toBe(true);
  });

  it("fonctionne avec un nombre d'indices réduit à un seul niveau", () => {
    expect(nextIndiceLevel(0, 1)).toBe(1);
    expect(isIndiceExhausted(1, 1)).toBe(true);
  });
});

describe("minuteur de mission (docs/SPEC.md § 8, affichage non anxiogène)", () => {
  it("affiche un texte rassurant sous la minute", () => {
    expect(formatElapsedMinutes(0)).toBe("moins d’une minute");
    expect(formatElapsedMinutes(59)).toBe("moins d’une minute");
  });

  it("affiche des minutes entières au-delà", () => {
    expect(formatElapsedMinutes(60)).toBe("1 min");
    expect(formatElapsedMinutes(125)).toBe("2 min");
    expect(formatElapsedMinutes(2700)).toBe("45 min");
  });

  it("ne renvoie jamais une durée négative", () => {
    expect(formatElapsedMinutes(-10)).toBe("moins d’une minute");
  });
});
