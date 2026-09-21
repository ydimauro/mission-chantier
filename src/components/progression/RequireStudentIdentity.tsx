"use client";

import type { ReactNode } from "react";
import { useProgression } from "@/providers/progression-provider";
import { IdentitySetupForm } from "@/components/progression/IdentitySetupForm";
import { ConflictDialog } from "@/components/progression/ConflictDialog";
import { WrongFileNotice } from "@/components/progression/WrongFileNotice";
import { LoadErrorNotice } from "@/components/progression/LoadErrorNotice";
import { LOADING_LABEL } from "@content/pages/progression";

/**
 * Garde d’accès partagée par toute page qui a besoin d’un élève identifié
 * (missions, à partir de l’ÉTAPE 6) : réutilise les écrans d’identification,
 * de conflit et de mauvais fichier déjà construits pour `/progression`
 * (ÉTAPE 2), plutôt que de les dupliquer dans chaque mission. Ne rend
 * jamais une zone vide sans explication (audit ÉTAPE 10 § 11) : chargement
 * et erreur ont chacun un message explicite.
 */
export function RequireStudentIdentity({ children }: { children: ReactNode }) {
  const { snapshot } = useProgression();

  if (snapshot.status === "loading") {
    return (
      <p role="status" className="px-4 py-16 text-center text-sm text-ink-muted">
        {LOADING_LABEL}
      </p>
    );
  }

  if (snapshot.status === "error") {
    return (
      <div className="px-4 py-16">
        <LoadErrorNotice />
      </div>
    );
  }

  if (snapshot.status === "wrong-file") {
    return (
      <div className="px-4 py-16">
        <WrongFileNotice sessionCode={snapshot.sessionCode} fileCode={snapshot.incoming.studentCode} />
      </div>
    );
  }

  if (snapshot.status === "conflict") {
    return (
      <div className="px-4 py-16">
        <ConflictDialog kind={snapshot.kind} />
      </div>
    );
  }

  if (snapshot.status === "no-identity") {
    return (
      <div className="px-4 py-16">
        <IdentitySetupForm />
      </div>
    );
  }

  return <>{children}</>;
}
