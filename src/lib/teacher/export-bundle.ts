import { zipSync } from "fflate";
import type { StudentFile } from "@/lib/schemas/student-file";
import { buildStudentFileName } from "@/lib/progression/model";

/**
 * Export groupé des fichiers élèves corrigés, en ZIP quand c’est
 * techniquement raisonnable (docs/SPEC.md § 26, § 41). Entièrement côté
 * navigateur, sans aucune requête réseau.
 */
export function buildCorrectedFilesZipBytes(files: readonly StudentFile[]): Uint8Array {
  const entries: Record<string, Uint8Array> = {};
  const encoder = new TextEncoder();

  for (const file of files) {
    const name = buildStudentFileName(file.studentCode);
    entries[name] = encoder.encode(JSON.stringify(file, null, 2));
  }

  return zipSync(entries, { level: 6 });
}

export function buildCorrectedFilesZipBlob(files: readonly StudentFile[]): Blob {
  const bytes = buildCorrectedFilesZipBytes(files);
  return new Blob([new Uint8Array(bytes)], { type: "application/zip" });
}
