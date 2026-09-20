import { describe, expect, it } from "vitest";
import { applyAccommodation } from "@/lib/teacher/accommodation";
import { createInitialStudentFile } from "@/lib/progression/model";

describe("application d'un aménagement individuel (docs/SPEC.md § 31, § 33)", () => {
  it("change l'aménagement et augmente la révision", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    const updated = applyAccommodation(file, "reduced");
    expect(updated.accommodation).toBe("reduced");
    expect(updated.revision).toBe(file.revision + 1);
  });

  it("ne fait rien si l'aménagement est déjà celui demandé", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    const updated = applyAccommodation(file, "standard");
    expect(updated).toBe(file);
  });
});
