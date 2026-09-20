import { SKIP_LINK_LABEL } from "@content/navigation";

/**
 * Lien d’évitement clavier : invisible jusqu’au focus, permet de sauter
 * directement au contenu principal sans traverser toute la navigation
 * (docs/SPEC.md § 43).
 */
export function SkipLink() {
  return (
    <a
      href="#contenu-principal"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-[var(--color-ink)] focus-visible:px-4 focus-visible:py-2 focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
    >
      {SKIP_LINK_LABEL}
    </a>
  );
}
