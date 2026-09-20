import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SituationReelle } from "@/components/mission/SituationReelle";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";

/**
 * Distinction explicite réel / simulation (docs/SPEC.md § 6, § 64 test 28).
 */
describe("distinction réel / simulation", () => {
  it("SituationReelle affiche le bandeau « Situation réelle »", () => {
    render(<SituationReelle>Contenu réel</SituationReelle>);
    expect(screen.getByText("Situation réelle")).toBeInTheDocument();
    expect(screen.getByText("Contenu réel")).toBeInTheDocument();
  });

  it("SimulationPedagogique affiche le bandeau « Simulation pédagogique »", () => {
    render(<SimulationPedagogique>Contenu simulé</SimulationPedagogique>);
    expect(screen.getByText("Simulation pédagogique")).toBeInTheDocument();
    expect(screen.getByText("Contenu simulé")).toBeInTheDocument();
  });

  it("les deux bandeaux affichent un texte différent (jamais la seule couleur pour distinguer)", () => {
    const { unmount } = render(<SituationReelle>A</SituationReelle>);
    const realBadge = screen.getByText("Situation réelle");
    unmount();

    render(<SimulationPedagogique>B</SimulationPedagogique>);
    const simBadge = screen.getByText("Simulation pédagogique");

    expect(realBadge.textContent).not.toBe(simBadge.textContent);
  });

  it("SimulationPedagogique peut annoncer des valeurs simplifiées", () => {
    render(<SimulationPedagogique valeursSimplifiees>Contenu</SimulationPedagogique>);
    expect(
      screen.getByText("Les valeurs ont été simplifiées pour permettre l’activité."),
    ).toBeInTheDocument();
  });
});
