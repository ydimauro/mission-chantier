import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SommativeSimulationReport } from "@/components/mission/SommativeSimulationReport";

const submitAssessment = vi.fn().mockResolvedValue({ ok: true });

vi.mock("@/providers/progression-provider", () => ({
  useProgression: () => ({ submitAssessment }),
}));

describe("SommativeSimulationReport (docs/SPEC.md § 23, § 30)", () => {
  it("n'autorise la remise qu'avec hypothèse, mesures et conclusion", async () => {
    const user = userEvent.setup();
    const onSubmitted = vi.fn();

    function Wrapper() {
      const measures = { volumeM3: 18, numberOfTrips: 3, distanceM: 3000, elapsedMinutes: 37, pedagogicalConsumption: 4.5 };
      return (
        <SommativeSimulationReport
          missionId="5E-08"
          itemId="evacuation-gravats"
          hypothesisLabel="Formule ton hypothèse."
          conclusionLabel="Écris ta conclusion."
          measures={null}
          onSubmitted={onSubmitted}
        >
          <button type="button" onClick={() => { /* le vrai moteur lancerait la simulation ici */ }}>
            Lancer la simulation
          </button>
          <p>{JSON.stringify(measures)}</p>
        </SommativeSimulationReport>
      );
    }

    render(<Wrapper />);

    const submit = screen.getByRole("button", { name: "Remettre mon évaluation" });
    expect(submit).toBeDisabled();
    expect(screen.getByText("Lance la simulation au moins une fois avant d’écrire ta conclusion.")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Formule ton hypothèse."), "Deux engins iront plus vite.");
    expect(submit).toBeDisabled();
  });

  it("remet le rapport une fois hypothèse, mesures et conclusion renseignées", async () => {
    const user = userEvent.setup();
    const onSubmitted = vi.fn();
    const measures = { volumeM3: 18, numberOfTrips: 3, distanceM: 3000, elapsedMinutes: 32, pedagogicalConsumption: 4.5 };

    render(
      <SommativeSimulationReport
        missionId="5E-08"
        itemId="evacuation-gravats"
        hypothesisLabel="Formule ton hypothèse."
        conclusionLabel="Écris ta conclusion."
        measures={measures}
        onSubmitted={onSubmitted}
      >
        <p>Simulation (déjà lancée dans ce test)</p>
      </SommativeSimulationReport>,
    );

    await user.type(screen.getByLabelText("Formule ton hypothèse."), "Deux engins iront plus vite.");
    await user.type(screen.getByLabelText("Écris ta conclusion."), "Le temps a bien diminué avec deux engins.");

    const submit = screen.getByRole("button", { name: "Remettre mon évaluation" });
    expect(submit).toBeEnabled();
    await user.click(submit);

    expect(submitAssessment).toHaveBeenCalledWith("5E-08", "evacuation-gravats", "summative", {
      hypothesis: "Deux engins iront plus vite.",
      measures,
      conclusion: "Le temps a bien diminué avec deux engins.",
    });
    expect(await screen.findByText("Évaluation enregistrée. Ton résultat sera disponible après correction.")).toBeInTheDocument();
    expect(onSubmitted).toHaveBeenCalledTimes(1);
  });
});
