import { z } from "zod";

/**
 * Schéma du fichier élève .mcjson (docs/SPEC.md § 24.1, docs/SAUVEGARDE.md).
 * Version actuelle du schéma : voir CURRENT_SCHEMA_VERSION. Toute évolution
 * de forme incrémente cette valeur et ajoute une étape dans
 * src/lib/schemas/migrations.ts (jamais de changement silencieux).
 */

export const CURRENT_SCHEMA_VERSION = 1;

export const ASSESSMENT_ACCOMMODATIONS = ["standard", "reduced", "split"] as const;
export type AssessmentAccommodation = (typeof ASSESSMENT_ACCOMMODATIONS)[number];

// Format libre mais non vide : le code exact est communiqué par le
// professeur, aucune structure précise n’est imposée par l’application.
const studentCodeSchema = z.string().trim().min(1).max(40);
const classeSchema = z.string().trim().min(1).max(40);

export const studentFileSchemaV1 = z.object({
  schemaVersion: z.literal(1),
  revision: z.number().int().min(0),
  updatedAt: z.string().min(1),
  studentCode: studentCodeSchema,
  classe: classeSchema,
  // Valeurs synchronisées avec `Level` / `LEVELS` de content/config.ts.
  niveau: z.enum(["5e", "4e"]),
  currentMissionId: z.string().min(1).nullable(),
  completedMissionIds: z.array(z.string().min(1)),
  // Réponses, évaluations et preuves : structures génériques tant que le
  // contenu des missions n’existe pas (ÉTAPE 6 et suivantes). Le format
  // précis de chaque entrée sera fixé au fil des étapes, sans que cela ne
  // nécessite de changer la forme générale du fichier.
  responses: z.record(z.string(), z.unknown()),
  assessments: z.record(z.string(), z.unknown()),
  proofs: z.array(z.unknown()),
  accommodation: z.enum(ASSESSMENT_ACCOMMODATIONS),
});

export type StudentFileV1 = z.infer<typeof studentFileSchemaV1>;

// Le type courant pointe toujours vers la dernière version du schéma.
export type StudentFile = StudentFileV1;

export const studentFileSchema = studentFileSchemaV1;
