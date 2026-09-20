import { buildStudentFileName } from "@/lib/progression/model";
import { parseStudentFileJson, type StudentFileParseError } from "@/lib/schemas/migrations";
import type { StudentFile } from "@/lib/schemas/student-file";

/**
 * Sauvegarde réelle via File System Access (Edge / Chrome, docs/SAUVEGARDE.md
 * § 3). Absente de Firefox : voir src/lib/download.ts pour le repli manuel
 * (docs/SAUVEGARDE.md § 4).
 */

export function isFileSystemAccessSupported(): boolean {
  return typeof window !== "undefined" && "showDirectoryPicker" in window;
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

function isNotFoundError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "NotFoundError";
}

export async function pickProgressDirectory(): Promise<FileSystemDirectoryHandle | null> {
  if (!isFileSystemAccessSupported()) return null;
  try {
    return await window.showDirectoryPicker({ id: "mission-chantier-progression", mode: "readwrite" });
  } catch (error) {
    if (isAbortError(error)) return null;
    throw error;
  }
}

export async function ensureReadWritePermission(
  handle: FileSystemDirectoryHandle,
): Promise<boolean> {
  const options = { mode: "readwrite" as const };
  const current = await handle.queryPermission(options);
  if (current === "granted") return true;
  const requested = await handle.requestPermission(options);
  return requested === "granted";
}

/**
 * Écrit le fichier principal, après avoir copié son contenu précédent dans
 * une copie .bak lorsqu’un fichier existait déjà (docs/SAUVEGARDE.md § 3).
 */
export async function writeStudentFileToDirectory(
  dirHandle: FileSystemDirectoryHandle,
  file: StudentFile,
): Promise<void> {
  const mainName = buildStudentFileName(file.studentCode);
  const bakName = buildStudentFileName(file.studentCode, ".bak");
  const content = JSON.stringify(file, null, 2);

  try {
    const existingHandle = await dirHandle.getFileHandle(mainName);
    const existingContent = await (await existingHandle.getFile()).text();
    const bakHandle = await dirHandle.getFileHandle(bakName, { create: true });
    const bakWritable = await bakHandle.createWritable();
    await bakWritable.write(existingContent);
    await bakWritable.close();
  } catch (error) {
    if (!isNotFoundError(error)) throw error;
    // Pas de fichier principal existant : rien à recopier en .bak.
  }

  const mainHandle = await dirHandle.getFileHandle(mainName, { create: true });
  const writable = await mainHandle.createWritable();
  await writable.write(content);
  await writable.close();
}

export type ReadDirectoryResult =
  | { ok: true; file: StudentFile }
  | { ok: false; error: "not-found" }
  | { ok: false; error: StudentFileParseError };

export async function readStudentFileFromDirectory(
  dirHandle: FileSystemDirectoryHandle,
  studentCode: string,
): Promise<ReadDirectoryResult> {
  const mainName = buildStudentFileName(studentCode);

  try {
    const handle = await dirHandle.getFileHandle(mainName);
    const text = await (await handle.getFile()).text();
    const parsed = parseStudentFileJson(text);
    return parsed.ok ? { ok: true, file: parsed.file } : { ok: false, error: parsed.error };
  } catch (error) {
    if (isNotFoundError(error)) {
      return { ok: false, error: "not-found" };
    }
    throw error;
  }
}
