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
  intro: "Tu vas observer un vrai chantier à Givors, puis comprendre comment des objets et des systèmes techniques permettent de transformer la ville.",
  landmark: "Une ville d’aujourd’hui, des métiers pour demain !",
  observationTitle: "Que se passe-t-il ici ?",
  observationPrompt: "Observe l’image et choisis une ou plusieurs réponses. Tu retrouveras tes choix dans ta première mission.",
  observationChoices: [
    { id: "on-demolit", label: "On démolit", pictogram: "/pictograms/demolir.svg" },
    { id: "on-construit", label: "On construit", pictogram: "/pictograms/construire.svg" },
    { id: "on-renove", label: "On rénove", pictogram: "/pictograms/renover.svg" },
    { id: "on-amenage", label: "On aménage", pictogram: "/pictograms/amenager.svg" },
    { id: "on-deplace-materiaux", label: "On déplace des matériaux", pictogram: "/pictograms/materiaux.svg" },
    { id: "on-modifie-circulation", label: "On modifie la circulation", pictogram: "/pictograms/circulation.svg" },
    { id: "ne-sait-pas", label: "Je ne sais pas encore", pictogram: "/pictograms/question.svg" },
  ],
  ctaLabel: "Ouvrir mes missions",
  ctaCaption: "Observer · Comprendre · Agir pour demain",
} as const;

export const RESSOURCES_PLACEHOLDER = {
  title: "Ressources",
  body: "Tu trouveras ici le lexique, les sources utilisées et des informations sur des métiers liés au chantier et à la ville.",
} as const;
