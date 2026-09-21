import Link from "next/link";
import Image from "next/image";
import { FlagIcon, MapPinIcon } from "@/components/ui/icons";
import { CHANTIER_01 } from "@content/givors/media";
import { HOME_CONTENT } from "@content/pages/placeholders";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:py-8">
      <section aria-labelledby="home-title" className="relative min-h-96 overflow-hidden rounded-lg border border-border bg-surface">
        <Image src={CHANTIER_01.file} alt={CHANTIER_01.alt} fill loading="eager" sizes="(max-width: 768px) 100vw, 1152px" className="object-cover" />
        <div className="absolute inset-0 bg-ink/35" aria-hidden="true" />
        <div className="relative flex min-h-96 max-w-xl flex-col justify-end gap-4 p-5 text-white sm:p-8">
          <p className="flex w-fit items-center gap-2 rounded-md bg-real px-3 py-2 text-sm font-bold text-real-contrast">
            <MapPinIcon />
            {HOME_CONTENT.realBadge}
          </p>
          <div>
            <h1 id="home-title" className="text-3xl font-bold sm:text-5xl">{HOME_CONTENT.title}</h1>
            <p className="mt-3 max-w-lg text-base leading-7 sm:text-lg">{HOME_CONTENT.intro}</p>
          </div>
          <Link href="/mission" className="flex w-fit items-center gap-2 rounded-md bg-brand px-5 py-3 text-base font-bold text-brand-contrast hover:opacity-90">
            <FlagIcon />
            {HOME_CONTENT.ctaLabel}
          </Link>
        </div>
      </section>

      <section aria-label="Déroulé du parcours" className="grid gap-3 sm:grid-cols-3">
        {HOME_CONTENT.steps.map((step, index) => (
          <article key={step.title} className="rounded-md border border-border bg-surface p-4">
            <p className="text-sm font-bold text-brand">{index + 1}</p>
            <h2 className="mt-1 text-lg font-bold text-ink">{step.title}</h2>
            <p className="mt-1 text-sm leading-6 text-ink-muted">{step.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
