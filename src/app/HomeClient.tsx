"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FlagIcon, MapPinIcon } from "@/components/ui/icons";
import { CHANTIER_01 } from "@content/givors/media";
import { HOME_CONTENT } from "@content/pages/placeholders";

export function HomeClient() {
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);

  function toggleChoice(id: string) {
    setSelectedChoices((current) => current.includes(id) ? current.filter((choice) => choice !== id) : [...current, id]);
  }

  const missionHref = selectedChoices.length > 0 ? `/mission?observations=${encodeURIComponent(selectedChoices.join(","))}` : "/mission";

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-3 py-3 sm:px-5 sm:py-4">
      <section aria-labelledby="home-title" className="relative min-h-80 overflow-hidden rounded-lg border border-border bg-surface shadow-sm sm:min-h-96">
        <Image src={CHANTIER_01.file} alt={CHANTIER_01.alt} fill loading="eager" sizes="(max-width: 768px) 100vw, 1280px" className="object-cover" />
        <div className="relative flex min-h-80 flex-col justify-between gap-8 p-5 text-white sm:min-h-96 sm:p-8">
          <p className="ml-auto flex w-fit items-center gap-2 rounded-md bg-accent px-4 py-3 text-base font-bold text-slate-900 shadow-sm">
            <MapPinIcon />
            {HOME_CONTENT.realBadge}
          </p>
          <div className="max-w-xl drop-shadow-md">
            <h1 id="home-title" className="text-3xl font-bold sm:text-5xl">{HOME_CONTENT.title}</h1>
            <p className="mt-3 text-base leading-7 sm:text-lg">{HOME_CONTENT.intro}</p>
            <div className="mt-4 h-1 w-11 rounded-full bg-brand" aria-hidden="true" />
            <p className="mt-4 flex items-center gap-2 text-sm font-medium"><FlagIcon />{HOME_CONTENT.landmark}</p>
          </div>
        </div>
      </section>

      <section aria-label="Premières observations et ressources" className="grid gap-3 lg:grid-cols-[1.45fr_1fr]">
        <div className="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5">
          <div className="flex items-start gap-3">
            <Image src="/pictograms/observer.svg" alt="" width={48} height={48} className="h-12 w-12 shrink-0 object-contain" />
            <div>
              <h2 className="text-xl font-bold text-ink">{HOME_CONTENT.observationTitle}</h2>
              <p className="mt-1 text-sm text-ink-muted">{HOME_CONTENT.observationPrompt}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {HOME_CONTENT.observationChoices.map((choice) => {
              const checked = selectedChoices.includes(choice.id);
              return <label key={choice.id} className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold text-ink ${checked ? "border-brand bg-surface-muted" : "border-border bg-surface hover:border-brand"}`}><Image src={choice.pictogram} alt="" width={32} height={32} className="h-8 w-8 shrink-0 object-contain"/><span className="flex-1">{choice.label}</span><input type="checkbox" checked={checked} onChange={() => toggleChoice(choice.id)} className="h-4 w-4 accent-brand"/></label>;
            })}
          </div>
          <Link href={missionHref} className="mt-4 inline-flex rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast">{HOME_CONTENT.ctaLabel}</Link>
        </div>

        <div className="rounded-lg border border-border bg-surface-muted p-4 shadow-sm sm:p-5">
          <div className="flex items-start gap-3">
            <Image src="/pictograms/ecrire.svg" alt="" width={48} height={48} className="h-12 w-12 shrink-0 object-contain" />
            <div>
              <h2 className="text-xl font-bold text-ink">Besoin d’un mot ?</h2>
              <p className="mt-1 text-sm font-medium text-ink">Les engins, matériaux, outils et mots techniques sont disponibles dans les ressources.</p>
            </div>
          </div>
          <Link href="/ressources" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-ink">Ouvrir les ressources dans un nouvel onglet ↗</Link>
        </div>
      </section>

      <p className="text-center text-xs text-ink-muted">La première mission reprend tes choix puis contient l’écriture dans ton cahier.</p>
    </div>
  );
}
