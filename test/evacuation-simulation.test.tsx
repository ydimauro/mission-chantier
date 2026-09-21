import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EvacuationSimulation } from "@/components/mission/EvacuationSimulation";

describe("interface de simulation d’évacuation", () => {
  it("permet de modifier un paramètre et de lire les mesures", async () => {
    const user = userEvent.setup();
    const onSimulationRun = vi.fn();

    render(<EvacuationSimulation onSimulationRun={onSimulationRun} />);

    expect(screen.getByRole("img", { name: "Plan 2D du Quartier des Ateliers" })).toBeVisible();
    await user.clear(screen.getByLabelText("Nombre d’engins"));
    await user.type(screen.getByLabelText("Nombre d’engins"), "2");
    await user.click(screen.getByRole("button", { name: "Lancer la simulation" }));

    expect(screen.getByText("Mesures de la simulation")).toBeVisible();
    expect(screen.getByText("32 min")).toBeVisible();
    expect(onSimulationRun).toHaveBeenCalledOnce();
  });
});