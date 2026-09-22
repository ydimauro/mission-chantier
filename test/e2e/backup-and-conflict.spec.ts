import { expect, test } from "@playwright/test";

/**
 * ÉTAPE 20 (docs/SPEC.md § 65) : sauvegarde Edge/Chrome, sauvegarde Firefox,
 * conflit cache / fichier, mauvais fichier.
 */

async function createIdentity(page: import("@playwright/test").Page, studentCode: string) {
  await page.goto("/mission");
  await expect(page.getByRole("heading", { name: "Qui es-tu ?" })).toBeVisible({ timeout: 5_000 });
  await page.getByLabel("Code élève").fill(studentCode);
  await page.getByLabel("Classe").fill("5E1");
  await page.getByRole("radio", { name: "5e" }).check({ force: true });
  await page.getByRole("button", { name: "Commencer" }).click();
  await expect(page.getByRole("link", { name: "Commencer la mission" })).toBeVisible({ timeout: 5_000 });
}

test("sauvegarde Edge/Chrome : le dossier de sauvegarde automatique est proposé", async ({ page }) => {
  await createIdentity(page, "E2E-BACKUP-CHROME");
  await page.goto("/progression");
  await expect(page.locator("#contenu-principal").getByText("E2E-BACKUP-CHROME")).toBeVisible({ timeout: 5_000 });
  // Chromium (moteur partagé avec Edge) expose window.showDirectoryPicker :
  // l'application doit proposer la sauvegarde automatique dans un dossier.
  await expect(page.getByRole("button", { name: "Choisir où enregistrer mon fichier .mcjson" })).toBeVisible();
  await expect(page.getByText("Ce navigateur ne permet pas la sauvegarde automatique")).toBeHidden();
});

test("sauvegarde Firefox : repli sur l'export manuel quand l'API dossier est absente", async ({ page }) => {
  // Firefox n'expose pas window.showDirectoryPicker : on simule cette absence
  // sur Chromium plutôt que d'exiger un vrai Firefox (non disponible dans cet
  // environnement d'exécution, docs/rapports/ETAPE_16.md § 7), pour vérifier
  // le chemin de repli réellement emprunté par l'application.
  await page.addInitScript(() => {
    // @ts-expect-error simulation volontaire de l'absence de l'API
    delete window.showDirectoryPicker;
  });

  await createIdentity(page, "E2E-BACKUP-FIREFOX");
  await page.goto("/progression");
  await expect(page.locator("#contenu-principal").getByText("E2E-BACKUP-FIREFOX")).toBeVisible({ timeout: 5_000 });
  await expect(page.getByRole("button", { name: "Choisir où enregistrer mon fichier .mcjson" })).toHaveCount(0);
  await expect(
    page.getByText(/Ce navigateur ne permet pas à l’application de choisir un dossier/),
  ).toBeVisible();

  await page.getByRole("button", { name: "J’ai enregistré mon fichier." }).click();
  await expect(page.getByText("Merci. N’oublie pas de réimporter ce fichier la prochaine fois.")).toBeVisible();
});

test("conflit cache / fichier puis mauvais fichier sont détectés et résolus", async ({ page }) => {
  await createIdentity(page, "E2E-CONFLICT-01");
  await page.goto("/progression");
  await expect(page.locator("#contenu-principal").getByText("E2E-CONFLICT-01")).toBeVisible({ timeout: 5_000 });

  // Première sauvegarde explicite (revision R0), export de cette version.
  await page.getByRole("button", { name: "Enregistrer ma progression" }).click();
  await expect(page.getByText("Ta progression a été enregistrée.")).toBeVisible();

  const downloadR0Promise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exporter mon fichier .mcjson" }).click();
  const downloadR0 = await downloadR0Promise;
  const pathR0 = await downloadR0.path();
  if (!pathR0) throw new Error("Téléchargement R0 introuvable");
  const fs = await import("node:fs/promises");
  const contentR0 = await fs.readFile(pathR0, "utf-8");
  const fileR0 = JSON.parse(contentR0) as { revision: number; studentCode: string };

  // Deuxième sauvegarde explicite : la révision du cache dépasse maintenant
  // celle du fichier déjà exporté.
  await page.getByRole("button", { name: "Enregistrer ma progression" }).click();
  await expect(page.getByText("Ta progression a été enregistrée.")).toBeVisible();

  // Réimport de l'ancien fichier (R0) : le cache est plus récent.
  await page.getByLabel("Importer un fichier .mcjson").setInputFiles({
    name: "old.mcjson",
    mimeType: "application/json",
    buffer: Buffer.from(contentR0),
  });
  await expect(page.getByText("Une progression plus récente existe sur cet ordinateur.")).toBeVisible({
    timeout: 5_000,
  });
  await page.getByRole("button", { name: "Reprendre la progression de cet ordinateur" }).click();
  await expect(page.locator("#contenu-principal").getByText("E2E-CONFLICT-01")).toBeVisible();

  // Fichier plus récent que le cache (révision falsifiée volontairement plus
  // haute) : l'application doit cette fois proposer le fichier importé.
  const fileNewer = { ...fileR0, revision: fileR0.revision + 100 };
  await page.getByLabel("Importer un fichier .mcjson").setInputFiles({
    name: "newer.mcjson",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(fileNewer)),
  });
  await expect(page.getByText("Une progression plus récente a été trouvée dans ce fichier.")).toBeVisible({
    timeout: 5_000,
  });
  await page.getByRole("button", { name: "Utiliser le fichier" }).click();
  await expect(page.locator("#contenu-principal").getByText("E2E-CONFLICT-01")).toBeVisible();

  // Mauvais fichier : même structure, mais un autre code élève.
  const wrongFile = { ...fileR0, studentCode: "E2E-CONFLICT-AUTRE" };
  await page.getByLabel("Importer un fichier .mcjson").setInputFiles({
    name: "wrong.mcjson",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(wrongFile)),
  });
  await expect(page.getByText("Ce fichier correspond à un autre identifiant.")).toBeVisible({ timeout: 5_000 });
  await page.getByRole("button", { name: "Annuler l’import" }).click();
  await expect(page.locator("#contenu-principal").getByText("E2E-CONFLICT-01")).toBeVisible();
});
