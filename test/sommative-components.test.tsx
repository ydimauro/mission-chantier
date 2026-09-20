import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SommativeChoiceJustified } from "@/components/mission/SommativeChoiceJustified";
import { SommativeAssociation } from "@/components/mission/SommativeAssociation";

const submitAssessment = vi.fn().mockResolvedValue({ ok: true });

vi.mock("@/providers/progression-provider", () => ({
  useProgression: () => ({ submitAssessment }),
}));

describe("SommativeChoiceJustified (docs/SPEC.md § 23, § 30)", () => {
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
});

describe("SommativeAssociation (docs/SPEC.md § 23, § 30)", () => {
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
});
