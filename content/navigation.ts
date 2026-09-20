/**
 * Libellés de navigation et de l’interface générale (socle technique, ÉTAPE 1).
 * Centralisés ici pour respecter la séparation code / contenu et pour être
 * vérifiables par le test de typographie (test/typography.test.ts).
 */

export type NavItem = {
  href: string;
  label: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/mission", label: "Ma mission" },
  { href: "/carnet", label: "Mon carnet" },
  { href: "/ressources", label: "Ressources" },
  { href: "/progression", label: "Ma progression" },
];

export const SKIP_LINK_LABEL = "Aller au contenu principal";

export const USER_BADGE_LABEL = "Élève";

export const LEVEL_SWITCH_LABEL = "Niveau";

export const ACCESSIBILITY_BAR_LABEL = "Options d’accessibilité";

export const ACCESSIBILITY_LABELS = {
  lightMode: "Mode clair",
  darkMode: "Mode sombre",
  dyslexiaFriendly: "Police adaptée",
  textScale: "Taille du texte",
  projectorMode: "Mode vidéoprojecteur",
  performanceMode: "Mode performance",
} as const;

export const FOOTER_PRIVACY_LINK_LABEL = "Confidentialité de mes données";

export const CANCEL_LABEL = "Annuler";
