import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Vérifications statiques du dépôt (docs/SPEC.md § 64, tests 23 et 25).
 * Analysent directement le code source, sans avoir besoin de contenu de
 * mission réel.
 */

function listSourceFiles(dir: string, extensions: readonly string[]): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...listSourceFiles(fullPath, extensions));
    } else if (extensions.some((extension) => entry.endsWith(extension))) {
      files.push(fullPath);
    }
  }

  return files;
}

const projectRoot = join(__dirname, "..");
const codeExtensions = [".ts", ".tsx"] as const;
const sourceFiles = [
  ...listSourceFiles(join(projectRoot, "src"), codeExtensions),
  ...listSourceFiles(join(projectRoot, "content"), codeExtensions),
];

describe("aucun corrigé sommative exposé dans le build élève (docs/SPEC.md § 64, test 25)", () => {
  it("aucun fichier de src/ ou content/ n'importe quoi que ce soit depuis teacher-data/", () => {
    // Cible les imports/require réels, pas les commentaires qui documentent
    // simplement l’existence de teacher-data/ (ex. src/lib/schemas/teacher-key.ts).
    const importPattern = /(?:from\s+|require\()\s*["'][^"']*teacher-data/;
    const offenders = sourceFiles.filter((file) => importPattern.test(readFileSync(file, "utf-8")));
    expect(offenders).toEqual([]);
  });

  it("le schéma .mctkey n'est importé par aucune route applicative (src/app)", () => {
    const appFiles = listSourceFiles(join(projectRoot, "src", "app"), codeExtensions);
    const offenders = appFiles.filter((file) =>
      readFileSync(file, "utf-8").includes("schemas/teacher-key"),
    );
    expect(offenders).toEqual([]);
  });
});

describe("aucune dépendance réseau externe imprévue (docs/SPEC.md § 64, test 23)", () => {
  it("aucun fichier de src/ ou content/ ne référence une URL http(s) externe", () => {
    // Exception : l’espace de noms XML des balises <svg xmlns="..."> n’est
    // jamais une requête réseau, seulement un identifiant de format.
    const isXmlNamespaceDeclaration = (line: string): boolean =>
      /xmlns\s*=\s*["']https?:\/\/www\.w3\.org\//.test(line);

    const offenders = sourceFiles.flatMap((file) => {
      const lines = readFileSync(file, "utf-8").split("\n");
      const matchingLines = lines.filter(
        (line) => /https?:\/\//.test(line) && !isXmlNamespaceDeclaration(line),
      );
      return matchingLines.length > 0 ? [file] : [];
    });

    expect(offenders).toEqual([]);
  });
});
