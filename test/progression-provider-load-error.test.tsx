import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProgressionProvider } from "@/providers/progression-provider";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";

const getStudentFile = vi.fn();

vi.mock("@/lib/db/progression-db", async () => {
  const actual = await vi.importActual<typeof import("@/lib/db/progression-db")>("@/lib/db/progression-db");
  return {
    ...actual,
    getStudentFile: (...args: Parameters<typeof actual.getStudentFile>) => getStudentFile(...args),
  };
});

vi.mock("@/lib/storage", async () => {
  const actual = await vi.importActual<typeof import("@/lib/storage")>("@/lib/storage");
  return {
    ...actual,
    // Simule un élève déjà identifié sur ce poste (code stocké lors d’une session précédente).
    readStoredJson: (key: string) => (key === actual.STORAGE_KEYS.activeStudentCode ? "REVENANT01" : null),
  };
});

vi.mock("@/providers/level-provider", () => ({
  useLevel: () => ({ level: "5e", setLevel: vi.fn() }),
}));

/**
 * Reproduit exactement le bogue de l’audit ÉTAPE 10 : un élève déjà
 * identifié sur ce poste (code stocké en localStorage) revient, mais la
 * lecture IndexedDB de son fichier échoue (navigation privée restrictive,
 * quota dépassé, donnée corrompue...). Sans filet, la promesse rejetée
 * n’est jamais rattrapée, `loadedState` ne passe jamais de `null` à une
 * valeur, et toute page protégée par `RequireStudentIdentity` reste
 * bloquée sur "loading" (donc vide) indéfiniment, sans aucun message.
 */
describe("ProgressionProvider : échec du chargement initial (audit ÉTAPE 10 § 2, § 11)", () => {
  beforeEach(() => {
    getStudentFile.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("affiche un message d’erreur explicite, jamais une zone vide, si le chargement échoue", async () => {
    getStudentFile.mockRejectedValue(new Error("Panne IndexedDB simulée"));

    render(
      <ProgressionProvider>
        <RequireStudentIdentity>
          <p>Contenu protégé</p>
        </RequireStudentIdentity>
      </ProgressionProvider>,
    );

    expect(await screen.findByRole("alert")).toHaveTextContent("Impossible de charger ta progression");
    expect(screen.queryByText("Contenu protégé")).not.toBeInTheDocument();
  });

  it("permet de reprendre après un échec via « Réessayer »", async () => {
    const user = userEvent.setup();
    getStudentFile.mockRejectedValueOnce(new Error("Panne IndexedDB simulée"));
    getStudentFile.mockResolvedValue(null);

    render(
      <ProgressionProvider>
        <RequireStudentIdentity>
          <p>Contenu protégé</p>
        </RequireStudentIdentity>
      </ProgressionProvider>,
    );

    await screen.findByRole("alert");
    await user.click(screen.getByRole("button", { name: "Réessayer" }));

    expect(await screen.findByRole("heading", { name: "Qui es-tu ?" })).toBeInTheDocument();
  });

  it("permet de reprendre après un échec via « Commencer une nouvelle progression » sans rester bloqué en erreur", async () => {
    const user = userEvent.setup();
    getStudentFile.mockRejectedValue(new Error("Panne IndexedDB simulée"));

    render(
      <ProgressionProvider>
        <RequireStudentIdentity>
          <p>Contenu protégé</p>
        </RequireStudentIdentity>
      </ProgressionProvider>,
    );

    await screen.findByRole("alert");
    await user.click(screen.getByRole("button", { name: "Commencer une nouvelle progression" }));

    expect(await screen.findByRole("heading", { name: "Qui es-tu ?" })).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("sort de l’état de chargement grâce au délai de sécurité, même si la lecture ne se résout jamais", async () => {
    vi.useFakeTimers();
    getStudentFile.mockReturnValue(new Promise(() => {}));

    render(
      <ProgressionProvider>
        <RequireStudentIdentity>
          <p>Contenu protégé</p>
        </RequireStudentIdentity>
      </ProgressionProvider>,
    );

    expect(screen.getByRole("status")).toHaveTextContent("Chargement de ta progression…");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(8000);
    });

    expect(screen.getByRole("alert")).toHaveTextContent("Impossible de charger ta progression");
    expect(screen.queryByText("Contenu protégé")).not.toBeInTheDocument();
  });
});
