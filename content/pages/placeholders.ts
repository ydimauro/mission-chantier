/**
 * Contenus neutres du socle technique (ÉTAPE 1). Les missions elles-mêmes
 * (5E-00, 4E-00, etc.) sont du contenu pédagogique séparé, développé à
 * partir de l’ÉTAPE 6 (docs/SPEC.md § 65). Ces textes ne décrivent donc
 * jamais une mission précise, seulement le fonctionnement général de
 * l’application.
 */

export const HOME_CONTENT = {
  title: "Bienvenue sur Mission Chantier",
  intro:
    "Cette application t’accompagne pour comprendre les objets et les systèmes techniques à travers un exemple concret : la transformation du centre-ville de Givors.",
  bullets: [
    "Tu observeras des situations réelles et des simulations clairement identifiées.",
    "Tu écriras régulièrement dans ton cahier, en plus de ce que tu fais à l’écran.",
    "Tu pourras suivre ta progression et tes résultats dans l’espace « Ma progression ».",
  ],
  ctaLabel: "Découvrir ma mission",
} as const;

export const MISSION_PLACEHOLDER = {
  title: "Ma mission",
  body: "Les missions seront disponibles ici au fil du développement de l’application. Reviens un peu plus tard.",
} as const;

export const CARNET_PLACEHOLDER = {
  title: "Mon carnet",
  body: "Cet espace rappellera, mission après mission, ce que tu dois écrire dans ton cahier papier. L’application ne remplace jamais le cahier.",
} as const;

export const RESSOURCES_PLACEHOLDER = {
  title: "Ressources",
  body: "Tu trouveras ici le lexique, les sources utilisées et des informations sur des métiers liés au chantier et à la ville.",
} as const;

export const PROGRESSION_PLACEHOLDER = {
  title: "Ma progression",
  body: "Cet espace affichera tes missions terminées, tes résultats disponibles et tes compétences, sans classement ni comparaison avec les autres élèves.",
} as const;
