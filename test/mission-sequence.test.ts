import { describe, expect, it } from "vitest";
import { findNextMission } from "@/lib/missions/sequence";

describe("prochaine mission d'un niveau", () => {
  it("renvoie la première mission du niveau quand rien n'est terminé", () => {
    expect(findNextMission("5e", [])?.id).toBe("5E-00");
    expect(findNextMission("4e", [])?.id).toBe("4E-00");
  });

  it("passe à la mission suivante une fois la précédente terminée", () => {
    expect(findNextMission("5e", ["5E-00"])?.id).toBe("5E-01");
    expect(
      findNextMission("5e", ["5E-00", "5E-01", "5E-02", "5E-03", "5E-04", "5E-05", "5E-06"])?.id,
    ).toBe("5E-07");
    expect(
      findNextMission("5e", [
        "5E-00",
        "5E-01",
        "5E-02",
        "5E-03",
        "5E-04",
        "5E-05",
        "5E-06",
        "5E-07",
      ])?.id,
    ).toBe("5E-08");
    expect(
      findNextMission("5e", [
        "5E-00",
        "5E-01",
        "5E-02",
        "5E-03",
        "5E-04",
        "5E-05",
        "5E-06",
        "5E-07",
        "5E-08",
        "5E-09",
        "5E-10",
        "5E-11",
        "5E-12",
      ]),
    ).toBeNull();
  });

  it("ignore les missions terminées d'un autre niveau", () => {
    expect(findNextMission("4e", ["5E-00"])?.id).toBe("4E-00");
  });
});
