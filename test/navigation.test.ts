import { describe, expect, it } from "vitest";
import { NAV_ITEMS } from "@content/navigation";

describe("navigation principale", () => {
  it("expose les cinq espaces attendus du socle technique", () => {
    const labels = NAV_ITEMS.map((item) => item.label);
    expect(labels).toEqual(["Accueil", "Ma mission", "Mon cours", "Ressources", "Ma progression"]);
  });

  it("ne contient aucun lien dupliqué", () => {
    const hrefs = NAV_ITEMS.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
