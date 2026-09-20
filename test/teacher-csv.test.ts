import { describe, expect, it } from "vitest";
import { buildClassSynthesisCsv, buildPronoteCsv } from "@/lib/teacher/csv";
import type { StudentSynthesisRow } from "@/lib/teacher/synthesis";
import { COMPETENCY_IDS } from "@content/competencies";

function row(overrides: Partial<StudentSynthesisRow> = {}): StudentSynthesisRow {
  const mastery = Object.fromEntries(COMPETENCY_IDS.map((id) => [id, "non-evaluee"])) as StudentSynthesisRow["mastery"];
  return {
    studentCode: "4E2-017",
    classe: "4E2",
    grade: { noteOn20: 14.26, provisional: false, correctedIntermediateCount: 4, totalIntermediateCount: 4 },
    mastery,
    ...overrides,
  };
}

describe("export CSV de la synthèse classe (docs/SPEC.md § 41)", () => {
  it("place l'en-tête Code, Classe, C1..C9, Note /20, Provisoire", () => {
    const csv = buildClassSynthesisCsv([row()]);
    const [header] = csv.split("\n");
    expect(header).toBe(["Code", "Classe", ...COMPETENCY_IDS, "Note /20", "Provisoire"].join(";"));
  });

  it("affiche la note arrondie au demi-point avec une virgule française", () => {
    const csv = buildClassSynthesisCsv([row()]);
    expect(csv).toContain("14,5");
  });

  it("signale une note provisoire dans une colonne dédiée (docs/SPEC.md § 27)", () => {
    const csv = buildClassSynthesisCsv([row({ grade: { ...row().grade, provisional: true } })]);
    const [, dataLine] = csv.split("\n");
    expect(dataLine).toBe("4E2-017;4E2;Non évaluée;Non évaluée;Non évaluée;Non évaluée;Non évaluée;Non évaluée;Non évaluée;Non évaluée;Non évaluée;14,5;Oui");
  });

  it("laisse la cellule de note et de provisoire vides quand la note n'est pas calculable", () => {
    const csv = buildClassSynthesisCsv([
      row({ grade: { noteOn20: null, provisional: true, correctedIntermediateCount: 0, totalIntermediateCount: 4 } }),
    ]);
    const [, dataLine] = csv.split("\n");
    expect(dataLine?.endsWith(";;")).toBe(true);
  });
});

describe("vue facilitant la saisie Pronote (docs/SPEC.md § 41)", () => {
  it("ne contient que le code, la note et la mention provisoire, jamais de connexion Pronote directe", () => {
    const csv = buildPronoteCsv([row()]);
    const [header, dataLine] = csv.split("\n");
    expect(header).toBe("Code;Note /20;Provisoire");
    expect(dataLine).toBe("4E2-017;14,5;Non");
  });
});
