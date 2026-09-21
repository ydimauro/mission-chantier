import { expect, test } from "@playwright/test";

/**
 * ÉTAPE 20 (docs/SPEC.md § 65) : parcours élève 5e complet — Givors → cahier
 * → mission → évaluation → sauvegarde → reprise.
 */
test("un élève de 5e observe Givors, dépose une évaluation, sauvegarde puis reprend sa progression", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Givors se transforme" })).toBeVisible();
  await expect(page.getByText("Situation réelle", { exact: true })).toBeVisible();

  await page.goto("/mission");
  await expect(page.getByRole("heading", { name: "Qui es-tu ?" })).toBeVisible({ timeout: 5_000 });
  await page.getByLabel("Code élève").fill("E2E-5E-JOURNEY");
  await page.getByLabel("Classe").fill("5E1");
  await page.getByRole("radio", { name: "5e" }).check({ force: true });
  await page.getByRole("button", { name: "Commencer" }).click();

  await expect(page.getByRole("link", { name: "Commencer la mission" })).toBeVisible({ timeout: 5_000 });
  await page.getByRole("link", { name: "Commencer la mission" }).click();
  await expect(page).toHaveTitle(/5E-00.*Givors/i);
  await expect(page.getByRole("heading", { name: "Problématique" })).toBeVisible();

  // Le cahier papier reste l'outil de trace écrite : /carnet n'affiche jamais
  // de contenu de mission, seulement un rappel de ce principe.
  await page.goto("/carnet");
  await expect(page.getByRole("heading", { name: "Mon carnet" })).toBeVisible();

  // Navigation directe vers une mission avec évaluation sommative (5E-04) :
  // aucune séquence imposée une fois l'identité créée (RequireStudentIdentity
  // ne garde que sur l'identité, jamais sur la progression dans le parcours).
  await page.goto("/mission/5e-04");
  await expect(page.getByRole("heading", { name: "Problématique" })).toBeVisible();

  await page.getByLabel("Pelle hydraulique").check();
  await page.getByLabel("Explique ton choix.").fill("Elle fonctionne sur tous les terrains, y compris boueux.");
  await page.getByRole("button", { name: "Remettre mon évaluation" }).click();
  await expect(page.getByText("Évaluation enregistrée. Ton résultat sera disponible après correction.")).toBeVisible();

  await page.getByRole("button", { name: "J’ai terminé d’écrire" }).click();
  await page.getByRole("button", { name: "Mission terminée" }).click();
  // Chromium expose la File System Access API mais aucun dossier n'a été lié
  // dans ce test : la mission retombe donc sur le repli export manuel.
  await expect(page.getByText("J’ai enregistré mon fichier.")).toBeVisible({ timeout: 5_000 });
  await page.getByRole("button", { name: "J’ai enregistré mon fichier." }).click();
  await expect(page.getByText("Mission terminée. Ta progression a été enregistrée.")).toBeVisible();

  // Sauvegarde explicite sur /progression.
  await page.goto("/progression");
  await expect(page.locator("#contenu-principal").getByText("E2E-5E-JOURNEY")).toBeVisible({ timeout: 5_000 });
  await page.getByRole("button", { name: "Enregistrer ma progression" }).click();
  await expect(page.getByText("Ta progression a été enregistrée.")).toBeVisible();

  // Reprise : un rechargement complet doit retrouver la même identité et le
  // dépôt déjà effectué (5E-04 affiche directement la notice de dépôt, plus
  // le formulaire de choix).
  await page.reload();
  await expect(page.locator("#contenu-principal").getByText("E2E-5E-JOURNEY")).toBeVisible({ timeout: 5_000 });

  await page.goto("/mission/5e-04");
  await expect(page.getByText("Évaluation enregistrée. Ton résultat sera disponible après correction.")).toBeVisible({
    timeout: 5_000,
  });
  await expect(page.getByLabel("Pelle hydraulique")).toHaveCount(0);
});
