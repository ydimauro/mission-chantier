import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ResourcesClient } from "@/components/resources/ResourcesClient";

describe("ressources", () => {
  it("classe les objets des missions et permet une recherche", async () => {
    const user = userEvent.setup();
    render(<ResourcesClient />);
    expect(screen.getByRole("button", { name: "Engins" })).toBeInTheDocument();
    expect(screen.getByText("Pelle hydraulique")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Photographie d’illustration : Pelle hydraulique" })).toBeInTheDocument();
    await user.type(screen.getByRole("searchbox"), "capteur");
    expect(screen.getByText("Capteur de proximité")).toBeInTheDocument();
    expect(screen.queryByText("Bulldozer")).not.toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /Photographie d’illustration/ })).not.toBeInTheDocument();

    await user.clear(screen.getByRole("searchbox"));
    await user.type(screen.getByRole("searchbox"), "calculateur");
    expect(screen.getByText("Calculateur")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /Photographie d’illustration/ })).not.toBeInTheDocument();

    await user.clear(screen.getByRole("searchbox"));
    await user.type(screen.getByRole("searchbox"), "pompe");
    expect(screen.getByRole("img", { name: "Photographie d’illustration : Pompe hydraulique" })).toBeInTheDocument();
  });

  it("allège le glossaire en n’affichant pas de photographie", async () => {
    const user = userEvent.setup();
    render(<ResourcesClient />);

    await user.click(screen.getByRole("button", { name: "Glossaire" }));

    expect(screen.getByText("Besoin")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /Photographie d’illustration/ })).not.toBeInTheDocument();
  });
});
