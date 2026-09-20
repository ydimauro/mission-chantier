import { describe, expect, it } from "vitest";
import { APP_NAME, COPYRIGHT_TEXT, COPYRIGHT_NOTICE } from "@content/config";

describe("constantes centrales de l'application", () => {
  it("respecte le nom exact de l’application (docs/SPEC.md § 56)", () => {
    expect(APP_NAME).toBe("Mission Chantier");
  });

  it("affiche le copyright exact attendu", () => {
    expect(COPYRIGHT_TEXT).toBe("© 2026 - Mission Chantier - Yann Di Mauro");
  });

  it("porte la mention obligatoire du certificat (docs/SPEC.md § 54)", () => {
    expect(COPYRIGHT_NOTICE).toBe(
      "Document pédagogique interne. Ne constitue pas un diplôme officiel.",
    );
  });
});
