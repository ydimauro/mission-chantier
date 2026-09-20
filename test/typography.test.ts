import { describe, expect, it } from "vitest";
import { collectStrings, findTypographyViolations } from "@/lib/typography";
import * as config from "@content/config";
import * as navigation from "@content/navigation";
import * as privacy from "@content/pages/privacy";
import * as placeholders from "@content/pages/placeholders";
import * as progression from "@content/pages/progression";
import * as engine from "@content/engine";
import * as competencies from "@content/competencies";
import * as evaluations from "@content/evaluations";
import * as teacher from "@content/pages/teacher";
import * as missionHub from "@content/pages/mission-hub";
import * as givorsMedia from "@content/givors/media";
import * as missionRegistry from "@content/missions/registry";
import * as mission5e00 from "@content/5e/5e-00";
import * as mission4e00 from "@content/4e/4e-00";

/**
 * Typographie française obligatoire (docs/SPEC.md § 49, AGENTS.md règle 19) :
 * apostrophes courbes, guillemets français, aucun tiret cadratin, dans tout
 * contenu destiné aux élèves ou au professeur.
 */
describe("typographie française des contenus", () => {
  const modules: Record<string, unknown> = {
    config,
    navigation,
    privacy,
    placeholders,
    progression,
    engine,
    competencies,
    evaluations,
    teacher,
    missionHub,
    givorsMedia,
    missionRegistry,
    mission5e00,
    mission4e00,
  };

  for (const [moduleName, moduleExports] of Object.entries(modules)) {
    const strings = collectStrings(moduleExports);

    it(`content/${moduleName} ne contient aucun caractère interdit`, () => {
      const offenders = strings.filter((text) => findTypographyViolations(text).length > 0);
      expect(offenders).toEqual([]);
    });
  }
});
