import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FolderSetupNotice } from "@/components/progression/FolderSetupNotice";

let supported = true;
let linked = false;

vi.mock("@/providers/progression-provider", () => ({
  useProgression: () => ({
    fileSystemAccessSupported: supported,
    folderLinked: linked,
    chooseFolder: vi.fn(),
    exportFile: vi.fn(),
  }),
}));

describe("choix du dossier de sauvegarde", () => {
  it("propose explicitement le dossier et le fichier .mcjson dans Chrome ou Edge", () => {
    supported = true;
    linked = false;
    render(<FolderSetupNotice />);
    expect(screen.getByText("Où enregistrer mon fichier ?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Choisir où enregistrer mon fichier .mcjson" })).toBeInTheDocument();
  });

  it("explique le repli d’export lorsque le navigateur ne permet pas le choix du dossier", () => {
    supported = false;
    render(<FolderSetupNotice />);
    expect(screen.getByRole("button", { name: "Exporter et choisir l’emplacement du fichier .mcjson" })).toBeInTheDocument();
  });
});
