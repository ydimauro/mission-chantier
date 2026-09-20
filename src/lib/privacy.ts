import { clearLocalData } from "@/lib/storage";
import { clearProgressionDatabase } from "@/lib/db/progression-db";

/**
 * Efface l’intégralité des données locales de l’application sur ce poste :
 * préférences d’affichage (localStorage) et cache de progression
 * (IndexedDB), tous élèves confondus (page /privacy, docs/RGPD.md § 9).
 */
export async function eraseAllLocalData(): Promise<void> {
  clearLocalData();
  await clearProgressionDatabase();
}
