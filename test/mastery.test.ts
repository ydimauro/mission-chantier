import { describe, expect, it } from "vitest";
import { computeMasteryLevel, DEFAULT_MASTERY_THRESHOLDS } from "@/lib/evaluations/mastery";
import type { CompetencyProof } from "@/lib/schemas/proof";

function proof(overrides: Partial<CompetencyProof> = {}): CompetencyProof {
  return {
    competency: "C8",
    mission: "4E-08",
    assessmentType: "summative",
    context: "test",
    score: 0.8,
    date: "2026-09-20",
    transfer: false,
    ...overrides,
  };
}

describe("niveaux de maîtrise (docs/COMPETENCES.md § 5, docs/SPEC.md § 64 test 14)", () => {
  it("« Non évaluée » sans preuve sommative ou de transfert", () => {
    expect(computeMasteryLevel([], "C8")).toBe("non-evaluee");
  });

  it("une preuve formative seule ne suffit jamais à évaluer une compétence", () => {
    const proofs = [proof({ assessmentType: "formative" })];
    expect(computeMasteryLevel(proofs, "C8")).toBe("non-evaluee");
  });

  it("une seule preuve ne peut jamais produire satisfaisante ni très bonne (règle 2)", () => {
    const proofs = [proof({ score: 0.95 })];
    expect(computeMasteryLevel(proofs, "C8")).not.toBe("satisfaisante");
    expect(computeMasteryLevel(proofs, "C8")).not.toBe("tres-bonne");
    expect(computeMasteryLevel(proofs, "C8")).toBe("fragile");
  });

  it("une seule preuve trop faible donne maîtrise insuffisante", () => {
    const proofs = [proof({ score: 0.1 })];
    expect(computeMasteryLevel(proofs, "C8")).toBe("insuffisante");
  });

  it("plusieurs preuves cohérentes et solides donnent satisfaisante", () => {
    const proofs = [proof({ score: 0.7 }), proof({ score: 0.72, mission: "4E-09" })];
    expect(computeMasteryLevel(proofs, "C8")).toBe("satisfaisante");
  });

  it("très bonne maîtrise exige une preuve de transfert en plus d'un score élevé (règle 4)", () => {
    const withoutTransfer = [proof({ score: 0.9 }), proof({ score: 0.9, mission: "4E-09" })];
    expect(computeMasteryLevel(withoutTransfer, "C8")).toBe("satisfaisante");

    const withTransfer = [
      proof({ score: 0.9 }),
      proof({ score: 0.9, mission: "4E-11", transfer: true }),
    ];
    expect(computeMasteryLevel(withTransfer, "C8")).toBe("tres-bonne");
  });

  it("une preuve isolée très faible plafonne à fragile plutôt que d'écraser la moyenne (règle 5)", () => {
    const proofs = [proof({ score: 0.9 }), proof({ score: 0.9, mission: "4E-09" }), proof({ score: 0.1, mission: "4E-10" })];
    expect(computeMasteryLevel(proofs, "C8")).toBe("fragile");
  });

  it("compétence différente ignorée dans le calcul", () => {
    const proofs = [proof({ competency: "C3", score: 0.95 })];
    expect(computeMasteryLevel(proofs, "C8")).toBe("non-evaluee");
  });

  it("accepte des seuils personnalisés (venant à terme du .mctkey)", () => {
    const strict = { ...DEFAULT_MASTERY_THRESHOLDS, minAverageForSatisfaisante: 0.95 };
    const proofs = [proof({ score: 0.7 }), proof({ score: 0.72, mission: "4E-09" })];
    expect(computeMasteryLevel(proofs, "C8", strict)).toBe("fragile");
  });
});
