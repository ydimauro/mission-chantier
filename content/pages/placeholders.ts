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
  observationPrompt: "Observe l’image et choisis une ou plusieurs réponses.",
  observationChoices: [
    { id: "demolir", label: "On démolit" },
    { id: "construire", label: "On construit" },
    { id: "renover", label: "On rénove" },
    { id: "amenager", label: "On aménage" },
    { id: "materiaux", label: "On déplace des matériaux" },
    { id: "circulation", label: "On modifie la circulation" },
    { id: "inconnu", label: "Je ne sais pas encore" },
  ],
  writingTitle: "Écris dans ton cours",
  writingPrompt: "À ton avis, comment transforme-t-on une partie d’une ville ?",
  writingPlaceholder: "Écris ici tes idées…",
  ctaLabel: "Commencer ma mission",
  ctaCaption: "Observer · Comprendre · Agir pour demain",
} as const;

export const CARNET_PLACEHOLDER = {
  title: "Mon carnet",
  body: "Cet espace rappellera, mission après mission, ce que tu dois écrire dans ton cahier papier. L’application ne remplace jamais le cahier.",
} as const;

export const RESSOURCES_PLACEHOLDER = {
  title: "Ressources",
  body: "Tu trouveras ici le lexique, les sources utilisées et des informations sur des métiers liés au chantier et à la ville.",
} as const;
