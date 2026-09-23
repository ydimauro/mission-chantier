import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";

export const MISSION_4E_07 = { id: "4E-07", objectifs: ["Repère les flux d’un chantier.", "Choisis une organisation qui limite les conflits."], problematique: "Comment limiter les conflits entre les engins et les personnes sur le chantier ?", consigne: "Associe chaque situation à la zone la plus adaptée." } as const;
export const ASSOCIATION_4E_07_CHOICES: readonly AssociationChoice[] = [
  { id: "engins", label: "Accès engins" }, { id: "personnes", label: "Passage des personnes" }, { id: "stockage", label: "Zone de stockage" }, { id: "interdite", label: "Zone interdite" },
];
export const ASSOCIATION_4E_07_ITEMS: readonly AssociationItem[] = [
  { id: "a", prompt: "Des engins reculent et tournent.", correctChoiceId: "engins" }, { id: "b", prompt: "Des personnes traversent à pied.", correctChoiceId: "personnes" }, { id: "c", prompt: "Des matériaux attendent avant utilisation.", correctChoiceId: "stockage" }, { id: "d", prompt: "Une manœuvre dangereuse est en cours.", correctChoiceId: "interdite" },
];
export const ASSOCIATION_4E_07_HINTS = ["Sépare d’abord les personnes des engins.", "Une zone interdite protège pendant une manœuvre."] as const;
export const MISSION_4E_07_TRACE = { title: "Organiser les flux", prompt: "Dans ton cours, trace un plan simple avec accès engins, passage des personnes, stockage et zone interdite. Justifie deux choix." } as const;
export const MISSION_4E_07_BILAN = "Tu sais organiser des zones pour limiter les conflits entre les flux du chantier.";
