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
    expect(screen.getByRole("img", { name: "Illustration pédagogique : Pelle hydraulique" })).toBeInTheDocument();
    await user.type(screen.getByRole("searchbox"), "capteur");
    expect(screen.getByText("Capteur de proximité")).toBeInTheDocument();
    expect(screen.queryByText("Bulldozer")).not.toBeInTheDocument();
  });
});
