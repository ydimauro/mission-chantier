import { describe, expect, it } from "vitest";
import { unzipSync } from "fflate";
import { buildCorrectedFilesZipBytes } from "@/lib/teacher/export-bundle";
import { createInitialStudentFile } from "@/lib/progression/model";

describe("export groupé des fichiers élèves corrigés en ZIP (docs/SPEC.md § 26, § 41)", () => {
  it("produit une archive contenant un fichier .mcjson par élève", () => {
    const alice = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    const bob = createInitialStudentFile({ studentCode: "4E2-018", classe: "4E2", niveau: "4e" });

    const bytes = buildCorrectedFilesZipBytes([alice, bob]);
    const entries = unzipSync(bytes);

    expect(Object.keys(entries).sort()).toEqual([
      "mission-chantier-4E2-017.mcjson",
      "mission-chantier-4E2-018.mcjson",
    ]);

    const decoded = JSON.parse(new TextDecoder().decode(entries["mission-chantier-4E2-017.mcjson"]));
    expect(decoded).toEqual(alice);
  });
});
