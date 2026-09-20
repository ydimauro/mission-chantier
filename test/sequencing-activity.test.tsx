import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SequencingActivity } from "@/components/mission/SequencingActivity";

const steps = [
  { id: "source", label: "Source d’énergie" },
  { id: "moteur", label: "Moteur" },
  { id: "mouvement", label: "Mouvement du bras" },
];
const correctSequence = ["source", "moteur", "mouvement"];

describe("SequencingActivity (5E-06)", () => {
  it("félicite un ordre entièrement correct", async () => {
    const user = userEvent.setup();
    render(<SequencingActivity steps={steps} correctSequence={correctSequence} />);

    const selects = screen.getAllByRole("combobox");
    await user.selectOptions(selects[0]!, "1");
    await user.selectOptions(selects[1]!, "2");
    await user.selectOptions(selects[2]!, "3");
    await user.click(screen.getByRole("button", { name: "Vérifier" }));

    expect(screen.getByText("Bravo, toutes tes réponses sont correctes.")).toBeInTheDocument();
  });

  it("signale un ordre partiellement correct", async () => {
    const user = userEvent.setup();
    render(<SequencingActivity steps={steps} correctSequence={correctSequence} />);

    const selects = screen.getAllByRole("combobox");
    await user.selectOptions(selects[0]!, "2");
    await user.selectOptions(selects[1]!, "1");
    await user.selectOptions(selects[2]!, "3");
    await user.click(screen.getByRole("button", { name: "Vérifier" }));

    expect(screen.getByText("Tu as 1 bonne réponse sur 3. Regarde les réponses entourées et corrige-les.")).toBeInTheDocument();
  });
});
