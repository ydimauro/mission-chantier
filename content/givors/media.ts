/**
 * Médias réels sur Givors, distribués avec l’application après vérification
 * des droits (docs/SPEC.md § 5, § 3). Date exacte de prise de vue
 * confirmée par l’enseignant le 2026-09-21.
 */

export type GivorsMedia = {
  file: string;
  title: string;
  date: string;
  author: string;
  source: string;
  alt: string;
  width: number;
  height: number;
  rightsChecked: boolean;
};

export const CHANTIER_01: GivorsMedia = {
  file: "/givors/mission_chantier_givors.jpg",
  title: "Travaux dans le centre-ville de Givors",
  date: "2026-09-20",
  author: "Yann Di Mauro",
  source: "Photographie personnelle",
  alt: "Vue en hauteur d’un chantier de démolition avec pelles mécaniques, gravats et bâtiments environnants",
  width: 1844,
  height: 853,
  rightsChecked: true,
};

export const CHANTIER_VUE_RUE: GivorsMedia = {
  file: "/givors/chantier-givors-vue-rue.webp",
  title: "Vue du chantier depuis la rue",
  date: "2026-09-21",
  author: "Yann Di Mauro",
  source: "Photographie personnelle, luminosité retouchée par IA",
  alt: "Vue depuis la rue d’un chantier de démolition à Givors, avec gravats, barrières et pelles mécaniques",
  width: 1600,
  height: 900,
  rightsChecked: true,
};

export const CHANTIER_ENGIN: GivorsMedia = {
  file: "/givors/chantier-givors-engin.webp",
  title: "Engin de chantier vu en hauteur",
  date: "2026-08-23",
  author: "Yann Di Mauro",
  source: "Photographie personnelle, luminosité retouchée par IA",
  alt: "Vue en hauteur du chantier de Givors avec une grande pelle mécanique turquoise au-dessus des bâtiments en démolition",
  width: 1600,
  height: 900,
  rightsChecked: true,
};
