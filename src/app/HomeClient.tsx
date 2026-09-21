"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FlagIcon, MapPinIcon, QuestionIcon } from "@/components/ui/icons";
import { CHANTIER_01 } from "@content/givors/media";
import { HOME_CONTENT } from "@content/pages/placeholders";

const OBSERVATION_PICTOGRAMS: Record<(typeof HOME_CONTENT.observationChoices)[number]["id"], string> = {
  demolir: "/pictograms/demolir.svg",
  construire: "/pictograms/construire.svg",
  renover: "/pictograms/renover.svg",
  amenager: "/pictograms/amenager.svg",
  materiaux: "/pictograms/materiaux.svg",
  circulation: "/pictograms/circulation.svg",
  inconnu: "/pictograms/question.svg",
};

function ObservationChoiceIcon({ id }: { id: (typeof HOME_CONTENT.observationChoices)[number]["id"] }) {
  return <Image src={OBSERVATION_PICTOGRAMS[id]} alt="" width={40} height={40} className="h-9 w-9 shrink-0 object-contain" />;
}

export function HomeClient() {
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [ideas, setIdeas] = useState("");

  function toggleChoice(id: string) {
    setSelectedChoices((current) =>
      current.includes(id) ? current.filter((choice) => choice !== id) : [...current, id],
    );
  }

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

      <section aria-label="Premières observations" className="grid gap-3 lg:grid-cols-[1.45fr_1fr]">
        <div className="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5">
          <div className="flex items-start gap-3">
            <Image src="/pictograms/observer.svg" alt="" width={48} height={48} className="h-12 w-12 shrink-0 object-contain" />
            <div>
              <h2 className="text-xl font-bold text-ink">{HOME_CONTENT.observationTitle}</h2>
              <p className="mt-1 text-sm text-ink-muted">{HOME_CONTENT.observationPrompt}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {HOME_CONTENT.observationChoices.map((choice) => (
              <label key={choice.id} className="flex min-h-12 cursor-pointer items-center justify-between gap-2 rounded-md border border-border bg-surface-muted px-2 py-2 text-xs font-semibold leading-4 text-ink hover:border-brand">
                <span className="flex items-center gap-2"><ObservationChoiceIcon id={choice.id} />{choice.label}</span>
                <input type="checkbox" checked={selectedChoices.includes(choice.id)} onChange={() => toggleChoice(choice.id)} className="h-4 w-4 shrink-0 accent-brand" />
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 shadow-sm sm:p-5">
          <div className="flex items-start gap-3">
            <Image src="/pictograms/ecrire.svg" alt="" width={48} height={48} className="h-12 w-12 shrink-0 object-contain" />
            <div>
              <h2 className="text-xl font-bold text-ink">{HOME_CONTENT.writingTitle}</h2>
              <p className="mt-1 text-sm font-medium text-ink">{HOME_CONTENT.writingPrompt}</p>
            </div>
          </div>
          <textarea aria-label={HOME_CONTENT.writingTitle} value={ideas} onChange={(event) => setIdeas(event.target.value)} placeholder={HOME_CONTENT.writingPlaceholder} rows={4} className="mt-4 w-full resize-y rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-muted" />
        </div>
      </section>

      <Link href="/mission" aria-label={HOME_CONTENT.ctaLabel} className="flex flex-col items-center justify-center gap-1 rounded-lg bg-brand px-5 py-3 text-center text-brand-contrast shadow-sm hover:opacity-90 sm:py-4">
        <span className="flex items-center gap-2 text-xl font-bold"><FlagIcon className="h-6 w-6" />{HOME_CONTENT.ctaLabel}</span>
        <span className="text-xs font-medium">{HOME_CONTENT.ctaCaption}</span>
      </Link>

      <p className="flex items-center justify-center gap-2 text-center text-xs text-ink-muted"><QuestionIcon />Tes réponses restent une première observation. Tu pourras les reprendre dans ta première mission.</p>
    </div>
  );
}