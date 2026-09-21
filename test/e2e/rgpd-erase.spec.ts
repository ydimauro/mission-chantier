import { expect, test } from "@playwright/test";

/**
 * ÉTAPE 20 (docs/SPEC.md § 65) : effacement RGPD des données locales.
 */
test("l'effacement RGPD supprime la progression locale et redemande une identité", async ({ page }) => {
  await page.goto("/mission");
  await expect(page.getByRole("heading", { name: "Qui es-tu ?" })).toBeVisible({ timeout: 5_000 });
  await page.getByLabel("Code élève").fill("E2E-RGPD-01");
  await page.getByLabel("Classe").fill("5E1");
  await page.getByRole("radio", { name: "5e" }).check({ force: true });
  await page.getByRole("button", { name: "Commencer" }).click();
  await expect(page.getByRole("link", { name: "Commencer la mission" })).toBeVisible({ timeout: 5_000 });

  await page.goto("/privacy");
  await expect(page.getByRole("heading", { name: "Tes données et Mission Chantier" })).toBeVisible();

  await page.getByRole("button", { name: "Effacer mes données locales" }).click();
  await expect(
    page.getByText("Es-tu sûr ou sûre de vouloir effacer tes données locales sur ce poste ? Cette action est définitive."),
  ).toBeVisible();

  await page.getByRole("button", { name: "Oui, effacer définitivement" }).click();
  await expect(page.getByText("Tes données locales sur ce poste ont été effacées.")).toBeVisible();

  // Le composant recharge automatiquement la page ~1,2 s après l'effacement.
  await page.waitForURL("/privacy", { timeout: 10_000 });
  await page.waitForLoadState("networkidle");

  await page.goto("/progression");
  await expect(page.getByRole("heading", { name: "Qui es-tu ?" })).toBeVisible({ timeout: 5_000 });
  await expect(page.locator("#contenu-principal").getByText("E2E-RGPD-01")).toHaveCount(0);
});
