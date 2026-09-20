import type { Metadata } from "next";
import { PRIVACY_INTRO, PRIVACY_SECTIONS, PRIVACY_TITLE } from "@content/pages/privacy";
import { EraseDataButton } from "@/components/privacy/EraseDataButton";

export const metadata: Metadata = { title: PRIVACY_TITLE };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold text-ink">{PRIVACY_TITLE}</h1>
      <p className="mt-4 rounded-md border border-border bg-surface-muted px-4 py-3 text-ink">
        {PRIVACY_INTRO}
      </p>

      <div className="mt-8 flex flex-col gap-8">
        {PRIVACY_SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-ink">{section.title}</h2>
            <ul className="mt-2 flex flex-col gap-2 text-base leading-7 text-ink-muted">
              {section.paragraphs.map((paragraph) => (
                <li key={paragraph}>{paragraph}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10">
        <EraseDataButton />
      </div>
    </div>
  );
}
