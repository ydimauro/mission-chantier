import { describe, expect, it } from "vitest";
import { isProperlySourced } from "@/lib/pedagogy/sourcing";
import {
  isMissionObligatoire,
  validateMissionMetadata,
  type MissionMetadata,
} from "@/lib/pedagogy/validate-mission";

describe("sourçage des données (docs/SPEC.md § 64, tests 7-8)", () => {
  it("une citation non vide est considérée comme sourcée", () => {
    expect(isProperlySourced("Selon la Ville de Givors, 2026")).toBe(true);
  });

  it("une citation absente ou vide n'est pas considérée comme sourcée", () => {
    expect(isProperlySourced(undefined)).toBe(false);
    expect(isProperlySourced(null)).toBe(false);
    expect(isProperlySourced("   ")).toBe(false);
  });
});

function validMission(overrides: Partial<MissionMetadata> = {}): MissionMetadata {
  return {
    id: "5E-01",
    status: "essentielle",
    problematique: "À quels besoins les objets techniques du chantier répondent-ils ?",
    activite: "Associer besoin et objet technique.",
    traceEcrite: "Tableau besoin / utilisateur / objet ou système / contrainte.",
    evaluation: "Formative.",
    evaluationJustification: null,
    durations: { fastMinutes: 26, averageMinutes: 33, slowMinutes: 41, absoluteMaxMinutes: 45 },
    ...overrides,
  };
}

describe("validation des métadonnées de mission (docs/SPEC.md § 64, tests 1-6)", () => {
  it("une mission complète et conforme ne lève aucune anomalie", () => {
    expect(validateMissionMetadata(validMission())).toEqual([]);
  });

  it("signale l'absence de problématique (test 1)", () => {
    const issues = validateMissionMetadata(validMission({ problematique: "" }));
    expect(issues.map((issue) => issue.field)).toContain("problematique");
  });

  it("signale l'absence d'activité (test 4)", () => {
    const issues = validateMissionMetadata(validMission({ activite: "  " }));
    expect(issues.map((issue) => issue.field)).toContain("activite");
  });

  it("exige une trace écrite pour une mission obligatoire (test 3)", () => {
    const issues = validateMissionMetadata(validMission({ traceEcrite: null }));
    expect(issues.map((issue) => issue.field)).toContain("traceEcrite");
  });

  it("une mission d'approfondissement peut ne pas avoir de trace écrite", () => {
    const issues = validateMissionMetadata(
      validMission({ status: "approfondissement", traceEcrite: null }),
    );
    expect(issues.map((issue) => issue.field)).not.toContain("traceEcrite");
  });

  it("accepte une justification explicite à la place d'une évaluation (test 5)", () => {
    const issues = validateMissionMetadata(
      validMission({ evaluation: null, evaluationJustification: "Diagnostique, non noté." }),
    );
    expect(issues.map((issue) => issue.field)).not.toContain("evaluation");
  });

  it("signale l'absence conjointe d'évaluation et de justification (test 5)", () => {
    const issues = validateMissionMetadata(
      validMission({ evaluation: null, evaluationJustification: null }),
    );
    expect(issues.map((issue) => issue.field)).toContain("evaluation");
  });

  it("signale une durée lente supérieure à 45 minutes (test 6)", () => {
    const issues = validateMissionMetadata(
      validMission({ durations: { fastMinutes: 30, averageMinutes: 40, slowMinutes: 46, absoluteMaxMinutes: 46 } }),
    );
    expect(issues.map((issue) => issue.field)).toContain("durations");
  });

  it("un statut recommandée reste une mission obligatoire", () => {
    expect(isMissionObligatoire("recommandee")).toBe(true);
    expect(isMissionObligatoire("essentielle")).toBe(true);
    expect(isMissionObligatoire("approfondissement")).toBe(false);
  });
});
