"use client";

import { useMemo, useState } from "react";
import { RESOURCE_CATEGORIES, RESOURCE_ENTRIES, type ResourceCategory } from "@content/pages/resources";
import { ResourceIllustration } from "@/components/resources/ResourceIllustration";

export function ResourcesClient() {
  const [category, setCategory] = useState<ResourceCategory | "Toutes">("Toutes");
  const [subcategory, setSubcategory] = useState("Toutes");
  const [query, setQuery] = useState("");
  const subcategories = useMemo(() => Array.from(new Set(RESOURCE_ENTRIES.filter((entry) => category === "Toutes" || entry.category === category).map((entry) => entry.subcategory))), [category]);
  const entries = RESOURCE_ENTRIES.filter((entry) => {
    const haystack = `${entry.term} ${entry.description} ${entry.missions.join(" ")}`.toLocaleLowerCase("fr");
    return (category === "Toutes" || entry.category === category) && (subcategory === "Toutes" || entry.subcategory === subcategory) && haystack.includes(query.toLocaleLowerCase("fr"));
  });

  function selectCategory(next: ResourceCategory | "Toutes") { setCategory(next); setSubcategory("Toutes"); }

  return <div className="mx-auto max-w-6xl px-4 py-10">
    <h1 className="text-2xl font-bold text-ink">Ressources</h1>
    <p className="mt-2 max-w-3xl text-ink-muted">Cette page est conçue pour rester ouverte pendant ta mission. Elle contient les objets et les mots utilisés dans les activités.</p>
    <p className="mt-2 rounded-md border border-border bg-surface-muted p-3 text-sm text-ink">Descriptions pédagogiques. Les situations de Givors et les simulations restent distinguées dans les missions.</p>
    <div className="mt-6 grid gap-6 lg:grid-cols-[15rem_1fr]">
      <aside className="rounded-md border border-border bg-surface p-3" aria-label="Menu des ressources">
        <p className="px-2 text-sm font-bold text-ink">Catégories</p>
        <div className="mt-2 flex flex-col gap-1">
          <button type="button" onClick={() => selectCategory("Toutes")} className={`rounded-md px-3 py-2 text-left text-sm font-semibold ${category === "Toutes" ? "bg-brand text-brand-contrast" : "hover:bg-surface-muted"}`}>Toutes les ressources</button>
          {RESOURCE_CATEGORIES.map((item) => <button key={item} type="button" onClick={() => selectCategory(item)} className={`rounded-md px-3 py-2 text-left text-sm font-semibold ${category === item ? "bg-brand text-brand-contrast" : "hover:bg-surface-muted"}`}>{item}</button>)}
        </div>
        {subcategories.length > 1 ? <><p className="mt-5 px-2 text-sm font-bold text-ink">Sous-catégories</p><div className="mt-2 flex flex-col gap-1"><button type="button" onClick={() => setSubcategory("Toutes")} className={`rounded-md px-3 py-2 text-left text-sm ${subcategory === "Toutes" ? "bg-surface-muted font-bold" : "hover:bg-surface-muted"}`}>Toutes</button>{subcategories.map((item) => <button key={item} type="button" onClick={() => setSubcategory(item)} className={`rounded-md px-3 py-2 text-left text-sm ${subcategory === item ? "bg-surface-muted font-bold" : "hover:bg-surface-muted"}`}>{item}</button>)}</div></> : null}
      </aside>
      <section aria-labelledby="resources-list-title">
        <label className="flex flex-col gap-1 text-sm font-semibold text-ink">Rechercher un mot, un engin ou une mission<input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Exemple : pelle, capteur, 5E-03" className="rounded-md border border-border bg-surface px-3 py-2 text-base font-normal" /></label>
        <h2 id="resources-list-title" className="mt-5 text-lg font-bold text-ink">{entries.length} ressource{entries.length > 1 ? "s" : ""}</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">{entries.map((entry) => <li key={entry.id} className="rounded-md border border-border bg-surface p-4"><ResourceIllustration category={entry.category} term={entry.term}/><p className="mt-3 text-xs font-bold uppercase tracking-wide text-ink-muted">{entry.category} · {entry.subcategory}</p><h3 className="mt-1 text-lg font-bold text-ink">{entry.term}</h3><p className="mt-2 text-sm leading-6 text-ink">{entry.description}</p><p className="mt-3 text-xs text-ink-muted">Illustration pédagogique · Utilisé dans : {entry.missions.join(", ")}</p></li>)}</ul>
        {entries.length === 0 ? <p className="mt-4 rounded-md border border-border bg-surface-muted p-4 text-sm text-ink">Aucune ressource ne correspond à cette recherche.</p> : null}
      </section>
    </div>
  </div>;
}
