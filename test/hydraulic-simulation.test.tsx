import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HydraulicSimulation } from "@/components/mission/HydraulicSimulation";

describe("interface de simulation hydraulique", () => {
  it("permet de modifier un réglage et de lire une mesure", async () => {
    const user = userEvent.setup();
    const onSimulationRun = vi.fn();
    render(<HydraulicSimulation onSimulationRun={onSimulationRun} />);

    const sliders = screen.getAllByRole("slider");
    await user.click(sliders[1]!);
    await user.keyboard("{ArrowRight}");
    await user.click(screen.getByRole("button", { name: "Lancer la simulation" }));

    expect(screen.getByText("Mesure de la simulation")).toBeVisible();
    expect(screen.getByText(/Vitesse qualitative du mouvement/)).toBeVisible();
    expect(onSimulationRun).toHaveBeenCalledOnce();
  });
});