import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SommativeBlockProgram } from "@/components/mission/SommativeBlockProgram";

const submitAssessment = vi.fn().mockResolvedValue({ ok: true });

vi.mock("@/providers/progression-provider", () => ({
  useProgression: () => ({ submitAssessment }),
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
    await user.selectOptions(screen.getByLabelText("Action"), "arreter");

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
    await user.selectOptions(screen.getByLabelText("Action"), "arreter");
    await user.click(screen.getByRole("button", { name: "Tester le programme" }));

    expect(screen.getByRole("button", { name: "Remettre mon évaluation" })).toBeEnabled();

    await user.selectOptions(screen.getByLabelText("Seuil"), "3m");

    expect(screen.getByRole("button", { name: "Remettre mon évaluation" })).toBeDisabled();
    expect(screen.getByText("Teste ton programme sur les trois scénarios avant de le remettre.")).toBeInTheDocument();
  });
});
