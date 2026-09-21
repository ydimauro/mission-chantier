/**
 * Contenus neutres du socle technique (ÉTAPE 1). Les missions elles-mêmes
 * (5E-00, 4E-00, etc.) sont du contenu pédagogique séparé, développé à
 * partir de l’ÉTAPE 6 (docs/SPEC.md § 65). Ces textes ne décrivent donc
 * jamais une mission précise, seulement le fonctionnement général de
 * l’application.
 */

export const HOME_CONTENT = {
  realBadge: "Situation réelle",
  title: "Givors se transforme",
  intro: "Observe une transformation réelle de la ville, puis découvre les systèmes techniques qui permettent de la réaliser.",
  ctaLabel: "Commencer ma mission",
  steps: [
    { title: "Observer", body: "Regarde une situation réelle et formule tes premières idées." },
    { title: "Comprendre", body: "Manipule des simulations clairement identifiées." },
    { title: "Écrire", body: "Garde une trace dans ton cahier, à chaque mission." },
  ],
} as const;

export const CARNET_PLACEHOLDER = {
  title: "Mon carnet",
  body: "Cet espace rappellera, mission après mission, ce que tu dois écrire dans ton cahier papier. L’application ne remplace jamais le cahier.",
} as const;

export const RESSOURCES_PLACEHOLDER = {
  title: "Ressources",
  body: "Tu trouveras ici le lexique, les sources utilisées et des informations sur des métiers liés au chantier et à la ville.",
} as const;
