import "fake-indexeddb/auto";
import { describe, expect, it } from "vitest";
import {
  clearAllStudentFiles,
  deleteStudentFile,
  getStudentFile,
  listStudentCodes,
  putStudentFile,
} from "@/lib/db/progression-db";
import { createInitialStudentFile } from "@/lib/progression/model";

describe("cache de progression (IndexedDB, docs/SAUVEGARDE.md)", () => {
  it("renvoie null quand aucun fichier n'est en cache pour ce code élève", async () => {
    const result = await getStudentFile("INEXISTANT-001");
    expect(result).toBeNull();
  });

  it("enregistre puis relit le fichier d'un élève", async () => {
    const file = createInitialStudentFile({ studentCode: "TEST-A-001", classe: "4E2", niveau: "4e" });
    await putStudentFile(file);
    const reloaded = await getStudentFile("TEST-A-001");
    expect(reloaded).toEqual(file);
  });

  it("garde séparées les progressions de deux élèves différents sur le même poste", async () => {
    const alice = createInitialStudentFile({ studentCode: "TEST-B-ALICE", classe: "4E2", niveau: "4e" });
    const bob = createInitialStudentFile({ studentCode: "TEST-B-BOB", classe: "4E2", niveau: "4e" });
    await putStudentFile(alice);
    await putStudentFile(bob);

    expect(await getStudentFile("TEST-B-ALICE")).toEqual(alice);
    expect(await getStudentFile("TEST-B-BOB")).toEqual(bob);

    const codes = await listStudentCodes();
    expect(codes).toEqual(expect.arrayContaining(["TEST-B-ALICE", "TEST-B-BOB"]));
  });

  it("supprime un seul élève sans toucher aux autres", async () => {
    const alice = createInitialStudentFile({ studentCode: "TEST-C-ALICE", classe: "4E2", niveau: "4e" });
    const bob = createInitialStudentFile({ studentCode: "TEST-C-BOB", classe: "4E2", niveau: "4e" });
    await putStudentFile(alice);
    await putStudentFile(bob);

    await deleteStudentFile("TEST-C-ALICE");

    expect(await getStudentFile("TEST-C-ALICE")).toBeNull();
    expect(await getStudentFile("TEST-C-BOB")).toEqual(bob);
  });

  it("efface tout le cache (RGPD, bouton Effacer mes données locales)", async () => {
    const alice = createInitialStudentFile({ studentCode: "TEST-D-ALICE", classe: "4E2", niveau: "4e" });
    await putStudentFile(alice);

    await clearAllStudentFiles();

    expect(await getStudentFile("TEST-D-ALICE")).toBeNull();
  });
});
