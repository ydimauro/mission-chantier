import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { describe, expect, it } from "vitest";
import { CHANTIER_01, CHANTIER_ENGIN, CHANTIER_VUE_RUE } from "@content/givors/media";
import { MISSION_4E_00, MISSION_5E_00 } from "@content/missions/registry";
import { MISSION_5E_FINAL } from "@content/5e/5e-final";

const projectRoot = join(__dirname, "..");
const registeredGivorsMedia = [CHANTIER_01, CHANTIER_VUE_RUE, CHANTIER_ENGIN] as const;

describe("audit des sources et médias réels (ÉTAPE 18)", () => {
  it("chaque média Givors distribué possède ses métadonnées et un fichier local", () => {
    for (const media of registeredGivorsMedia) {
      expect(media.file).toMatch(/^\/givors\//);
      expect(media.title.trim()).not.toBe("");
      expect(media.author.trim()).not.toBe("");
      expect(media.source.trim()).not.toBe("");
      expect(media.alt.trim()).not.toBe("");
      expect(media.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(media.width).toBeGreaterThan(0);
      expect(media.height).toBeGreaterThan(0);
      expect(media.rightsChecked).toBe(true);
      expect(existsSync(join(projectRoot, "public", media.file))).toBe(true);
    }
  });

  it("aucun média Givors public n’échappe au registre", () => {
    const publicFiles = readdirSync(join(projectRoot, "public", "givors")).sort();
    const registeredFiles = registeredGivorsMedia.map((media) => basename(media.file)).sort();
    expect(publicFiles).toEqual(registeredFiles);
  });

  it("le registre décrit le support réel effectivement affiché", () => {
    expect(MISSION_5E_00.activite).toContain("une photographie réelle");
    expect(MISSION_4E_00.activite).toContain("une photographie réelle");
  });

  it("la situation de transfert 5e annonce explicitement qu’elle est fictive", () => {
    expect(MISSION_5E_FINAL.intro).toMatch(/^Situation fictive :/);
  });

  it("la documentation de conception ne référence plus l’ancien PNG", () => {
    const references = readFileSync(join(projectRoot, "docs", "references", "README.md"), "utf8");
    expect(references).toContain("mission_chantier_givors.jpg");
    expect(references).not.toContain("mission_chantier_givors.png");
  });
  it("annonce comme simplifiés les seuils et distances pédagogiques sans source réelle", () => {
    const pages = [
      "src/app/mission/5e-09/Mission5E09Client.tsx",
      "src/app/mission/5e-10/Mission5E10Client.tsx",
      "src/app/mission/4e-11/Mission4E11Client.tsx",
    ];
    for (const page of pages) {
      const source = readFileSync(join(projectRoot, page), "utf8");
      expect(source).toContain("<SimulationPedagogique valeursSimplifiees>");
    }
  });
});