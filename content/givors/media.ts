/**
 * Médias réels sur Givors, distribués avec l’application après vérification
 * des droits (docs/SPEC.md § 5, § 3). Métadonnées provisoires enregistrées
 * dans docs/QUESTIONS_OUVERTES.md le 2026-09-20, à confirmer précisément
 * avec l’enseignant (date exacte de la prise de vue notamment).
 */

export type GivorsMedia = {
  file: string;
  title: string;
  date: string;
  author: string;
  source: string;
  alt: string;
  rightsChecked: boolean;
};

export const CHANTIER_01: GivorsMedia = {
  file: "/givors/mission_chantier_givors.jpg",
  title: "Travaux dans le centre-ville de Givors",
  date: "2026-09",
  author: "Yann Di Mauro",
  source: "Photographie personnelle",
  alt: "Vue en hauteur d’un chantier de démolition avec pelles mécaniques, gravats et bâtiments environnants",
  rightsChecked: true,
};
