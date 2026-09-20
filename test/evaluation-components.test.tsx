import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DiagnosticNotice } from "@/components/evaluation/DiagnosticNotice";
import { SommativeSubmittedNotice } from "@/components/evaluation/SommativeSubmittedNotice";
import { MasteryBadge } from "@/components/evaluation/MasteryBadge";
import { GradeDisplay } from "@/components/evaluation/GradeDisplay";
import { MASTERY_LEVEL_LABELS } from "@content/evaluations";
import type { MasteryLevel } from "@/lib/evaluations/mastery";

describe("DiagnosticNotice", () => {
  it("affiche le message obligatoire (docs/SPEC.md § 21)", () => {
    render(<DiagnosticNotice />);
    expect(
      screen.getByText("Cette activité sert à savoir ce que tu connais déjà. Elle ne compte pas dans ta note."),
    ).toBeInTheDocument();
  });
});

describe("SommativeSubmittedNotice", () => {
  it("affiche le message obligatoire (docs/SPEC.md § 23)", () => {
    render(<SommativeSubmittedNotice />);
    expect(
      screen.getByText("Évaluation enregistrée. Ton résultat sera disponible après correction."),
    ).toBeInTheDocument();
  });
});

describe("MasteryBadge", () => {
  const levels: MasteryLevel[] = ["non-evaluee", "insuffisante", "fragile", "satisfaisante", "tres-bonne"];

  it.each(levels)("affiche le libellé attendu pour %s", (level) => {
    render(<MasteryBadge level={level} />);
    expect(screen.getByText(MASTERY_LEVEL_LABELS[level])).toBeInTheDocument();
  });
});

describe("GradeDisplay", () => {
  it("affiche « Note non calculable » quand aucune note n'existe", () => {
    render(<GradeDisplay grade={{ noteOn20: null, provisional: true, correctedIntermediateCount: 0, totalIntermediateCount: 0 }} />);
    expect(screen.getByText("Note non calculable pour le moment")).toBeInTheDocument();
  });

  it("affiche la note arrondie et la mention « Note provisoire » si nécessaire", () => {
    render(
      <GradeDisplay
        grade={{ noteOn20: 14.26, provisional: true, correctedIntermediateCount: 2, totalIntermediateCount: 4 }}
      />,
    );
    expect(screen.getByText("14.5 / 20")).toBeInTheDocument();
    expect(screen.getByText("Note provisoire")).toBeInTheDocument();
  });

  it("n'affiche pas « Note provisoire » quand la note est définitive", () => {
    render(
      <GradeDisplay
        grade={{ noteOn20: 16, provisional: false, correctedIntermediateCount: 4, totalIntermediateCount: 4 }}
      />,
    );
    expect(screen.queryByText("Note provisoire")).not.toBeInTheDocument();
  });
});
