import { describe, expect, it } from "vitest";
import { findNextMission } from "@/lib/missions/sequence";

describe("prochaine mission d'un niveau", () => {
  it("renvoie la première mission du niveau quand rien n'est terminé", () => {
    expect(findNextMission("5e", [])?.id).toBe("5E-00");
    expect(findNextMission("4e", [])?.id).toBe("4E-00");
  });

  it("passe à la mission suivante une fois la précédente terminée", () => {
    expect(findNextMission("5e", ["5E-00"])).toBeNull();
  });

  it("ignore les missions terminées d'un autre niveau", () => {
    expect(findNextMission("4e", ["5E-00"])?.id).toBe("4E-00");
  });
});
