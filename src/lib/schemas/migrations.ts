import { CURRENT_SCHEMA_VERSION, studentFileSchema, type StudentFile } from "@/lib/schemas/student-file";

/**
 * Migrations du fichier élève .mcjson (docs/SPEC.md § 14 AGENTS.md, § 33-34).
 * Jamais de changement silencieux : un fichier trop récent pour cette
 * version de l’application est explicitement refusé, jamais deviné.
 *
 * Quand un schemaVersion 2 sera introduit, ajouter ici une étape
 * `migrateV1ToV2(data): V2Shape` et l’enchaîner avant la validation finale,
 * sans modifier la forme de cette fonction publique.
 */

export type StudentFileParseError =
  | { type: "invalid-json" }
  | { type: "invalid-schema"; issues: readonly string[] }
  | { type: "unsupported-version"; foundVersion: number };

export type StudentFileParseResult =
  | { ok: true; file: StudentFile }
  | { ok: false; error: StudentFileParseError };

function readSchemaVersion(data: unknown): number | null {
  if (data !== null && typeof data === "object" && "schemaVersion" in data) {
    const value = (data as { schemaVersion: unknown }).schemaVersion;
    return typeof value === "number" ? value : null;
  }
  return null;
}

export function migrateStudentFile(data: unknown): StudentFileParseResult {
  const foundVersion = readSchemaVersion(data);

  if (foundVersion !== null && foundVersion > CURRENT_SCHEMA_VERSION) {
    return { ok: false, error: { type: "unsupported-version", foundVersion } };
  }

  // Aucune étape de migration nécessaire pour l’instant : schemaVersion 1
  // est la seule version qui ait jamais existé.
  const migrated: unknown = data;

  const parsed = studentFileSchema.safeParse(migrated);
  if (!parsed.success) {
    return {
      ok: false,
      error: {
        type: "invalid-schema",
        issues: parsed.error.issues.map((issue) => issue.message),
      },
    };
  }

  return { ok: true, file: parsed.data };
}

export function parseStudentFileJson(raw: string): StudentFileParseResult {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { ok: false, error: { type: "invalid-json" } };
  }
  return migrateStudentFile(data);
}
