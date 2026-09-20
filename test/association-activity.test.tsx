import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AssociationActivity } from "@/components/mission/AssociationActivity";

const items = [
  { id: "i1", prompt: "Creuser un trou", correctChoiceId: "pelle" },
  { id: "i2", prompt: "Transporter des gravats", correctChoiceId: "camion" },
];
const choices = [
  { id: "pelle", label: "Pelle hydraulique" },
  { id: "camion", label: "Camion" },
];

describe("AssociationActivity (docs/PEDAGOGIE.md § 7.4)", () => {
  it("désactive Vérifier tant que tout n'est pas répondu", () => {
    render(<AssociationActivity items={items} choices={choices} />);
    expect(screen.getByRole("button", { name: "Vérifier" })).toBeDisabled();
  });

  it("félicite quand toutes les réponses sont correctes", async () => {
    const user = userEvent.setup();
    render(<AssociationActivity items={items} choices={choices} />);

    const selects = screen.getAllByRole("combobox");
    await user.selectOptions(selects[0]!, "pelle");
    await user.selectOptions(selects[1]!, "camion");
    await user.click(screen.getByRole("button", { name: "Vérifier" }));

    expect(screen.getByText("Bravo, toutes tes réponses sont correctes.")).toBeInTheDocument();
  });

  it("propose un nouvel essai et des indices en cas d'erreur", async () => {
    const user = userEvent.setup();
    render(
      <AssociationActivity
        items={items}
        choices={choices}
        hints={["Repense au rôle de chaque engin."]}
      />,
    );

    const selects = screen.getAllByRole("combobox");
    await user.selectOptions(selects[0]!, "camion");
    await user.selectOptions(selects[1]!, "camion");
    await user.click(screen.getByRole("button", { name: "Vérifier" }));

    expect(screen.getByText("Tu as 1 bonne réponse sur 2. Regarde les réponses entourées et corrige-les.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Nouvel essai" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Voir un indice" })).toBeInTheDocument();
  });

  it("permet de recommencer après un nouvel essai", async () => {
    const user = userEvent.setup();
    render(<AssociationActivity items={items} choices={choices} />);

    const selects = screen.getAllByRole("combobox");
    await user.selectOptions(selects[0]!, "camion");
    await user.selectOptions(selects[1]!, "camion");
    await user.click(screen.getByRole("button", { name: "Vérifier" }));
    await user.click(screen.getByRole("button", { name: "Nouvel essai" }));

    expect(screen.getByRole("button", { name: "Vérifier" })).toBeInTheDocument();
  });
});
