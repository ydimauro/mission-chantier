import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";

describe("accueil", () => {
  it("annonce la situation réelle, transmet les observations et ne répète pas la trace écrite", async () => {
    const user = userEvent.setup();
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Givors se transforme" })).toBeInTheDocument();
    expect(screen.getByText("Situation réelle")).toBeInTheDocument();
    const missionLink = screen.getByRole("link", { name: "Ouvrir mes missions" });
    expect(missionLink).toHaveAttribute("href", "/mission");
    await user.click(screen.getByRole("checkbox", { name: "On démolit" }));
    expect(missionLink).toHaveAttribute("href", "/mission?observations=on-demolit");
    expect(screen.getByRole("img", { name: /Vue en hauteur d’un chantier/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Que se passe-t-il ici ?" })).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ouvrir les ressources/ })).toHaveAttribute("target", "_blank");
  });
});
