import { z } from "zod";

/**
 * Format du fichier classe `.mcconfig` (docs/SPEC.md § 24.2). Contient
 * uniquement des paramètres collectifs. Ne contient **jamais** de liste
 * d’élèves aménagés, de donnée médicale, ni d’information individuelle
 * sensible : ces champs n’existent tout simplement pas dans ce schéma
 * (vérifié par test/class-config.test.ts, docs/SPEC.md § 64 test 24).
 */

export const CURRENT_CLASS_CONFIG_SCHEMA_VERSION = 1;

export const CORRECTION_POLICIES = ["manuelle", "auto-des-que-possible"] as const;
export type CorrectionPolicy = (typeof CORRECTION_POLICIES)[number];

export const classConfigSchema = z.object({
  schemaVersion: z.literal(1),
  classe: z.string().trim().min(1).max(40),
  // Valeurs synchronisées avec `Level` / `LEVELS` de content/config.ts.
  niveau: z.enum(["5e", "4e"]),
  standardDurationMinutes: z.number().int().min(1).max(45),
  missionsEnabled: z.array(z.string().min(1)),
  correctionPolicy: z.enum(CORRECTION_POLICIES),
});

export type ClassConfig = z.infer<typeof classConfigSchema>;

export function createDefaultClassConfig(classe: string, niveau: "5e" | "4e"): ClassConfig {
  return {
    schemaVersion: CURRENT_CLASS_CONFIG_SCHEMA_VERSION,
    classe: classe.trim(),
    niveau,
    standardDurationMinutes: 45,
    missionsEnabled: [],
    correctionPolicy: "manuelle",
  };
}

export type ClassConfigParseError =
  | { type: "invalid-json" }
  | { type: "invalid-schema"; issues: readonly string[] }
  | { type: "unsupported-version"; foundVersion: number };

export type ClassConfigParseResult =
  | { ok: true; config: ClassConfig }
  | { ok: false; error: ClassConfigParseError };

function readSchemaVersion(data: unknown): number | null {
  if (data !== null && typeof data === "object" && "schemaVersion" in data) {
    const value = (data as { schemaVersion: unknown }).schemaVersion;
    return typeof value === "number" ? value : null;
  }
  return null;
}

export function parseClassConfigJson(raw: string): ClassConfigParseResult {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { ok: false, error: { type: "invalid-json" } };
  }

  const foundVersion = readSchemaVersion(data);
  if (foundVersion !== null && foundVersion > CURRENT_CLASS_CONFIG_SCHEMA_VERSION) {
    return { ok: false, error: { type: "unsupported-version", foundVersion } };
  }

  const parsed = classConfigSchema.safeParse(data);
  if (!parsed.success) {
    return {
      ok: false,
      error: { type: "invalid-schema", issues: parsed.error.issues.map((issue) => issue.message) },
    };
  }

  return { ok: true, config: parsed.data };
}

export function buildClassConfigFileName(classe: string): string {
  const safeClasse = classe.trim().replace(/[^a-zA-Z0-9_-]+/g, "-");
  return `mission-chantier-${safeClasse}.mcconfig`;
}
