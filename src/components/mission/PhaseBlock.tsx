import type { ReactNode } from "react";

type PhaseBlockProps = {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  /** Classe Tailwind de couleur pour l’icône et le libellé (ex. "text-brand"). */
  accentClassName?: string;
};

/**
 * Bloc partagé par les composants « phase » du moteur pédagogique (Observe,
 * Hypothese, Consigne, Manipule, Mesure, Compare, ARetenir, LimitesDuModele,
 * BilanMission). Ne porte aucun contenu propre : icône et libellé viennent
 * de chaque composant public, le texte vient de la mission qui l’utilise.
 */
export function PhaseBlock({ icon, label, children, accentClassName }: PhaseBlockProps) {
  return (
    <section className="rounded-md border border-border bg-surface p-4">
      <h3
        className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${
          accentClassName ?? "text-ink-muted"
        }`}
      >
        {icon}
        {label}
      </h3>
      <div className="mt-2 text-base leading-7 text-ink">{children}</div>
    </section>
  );
}
