import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SommativeBlockProgram } from "@/components/mission/SommativeBlockProgram";
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

const comparatorOptions = [
  { id: "<" as const, label: "inférieure à" },
  { id: ">" as const, label: "supérieure à" },
];
const thresholdOptions = [
  { id: "2m", label: "2 m", valueM: 2 },
  { id: "3m", label: "3 m", valueM: 3 },
];
const actionOptions = [{ id: "arreter", label: "Arrêter l’engin" }];
const scenarios = [
  { id: "s1", label: "Scénario 1", distanceM: 1 },
  { id: "s2", label: "Scénario 2", distanceM: 2.5 },
];

describe("SommativeBlockProgram (docs/SPEC.md § 23, § 30)", () => {
  beforeEach(() => {
    mockAssessments = [];
    submitAssessment.mockClear();
  });

  it("n'autorise la remise qu'après un test du programme, sans jugement correct/incorrect", async () => {
    const user = userEvent.setup();
    const onSubmitted = vi.fn();

    render(
      <SommativeBlockProgram
        missionId="5E-10"
        itemId="securite-arriere"
        comparatorOptions={comparatorOptions}
        thresholdOptions={thresholdOptions}
        actionOptions={actionOptions}
        scenarios={scenarios}
        onSubmitted={onSubmitted}
      />,
    );

    const testButton = screen.getByRole("button", { name: "Tester le programme" });
    const submitButton = screen.getByRole("button", { name: "Remettre mon évaluation" });
    expect(testButton).toBeDisabled();
    expect(submitButton).toBeDisabled();

    await user.selectOptions(screen.getByLabelText("Comparateur"), "<");
    await user.selectOptions(screen.getByLabelText("Seuil"), "2m");
    await user.selectOptions(screen.getByLabelText("Action si la condition est vraie"), "arreter");

    expect(testButton).toBeEnabled();
    await user.click(testButton);

    expect(
      screen.getByText("Scénario 1 (distance mesurée : 1 m) : action déclenchée (Arrêter l’engin)."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Scénario 2 (distance mesurée : 2,5 m) : aucune action déclenchée."),
    ).toBeInTheDocument();
    expect(screen.queryByText(/correct/i)).not.toBeInTheDocument();

    expect(submitButton).toBeEnabled();
    await user.click(submitButton);

    expect(submitAssessment).toHaveBeenCalledWith("5E-10", "securite-arriere", "summative", {
      comparator: "<",
      thresholdM: 2,
      action: "arreter",
      otherwise: null,
    });
    expect(await screen.findByText("Évaluation enregistrée. Ton résultat sera disponible après correction.")).toBeInTheDocument();
    expect(onSubmitted).toHaveBeenCalledTimes(1);
  });

  it("redemande un test si la configuration change après un premier essai", async () => {
    const user = userEvent.setup();

    render(
      <SommativeBlockProgram
        missionId="5E-10"
        itemId="securite-arriere"
        comparatorOptions={comparatorOptions}
        thresholdOptions={thresholdOptions}
        actionOptions={actionOptions}
        scenarios={scenarios}
      />,
    );

    await user.selectOptions(screen.getByLabelText("Comparateur"), "<");
    await user.selectOptions(screen.getByLabelText("Seuil"), "2m");
    await user.selectOptions(screen.getByLabelText("Action si la condition est vraie"), "arreter");
    await user.click(screen.getByRole("button", { name: "Tester le programme" }));

    expect(screen.getByRole("button", { name: "Remettre mon évaluation" })).toBeEnabled();

    await user.selectOptions(screen.getByLabelText("Seuil"), "3m");

    expect(screen.getByRole("button", { name: "Remettre mon évaluation" })).toBeDisabled();
    expect(screen.getByText("Teste ton programme sur les trois scénarios avant de le remettre.")).toBeInTheDocument();
  });

  it("exige et exécute la branche « SINON » lorsqu’elle est demandée", async () => {
    const user = userEvent.setup();

    render(
      <SommativeBlockProgram
        missionId="4E-06"
        itemId="securite-deplacement"
        comparatorOptions={comparatorOptions}
        thresholdOptions={thresholdOptions}
        actionOptions={actionOptions}
        elseActionOptions={[{ id: "autoriser", label: "Autoriser le déplacement" }]}
        scenarios={scenarios}
      />,
    );

    expect(screen.getByText("Mon programme")).toBeInTheDocument();
    expect(screen.getByText("SINON")).toBeInTheDocument();
    await user.selectOptions(screen.getByLabelText("Comparateur"), "<");
    await user.selectOptions(screen.getByLabelText("Seuil"), "2m");
    await user.selectOptions(screen.getByLabelText("Action si la condition est vraie"), "arreter");
    expect(screen.getByRole("button", { name: "Tester le programme" })).toBeDisabled();
    await user.selectOptions(screen.getByLabelText("Action sinon"), "autoriser");
    await user.click(screen.getByRole("button", { name: "Tester le programme" }));

    expect(
      screen.getByText("Scénario 2 (distance mesurée : 2,5 m) : action déclenchée (Autoriser le déplacement)."),
    ).toBeInTheDocument();
    expect(screen.queryByText(/correct/i)).not.toBeInTheDocument();
  });

  it("reste affiché comme déjà remis après un remontage (rechargement de page)", () => {
    mockAssessments = [
      {
        missionId: "5E-10",
        itemId: "securite-arriere",
        kind: "summative",
        responses: { comparator: "<", thresholdM: 2, action: "arreter" },
        submittedAt: "2026-09-20T10:00:00.000Z",
        status: "pending",
      },
    ];

    render(
      <SommativeBlockProgram
        missionId="5E-10"
        itemId="securite-arriere"
        comparatorOptions={comparatorOptions}
        thresholdOptions={thresholdOptions}
        actionOptions={actionOptions}
        scenarios={scenarios}
      />,
    );

    expect(screen.getByText("Évaluation enregistrée. Ton résultat sera disponible après correction.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Tester le programme" })).not.toBeInTheDocument();
  });
});
