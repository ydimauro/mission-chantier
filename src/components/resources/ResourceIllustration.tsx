import type { ResourceCategory } from "@content/pages/resources";

type ResourceIllustrationProps = { category: ResourceCategory; term: string };

/** Illustrations vectorielles locales. Elles servent de repère visuel et ne
 * représentent ni une photographie ni une donnée réelle de Givors. */
export function ResourceIllustration({ category, term }: ResourceIllustrationProps) {
  const label = `Illustration pédagogique : ${term}`;
  const base = { viewBox: "0 0 160 100", role: "img" as const, "aria-label": label, className: "h-24 w-full rounded-md bg-surface-muted" };
  if (category === "Engins") return <svg {...base}><rect x="22" y="66" width="116" height="13" rx="6" fill="#334155"/><circle cx="48" cy="83" r="10" fill="#1e293b"/><circle cx="116" cy="83" r="10" fill="#1e293b"/><path d="M48 64V40h42l18 24z" fill="#e26721"/><path d="M90 42l34-24 8 9-29 29" fill="#f59e0b"/><path d="M126 17l16-4 3 10-17 5z" fill="#e26721"/><rect x="58" y="45" width="20" height="14" rx="2" fill="#dbeafe"/></svg>;
  if (category === "Matériaux") return <svg {...base}><path d="M18 77l25-39 22 26 21-42 31 55z" fill="#cbd5e1"/><path d="M23 77l25-29 17 17 21-29 25 41z" fill="#94a3b8"/><circle cx="116" cy="66" r="9" fill="#eab308"/><circle cx="134" cy="72" r="6" fill="#f59e0b"/><rect x="18" y="78" width="124" height="5" rx="2" fill="#64748b"/></svg>;
  if (category === "Outils et composants") return <svg {...base}><path d="M45 20l17 17-8 8 26 26-12 12-26-26-8 8-17-17z" fill="#e26721"/><path d="M101 21a20 20 0 1 1-14 34l-16 16-8-8 16-16a20 20 0 0 1 22-26z" fill="#64748b"/><circle cx="101" cy="41" r="8" fill="#dbeafe"/></svg>;
  if (category === "Équipements et sécurité") return <svg {...base}><path d="M80 14l39 14v25c0 22-16 31-39 38-23-7-39-16-39-38V28z" fill="#f59e0b"/><path d="M80 28v43M60 49h40" stroke="#fff" strokeWidth="8"/><path d="M47 83h66" stroke="#334155" strokeWidth="6" strokeLinecap="round"/></svg>;
  return <svg {...base}><rect x="36" y="18" width="62" height="65" rx="4" fill="#e26721"/><path d="M67 18h57v65H67" fill="#f59e0b"/><path d="M52 35h29M52 47h29M52 59h22M82 35h26M82 47h26M82 59h20" stroke="#fff" strokeWidth="5" strokeLinecap="round"/></svg>;
}
