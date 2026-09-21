import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SommativeDiagnostic } from "@/components/mission/SommativeDiagnostic";
import { createInitialStudentFile } from "@/lib/progression/model";

const submitAssessment = vi.fn().mockResolvedValue({ ok: true });

vi.mock("@/providers/progression-provider", () => ({
  useProgression: () => ({
    submitAssessment,
    snapshot: { status: "ready", file: createInitialStudentFile({ studentCode: "4E1-001", classe: "4E1", niveau: "4e" }) },
  }),
}));

const tests = [
  { id: "a", label: "Tester A", result: "Résultat A" },
  { id: "b", label: "Tester B", result: "Résultat B" },
];
const causes = [{ id: "cause", label: "Cause proposée" }];
const solutions = [{ id: "solution", label: "Solution proposée" }];

describe("SommativeDiagnostic", () => {
  beforeEach(() => submitAssessment.mockClear());

  it("exige deux tests, une cause et une solution sans afficher de correction", async () => {
    const user = userEvent.setup();
    render(<SommativeDiagnostic missionId="4E-05" itemId="diagnostic-panne" tests={tests} causes={causes} solutions={solutions} />);

    const submit = screen.getByRole("button", { name: "Remettre mon évaluation" });
    expect(submit).toBeDisabled();
    await user.selectOptions(screen.getByLabelText("Choisis un test à réaliser."), "a");
    await user.click(screen.getByRole("button", { name: "Réaliser ce test" }));
    await user.selectOptions(screen.getByLabelText("Choisis un test à réaliser."), "b");
    await user.click(screen.getByRole("button", { name: "Réaliser ce test" }));
    expect(screen.getByText("Résultat A")).toBeVisible();
    await user.selectOptions(screen.getByLabelText("Cause retenue"), "cause");
    await user.selectOptions(screen.getByLabelText("Solution proposée"), "solution");
    await user.click(submit);

    expect(submitAssessment).toHaveBeenCalledWith("4E-05", "diagnostic-panne", "summative", {
      testedIds: ["a", "b"],
      cause: "cause",
      solution: "solution",
    });
    expect(await screen.findByText("Évaluation enregistrée. Ton résultat sera disponible après correction.")).toBeVisible();
  });
});