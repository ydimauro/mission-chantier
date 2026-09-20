import { describe, expect, it } from "vitest";
import { scoreAssociation, scoreSequencing } from "@/lib/mission/activity-scoring";

describe("scoreAssociation (docs/PEDAGOGIE.md § 7.4)", () => {
  const items = [
    { id: "i1", correctChoiceId: "a" },
    { id: "i2", correctChoiceId: "b" },
    { id: "i3", correctChoiceId: "c" },
  ];

  it("compte les réponses correctes et signale la réussite complète", () => {
    const result = scoreAssociation(items, { i1: "a", i2: "b", i3: "c" });
    expect(result).toEqual({ correctCount: 3, total: 3, allCorrect: true, incorrectItemIds: [] });
  });

  it("identifie les items incorrects", () => {
    const result = scoreAssociation(items, { i1: "a", i2: "x", i3: "c" });
    expect(result.correctCount).toBe(2);
    expect(result.allCorrect).toBe(false);
    expect(result.incorrectItemIds).toEqual(["i2"]);
  });

  it("traite une réponse absente comme incorrecte, sans erreur", () => {
    const result = scoreAssociation(items, { i1: "a" });
    expect(result.correctCount).toBe(1);
    expect(result.incorrectItemIds).toEqual(["i2", "i3"]);
  });
});

describe("scoreSequencing (5E-06, chaîne d'énergie)", () => {
  const correctSequence = ["source", "moteur", "pompe", "mouvement"];

  it("reconnaît un ordre entièrement correct", () => {
    const result = scoreSequencing(correctSequence, {
      source: 1,
      moteur: 2,
      pompe: 3,
      mouvement: 4,
    });
    expect(result).toEqual({ correctCount: 4, total: 4, allCorrect: true });
  });

  it("compte les positions correctes même si l'ordre n'est pas entièrement bon", () => {
    const result = scoreSequencing(correctSequence, {
      source: 1,
      moteur: 3,
      pompe: 2,
      mouvement: 4,
    });
    expect(result.correctCount).toBe(2);
    expect(result.allCorrect).toBe(false);
  });
});
