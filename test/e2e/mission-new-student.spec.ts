import { expect, test } from "@playwright/test";

test("un nouvel élève de 5e accède à 5E-00 sans rester bloqué au chargement", async ({ page }) => {
  await page.goto("/mission");

  await expect(page.getByRole("heading", { name: "Qui es-tu ?" })).toBeVisible({ timeout: 5_000 });
  await page.getByLabel("Code élève").fill("E2E-5E-00");
  await page.getByLabel("Classe").fill("5E1");
  await page.getByRole("radio", { name: "5e" }).check({ force: true });
  await page.getByRole("button", { name: "Commencer" }).click();

  await expect(page.getByText("Parcours 5e")).toBeVisible({ timeout: 5_000 });
  await expect(page.getByText("5E-00", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Commencer la mission" })).toBeVisible();
  await expect(page.getByText("Chargement de ta progression…")).toBeHidden();

  await page.reload();
  await expect(page.getByText("Parcours 5e")).toBeVisible({ timeout: 5_000 });
  await expect(page.getByText("5E-00", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "Commencer la mission" }).click();
  await expect(page).toHaveTitle(/5E-00.*Givors/i);
  await expect(page.getByText("Situation réelle", { exact: true })).toBeVisible({ timeout: 5_000 });
  await expect(page.getByRole("heading", { name: "Problématique" })).toBeVisible();
  await expect(page.getByText("Écris dans ton cours")).toBeVisible();
});