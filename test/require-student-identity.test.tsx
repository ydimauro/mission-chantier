import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";

const retryLoad = vi.fn();
let mockSnapshot: { status: string; [key: string]: unknown } = { status: "loading" };

vi.mock("@/providers/progression-provider", () => ({
  useProgression: () => ({
    snapshot: mockSnapshot,
    createIdentity: vi.fn(),
    retryLoad,
  }),
}));

vi.mock("@/providers/level-provider", () => ({
  useLevel: () => ({ level: "5e", setLevel: vi.fn() }),
}));

/**
 * La zone principale d’une page protégée ne doit jamais rester vide sans
 * explication (audit ÉTAPE 10 § 11) : chargement et erreur ont chacun un
 * message explicite, distinct d’un simple `return null`.
 */
describe("RequireStudentIdentity (audit ÉTAPE 10 § 11)", () => {
  it("affiche un message explicite pendant le chargement, jamais une zone vide", () => {
    mockSnapshot = { status: "loading" };
    render(
      <RequireStudentIdentity>
        <p>Contenu protégé</p>
      </RequireStudentIdentity>,
    );

    expect(screen.getByRole("status")).toHaveTextContent("Chargement de ta progression…");
    expect(screen.queryByText("Contenu protégé")).not.toBeInTheDocument();
  });

  it("affiche un message explicite avec action de reprise en cas d’échec du chargement", async () => {
    const user = userEvent.setup();
    mockSnapshot = { status: "error" };
    render(
      <RequireStudentIdentity>
        <p>Contenu protégé</p>
      </RequireStudentIdentity>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Impossible de charger ta progression");
    expect(screen.queryByText("Contenu protégé")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Réessayer" }));
    expect(retryLoad).toHaveBeenCalledTimes(1);
  });

  it("affiche le contenu protégé une fois la progression prête", () => {
    mockSnapshot = { status: "ready", file: { studentCode: "5E1-001" } };
    render(
      <RequireStudentIdentity>
        <p>Contenu protégé</p>
      </RequireStudentIdentity>,
    );

    expect(screen.getByText("Contenu protégé")).toBeInTheDocument();
  });

  it("affiche le formulaire d’identification quand aucune identité n’existe", () => {
    mockSnapshot = { status: "no-identity" };
    render(
      <RequireStudentIdentity>
        <p>Contenu protégé</p>
      </RequireStudentIdentity>,
    );

    expect(screen.getByRole("heading", { name: "Qui es-tu ?" })).toBeInTheDocument();
    expect(screen.queryByText("Contenu protégé")).not.toBeInTheDocument();
  });
});
