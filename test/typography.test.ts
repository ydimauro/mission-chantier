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
import * as mission5e01 from "@content/5e/5e-01";
import * as mission5e02 from "@content/5e/5e-02";
import * as mission5e03 from "@content/5e/5e-03";
import * as mission5e04 from "@content/5e/5e-04";
import * as mission5e05 from "@content/5e/5e-05";
import * as mission5e06 from "@content/5e/5e-06";
import * as mission5e07 from "@content/5e/5e-07";
import * as mission5e08 from "@content/5e/5e-08";
import * as mission5e09 from "@content/5e/5e-09";
import * as mission5e10 from "@content/5e/5e-10";
import * as mission5e11 from "@content/5e/5e-11";
import * as mission5e12 from "@content/5e/5e-12";
import * as mission5eFinal from "@content/5e/5e-final";
import * as mission4e00 from "@content/4e/4e-00";
import * as mission4e01 from "@content/4e/4e-01";
import * as mission4e02 from "@content/4e/4e-02";
import * as mission4e03 from "@content/4e/4e-03";
import * as mission4e04 from "@content/4e/4e-04";
import * as mission4e05 from "@content/4e/4e-05";
import * as mission4e06 from "@content/4e/4e-06";
import * as mission4e07 from "@content/4e/4e-07";
import * as mission4e08 from "@content/4e/4e-08";
import * as mission4e09 from "@content/4e/4e-09";
import * as mission4e10 from "@content/4e/4e-10";
import * as mission4e11 from "@content/4e/4e-11";

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
    mission5e01,
    mission5e02,
    mission5e03,
    mission5e04,
    mission5e05,
    mission5e06,
    mission5e07,
    mission5e08,
    mission5e09,
    mission5e10,
    mission5e11,
    mission5e12,
    mission5eFinal,
    mission4e00,
    mission4e01,
    mission4e02,
    mission4e03,
    mission4e04,
    mission4e05,
    mission4e06,
    mission4e07,
    mission4e08,
    mission4e09,
    mission4e10,
    mission4e11,
  };

  for (const [moduleName, moduleExports] of Object.entries(modules)) {
    const strings = collectStrings(moduleExports);

    it(`content/${moduleName} ne contient aucun caractère interdit`, () => {
      const offenders = strings.filter((text) => findTypographyViolations(text).length > 0);
      expect(offenders).toEqual([]);
    });
  }
});
