import { describe, expect, it } from "vitest";
import { studentFileSchema } from "@/lib/schemas/student-file";
import { createInitialStudentFile } from "@/lib/progression/model";

describe("schéma du fichier élève .mcjson", () => {
  it("valide un fichier fraîchement créé", () => {
    const file = createInitialStudentFile({
      studentCode: "4E2-017",
      classe: "4E2",
      niveau: "4e",
    });
    expect(studentFileSchema.safeParse(file).success).toBe(true);
  });

  it("refuse un schemaVersion différent de 1", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    const result = studentFileSchema.safeParse({ ...file, schemaVersion: 2 });
    expect(result.success).toBe(false);
  });

  it("refuse un code élève vide", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    const result = studentFileSchema.safeParse({ ...file, studentCode: "" });
    expect(result.success).toBe(false);
  });

  it("refuse un niveau inconnu", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    const result = studentFileSchema.safeParse({ ...file, niveau: "3e" });
    expect(result.success).toBe(false);
  });

  it("refuse une révision négative", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    const result = studentFileSchema.safeParse({ ...file, revision: -1 });
    expect(result.success).toBe(false);
  });
});
