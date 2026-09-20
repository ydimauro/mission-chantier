import { describe, expect, it } from "vitest";
import { collectStrings, findTypographyViolations } from "@/lib/typography";
import * as config from "@content/config";
import * as navigation from "@content/navigation";
import * as privacy from "@content/pages/privacy";
import * as placeholders from "@content/pages/placeholders";

/**
 * Typographie française obligatoire (docs/SPEC.md § 49, AGENTS.md règle 19) :
 * apostrophes courbes, guillemets français, aucun tiret cadratin, dans tout
 * contenu destiné aux élèves ou au professeur.
 */
describe("typographie française des contenus", () => {
  const modules: Record<string, unknown> = { config, navigation, privacy, placeholders };

  for (const [moduleName, moduleExports] of Object.entries(modules)) {
    const strings = collectStrings(moduleExports);

    it(`content/${moduleName} ne contient aucun caractère interdit`, () => {
      const offenders = strings.filter((text) => findTypographyViolations(text).length > 0);
      expect(offenders).toEqual([]);
    });
  }
});
