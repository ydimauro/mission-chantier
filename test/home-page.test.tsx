import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("accueil", () => {
  it("annonce la situation réelle et conduit vers la mission", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Givors se transforme" })).toBeInTheDocument();
    expect(screen.getByText("Situation réelle")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Commencer ma mission" })).toHaveAttribute("href", "/mission");
    expect(screen.getByRole("img", { name: /Vue en hauteur d’un chantier/ })).toBeInTheDocument();
  });
});