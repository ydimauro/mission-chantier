import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { eraseAllLocalData } from "@/lib/privacy";
import {
  clearProgressionDatabase,
  getDirectoryHandle,
  getStudentFile,
  putDirectoryHandle,
  putStudentFile,
} from "@/lib/db/progression-db";
import { createInitialStudentFile } from "@/lib/progression/model";
import { STORAGE_KEYS, writeStoredJson } from "@/lib/storage";

function createMemoryStorage(): Storage {
  const values = new Map<string, string>();
  return {
    get length() { return values.size; },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => [...values.keys()][index] ?? null,
    removeItem: (key) => { values.delete(key); },
    setItem: (key, value) => { values.set(key, value); },
  };
}

describe("effacement RGPD des données locales", () => {
  beforeEach(async () => {
    vi.stubGlobal("localStorage", createMemoryStorage());
    await clearProgressionDatabase();
  });

  it("efface les préférences, les progressions et les autorisations de dossier de Mission Chantier", async () => {
    const studentCode = "RGPD-TEST-001";
    const file = createInitialStudentFile({ studentCode, classe: "4E2", niveau: "4e" });
    const directoryHandle = { name: "Mission-Chantier", kind: "directory" } as FileSystemDirectoryHandle;

    writeStoredJson(STORAGE_KEYS.preferences, { highContrast: true });
    window.localStorage.setItem("autre-application", "à conserver");
    await putStudentFile(file);
    await putDirectoryHandle(studentCode, directoryHandle);

    await eraseAllLocalData();

    expect(window.localStorage.getItem(STORAGE_KEYS.preferences)).toBeNull();
    expect(window.localStorage.getItem("autre-application")).toBe("à conserver");
    expect(await getStudentFile(studentCode)).toBeNull();
    expect(await getDirectoryHandle(studentCode)).toBeNull();
  });
});