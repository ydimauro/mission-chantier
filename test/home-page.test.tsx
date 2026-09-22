import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("accueil", () => {
  it("annonce la situation réelle, oriente vers les missions et ne répète pas la trace écrite", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Givors se transforme" })).toBeInTheDocument();
    expect(screen.getByText("Situation réelle")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ouvrir mes missions" })).toHaveAttribute("href", "/mission");
    expect(screen.getByRole("img", { name: /Vue en hauteur d’un chantier/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Bienvenue dans Mission Chantier" })).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ouvrir les ressources/ })).toHaveAttribute("target", "_blank");
  });
});
