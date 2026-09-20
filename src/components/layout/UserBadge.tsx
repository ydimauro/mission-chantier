import { USER_BADGE_LABEL } from "@content/navigation";

/**
 * Indicateur de rôle générique. Aucune identité réelle n’est affichée ni
 * connue de l’application (docs/RGPD.md) : seul le code élève pseudonymisé
 * existera, à partir de l’ÉTAPE 2.
 */
export function UserBadge() {
  return (
    <span className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-ink">
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
      {USER_BADGE_LABEL}
    </span>
  );
}
