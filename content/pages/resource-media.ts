type ResourcePhoto = {
  file: string;
  author: string;
  license: string;
};

const PHOTOS = {
  pelle: { file: "/ressources/photos/pelle.webp", author: "Matthew T Rader", license: "CC BY-SA 4.0" },
  bulldozer: { file: "/ressources/photos/bulldozer.webp", author: "Petar Milošević", license: "CC BY-SA 4.0" },
  chargeuse: { file: "/ressources/photos/chargeuse.webp", author: "Syced", license: "CC0" },
  tombereau: { file: "/ressources/photos/tombereau.webp", author: "Wikideas1", license: "CC0" },
  grue: { file: "/ressources/photos/grue.webp", author: "Rodhullandemu", license: "CC BY-SA 4.0" },
  compacteur: { file: "/ressources/photos/compacteur.webp", author: "Grendelkhan", license: "CC BY-SA 4.0" },
  telescopique: { file: "/ressources/photos/telescopique.webp", author: "Grendelkhan", license: "CC BY-SA 4.0" },
  terre: { file: "/ressources/photos/terre.webp", author: "-tacitos-", license: "CC BY 4.0" },
  gravats: { file: "/ressources/photos/gravats.webp", author: "Ermell", license: "CC BY-SA 4.0" },
  sable: { file: "/ressources/photos/sable.webp", author: "Bill Nicholls", license: "CC BY-SA 2.0" },
  acier: { file: "/ressources/photos/acier.webp", author: "Shixart1985", license: "CC BY 2.0" },
  carburant: { file: "/ressources/photos/carburant.webp", author: "Mr. Satterly", license: "CC0" },
  batterie: { file: "/ressources/photos/batterie.webp", author: "Image fournie par l’enseignant", license: "Autorisation fournie" },
  godet: { file: "/ressources/photos/godet.webp", author: "Image fournie par l’enseignant", license: "Autorisation fournie" },
  cabine: { file: "/ressources/photos/cabine.webp", author: "Grendelkhan", license: "CC BY-SA 4.0" },
  chenilles: { file: "/ressources/photos/chenilles.webp", author: "Bugsybanana", license: "CC BY-SA 4.0" },
  joystick: { file: "/ressources/photos/joystick.webp", author: "Mithilrkadam", license: "CC BY-SA 4.0" },
  pompe: { file: "/ressources/photos/pompe.webp", author: "Image fournie par l’enseignant", license: "Autorisation fournie" },
  verin: { file: "/ressources/photos/verin.webp", author: "Federal Bureau of Investigation", license: "Domaine public" },
  moteur: { file: "/ressources/photos/moteur.webp", author: "Image fournie par l’enseignant", license: "Autorisation fournie" },
  distributeur: { file: "/ressources/photos/distributeur.webp", author: "Dietmar Rabich", license: "CC BY-SA 4.0" },
  flexibles: { file: "/ressources/photos/flexibles.webp", author: "Shixart1985", license: "CC BY 2.0" },
  cable: { file: "/ressources/photos/cable.webp", author: "Petar Milošević", license: "CC BY-SA 4.0" },
  casque: { file: "/ressources/photos/casque.webp", author: "רנדום", license: "CC BY-SA 3.0" },
  gilet: { file: "/ressources/photos/gilet.webp", author: "Magnus Mertens", license: "CC BY-SA 2.0 de" },
  "zone-interdite": { file: "/ressources/photos/zone-interdite.webp", author: "Image fournie par l’enseignant", license: "Autorisation fournie" },
} as const satisfies Record<string, ResourcePhoto>;

const photoByResourceId: Record<string, keyof typeof PHOTOS> = {
  pelle: "pelle", bulldozer: "bulldozer", chargeuse: "chargeuse", tombereau: "tombereau", grue: "grue", compacteur: "compacteur", telescopique: "telescopique",
  terre: "terre", gravats: "gravats", sable: "sable", acier: "acier", carburant: "carburant", batterie: "batterie",
  godet: "godet", cabine: "cabine", chenilles: "chenilles", joystick: "joystick", pompe: "pompe", verin: "verin", moteur: "moteur", distributeur: "distributeur", flexibles: "flexibles", cable: "cable",
  casque: "casque", gilet: "gilet", "zone-interdite": "zone-interdite",
};

export function getResourcePhoto(resourceId: string): ResourcePhoto {
  return PHOTOS[photoByResourceId[resourceId] ?? "pelle"];
}
