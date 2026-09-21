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

  it("le schéma .mctkey n'est importé que par l'espace professeur (src/app/teacher), jamais par une route élève", () => {
    const appFiles = listSourceFiles(join(projectRoot, "src", "app"), codeExtensions);
    const studentFacingFiles = appFiles.filter(
      (file) => !file.includes(join("src", "app", "teacher")),
    );
    const offenders = studentFacingFiles.filter((file) =>
      readFileSync(file, "utf-8").includes("schemas/teacher-key"),
    );
    expect(offenders).toEqual([]);
  });

  it("le module de correction professeur (src/lib/teacher) n'est importé par aucune route élève", () => {
    const appFiles = listSourceFiles(join(projectRoot, "src", "app"), codeExtensions);
    const studentFacingFiles = appFiles.filter(
      (file) => !file.includes(join("src", "app", "teacher")),
    );
    const importPattern = /(?:from\s+|require\()\s*["']@\/lib\/teacher\//;
    const offenders = studentFacingFiles.filter((file) => importPattern.test(readFileSync(file, "utf-8")));
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

describe("configuration de sécurité Vercel", () => {
  it("autorise les scripts inline requis par l’hydratation de l’export statique Next.js", () => {
    const vercelConfig = JSON.parse(readFileSync(join(projectRoot, "vercel.json"), "utf-8")) as {
      headers: Array<{ headers: Array<{ key: string; value: string }> }>;
    };
    const csp = vercelConfig.headers[0]?.headers.find(
      (header) => header.key === "Content-Security-Policy",
    )?.value;

    expect(csp).toContain("script-src 'self' 'unsafe-inline'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
  });
});
