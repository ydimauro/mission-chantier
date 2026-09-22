export type ResourceCategory = "Engins" | "Matériaux" | "Outils et composants" | "Équipements et sécurité" | "Glossaire";

export type ResourceEntry = {
  id: string;
  category: ResourceCategory;
  subcategory: string;
  term: string;
  description: string;
  missions: readonly string[];
};

/** Répertoire pédagogique des objets et mots employés dans les missions.
 * Les descriptions servent à apprendre le vocabulaire : aucune performance
 * ou donnée technique réelle n’est présentée. */
export const RESOURCE_ENTRIES: readonly ResourceEntry[] = [
  { id: "pelle", category: "Engins", subcategory: "Creuser et charger", term: "Pelle hydraulique", description: "Engin utilisé pour creuser et déplacer des matériaux avec son bras et son godet.", missions: ["5E-01", "5E-03", "5E-04", "5E-06", "4E-01"] },
  { id: "bulldozer", category: "Engins", subcategory: "Déplacer le sol", term: "Bulldozer", description: "Engin à lame qui pousse de gros volumes de terre au sol.", missions: ["5E-03"] },
  { id: "chargeuse", category: "Engins", subcategory: "Creuser et charger", term: "Chargeuse", description: "Engin à godet qui charge et déplace des matériaux sur une courte distance.", missions: ["5E-03"] },
  { id: "tombereau", category: "Engins", subcategory: "Transporter", term: "Tombereau", description: "Véhicule à benne utilisé pour transporter des matériaux ou des gravats.", missions: ["5E-01", "5E-03", "5E-05", "5E-08"] },
  { id: "grue", category: "Engins", subcategory: "Lever", term: "Grue", description: "Engin qui soulève et déplace une charge en hauteur.", missions: ["5E-01", "5E-03", "5E-07", "5E-12", "4E-FINAL"] },
  { id: "compacteur", category: "Engins", subcategory: "Préparer le sol", term: "Compacteur", description: "Engin qui tasse le sol pour le stabiliser.", missions: ["5E-03"] },
  { id: "telescopique", category: "Engins", subcategory: "Lever", term: "Télescopique", description: "Engin dont le bras extensible permet d’atteindre un point en hauteur avec du matériel.", missions: ["5E-03"] },
  { id: "terre", category: "Matériaux", subcategory: "Sols et granulats", term: "Terre", description: "Matière extraite ou déplacée lors du creusement.", missions: ["5E-05"] },
  { id: "gravats", category: "Matériaux", subcategory: "À trier et évacuer", term: "Gravats", description: "Morceaux de matériaux provenant de travaux ou de démolition, à évacuer ou à trier.", missions: ["5E-01", "5E-05", "5E-08", "5E-12", "4E-10"] },
  { id: "sable", category: "Matériaux", subcategory: "Sols et granulats", term: "Sable", description: "Matériau granulaire utilisé dans plusieurs travaux de construction.", missions: ["5E-05"] },
  { id: "acier", category: "Matériaux", subcategory: "Métaux", term: "Acier", description: "Métal utilisé pour des pièces résistantes, par exemple le bras d’un engin.", missions: ["4E-03"] },
  { id: "carburant", category: "Matériaux", subcategory: "Énergies", term: "Carburant", description: "Source d’énergie mentionnée pour alimenter un moteur thermique dans les activités.", missions: ["5E-05", "4E-02", "4E-05", "4E-09"] },
  { id: "batterie", category: "Matériaux", subcategory: "Énergies", term: "Batterie", description: "Élément qui stocke de l’énergie électrique dans les comparaisons pédagogiques.", missions: ["5E-05", "4E-09"] },
  { id: "godet", category: "Outils et composants", subcategory: "Composants de l’engin", term: "Godet", description: "Partie creuse placée au bout du bras d’une pelle pour prendre et déplacer des matériaux.", missions: ["4E-01"] },
  { id: "cabine", category: "Outils et composants", subcategory: "Composants de l’engin", term: "Cabine et commandes", description: "Partie de l’engin depuis laquelle une personne pilote les commandes.", missions: ["4E-01"] },
  { id: "chenilles", category: "Outils et composants", subcategory: "Composants de l’engin", term: "Chenilles", description: "Éléments qui permettent à la pelle étudiée de se déplacer sur le sol.", missions: ["4E-01", "4E-05"] },
  { id: "joystick", category: "Outils et composants", subcategory: "Information et commande", term: "Joystick", description: "Commande utilisée par le conducteur pour transmettre une instruction à l’engin.", missions: ["5E-05"] },
  { id: "pompe", category: "Outils et composants", subcategory: "Hydraulique", term: "Pompe hydraulique", description: "Composant qui met le fluide hydraulique sous pression dans la simulation étudiée.", missions: ["5E-06", "4E-01", "4E-03"] },
  { id: "verin", category: "Outils et composants", subcategory: "Hydraulique", term: "Vérin", description: "Composant qui transforme la pression d’un fluide en mouvement.", missions: ["5E-06", "4E-01", "4E-03", "4E-04"] },
  { id: "moteur", category: "Outils et composants", subcategory: "Énergie", term: "Moteur", description: "Composant qui fournit l’énergie mécanique nécessaire au fonctionnement de l’engin étudié.", missions: ["5E-06", "4E-01"] },
  { id: "distributeur", category: "Outils et composants", subcategory: "Hydraulique", term: "Distributeur hydraulique", description: "Composant de la chaîne hydraulique simplifiée qui répartit le fluide vers l’action choisie.", missions: ["4E-02", "4E-03", "4E-05"] },
  { id: "flexibles", category: "Outils et composants", subcategory: "Hydraulique", term: "Flexibles hydrauliques", description: "Conduits qui transmettent le fluide dans le modèle de la pelle étudiée.", missions: ["4E-02"] },
  { id: "cable", category: "Outils et composants", subcategory: "Information et commande", term: "Câble", description: "Élément de liaison utilisé pour transmettre un signal ou une commande dans les activités de diagnostic.", missions: ["4E-11"] },
  { id: "capteur", category: "Outils et composants", subcategory: "Information et commande", term: "Capteur de proximité", description: "Composant qui détecte la présence ou la distance d’un obstacle et transmet une information.", missions: ["5E-05", "5E-09", "5E-10", "4E-04", "4E-08"] },
  { id: "calculateur", category: "Outils et composants", subcategory: "Information et commande", term: "Calculateur", description: "Composant qui traite une information avant de commander une action dans le modèle étudié.", missions: ["5E-05", "4E-04"] },
  { id: "casque", category: "Équipements et sécurité", subcategory: "Protection individuelle", term: "Casque de chantier", description: "Équipement de protection de la tête porté dans les situations de chantier étudiées.", missions: ["5E-01", "5E-07"] },
  { id: "gilet", category: "Équipements et sécurité", subcategory: "Protection individuelle", term: "Gilet haute visibilité", description: "Équipement qui aide à rendre une personne visible dans une zone de circulation.", missions: ["5E-07"] },
  { id: "zone-interdite", category: "Équipements et sécurité", subcategory: "Organisation et signalisation", term: "Zone interdite", description: "Espace où personne ne doit entrer pendant une manœuvre dangereuse.", missions: ["5E-07", "4E-07"] },
  { id: "besoin", category: "Glossaire", subcategory: "Mots pour analyser", term: "Besoin", description: "Ce qu’une personne ou une situation nécessite. Un objet technique peut répondre à un besoin.", missions: ["5E-01"] },
  { id: "contrainte", category: "Glossaire", subcategory: "Mots pour analyser", term: "Contrainte", description: "Condition à respecter, par exemple la sécurité, la circulation ou le temps.", missions: ["5E-01", "5E-04", "4E-10"] },
  { id: "matiere-energie-information", category: "Glossaire", subcategory: "Fonctionnement", term: "Matière, énergie, information", description: "Trois familles pour décrire ce qui circule : ce qui est déplacé, ce qui fait fonctionner et ce qui commande ou signale.", missions: ["5E-05"] },
  { id: "chaine-energie", category: "Glossaire", subcategory: "Fonctionnement", term: "Chaîne d’énergie", description: "Suite d’éléments qui conduit d’une source d’énergie jusqu’à un mouvement ou une action.", missions: ["5E-06", "4E-02"] },
  { id: "chaine-information", category: "Glossaire", subcategory: "Fonctionnement", term: "Chaîne d’information", description: "Suite d’étapes qui permet de capter, traiter puis commander une action.", missions: ["5E-09", "4E-04"] },
  { id: "simulation", category: "Glossaire", subcategory: "Démarche", term: "Simulation pédagogique", description: "Modèle simplifié utilisé pour tester, observer ou comparer. Il ne décrit pas exactement un chantier réel.", missions: ["5E-08", "4E-03", "4E-10"] },
  { id: "protocole", category: "Glossaire", subcategory: "Démarche", term: "Protocole de test", description: "Suite d’étapes prévues pour réaliser un test de façon organisée et pouvoir comparer les résultats.", missions: ["4E-08"] },
];

export const RESOURCE_CATEGORIES: readonly ResourceCategory[] = ["Engins", "Matériaux", "Outils et composants", "Équipements et sécurité", "Glossaire"];
