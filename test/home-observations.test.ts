import { describe, expect, it } from "vitest";
import { parseHomeObservations } from "@/lib/mission/home-observations";

describe("parseHomeObservations", () => {
  it("ne conserve que les choix proposés sur l’accueil, sans doublon", () => {
    expect(parseHomeObservations("on-demolit,invalide,on-demolit,ne-sait-pas")).toEqual([
      "on-demolit",
      "ne-sait-pas",
    ]);
  });
});
