import Link from "next/link";
import { AppMark } from "@/components/ui/AppMark";
import { HOME_CONTENT } from "@content/pages/placeholders";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center">
      <AppMark size={64} />
      <h1 className="text-3xl font-bold text-ink">{HOME_CONTENT.title}</h1>
      <p className="text-lg leading-8 text-ink-muted">{HOME_CONTENT.intro}</p>

      <ul className="flex flex-col gap-2 text-left text-base text-ink">
        {HOME_CONTENT.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span aria-hidden="true" className="text-brand">
              •
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/mission"
        className="mt-4 rounded-full bg-brand px-6 py-3 text-base font-semibold text-brand-contrast hover:opacity-90"
      >
        {HOME_CONTENT.ctaLabel}
      </Link>
    </div>
  );
}
