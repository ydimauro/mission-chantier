import { describe, expect, it } from "vitest";
import { collectStrings, findTypographyViolations, isTypographyClean } from "@/lib/typography";

describe("détecteur de typographie", () => {
  it("laisse passer un texte français correctement ponctué", () => {
    expect(isTypographyClean("Voici « un exemple » avec une apostrophe courbe : c’est correct.")).toBe(
      true,
    );
  });

  it("détecte une apostrophe droite", () => {
    const violations = findTypographyViolations("c'est incorrect");
    expect(violations).toEqual([{ character: "'", index: 1 }]);
  });

  it("détecte un guillemet droit", () => {
    expect(findTypographyViolations('dit "bonjour"').length).toBeGreaterThan(0);
  });

  it("détecte un tiret cadratin", () => {
    expect(findTypographyViolations("avant — après").some((v) => v.character === "—")).toBe(
      true,
    );
  });

  it("extrait récursivement les chaînes d’un contenu structuré", () => {
    const strings = collectStrings({
      title: "Titre",
      items: ["Un", "Deux"],
      nested: { label: "Trois" },
      count: 3,
    });
    expect(strings).toEqual(["Titre", "Un", "Deux", "Trois"]);
  });
});
