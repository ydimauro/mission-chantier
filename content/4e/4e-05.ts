import type { DiagnosticChoice, DiagnosticTest } from "@/components/mission/SommativeDiagnostic";

export const MISSION_4E_05 = {
  id: "4E-05",
  objectifs: [
    "Choisis des tests pour observer les symptômes d’une panne.",
    "Propose une cause et une solution après avoir éliminé des hypothèses.",
  ],
  problematique: "Comment trouver la cause d’une panne ?",
  consigne: "Le bras de la pelle ne monte plus. Réalise au moins deux tests, puis propose une cause et une solution.",
} as const;

export const DIAGNOSTIC_4E_05_TESTS: readonly DiagnosticTest[] = [
  { id: "carburant", label: "Vérifier le niveau de carburant", result: "Le moteur démarre et tourne normalement." },
  { id: "commandes", label: "Vérifier la commande du bras", result: "Le signal de commande arrive bien au distributeur." },
  { id: "fluide", label: "Vérifier le niveau de fluide hydraulique", result: "Le niveau de fluide hydraulique est très bas." },
  { id: "chenilles", label: "Tester le déplacement des chenilles", result: "Les chenilles se déplacent normalement." },
];

export const DIAGNOSTIC_4E_05_CAUSES: readonly DiagnosticChoice[] = [
  { id: "carburant", label: "Manque de carburant" },
  { id: "commande", label: "Commande du bras débranchée" },
  { id: "fluide", label: "Manque de fluide hydraulique" },
  { id: "chenilles", label: "Chenilles bloquées" },
];

export const DIAGNOSTIC_4E_05_SOLUTIONS: readonly DiagnosticChoice[] = [
  { id: "remplir-carburant", label: "Faire le plein de carburant" },
  { id: "rebrancher", label: "Rebrancher la commande" },
  { id: "remplir-fluide", label: "Contrôler puis compléter le fluide hydraulique" },
  { id: "deblayer", label: "Dégager les chenilles" },
];

export const MISSION_4E_05_TRACE = {
  title: "La démarche de diagnostic",
  prompt: "Dans ton cahier, complète un tableau : symptôme / hypothèses / tests réalisés / cause retenue / solution proposée.",
} as const;

export const MISSION_4E_05_BILAN =
  "Ton diagnostic a été enregistré. Il sera corrigé par le professeur ou la professeure.";