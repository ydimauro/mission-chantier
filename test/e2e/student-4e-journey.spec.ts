import { expect, test } from "@playwright/test";

/**
 * ÉTAPE 20 (docs/SPEC.md § 65) : parcours élève 4e — analyse → panne →
 * programmation → protocole.
 */
test("un élève de 4e analyse Givors puis dépose un diagnostic, un programme et un protocole", async ({ page }) => {
  await page.goto("/mission");
  await expect(page.getByRole("heading", { name: "Qui es-tu ?" })).toBeVisible({ timeout: 5_000 });
  await page.getByLabel("Code élève").fill("E2E-4E-JOURNEY");
  await page.getByLabel("Classe").fill("4E1");
  await page.getByRole("radio", { name: "4e" }).check({ force: true });
  await page.getByRole("button", { name: "Commencer" }).click();
  await expect(page.getByRole("link", { name: "Commencer la mission" })).toBeVisible({ timeout: 5_000 });

  // Analyse (4E-00) : diagnostic sur la photographie réelle de Givors.
  await page.goto("/mission/4e-00");
  await expect(page).toHaveTitle(/4E-00/i);
  await expect(page.getByText("Situation réelle", { exact: true })).toBeVisible({ timeout: 5_000 });
  await expect(page.getByRole("heading", { name: "Problématique" })).toBeVisible();

  // Panne (4E-05) : démarche de diagnostic sommative.
  await page.goto("/mission/4e-05");
  await expect(page.getByRole("heading", { name: "Problématique" })).toBeVisible();

  await page.getByLabel("Choisis un test à réaliser.").selectOption({ label: "Vérifier le niveau de carburant" });
  await page.getByRole("button", { name: "Réaliser ce test" }).click();
  await page.getByLabel("Choisis un test à réaliser.").selectOption({ label: "Vérifier le niveau de fluide hydraulique" });
  await page.getByRole("button", { name: "Réaliser ce test" }).click();
  await expect(page.getByRole("heading", { name: "Résultats observés" })).toBeVisible();

  await page.getByLabel("Cause retenue").selectOption({ label: "Manque de fluide hydraulique" });
  await page.getByLabel("Solution proposée").selectOption({ label: "Contrôler puis compléter le fluide hydraulique" });
  await page.getByRole("button", { name: "Remettre mon évaluation" }).click();
  await expect(page.getByText("Évaluation enregistrée. Ton résultat sera disponible après correction.")).toBeVisible();

  await page.getByRole("button", { name: "J’ai terminé d’écrire" }).click();
  await page.getByRole("button", { name: "Mission terminée" }).click();
  await page.getByRole("button", { name: "J’ai enregistré mon fichier." }).click();
  await expect(page.getByText("Mission terminée. Ta progression a été enregistrée.")).toBeVisible();

  // Programmation (4E-06) : condition, action et branche SINON.
  await page.goto("/mission/4e-06");
  await expect(page.getByRole("heading", { name: "Problématique" })).toBeVisible();

  await page.getByLabel("Comparateur").selectOption({ label: "inférieure à" });
  await page.getByLabel("Seuil").selectOption({ label: "2 m" });
  await page.getByLabel("Action si la condition est vraie").selectOption({ label: "Arrêter le déplacement" });
  await page.getByLabel("Action sinon").selectOption({ label: "Autoriser le déplacement" });
  await page.getByRole("button", { name: "Tester le programme" }).click();
  await expect(page.getByText(/Scénario 1/)).toBeVisible();
  await page.getByRole("button", { name: "Remettre mon évaluation" }).click();
  await expect(page.getByText("Évaluation enregistrée. Ton résultat sera disponible après correction.")).toBeVisible();

  await page.getByRole("button", { name: "J’ai terminé d’écrire" }).click();
  await page.getByRole("button", { name: "Mission terminée" }).click();
  await page.getByRole("button", { name: "J’ai enregistré mon fichier." }).click();
  await expect(page.getByText("Mission terminée. Ta progression a été enregistrée.")).toBeVisible();

  // Protocole (4E-08) : essais répétés à trois distances puis seuil et limite.
  await page.goto("/mission/4e-08");
  await expect(page.getByRole("heading", { name: "Problématique" })).toBeVisible();

  for (const distance of ["1 m", "2 m", "3 m", "1 m", "2 m", "3 m"]) {
    await page.getByLabel("Distance à tester").selectOption({ label: distance });
    await page.getByRole("button", { name: "Réaliser un essai" }).click();
  }
  await expect(page.getByRole("row")).toHaveCount(7); // 1 ligne d'en-tête + 6 essais

  await page.getByLabel("Seuil de sécurité proposé").selectOption({ label: "2 m" });
  await page.getByLabel("Écris une limite de ce protocole.").fill("Le protocole ne teste pas les obstacles mobiles.");
  await page.getByRole("button", { name: "Remettre mon évaluation" }).click();
  await expect(page.getByText("Évaluation enregistrée. Ton résultat sera disponible après correction.")).toBeVisible();
});
