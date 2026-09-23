"use client";

import Link from "next/link";
import { MISSION_SEQUENCE } from "@content/missions/registry";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { isTraceEcriteConfirmee } from "@/lib/progression/model";
import { useProgression } from "@/providers/progression-provider";

function CourseContent() {
  const { snapshot } = useProgression();

  if (snapshot.status !== "ready") return null;

  const missions = MISSION_SEQUENCE[snapshot.file.niveau];

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold text-ink">Mon cours</h1>
      <p className="mt-2 max-w-3xl leading-7 text-ink-muted">
        Retrouve ici ce que chaque mission te demande d’écrire dans ton cours. La confirmation est enregistrée dans ta progression. Tes phrases et tes schémas restent dans ton cours sur papier.
      </p>

      <ul className="mt-6 space-y-3" aria-label="Traces écrites des missions">
        {missions.map((mission) => {
          const confirmed = isTraceEcriteConfirmee(snapshot.file, mission.id);

          return (
            <li key={mission.id} className="rounded-lg border border-border bg-surface p-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-brand">{mission.id}</p>
                  <h2 className="mt-1 text-lg font-bold text-ink">{mission.problematique}</h2>
                </div>
                <p className={`rounded-full px-3 py-1 text-sm font-semibold ${confirmed ? "bg-green-100 text-green-900" : "bg-surface-muted text-ink-muted"}`}>
                  {confirmed ? "Écriture confirmée" : "À écrire"}
                </p>
              </div>
              <p className="mt-3 leading-7 text-ink">{mission.traceEcrite}</p>
              <Link href={mission.href} className="mt-3 inline-flex rounded-full border border-border px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-muted">
                Ouvrir la mission
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export function CoursePageClient() {
  return (
    <RequireStudentIdentity>
      <CourseContent />
    </RequireStudentIdentity>
  );
}
