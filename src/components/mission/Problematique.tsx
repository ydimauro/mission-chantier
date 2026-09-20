import type { ReactNode } from "react";
import { QuestionIcon } from "@/components/ui/icons";
import { PROBLEMATIQUE_LABEL } from "@content/engine";

/**
 * La question centrale de la mission. Mise en avant plus fortement que les
 * autres blocs : c’est le fil conducteur de toute l’activité.
 */
export function Problematique({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-md border-2 border-brand bg-surface-muted p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand">
        <QuestionIcon />
        {PROBLEMATIQUE_LABEL}
      </h2>
      <p className="mt-2 text-xl font-semibold leading-8 text-ink">{children}</p>
    </section>
  );
}
