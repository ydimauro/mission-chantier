import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SommativeSensorProtocol } from "@/components/mission/SommativeSensorProtocol";
import { createInitialStudentFile } from "@/lib/progression/model";

const submitAssessment = vi.fn().mockResolvedValue({ ok: true });

vi.mock("@/providers/progression-provider", () => ({
  useProgression: () => ({
    submitAssessment,
    snapshot: { status: "ready", file: createInitialStudentFile({ studentCode: "4E1-001", classe: "4E1", niveau: "4e" }) },
  }),
}));

const distances = [{ valueM: 1, label: "1 m" }, { valueM: 2, label: "2 m" }, { valueM: 3, label: "3 m" }];

describe("SommativeSensorProtocol", () => {
  beforeEach(() => submitAssessment.mockClear());

  it("exige trois distances répétées, un seuil et une limite avant le dépôt", async () => {
    const user = userEvent.setup();
    render(<SommativeSensorProtocol missionId="4E-08" itemId="protocole-capteur" distances={distances} thresholdOptions={distances} limitLabel="Limite" />);
    const submit = screen.getByRole("button", { name: "Remettre mon évaluation" });
    expect(submit).toBeDisabled();

    for (const distance of ["1", "1", "2", "2", "3", "3"]) {
      await user.selectOptions(screen.getByLabelText("Distance à tester"), distance);
      await user.click(screen.getByRole("button", { name: "Réaliser un essai" }));
    }

    expect(screen.getAllByRole("row")).toHaveLength(7);
    await user.selectOptions(screen.getByLabelText("Seuil de sécurité proposé"), "2");
    await user.type(screen.getByLabelText("Limite"), "Le test ne représente pas tous les obstacles.");
    expect(submit).toBeEnabled();
    await user.click(submit);
    expect(submitAssessment).toHaveBeenCalledWith("4E-08", "protocole-capteur", "summative", expect.objectContaining({ thresholdM: 2, limits: "Le test ne représente pas tous les obstacles." }));
    expect(await screen.findByText("Évaluation enregistrée. Ton résultat sera disponible après correction.")).toBeInTheDocument();
  });

  it("affiche les observations essai par essai, sans correction", async () => {
    const user = userEvent.setup();
    render(<SommativeSensorProtocol missionId="4E-08" itemId="protocole-capteur" distances={distances} thresholdOptions={distances} limitLabel="Limite" />);
    await user.selectOptions(screen.getByLabelText("Distance à tester"), "1");
    await user.click(screen.getByRole("button", { name: "Réaliser un essai" }));
    expect(screen.getByText("Obstacle détecté")).toBeInTheDocument();
    expect(screen.queryByText(/correct|incorrect/i)).not.toBeInTheDocument();
  });
});