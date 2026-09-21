import { expect, test } from "@playwright/test";

/**
 * ÉTAPE 20 (docs/SPEC.md § 65) : parcours professeur — config → import →
 * correction → compétences → ZIP / CSV. Le corrigé enseignant (.mctkey)
 * n'est jamais présent dans le dépôt (teacher-data/ n'est jamais versionné) :
 * ce test en construit un minimal, conforme au schéma, directement en
 * mémoire.
 */

function sampleTeacherKey() {
  return JSON.stringify({
    schemaVersion: 1,
    entries: [
      {
        missionId: "5E-04",
        itemId: "choix-engin",
        competency: "C4",
        kind: "summative",
        transfer: false,
        variantAnswers: [{ id: "v0", answer: null }],
        scoring: { type: "human", points: 2 },
      },
    ],
  });
}

test("un professeur configure sa classe, corrige une élève et exporte les résultats", async ({ page }) => {
  // --- Préparation côté élève : un dépôt sommative réel, exporté en .mcjson ---
  await page.goto("/mission");
  await expect(page.getByRole("heading", { name: "Qui es-tu ?" })).toBeVisible({ timeout: 5_000 });
  await page.getByLabel("Code élève").fill("E2E-TEACHER-01");
  await page.getByLabel("Classe").fill("5E1");
  await page.getByRole("radio", { name: "5e" }).check({ force: true });
  await page.getByRole("button", { name: "Commencer" }).click();
  await expect(page.getByRole("link", { name: "Commencer la mission" })).toBeVisible({ timeout: 5_000 });

  await page.goto("/mission/5e-04");
  await page.getByLabel("Tombereau").check();
  await page.getByLabel("Explique ton choix.").fill("Bon compromis masse et distance sur terrain boueux.");
  await page.getByRole("button", { name: "Remettre mon évaluation" }).click();
  await expect(page.getByText("Évaluation enregistrée. Ton résultat sera disponible après correction.")).toBeVisible();

  await page.goto("/progression");
  await page.getByRole("button", { name: "Enregistrer ma progression" }).click();
  await expect(page.getByText("Ta progression a été enregistrée.")).toBeVisible();

  const studentDownloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exporter mon fichier .mcjson" }).click();
  const studentDownload = await studentDownloadPromise;
  const studentPath = await studentDownload.path();
  if (!studentPath) throw new Error("Export élève introuvable");
  const fs = await import("node:fs/promises");
  const studentFileContent = await fs.readFile(studentPath, "utf-8");

  // --- Espace professeur : nouvelle page, aucune donnée persistée entre deux
  // chargements de /teacher (docs/SPEC.md § 41), tout est réimporté ici. ---
  await page.goto("/teacher");
  await expect(page.getByRole("heading", { name: "Espace professeur" })).toBeVisible();

  await page.getByLabel("Classe").fill("5E1");
  await page.getByRole("button", { name: "Créer la configuration" }).click();

  await page.getByLabel("Importer le .mctkey").setInputFiles({
    name: "cle.mctkey",
    mimeType: "application/json",
    buffer: Buffer.from(sampleTeacherKey()),
  });
  await expect(page.getByText("Corrigé chargé.")).toBeVisible();

  await page.getByLabel("Importer un ou plusieurs fichiers élèves").setInputFiles({
    name: "eleve.mcjson",
    mimeType: "application/json",
    buffer: Buffer.from(studentFileContent),
  });
  await expect(page.getByRole("cell", { name: "E2E-TEACHER-01" }).first()).toBeVisible({ timeout: 5_000 });

  await page.getByRole("button", { name: "Ouvrir" }).first().click();
  await expect(page.getByText("5E-04 · choix-engin")).toBeVisible();

  await page.getByLabel("Points attribués").fill("1.5");
  await page.getByRole("button", { name: "Valider la correction" }).click();
  await expect(page.getByText("Aucune réponse en attente de correction humaine.")).toBeVisible();

  // Retour des résultats corrigés : le fichier réexporté contient désormais
  // le statut corrigé, prêt à être redonné à l'élève.
  const correctedDownloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exporter ce fichier corrigé" }).click();
  const correctedDownload = await correctedDownloadPromise;
  const correctedPath = await correctedDownload.path();
  if (!correctedPath) throw new Error("Export corrigé introuvable");
  const correctedContent = await fs.readFile(correctedPath, "utf-8");
  const correctedFile = JSON.parse(correctedContent) as {
    assessments: { missionId: string; itemId: string; status: string; score: number }[];
  };
  const correctedAssessment = correctedFile.assessments.find(
    (submission) => submission.missionId === "5E-04" && submission.itemId === "choix-engin",
  );
  expect(correctedAssessment?.status).toBe("corrected");
  expect(correctedAssessment?.score).toBe(0.75);

  // Compétences et synthèse de classe.
  await expect(page.getByRole("heading", { name: "Synthèse de classe" })).toBeVisible();

  const csvPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exporter la synthèse (CSV)" }).click();
  expect((await csvPromise).suggestedFilename()).toBe("synthese-5E1.csv");

  const pronotePromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exporter la vue Pronote (CSV)" }).click();
  expect((await pronotePromise).suggestedFilename()).toBe("pronote-5E1.csv");

  const zipPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exporter tous les fichiers corrigés (ZIP)" }).click();
  expect((await zipPromise).suggestedFilename()).toBe("mission-chantier-5E1-corriges.zip");
});
