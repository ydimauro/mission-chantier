import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SommativeChoiceJustified } from "@/components/mission/SommativeChoiceJustified";
import { SommativeAssociation } from "@/components/mission/SommativeAssociation";
import { createInitialStudentFile } from "@/lib/progression/model";
import type { AssessmentSubmission } from "@/lib/schemas/assessment-submission";

const submitAssessment = vi.fn().mockResolvedValue({ ok: true });
let mockAssessments: AssessmentSubmission[] = [];

vi.mock("@/providers/progression-provider", () => ({
  useProgression: () => ({
    submitAssessment,
    snapshot: {
      status: "ready",
      file: { ...createInitialStudentFile({ studentCode: "5E1-001", classe: "5E1", niveau: "5e" }), assessments: mockAssessments },
    },
  }),
}));

describe("SommativeChoiceJustified (docs/SPEC.md § 23, § 30)", () => {
  beforeEach(() => {
    mockAssessments = [];
    submitAssessment.mockClear();
  });

  it("n'autorise la remise qu'avec un choix et une justification", async () => {
    const user = userEvent.setup();
    const onSubmitted = vi.fn();
    render(
      <SommativeChoiceJustified
        missionId="5E-04"
        itemId="choix-engin"
        question="Quel engin choisis-tu ?"
        criteriaLabels={["Masse", "Coût"]}
        options={[
          { id: "pelle", label: "Pelle hydraulique", criteriaValues: ["12 t", "élevé"] },
          { id: "chargeuse", label: "Chargeuse", criteriaValues: ["8 t", "moyen"] },
        ]}
        onSubmitted={onSubmitted}
      />,
    );

    const submit = screen.getByRole("button", { name: "Remettre mon évaluation" });
    expect(submit).toBeDisabled();

    await user.click(screen.getByLabelText("Pelle hydraulique"));
    expect(submit).toBeDisabled();

    await user.type(screen.getByLabelText("Explique ton choix."), "Elle est adaptée au terrain.");
    expect(submit).toBeEnabled();

    await user.click(submit);
    expect(submitAssessment).toHaveBeenCalledWith("5E-04", "choix-engin", "summative", {
      choiceId: "pelle",
      justification: "Elle est adaptée au terrain.",
    });
    expect(await screen.findByText("Évaluation enregistrée. Ton résultat sera disponible après correction.")).toBeInTheDocument();
    expect(onSubmitted).toHaveBeenCalledTimes(1);
  });

  it("n'affiche aucune aide ni correction immédiate (docs/SPEC.md § 30)", () => {
    render(
      <SommativeChoiceJustified
        missionId="5E-04"
        itemId="choix-engin"
        question="Quel engin choisis-tu ?"
        criteriaLabels={["Masse"]}
        options={[{ id: "pelle", label: "Pelle hydraulique", criteriaValues: ["12 t"] }]}
      />,
    );
    expect(screen.queryByText("Voir un indice")).not.toBeInTheDocument();
  });

  it("dépose en « final » quand la mission le demande (docs/EVALUATIONS.md § 4.2)", async () => {
    const user = userEvent.setup();
    render(
      <SommativeChoiceJustified
        missionId="5E-FINAL"
        itemId="choix-engin"
        question="Quel engin choisis-tu ?"
        criteriaLabels={["Masse"]}
        options={[{ id: "pelle", label: "Pelle hydraulique", criteriaValues: ["12 t"] }]}
        kind="final"
      />,
    );

    await user.click(screen.getByLabelText("Pelle hydraulique"));
    await user.type(screen.getByLabelText("Explique ton choix."), "Adaptée à la tâche.");
    await user.click(screen.getByRole("button", { name: "Remettre mon évaluation" }));

    expect(submitAssessment).toHaveBeenCalledWith("5E-FINAL", "choix-engin", "final", {
      choiceId: "pelle",
      justification: "Adaptée à la tâche.",
    });
  });

  it("reste affiché comme déjà remis après un remontage (rechargement de page), sans repermettre un second dépôt", () => {
    mockAssessments = [
      {
        missionId: "5E-04",
        itemId: "choix-engin",
        kind: "summative",
        responses: { choiceId: "pelle", justification: "Premier choix." },
        submittedAt: "2026-09-20T10:00:00.000Z",
        status: "pending",
      },
    ];

    render(
      <SommativeChoiceJustified
        missionId="5E-04"
        itemId="choix-engin"
        question="Quel engin choisis-tu ?"
        criteriaLabels={["Masse"]}
        options={[{ id: "pelle", label: "Pelle hydraulique", criteriaValues: ["12 t"] }]}
      />,
    );

    expect(screen.getByText("Évaluation enregistrée. Ton résultat sera disponible après correction.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Remettre mon évaluation" })).not.toBeInTheDocument();
  });
});

describe("SommativeAssociation (docs/SPEC.md § 23, § 30)", () => {
  beforeEach(() => {
    mockAssessments = [];
    submitAssessment.mockClear();
  });

  it("dépose les réponses sans révéler ce qui est correct", async () => {
    const user = userEvent.setup();
    const onSubmitted = vi.fn();
    render(
      <SommativeAssociation
        missionId="5E-05"
        itemId="mei"
        items={[{ id: "terre", prompt: "Terre", correctChoiceId: "matiere" }]}
        choices={[
          { id: "matiere", label: "Matière" },
          { id: "energie", label: "Énergie" },
        ]}
        onSubmitted={onSubmitted}
      />,
    );

    await user.selectOptions(screen.getByRole("combobox"), "matiere");
    await user.click(screen.getByRole("button", { name: "Remettre mon évaluation" }));

    expect(submitAssessment).toHaveBeenCalledWith("5E-05", "mei", "summative", {
      answers: { terre: "matiere" },
    });
    expect(await screen.findByText("Évaluation enregistrée. Ton résultat sera disponible après correction.")).toBeInTheDocument();
    expect(onSubmitted).toHaveBeenCalledTimes(1);
  });

  it("dépose en « final » quand la mission le demande (docs/EVALUATIONS.md § 4.2)", async () => {
    const user = userEvent.setup();
    render(
      <SommativeAssociation
        missionId="5E-FINAL"
        itemId="lecture-contraintes"
        items={[{ id: "s1", prompt: "Situation", correctChoiceId: "zone-interdite" }]}
        choices={[{ id: "zone-interdite", label: "Zone interdite" }]}
        kind="final"
      />,
    );

    await user.selectOptions(screen.getByRole("combobox"), "zone-interdite");
    await user.click(screen.getByRole("button", { name: "Remettre mon évaluation" }));

    expect(submitAssessment).toHaveBeenCalledWith("5E-FINAL", "lecture-contraintes", "final", {
      answers: { s1: "zone-interdite" },
    });
  });

  it("reste affiché comme déjà remis après un remontage, même si le dépôt est déjà corrigé", () => {
    mockAssessments = [
      {
        missionId: "5E-05",
        itemId: "mei",
        kind: "summative",
        responses: { answers: { terre: "matiere" } },
        submittedAt: "2026-09-20T10:00:00.000Z",
        status: "corrected",
        score: 1,
      },
    ];

    render(
      <SommativeAssociation
        missionId="5E-05"
        itemId="mei"
        items={[{ id: "terre", prompt: "Terre", correctChoiceId: "matiere" }]}
        choices={[
          { id: "matiere", label: "Matière" },
          { id: "energie", label: "Énergie" },
        ]}
      />,
    );

    expect(screen.getByText("Évaluation enregistrée. Ton résultat sera disponible après correction.")).toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });
});
