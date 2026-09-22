import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { MissionHub } from "@/components/mission/MissionHub";
import { createInitialStudentFile } from "@/lib/progression/model";
import type { StudentFile } from "@/lib/schemas/student-file";

let mockFile: StudentFile;

vi.mock("@/providers/progression-provider", () => ({
  useProgression: () => ({ snapshot: { status: "ready", file: mockFile } }),
}));

/**
 * Audit ÉTAPE 10 § 3 : pour un nouvel élève de 5e, /mission doit afficher
 * au minimum le parcours, la mission actuelle (5E-00 pour un départ), son
 * objectif, son statut, la progression et un bouton d’action, jamais une
 * zone vide.
 */
describe("MissionHub (audit ÉTAPE 10 § 3)", () => {
  it("oriente un nouvel élève de 5e vers 5E-00 avec objectif, statut et progression", () => {
    mockFile = createInitialStudentFile({ studentCode: "5E1-001", classe: "5E1", niveau: "5e" });

    render(<MissionHub />);

    expect(screen.getByText("Parcours 5e")).toBeInTheDocument();
    expect(screen.getAllByText("5E-00")).toHaveLength(2);
    expect(
      screen.getAllByText("Comment transforme-t-on une partie d’une ville ?"),
    ).toHaveLength(2);
    expect(screen.getByText("Essentielle")).toBeInTheDocument();
    expect(screen.getByText("Missions terminées : 0 sur 14.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Commencer la mission" })).toHaveAttribute(
      "href",
      "/mission/5e-00",
    );
  });

  it("propose « Poursuivre la mission » si l’élève a déjà des réponses enregistrées pour cette mission", () => {
    mockFile = {
      ...createInitialStudentFile({ studentCode: "5E1-001", classe: "5E1", niveau: "5e" }),
      responses: { "5E-00": { diagnostic: ["a"] } },
    };

    render(<MissionHub />);

    expect(screen.getByRole("link", { name: "Poursuivre la mission" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Commencer la mission" })).not.toBeInTheDocument();
  });

  it("affiche un message clair quand tout le parcours connu est terminé", () => {
    mockFile = {
      ...createInitialStudentFile({ studentCode: "5E1-001", classe: "5E1", niveau: "5e" }),
      completedMissionIds: [
        "5E-00",
        "5E-01",
        "5E-02",
        "5E-03",
        "5E-04",
        "5E-05",
        "5E-06",
        "5E-07",
        "5E-08",
        "5E-09",
        "5E-10",
        "5E-11",
        "5E-12",
        "5E-FINAL",
      ],
    };

    render(<MissionHub />);

    expect(
      screen.getByText("Tu as terminé toutes les missions disponibles pour le moment. Reviens un peu plus tard."),
    ).toBeInTheDocument();
  });
});
