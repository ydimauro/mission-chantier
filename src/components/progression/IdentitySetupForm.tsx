"use client";

import { useState, type FormEvent } from "react";
import { useProgression } from "@/providers/progression-provider";
import { useLevel } from "@/providers/level-provider";
import { LEVELS, LEVEL_LABELS } from "@content/config";
import { IDENTITY_FORM } from "@content/pages/progression";

export function IdentitySetupForm() {
  const { createIdentity } = useProgression();
  const { level } = useLevel();

  const [studentCode, setStudentCode] = useState("");
  const [classe, setClasse] = useState("");
  const [niveau, setNiveau] = useState(level);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!studentCode.trim()) {
      setError(IDENTITY_FORM.studentCodeRequired);
      return;
    }
    if (!classe.trim()) {
      setError(IDENTITY_FORM.classeRequired);
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await createIdentity({ studentCode, classe, niveau });
    } catch (creationError) {
      console.error("Échec de la création de la progression :", creationError);
      setError(IDENTITY_FORM.createError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold text-ink">{IDENTITY_FORM.title}</h1>
        <p className="mt-1 text-sm text-ink-muted">{IDENTITY_FORM.intro}</p>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium text-ink">
        {IDENTITY_FORM.studentCodeLabel}
        <input
          type="text"
          value={studentCode}
          onChange={(event) => setStudentCode(event.target.value)}
          placeholder="4E2-017"
          className="rounded-md border border-border bg-surface px-3 py-2 text-base text-ink"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-ink">
        {IDENTITY_FORM.classeLabel}
        <input
          type="text"
          value={classe}
          onChange={(event) => setClasse(event.target.value)}
          placeholder="4E2"
          className="rounded-md border border-border bg-surface px-3 py-2 text-base text-ink"
        />
      </label>

      <fieldset className="flex flex-col gap-1">
        <legend className="text-sm font-medium text-ink">{IDENTITY_FORM.niveauLabel}</legend>
        <div className="flex gap-2">
          {LEVELS.map((candidate) => (
            <label
              key={candidate}
              className={
                candidate === niveau
                  ? "flex-1 cursor-pointer rounded-md border border-brand bg-brand px-3 py-2 text-center text-sm font-semibold text-brand-contrast"
                  : "flex-1 cursor-pointer rounded-md border border-border px-3 py-2 text-center text-sm font-medium text-ink"
              }
            >
              <input
                type="radio"
                name="niveau"
                value={candidate}
                checked={candidate === niveau}
                onChange={() => setNiveau(candidate)}
                className="sr-only"
              />
              {LEVEL_LABELS[candidate]}
            </label>
          ))}
        </div>
      </fieldset>

      {error ? (
        <p role="alert" className="text-sm font-medium text-brand">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-brand px-4 py-2 text-base font-semibold text-brand-contrast disabled:opacity-60"
      >
        {IDENTITY_FORM.submitLabel}
      </button>
    </form>
  );
}
