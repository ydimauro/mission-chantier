import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("accueil", () => {
  it("annonce la situation réelle, permet une première observation et conduit vers la mission", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Givors se transforme" })).toBeInTheDocument();
    expect(screen.getByText("Situation réelle")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Commencer ma mission" })).toHaveAttribute("href", "/mission");
    expect(screen.getByRole("img", { name: /Vue en hauteur d’un chantier/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Que se passe-t-il ici ?" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "On démolit" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Écris dans ton cours" })).toBeInTheDocument();
  });
});