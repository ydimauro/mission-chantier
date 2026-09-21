import { describe, expect, it } from "vitest";
import { MISSION_REGISTRY } from "@content/missions/registry";

const byLevel = (level: "5e" | "4e") => MISSION_REGISTRY.filter((mission) => mission.niveau === level);
const isSummative = (evaluation: string | null) => evaluation !== null && /sommative|finale/i.test(evaluation);

describe("audit pédagogique global (ÉTAPE 19)", () => {
  it("conserve les parcours complets et essentiels attendus", () => {
    expect(byLevel("5e")).toHaveLength(14);
    expect(byLevel("4e")).toHaveLength(13);
    expect(byLevel("5e").filter((mission) => mission.status === "essentielle")).toHaveLength(12);
    expect(byLevel("4e").filter((mission) => mission.status === "essentielle")).toHaveLength(12);
    expect(MISSION_REGISTRY.filter((mission) => mission.status === "recommandee").map((mission) => mission.id).sort()).toEqual([
      "4E-07",
      "5E-02",
      "5E-07",
    ]);
  });

  it("garantit une durée compatible avec une séance de 45 minutes", () => {
    for (const mission of MISSION_REGISTRY) {
      expect(mission.durations.fastMinutes, mission.id).toBeLessThanOrEqual(mission.durations.averageMinutes);
      expect(mission.durations.averageMinutes, mission.id).toBeLessThanOrEqual(mission.durations.slowMinutes);
      expect(mission.durations.slowMinutes, mission.id).toBeLessThanOrEqual(mission.durations.absoluteMaxMinutes);
      expect(mission.durations.absoluteMaxMinutes, mission.id).toBeLessThanOrEqual(45);
    }
  });

  it("ne retire aucune évaluation sommative du parcours essentiel", () => {
    const recommended = MISSION_REGISTRY.filter((mission) => mission.status === "recommandee");
    expect(recommended.every((mission) => !isSummative(mission.evaluation))).toBe(true);
    expect(MISSION_REGISTRY.filter((mission) => isSummative(mission.evaluation)).every((mission) => mission.status === "essentielle")).toBe(true);
  });

  it("place les diagnostics en ouverture et les finales en clôture", () => {
    for (const level of ["5e", "4e"] as const) {
      const missions = byLevel(level);
      expect(missions[0]?.id).toBe(level === "5e" ? "5E-00" : "4E-00");
      expect(missions[0]?.evaluation).toBeNull();
      expect(missions.at(-1)?.id).toBe(level === "5e" ? "5E-FINAL" : "4E-FINAL");
      expect(missions.at(-1)?.evaluation).toMatch(/finale/i);
    }
  });

  it("documente une activité, une trace et une justification pour chaque mission", () => {
    for (const mission of MISSION_REGISTRY) {
      expect(mission.problematique.trim().length, mission.id).toBeGreaterThan(10);
      expect(mission.activite.trim().length, mission.id).toBeGreaterThan(10);
      expect(mission.traceEcrite, mission.id).not.toBeNull();
      expect(mission.traceEcrite?.trim().length ?? 0, mission.id).toBeGreaterThan(10);
      expect(Boolean(mission.evaluation) || Boolean(mission.evaluationJustification), mission.id).toBe(true);
    }
  });
});
