import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DiagnosticChecklist } from "@/components/mission/DiagnosticChecklist";

const options = [
  { id: "a", label: "Option A" },
  { id: "b", label: "Option B" },
];

describe("DiagnosticChecklist (docs/SPEC.md § 21)", () => {
  it("affiche la question et les options", () => {
    render(<DiagnosticChecklist question="Que vois-tu ?" options={options} />);
    expect(screen.getByText("Que vois-tu ?")).toBeInTheDocument();
    expect(screen.getByLabelText("Option A")).toBeInTheDocument();
  });

  it("coche et décoche une option, et prévient le parent à chaque changement", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DiagnosticChecklist question="Que vois-tu ?" options={options} onChange={onChange} />);

    await user.click(screen.getByLabelText("Option A"));
    expect(onChange).toHaveBeenLastCalledWith(["a"]);

    await user.click(screen.getByLabelText("Option B"));
    expect(onChange).toHaveBeenLastCalledWith(["a", "b"]);

    await user.click(screen.getByLabelText("Option A"));
    expect(onChange).toHaveBeenLastCalledWith(["b"]);
  });

  it("reprend les choix transmis par l’accueil", () => {
    render(<DiagnosticChecklist question="Que vois-tu ?" options={options} initialSelected={["b"]} />);

    expect(screen.getByLabelText("Option B")).toBeChecked();
    expect(screen.getByLabelText("Option A")).not.toBeChecked();
  });
});
