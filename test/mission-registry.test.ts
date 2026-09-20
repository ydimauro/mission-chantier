import { describe, expect, it } from "vitest";
import { MISSION_REGISTRY } from "@content/missions/registry";
import { validateMissionMetadata } from "@/lib/pedagogy/validate-mission";

/**
 * Active enfin, sur du contenu réel, les tests pédagogiques 1 à 6 de
 * docs/SPEC.md § 64 (jusqu’ici vérifiés seulement sur des fixtures
 * synthétiques, voir test/pedagogy-validators.test.ts).
 */
describe("registre des missions réelles (docs/SPEC.md § 64, tests 1-6)", () => {
  it.each(MISSION_REGISTRY.map((mission) => [mission.id, mission] as const))(
    "%s ne présente aucune anomalie de métadonnées",
    (_id, mission) => {
      expect(validateMissionMetadata(mission)).toEqual([]);
    },
  );

  it("ne contient aucun identifiant de mission dupliqué", () => {
    const ids = MISSION_REGISTRY.map((mission) => mission.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
