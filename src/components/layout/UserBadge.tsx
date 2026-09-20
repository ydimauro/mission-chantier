"use client";

import { USER_BADGE_LABEL } from "@content/navigation";
import { useProgression } from "@/providers/progression-provider";

/**
 * Indicateur de rôle générique. Aucune identité réelle n’est affichée ni
 * connue de l’application (docs/RGPD.md) : seul le code élève pseudonymisé,
 * une fois renseigné dans « Ma progression » (ÉTAPE 2), peut apparaître ici.
 */
export function UserBadge() {
  const { snapshot } = useProgression();
  const label = snapshot.status === "ready" ? snapshot.file.studentCode : USER_BADGE_LABEL;

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
      {label}
    </span>
  );
}
