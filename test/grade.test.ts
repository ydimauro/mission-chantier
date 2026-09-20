import { describe, expect, it } from "vitest";
import {
  computeGrade,
  FINAL_WEIGHT,
  INTERMEDIATE_WEIGHT,
  roundToHalfPoint,
  type SummativeResult,
} from "@/lib/evaluations/grade";

function result(id: string, status: SummativeResult["status"], score: number | null): SummativeResult {
  return { id, status, score };
}

describe("coefficients de la note /20 (docs/SPEC.md § 64, test 11)", () => {
  it("les coefficients intermédiaire et finale totalisent 100 %", () => {
    expect(INTERMEDIATE_WEIGHT + FINAL_WEIGHT).toBe(1);
  });
});

describe("calcul de la note /20 (docs/SPEC.md § 27)", () => {
  it("aucune note calculable sans aucune évaluation corrigée", () => {
    const grade = computeGrade([], result("final", "pending", null));
    expect(grade.noteOn20).toBeNull();
    expect(grade.provisional).toBe(true);
  });

  it("note provisoire calculée uniquement sur les sommatives intermédiaires avant la finale", () => {
    const grade = computeGrade(
      [result("i1", "corrected", 0.8), result("i2", "corrected", 0.6)],
      result("final", "pending", null),
    );
    expect(grade.noteOn20).toBeCloseTo(0.7 * 20, 5);
    expect(grade.provisional).toBe(true);
  });

  it("note complète une fois la finale corrigée (docs/SPEC.md § 64, test 13)", () => {
    const grade = computeGrade(
      [result("i1", "corrected", 0.8), result("i2", "corrected", 0.6)],
      result("final", "corrected", 0.9),
    );
    const expected = (0.7 * INTERMEDIATE_WEIGHT + 0.9 * FINAL_WEIGHT) * 20;
    expect(grade.noteOn20).toBeCloseTo(expected, 5);
    expect(grade.provisional).toBe(false);
  });

  it("une absence (not-taken) n'est jamais transformée en zéro (docs/SPEC.md § 64, test 12)", () => {
    const withAbsence = computeGrade(
      [result("i1", "corrected", 0.8), result("i2", "not-taken", null)],
      result("final", "corrected", 0.8),
    );
    const withoutThatItem = computeGrade(
      [result("i1", "corrected", 0.8)],
      result("final", "corrected", 0.8),
    );
    expect(withAbsence.noteOn20).toBeCloseTo(withoutThatItem.noteOn20 ?? -1, 5);
  });

  it("reste provisoire tant qu'une sommative intermédiaire attend correction", () => {
    const grade = computeGrade(
      [result("i1", "corrected", 0.8), result("i2", "pending", null)],
      result("final", "corrected", 0.8),
    );
    expect(grade.provisional).toBe(true);
  });

  it("le diagnostic et le formatif ne peuvent structurellement pas peser sur la note (test 9 et 10)", () => {
    // computeGrade n'accepte que des résultats de sommatives intermédiaires et
    // de finale : aucune donnée diagnostique ou formative n'entre dans le calcul.
    const grade = computeGrade([result("i1", "corrected", 1)], result("final", "corrected", 1));
    expect(grade.noteOn20).toBeCloseTo(20, 5);
  });
});

describe("arrondi d'affichage au demi-point (docs/SPEC.md § 27)", () => {
  it("arrondit au demi-point le plus proche", () => {
    expect(roundToHalfPoint(14.24)).toBe(14);
    expect(roundToHalfPoint(14.26)).toBe(14.5);
    expect(roundToHalfPoint(14.76)).toBe(15);
  });
});
