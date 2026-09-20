# MISSION CHANTIER - CAHIER DES CHARGES MAÎTRE FINAL

## Application pédagogique de technologie - Cycle 4 - 5e et 4e
## Collège REP - Givors

---

# 1. Finalité générale

« Mission Chantier » est une application pédagogique Web destinée aux élèves de 5e et de 4e en technologie au cycle 4.

Elle prend appui sur un contexte local réel, visible par les élèves : les transformations du centre-ville de Givors. Ce contexte réel sert de situation déclenchante et donne du sens aux apprentissages.

L’application ne doit pas devenir un jeu de conduite d’engins. L’univers du chantier est un support permettant de travailler les objets et systèmes techniques, leurs usages, leurs interactions, leur structure, leur fonctionnement, l’énergie, l’information, les capteurs, la programmation, le diagnostic, la simulation, la conception et les choix techniques.

L’élève doit progressivement :

- observer ;
- se questionner ;
- formuler une hypothèse ;
- manipuler ;
- expérimenter ;
- simuler ;
- mesurer ;
- comparer ;
- analyser ;
- choisir ;
- programmer ;
- diagnostiquer ;
- corriger ;
- concevoir ;
- justifier ;
- écrire ;
- construire son cours ;
- être évalué ;
- mesurer ses progrès.

La démarche privilégiée est :

OBSERVER  
↓  
SE QUESTIONNER  
↓  
FORMULER UNE HYPOTHÈSE  
↓  
MANIPULER OU TESTER  
↓  
MESURER  
↓  
COMPARER  
↓  
COMPRENDRE  
↓  
ÉCRIRE DANS LE COURS  
↓  
S’ENTRAÎNER  
↓  
ÊTRE ÉVALUÉ  
↓  
RÉINVESTIR

Éviter absolument la succession « cours à lire / QCM / cours à lire / QCM ».

---

# 2. Situation déclenchante : « Givors se transforme »

Le point de départ est une situation réelle et locale : les transformations visibles dans le centre-ville de Givors.

Première problématique :

**« Comment transforme-t-on une partie d’une ville ? »**

Puis progressivement :

**« Quels objets et systèmes techniques permettent de réaliser cette transformation ? »**

Le cas réel doit rester un support de technologie. Toute réflexion sur la ville doit déboucher sur un contenu technologique identifiable :

- objet technique ;
- système technique ;
- fonction ;
- besoin ;
- interaction ;
- contrainte ;
- matériau ;
- énergie ;
- information ;
- capteur ;
- programme ;
- critère de choix ;
- mesure ;
- simulation ;
- protocole de test ;
- diagnostic ;
- conception.

---

# 3. Sources réelles sur Givors

Les faits concernant Givors doivent provenir uniquement de :

`docs/sources/givors/`

L’enseignant peut y déposer :

- PDF ;
- captures de pages institutionnelles ;
- documents de la Ville de Givors ;
- documents de la Métropole de Lyon ;
- photographies de panneaux de chantier ;
- plans ;
- photographies personnelles ;
- autres documents autorisés.

Règles :

1. Ne jamais inventer un fait réel absent des sources locales.
2. Même si l’agent possède un accès Internet, il ne doit pas intégrer automatiquement une donnée extérieure sans validation.
3. Si une information manque, l’ajouter dans `docs/QUESTIONS_OUVERTES.md`.
4. Si deux sources diffèrent, documenter la différence au lieu de trancher silencieusement.
5. Les affirmations institutionnelles doivent être attribuées : « Selon la Ville de Givors… ».

Le dossier `docs/sources/givors/` est ignoré par Git, sauf son README.

Les médias réellement autorisés à être distribués avec l’application sont copiés volontairement dans `public/givors/` après vérification des droits.

---

# 4. Neutralité et sensibilité du cas local

Un projet urbain peut concerner directement certaines familles ou certains élèves.

Le ton doit être descriptif, prudent et neutre.

Éviter toute formulation dévalorisante sur un quartier, des logements ou leurs habitants.

Ne jamais présenter un objectif municipal comme une vérité absolue. Utiliser par exemple :

- « Selon la Ville de Givors… » ;
- « Le projet présenté par la Ville prévoit… ».

Lorsque cela est utile, rappeler simplement :

« Un projet urbain peut être perçu différemment selon les usages et les personnes concernées. »

Ne pas transformer l’application en débat politique. L’objectif reste technologique.

---

# 5. Droit à l’image

Pour les photographies réelles :

- éviter les personnes identifiables ;
- éviter les enfants identifiables ;
- éviter les visages reconnaissables ;
- éviter les plaques d’immatriculation lisibles ;
- éviter les documents nominatifs ;
- éviter toute donnée personnelle visible.

Flouter avant intégration si nécessaire.

Métadonnées souhaitées :

```ts
{
  file: "chantier-01.webp",
  title: "Travaux dans le centre-ville",
  date: "2026-09",
  author: "Yann Di Mauro",
  source: "Photographie personnelle",
  alt: "Zone de chantier avec engins et bâtiments",
  rightsChecked: true
}
```

---

# 6. Réel et simulation

Deux univers doivent être clairement distingués.

## 6.1 Givors : situation réelle

Utiliser uniquement :

- photographies réelles ;
- observations ;
- données sourcées ;
- contexte ;
- documents fournis.

Afficher un bandeau clair :

**« Situation réelle »**

## 6.2 Quartier des Ateliers : simulation pédagogique

Créer un quartier fictif nommé :

**« Quartier des Ateliers »**

Il ne correspond à aucune rue réelle.

Afficher :

**« Simulation pédagogique »**

Les bâtiments, volumes, masses, distances, consommations, plans, engins et contraintes peuvent être simplifiés.

Lorsque nécessaire :

« Les valeurs ont été simplifiées pour permettre l’activité. »

La distinction réel / simulation doit être immédiatement compréhensible par l’élève.

---

# 7. Questions de contrôle permanentes

Avant de valider une activité, vérifier :

1. « Un élève fragile peut-il comprendre seul ce qu’il doit faire ? »
2. « Est-il réellement en train d’apprendre de la technologie ? »
3. « Que doit-il écrire dans son cours ? »
4. « Le professeur peut-il expliquer pourquoi une compétence est considérée comme maîtrisée ? »
5. « L’élève le plus lent peut-il terminer en 45 minutes ? »
6. « L’élève sait-il immédiatement s’il travaille sur un fait réel ou une simulation ? »

Si une réponse est non, modifier l’activité.

---

# 8. Public et contexte REP

L’application est destinée principalement à des élèves de 5e et 4e en collège français, avec un contexte REP.

Les élèves peuvent présenter :

- difficultés de lecture ;
- difficultés de compréhension ;
- attention fragile ;
- faible autonomie ;
- mémoire de travail limitée ;
- lenteur ;
- difficultés face aux consignes complexes ;
- dyslexie ;
- dysgraphie ;
- autres besoins éducatifs particuliers.

L’application doit être :

- claire ;
- progressive ;
- stable ;
- explicite ;
- lisible ;
- peu chargée ;
- accessible ;
- rassurante ;
- motivante sans mécanismes addictifs.

---

# 9. Durée des séances

Une séance correspond à :

**45 minutes de travail pédagogique effectif.**

L’appel, l’installation, la connexion et le rangement sont déjà pris en compte hors de ce temps.

Cibles :

| Profil | Durée |
| --- | ---: |
| Élève rapide | 25 à 30 min |
| Élève moyen | 30 à 38 min |
| Élève lent ou fragile | 40 à 43 min |
| Maximum absolu | 45 min |

Une mission obligatoire doit être terminable sur une seule séance.

Si elle dépasse : réduire, simplifier, déplacer ou découper.

Ne jamais prévoir « l’élève finira obligatoirement la séance suivante ».

Chaque mission déclare :

```ts
{
  estimatedFastMinutes: 28,
  estimatedAverageMinutes: 35,
  estimatedSlowMinutes: 42,
  absoluteMaxMinutes: 45
}
```

Erreur si `estimatedSlowMinutes > 45` ou `absoluteMaxMinutes > 45`.

Avertissement si `estimatedSlowMinutes > 43`.

---

# 10. Structure d’une mission

Une mission obligatoire comprend :

1. reprise ;
2. problématique ;
3. activité ;
4. manipulation, test ou simulation ;
5. trace écrite ;
6. évaluation ;
7. bilan ;
8. sauvegarde.

Une répartition indicative peut être :

- 3 à 5 min : rappel, question initiale ou diagnostic ;
- 18 à 22 min : activité principale ;
- 8 à 10 min : construction du cours ;
- 7 à 10 min : évaluation ;
- 2 à 3 min : bilan.

---

# 11. Élèves rapides

Lorsqu’un élève termine avant les autres, proposer éventuellement :

- défi facultatif ;
- optimisation ;
- question « Et si… ? » ;
- comparaison supplémentaire ;
- mini-simulation ;
- activité d’approfondissement.

Ces activités :

- sont facultatives ;
- ne contiennent pas de connaissance essentielle unique ;
- ne donnent pas de points indispensables ;
- ne pénalisent jamais les élèves plus lents.

---

# 12. Construction du cours sur papier

L’application ne remplace jamais le cahier, la feuille ou le classeur.

Chaque mission contient des moments clairement identifiés :

## ✏️ « Écris dans ton cours »

L’élève peut devoir :

- écrire un titre ;
- écrire une hypothèse ;
- noter une observation ;
- compléter une phrase ;
- recopier une définition courte ;
- répondre à une question ;
- compléter un tableau ;
- reproduire un schéma ;
- compléter une chaîne d’énergie ;
- compléter une chaîne d’information ;
- noter une formule simple ;
- noter un résultat ;
- écrire une conclusion ;
- rédiger une justification courte.

Ne jamais demander de recopier de longs paragraphes.

Objectif : environ une page A4 maximum par séance.

Structure recommandée lorsque pertinente :

- Ce que je pense ;
- Ce que j’observe ;
- Ce que je teste ;
- Ce que je comprends ;
- Ce que je retiens.

Le bouton « J’ai terminé d’écrire » ne valide jamais à lui seul une compétence.

---

# 13. Fiche de cours aménagée

Chaque séance doit pouvoir générer ou proposer une version imprimable :

**« Fiche de cours aménagée »**

Elle peut contenir :

- titres préparés ;
- phrases à compléter ;
- tableaux ;
- schémas partiellement préparés ;
- mots-clés ;
- zones de réponse courtes.

Ne jamais écrire « fiche dyslexique » ou enregistrer le motif pour lequel un élève utilise cette version.

---

# 14. Boucle pédagogique début / fin

## 5e

Lors de 5E-00, l’élève écrit dans son cahier :

« À ton avis, comment transforme-t-on une partie d’une ville ? »

La réponse reste sur papier.

Dans 5E-12, demander :

- « Ouvre ton cahier à la première séance. »
- « Relis ce que tu avais écrit. »
- « Qu’ajouterais-tu aujourd’hui ? »
- « Qu’avais-tu oublié ? »
- « Cite trois choses que tu comprends maintenant mieux. »

Cette activité n’est pas notée.

## 4e

Même principe avec la réponse de 4E-00, reprise dans 4E-11.

La boucle réflexive a lieu avant l’évaluation finale, jamais après une finale pouvant occuper 45 minutes.

---

# 15. Compétences C1 à C9

Créer les identifiants internes suivants.

## C1
Décrire les liens entre usages et évolutions technologiques des objets et systèmes techniques.

## C2
Décrire les interactions entre un objet ou système technique, son environnement et les utilisateurs.

## C3
Caractériser et choisir un objet ou système technique selon différents critères.

## C4
Décrire et caractériser l’organisation interne d’un objet ou système technique et ses échanges avec son environnement, notamment les énergies et les données.

## C5
Identifier un dysfonctionnement d’un objet technique et y remédier.

## C6
Comprendre et modifier un programme associé à une fonctionnalité d’un objet ou système technique.

## C7
Imaginer, concevoir et réaliser une ou plusieurs solutions répondant à un besoin ou à des exigences.

## C8
Valider des solutions techniques par des simulations ou des protocoles de tests.

## C9
Concevoir, écrire, tester et mettre au point un programme.

Chaque activité et chaque item d’évaluation déclare explicitement les compétences concernées.

Ne pas chercher une répartition artificiellement égale.

Pour chaque niveau, distinguer les compétences :

- INTRODUITES ;
- PRINCIPALEMENT TRAVAILLÉES ;
- APPROFONDIES ;
- ÉVALUÉES ;
- NON PRIORITAIRES.

Une compétence peut être découverte sans être déclarée maîtrisée.

---

# 16. Thèmes T1 à T3

## T1
Les objets et systèmes techniques : leurs usages et leurs interactions à découvrir et analyser.

## T2
Structure, fonctionnement, comportement : des objets et systèmes techniques à comprendre.

## T3
Création, conception, réalisation, innovations : des objets à concevoir et à réaliser.

La progression doit être spiralaire. Ne pas transformer T1, T2 et T3 en trois blocs étanches.

---

# 17. Parcours complet et parcours essentiel

Chaque mission reçoit un statut :

- ESSENTIELLE ;
- RECOMMANDÉE ;
- APPROFONDISSEMENT.

Le parcours essentiel doit conserver :

- la cohérence pédagogique ;
- les connaissances essentielles ;
- les évaluations indispensables ;
- plusieurs preuves pour les compétences réellement évaluées ;
- la boucle réflexive début / fin.

À l’étape 0, produire :

- 5e complet : séances + heures ;
- 5e essentiel : séances + heures ;
- 4e complet : séances + heures ;
- 4e essentiel : séances + heures.

---

# 18. Progression annuelle

Calculer le nombre de séances et le nombre total d’heures.

Calculer la part dans la progression annuelle uniquement si ces paramètres sont fournis :

```text
annualPlanning:
  weeklyHours5e: À RENSEIGNER
  effectiveWeeks5e: À RENSEIGNER
  weeklyHours4e: À RENSEIGNER
  effectiveWeeks4e: À RENSEIGNER
```

Sinon afficher :

« Part de la progression annuelle : non calculable avec les données actuellement disponibles. »

Ne jamais inventer les horaires ou le nombre de semaines.

---

# 19. Parcours 5e

Titre :

**« Givors se transforme : je découvre, je choisis et je comprends »**

### 5E-00 : Que se passe-t-il à Givors ?

Statut : ESSENTIELLE.

Situation déclenchante réelle.

Objectifs :

- observer 1 à 3 photographies ;
- identifier ce qui semble se passer ;
- faire émerger les représentations initiales ;
- poser la problématique générale ;
- réaliser quelques questions diagnostiques courtes.

Trace écrite :

« Mission Chantier : comment transforme-t-on une partie d’une ville ? »

Puis réponse personnelle à :

« À ton avis, quelles étapes sont nécessaires pour transformer ce quartier ? »

Évaluation : diagnostique uniquement.

Aucune note.

Durée lente cible : 40 minutes maximum.

Ne pas surcharger cette mission avec toute l’explication du simulateur.

### 5E-01 : Pourquoi utilise-t-on des objets techniques sur un chantier ?

Statut : ESSENTIELLE.

Partir du réel puis passer au Quartier des Ateliers.

Identifier :

- besoins ;
- utilisateurs ;
- objets techniques ;
- systèmes techniques ;
- contraintes ;
- environnement.

Question centrale :

« À quels besoins les objets techniques du chantier répondent-ils ? »

Chaque réflexion sur la ville doit déboucher sur une notion technologique.

Compétences : C1, C2.

Trace écrite : besoin / utilisateur / objet ou système / contrainte.

Évaluation formative.

### 5E-02 : Démolir, conserver, transporter, aménager

Statut : RECOMMANDÉE.

Comprendre qu’une transformation ne signifie pas « tout détruire ».

Distinguer :

- démolir ;
- conserver ;
- rénover ;
- transporter ;
- reconstruire ;
- aménager.

Associer :

besoin → fonction → solution technique.

Compétences : C1, C2, C3.

Trace écrite : tableau « besoin / fonction / solution ».

### 5E-03 : Quel engin pour quelle tâche ?

Statut : ESSENTIELLE.

Découvrir :

- pelle hydraulique ;
- chargeuse ;
- bulldozer ;
- tombereau ;
- grue ;
- compacteur ;
- télescopique.

Associer :

fonction → caractéristiques → engin.

Compétence principale : C3.

Évaluation formative.

Trace écrite : tableau simple des fonctions principales des engins.

### 5E-04 : Choisir le bon engin

Statut : ESSENTIELLE.

Faire varier :

- masse ;
- volume ;
- distance ;
- terrain ;
- encombrement ;
- précision ;
- coût ;
- énergie ;
- sécurité.

L’élève doit justifier son choix.

Compétences : C2, C3.

Évaluation : sommative intermédiaire n° 1.

Ne pas se limiter au QCM : utiliser comparaison et justification guidée.

### 5E-05 : Matière, énergie et information

Statut : ESSENTIELLE.

À partir d’une pelle hydraulique, classer :

MATIÈRE : terre, gravats, matériaux.  
ÉNERGIE : carburant, batterie, mouvement.  
INFORMATION : joystick, capteur, calculateur, signal.

Compétence : C4.

Trace écrite importante : schéma MEI.

Évaluation formative puis sommative intermédiaire n° 2.

### 5E-06 : Comment une pelle peut-elle bouger ?

Statut : ESSENTIELLE.

Découvrir simplement :

- source d’énergie ;
- moteur ;
- pompe ;
- circuit hydraulique ;
- fluide ;
- vérin ;
- bras ;
- godet ;
- mouvement.

Construire une première chaîne d’énergie adaptée au niveau.

Mini-situation :

« Le bras ne bouge plus. Quel élément vérifier ? »

Il ne s’agit pas d’un diagnostic professionnel, mais d’une première introduction au raisonnement de panne.

Compétences : C4, introduction C5.

Trace écrite : chaîne simple énergie → conversion → mouvement.

### 5E-07 : Le chantier doit fonctionner avec la ville

Statut : RECOMMANDÉE.

S’inspirer des contraintes observées dans le réel puis basculer dans le Quartier des Ateliers.

Organiser :

- zone de chantier ;
- accès engins ;
- passage des personnes ;
- zone de stockage ;
- zone interdite ;
- sécurité.

Question centrale :

« Comment faire travailler les engins sans empêcher complètement les autres usages ? »

Chaque décision doit correspondre à une contrainte technique.

Compétences : C2, C7.

### 5E-08 : Comment évacuer les gravats ?

Statut : ESSENTIELLE.

Simulation pédagogique.

L’élève doit :

1. formuler une hypothèse ;
2. choisir une organisation ;
3. choisir les engins nécessaires ;
4. lancer la simulation ;
5. mesurer ;
6. comparer ;
7. modifier ;
8. tester à nouveau.

Mesures possibles :

- volume ;
- nombre de trajets ;
- distance ;
- temps ;
- consommation pédagogique ;
- nombre de manœuvres.

Compétences : C3, C8.

Évaluation : sommative intermédiaire n° 3.

Trace écrite : hypothèse / résultat / conclusion.

### 5E-09 : L’engin peut-il détecter un obstacle ?

Statut : ESSENTIELLE.

Découvrir :

capteur → information → traitement → action.

Exemple : détection d’un obstacle derrière une pelle.

Analyser un petit programme, puis modifier un paramètre :

```text
SI distance < 2 m
ALORS arrêter
```

Faire éventuellement modifier 2 m en 3 m puis observer l’effet.

Compétences : C4, C6, introduction C9.

### 5E-10 : Programmer une sécurité simple

Statut : ESSENTIELLE.

Environnement de programmation par blocs ou pseudo-blocs.

L’élève doit :

- modifier ;
- exécuter ;
- observer ;
- corriger.

Notions simples : événement, condition, entrée capteur, action.

Pas de programmation complexe.

Compétences : C6, C9.

Évaluation : sommative intermédiaire n° 4.

### 5E-11 : Comparer plusieurs solutions techniques

Statut : ESSENTIELLE.

Comparer par exemple :

- engin thermique ;
- engin hybride ;
- engin électrique.

Critères :

- autonomie ;
- énergie ;
- bruit ;
- émissions locales ;
- durée ;
- coût ;
- recharge ;
- contraintes d’usage.

Toute donnée réaliste doit être sourcée. Sinon utiliser des valeurs pédagogiques fictives clairement annoncées.

Faire comprendre :

« Il n’existe pas toujours une solution meilleure sur tous les critères. »

Compétences : C1, C3, C8.

Cette mission est essentielle afin que C1 dispose de plusieurs contextes dans le parcours essentiel.

### 5E-12 : Mission Quartier des Ateliers

Statut : ESSENTIELLE.

Mission intégrative.

L’élève doit :

1. analyser un besoin ;
2. identifier des contraintes ;
3. choisir les engins ;
4. organiser les circulations ;
5. organiser l’évacuation ;
6. simuler ;
7. mesurer ;
8. améliorer ;
9. justifier.

Compétences principales : C2, C3, C7, C8.

Inclure la boucle réflexive avec le cahier de 5E-00.

### 5E-FINAL : Nouveau chantier

Statut : ESSENTIELLE.

Situation nouvelle, différente de Givors et du Quartier des Ateliers.

Évaluation finale sommative et certificative à l’échelle de l’application.

Durée :

- rapide : 25 à 30 min ;
- moyen : 30 à 38 min ;
- lent : 40 à 45 min ;
- maximum : 45 min.

Évaluer le transfert, pas uniquement la mémorisation.

---

# 20. Parcours 4e

Titre :

**« Givors se transforme : j’analyse, je programme et j’optimise »**

### 4E-00 : Retour sur le chantier

Statut : ESSENTIELLE.

Utiliser le même composant technique que 5E-00 mais une scénarisation différente.

Question :

« Quels systèmes techniques permettent de réaliser les transformations que tu observes ? »

Évaluation diagnostique, sans note.

Trace écrite initiale conservée dans le cahier et reprise en 4E-11.

### 4E-01 : Dans une pelle hydraulique

Statut : ESSENTIELLE.

Identifier l’architecture générale et les principaux sous-systèmes.

Évoquer l’évolution des systèmes : commandes, hydraulique, électronique, assistance.

Compétences : C1, C4.

### 4E-02 : Chaîne d’énergie

Statut : ESSENTIELLE.

Travailler :

- alimenter ;
- distribuer ;
- convertir ;
- transmettre ;
- agir.

Compétence : C4.

Trace écrite : chaîne d’énergie complète et composants associés.

Évaluation : sommative intermédiaire n° 1.

### 4E-03 : Hydraulique et mouvement

Statut : ESSENTIELLE.

Simulation pédagogique.

Faire comprendre qualitativement :

pompe → fluide → distributeur → vérin → mouvement.

Faire varier quelques paramètres simples lorsque cela apporte du sens.

Créer explicitement une rubrique :

**« Limites du modèle »**

Expliquer que la simulation simplifie notamment le sol, le fluide, les pertes, l’usure, la météo et le comportement réel.

Compétences : C4, C8.

### 4E-04 : Chaîne d’information

Statut : ESSENTIELLE.

Étudier :

capteur → acquisition → traitement → commande → action.

Identifier capteurs, microcontrôleur ou calculateur, interface et actionneurs lorsque pertinent.

Compétences : C4, C6.

### 4E-05 : Pourquoi l’engin ne fonctionne-t-il plus ?

Statut : ESSENTIELLE.

Diagnostic de panne.

L’élève :

1. observe les symptômes ;
2. formule des hypothèses ;
3. réalise des tests ;
4. élimine certaines causes ;
5. identifie le dysfonctionnement ;
6. propose une solution.

Compétences : C4, C5.

Évaluation : sommative intermédiaire n° 2.

### 4E-06 : Programmer la sécurité

Statut : ESSENTIELLE.

Programmation par blocs ou pseudo-blocs.

Introduire progressivement :

- événement ;
- variable ;
- condition ;
- boucle ;
- capteur ;
- action.

Exemple :

```text
SI distance < seuil
ALORS arrêter
SINON autoriser le déplacement
```

L’élève doit modifier, exécuter, observer et corriger.

Compétences : C6, C9.

Évaluation : sommative intermédiaire n° 3.

### 4E-07 : Organiser les flux du chantier

Statut : RECOMMANDÉE.

Simulation de :

- circulation des engins ;
- circulation des personnes ;
- accès ;
- stockage ;
- zones de conflit.

Comparer plusieurs organisations.

Compétences : C2, C3, C7.

### 4E-08 : Construire un protocole de test

Statut : ESSENTIELLE.

Cette mission ne doit PAS être une simple simulation de chantier.

Exemple central :

**« À quelle distance le capteur détecte-t-il correctement un obstacle ? »**

L’élève doit :

1. définir les distances à tester ;
2. décider d’un protocole simple ;
3. réaliser plusieurs essais ;
4. répéter les mesures ;
5. relever les résultats dans un tableau ;
6. comparer les résultats ;
7. identifier une zone de détection fiable ;
8. proposer un seuil de sécurité ;
9. expliquer les limites du test.

Faire comprendre explicitement la différence entre :

- simuler ;
- expérimenter ;
- mesurer ;
- valider.

Compétence principale : C8.

Évaluation : sommative intermédiaire n° 4.

Trace écrite : protocole / tableau de mesures / conclusion.

### 4E-09 : Performance et environnement

Statut : ESSENTIELLE.

Comparer plusieurs solutions techniques avec des critères :

- énergie ;
- consommation ;
- temps ;
- émissions ;
- déplacements ;
- efficacité ;
- coût ;
- contraintes.

Ne pas prétendre qu’une solution est parfaite dans tous les contextes.

Compétences : C1, C3, C8.

Cette mission est essentielle pour fournir plusieurs contextes à C1 dans le parcours essentiel.

### 4E-10 : Concevoir un chantier

Statut : ESSENTIELLE.

Donner un cahier des charges simplifié.

L’élève doit :

- analyser ;
- proposer ;
- choisir ;
- organiser ;
- simuler ;
- mesurer ;
- corriger ;
- justifier.

Compétences : C2, C3, C7, C8.

### 4E-11 : Chantier intelligent

Statut : ESSENTIELLE.

Mission intégrative.

Faire intervenir :

- utilisateurs et environnement ;
- énergie ;
- chaîne d’information ;
- capteurs ;
- diagnostic ;
- programmation ;
- simulation ;
- conception ;
- optimisation.

Compétences : C2, C4, C5, C6, C7, C8, C9.

Évaluation : sommative intermédiaire n° 5.

Inclure ici la boucle réflexive avec le cahier de 4E-00.

### 4E-FINAL : Transformer un autre espace

Statut : ESSENTIELLE.

Situation inconnue.

Évaluation finale globale, sommative et certificative à l’échelle de l’application.

---

# 21. Évaluations diagnostiques

Elles permettent d’identifier les connaissances et représentations initiales.

Elles :

- ne comptent jamais dans la note ;
- ne sanctionnent pas ;
- peuvent guider les aides ;
- permettent une comparaison avec la fin du parcours.

Afficher :

« Cette activité sert à savoir ce que tu connais déjà. Elle ne compte pas dans ta note. »

Éviter un long bloc de diagnostic. Préférer plusieurs questions courtes intégrées.

---

# 22. Évaluations formatives

Les formatives sont corrigées immédiatement côté élève.

Le corrigé formatif peut donc être embarqué dans l’application.

Principe :

ERREUR  
↓  
FEEDBACK  
↓  
INDICE  
↓  
NOUVEL ESSAI

Ne jamais afficher seulement « Faux ».

Exemples :

- « Observe à nouveau le rôle de cet élément. »
- « Quelle contrainte n’as-tu pas prise en compte ? »
- « Ton choix fonctionne, mais est-il le plus adapté à la distance ? »

Le formatif :

- ne compte pas directement dans la note /20 ;
- peut produire des preuves de progression ;
- ne doit pas peser autant qu’une preuve sommative.

---

# 23. Évaluations sommatives intermédiaires et finale

Architecture retenue : correction locale dans `/teacher`.

Le build élève ne doit pas embarquer un corrigé sommative complet immédiatement exploitable.

Le poste élève enregistre :

- réponses ;
- choix ;
- valeurs ;
- résultats de simulation ;
- programme produit ;
- preuves nécessaires.

Puis il affiche :

« Évaluation enregistrée. Ton résultat sera disponible après correction. »

La correction est réalisée dans `/teacher` à l’aide d’un fichier enseignant `.mctkey` séparé.

Formats d’évaluation possibles :

- QCM ;
- choix multiples ;
- association ;
- classement ;
- schéma ;
- glisser-déposer avec alternative clavier ;
- lecture de données ;
- simulation ;
- diagnostic ;
- programmation ;
- protocole de test ;
- choix justifié ;
- réponse courte structurée.

Ne pas forcer l’autocorrection lorsque l’évaluation humaine est plus fiable.

---

# 24. Trois types de fichiers

## 24.1 Fichier élève `.mcjson`

Exemple :

`mission-chantier-4E2-017.mcjson`

Contient :

- version du schéma ;
- code élève ;
- classe ;
- niveau ;
- mission courante ;
- missions terminées ;
- réponses ;
- évaluations ;
- résultats corrigés lorsqu’ils ont été réinjectés ;
- preuves ;
- paramètres individuels non sensibles ;
- révision ;
- date de mise à jour.

## 24.2 Fichier classe `.mcconfig`

Exemple :

`mission-chantier-4E2.mcconfig`

Contient uniquement les paramètres collectifs :

- classe ;
- niveau ;
- durée standard ;
- missions activées ;
- politique de correction ;
- autres réglages communs non sensibles.

Il ne contient jamais :

- liste d’élèves aménagés ;
- données médicales ;
- informations individuelles sensibles.

## 24.3 Fichier enseignant `.mctkey`

Exemple :

`mission-chantier-answer-key.mctkey`

Contient :

- corrigés ;
- barèmes ;
- règles de correction ;
- correspondance des variantes ;
- éléments nécessaires au calcul automatique.

Le `.mctkey` :

- n’est jamais transmis aux élèves ;
- n’est jamais intégré au build public ;
- n’est jamais versionné ;
- reste dans `teacher-data/` ou dans un emplacement local réservé.

---

# 25. Correction dans `/teacher`

Dans `/teacher`, permettre :

1. chargement du `.mctkey` ;
2. import d’un ou plusieurs `.mcjson` ;
3. correction automatique des items fiables ;
4. affichage des réponses ouvertes ;
5. correction humaine de certaines réponses ;
6. calcul des points ;
7. création des preuves de compétences ;
8. calcul des niveaux de maîtrise ;
9. calcul de la note /20 ;
10. synthèse classe ;
11. export CSV ;
12. vue facilitant la saisie Pronote ;
13. bilan individuel imprimable ;
14. réécriture des fichiers élèves corrigés.

Pour les réponses ouvertes, permettre par exemple :

- 0 point ;
- 0,5 point ;
- 1 point ;

ou un barème défini dans `.mctkey`.

---

# 26. Retour des résultats vers les élèves

Le mécanisme principal de retour du résultat dans l’application est le fichier élève corrigé.

Workflow enseignant :

fichiers élèves  
↓  
chargement `.mctkey`  
↓  
correction automatique + humaine  
↓  
calcul notes et compétences  
↓  
mise à jour `.mcjson`  
↓  
`revision + 1`  
↓  
export groupé

Prévoir un export par lot, idéalement sous forme de ZIP contenant les `.mcjson` corrigés.

L’élève réimporte ensuite son fichier corrigé et retrouve dans « Ma progression » :

- résultats sommatives ;
- note provisoire ou finale ;
- niveaux de maîtrise ;
- compétences ;
- bilan ;
- éléments à retravailler.

Le bilan imprimé ou PDF est complémentaire, pas le mécanisme principal.

---

# 27. Note sur 20

Par défaut :

- sommatives intermédiaires : 40 % ;
- évaluation finale : 60 % ;
- diagnostique : 0 % ;
- formative : 0 % directement.

Une absence n’est jamais automatiquement transformée en zéro.

Utiliser l’état :

« Non passée ».

Tant que toutes les évaluations obligatoires nécessaires ne sont pas corrigées :

« Note provisoire ».

Affichage recommandé : au demi-point, par exemple « 14,5 / 20 ».

Le calcul interne conserve sa précision.

---

# 28. Niveaux de maîtrise

Utiliser :

- Non évaluée ;
- Maîtrise insuffisante ;
- Maîtrise fragile ;
- Maîtrise satisfaisante ;
- Très bonne maîtrise.

Ne jamais dépendre uniquement d’une couleur.

Une seule bonne réponse ne suffit jamais à valider une compétence.

---

# 29. Preuves de compétence

Exemple :

```ts
{
  competency: "C8",
  mission: "4E-08",
  assessmentType: "summative",
  context: "sensor-test",
  score: 0.82,
  date: "…",
  seed: "…"
}
```

Une preuve formative est un indicateur de progression.

Une preuve sommative est plus forte.

Une réussite dans une situation nouvelle est une preuve de transfert.

Pour « Maîtrise satisfaisante » : exiger plusieurs preuves cohérentes.

Pour « Très bonne maîtrise » : exiger notamment une preuve de transfert ou mission intégrative.

L’algorithme doit être documenté et explicable au professeur.

---

# 30. Aides à trois niveaux

Pendant les activités formatives, prévoir lorsque pertinent :

## Indice 1
Petit rappel.

## Indice 2
Orientation plus précise.

## Indice 3
Aide forte.

L’utilisation des aides formatives ne retire pas automatiquement des points.

Elle peut être enregistrée localement comme indicateur pédagogique non sensible.

Pendant les sommatives, les aides sont désactivées par défaut, sauf aménagement explicitement appliqué par le professeur.

---

# 31. Aménagements individuels

Ne jamais enregistrer :

- diagnostic ;
- PAP ;
- PPS ;
- information de santé ;
- justification médicale.

Utiliser uniquement :

```ts
assessmentAccommodation:
  "standard"
  | "reduced"
  | "split"
```

## reduced
Moins d’items, mais couverture comparable des compétences essentielles.

## split
Évaluation fractionnée en deux parties.

Les aménagements individuels ne figurent jamais dans `.mcconfig`.

Méthodes possibles :

1. importer le `.mcjson` dans `/teacher`, appliquer l’aménagement, réenregistrer et remettre le fichier à l’élève ;
2. activer temporairement l’aménagement directement sur le poste avant l’évaluation.

Toute modification enseignant augmente `revision`.

---

# 32. Sauvegarde et progression

La progression doit survivre :

- entre les séances ;
- entre plusieurs postes si nécessaire ;
- aux mises à jour raisonnables de l’application.

Ne pas dépendre uniquement de `localStorage`.

Le fichier élève constitue le support portable principal.

IndexedDB peut servir de cache local et de sauvegarde de travail.

---

# 33. Révision et horodatage

Chaque fichier élève contient :

```ts
{
  schemaVersion: 1,
  revision: 27,
  updatedAt: "2026-09-20T14:42:18.000Z",
  studentCode: "4E2-017"
}
```

Chaque sauvegarde significative augmente `revision`.

`updatedAt` est une information secondaire utile, mais la logique principale repose sur `revision`.

---

# 34. Conflit cache / fichier

À l’ouverture ou à l’import, comparer la révision du cache et celle du fichier.

## Fichier plus récent

Afficher :

« Une progression plus récente a été trouvée dans ce fichier. »

Proposer :

- Utiliser le fichier ;
- Conserver la progression de ce poste.

## Cache plus récent

Afficher :

« Une progression plus récente existe sur cet ordinateur. »

Proposer :

- Reprendre la progression de cet ordinateur ;
- Utiliser le fichier importé.

## Même révision, contenu différent

Afficher :

« Deux versions différentes de la même progression ont été détectées. Demande au professeur avant de continuer. »

Ne jamais fusionner automatiquement.

Ne jamais écraser silencieusement.

---

# 35. Identité du fichier

Ne jamais se fier au nom du fichier.

Toujours lire `studentCode` dans le contenu.

Si la session utilise `4E2-017` et que le fichier contient `4E2-018` :

« Ce fichier correspond à un autre identifiant. »

Ne jamais fusionner automatiquement.

---

# 36. Sauvegarde Edge / Chrome

Lorsque File System Access API est disponible :

- permettre de choisir un dossier ;
- autosave réel ;
- fichier principal ;
- copie `.bak` ;
- confirmation réelle de l’écriture.

Dossier conseillé :

```text
Documents/
└── Mission-Chantier/
    ├── mission-chantier-4E2-017.mcjson
    └── mission-chantier-4E2-017.mcjson.bak
```

Avant d’écraser le fichier principal, actualiser la copie de sécurité lorsque cela est techniquement raisonnable.

---

# 37. Sauvegarde Firefox ou navigateur sans File System Access

Pendant la mission :

- autosave dans IndexedDB ;
- aucun téléchargement à chaque étape.

En fin de mission :

- proposer un seul export ;
- afficher « Enregistre ton fichier de progression. » ;
- demander ensuite « J’ai enregistré mon fichier. ».

Cette confirmation est déclarative.

Ne jamais prétendre que l’application a vérifié l’écriture sur disque.

Le nom du fichier peut être modifié par le navigateur : toujours vérifier `studentCode` dans le contenu.

---

# 38. Fin de mission

## Mission formative

activité terminée  
→ trace écrite confirmée  
→ formative corrigée  
→ sauvegarde  
→ mission terminée.

## Mission sommative

activité terminée  
→ trace écrite confirmée  
→ évaluation remise  
→ réponses sauvegardées  
→ fichier enregistré ou export confirmé selon navigateur  
→ mission terminée.

Ne jamais attendre une correction sommative côté élève.

---

# 39. RGPD et confidentialité

Formulation de référence :

**« Aucune donnée élève n’est transmise sur Internet. Elle reste sur le poste, sur le réseau de l’établissement ou dans les fichiers enregistrés volontairement. »**

Interdire :

- Supabase ;
- Firebase ;
- base de données distante ;
- Google Analytics ;
- analytics tiers ;
- trackers ;
- publicité ;
- cookies marketing ;
- authentification cloud ;
- compte élève ;
- email élève ;
- synchronisation distante ;
- télémétrie personnelle ;
- fingerprinting ;
- webcam ;
- microphone ;
- géolocalisation.

Utiliser de préférence un identifiant pseudonymisé :

`4E2-017`

La correspondance éventuelle avec l’identité réelle reste hors application.

Créer `/privacy` avec un texte compréhensible par un collégien : données stockées, emplacement, export, suppression, absence de transmission Internet.

Ajouter « Effacer mes données locales » avec confirmation.

---

# 40. Espace « Ma progression »

Afficher :

- missions terminées ;
- mission actuelle ;
- prochaine mission ;
- résultats disponibles ;
- compétences ;
- note provisoire ;
- note finale ;
- éléments à retravailler.

Ne jamais afficher :

- classement ;
- podium ;
- meilleur score ;
- comparaison nominative entre élèves.

---

# 41. Espace professeur `/teacher`

Fonctionnement local, sans serveur.

Permettre :

- création / export de configuration classe `.mcconfig` ;
- import d’un fichier élève ;
- import multiple ;
- import `.mctkey` ;
- correction automatique ;
- correction humaine ;
- application d’un aménagement individuel ;
- consultation des réponses ;
- consultation des preuves ;
- calcul des compétences ;
- calcul des notes ;
- synthèse classe ;
- export CSV ;
- vue facilitant la saisie Pronote ;
- bilan individuel imprimable ;
- export groupé des fichiers élèves corrigés ;
- génération d’un ZIP si techniquement raisonnable.

Table de synthèse possible :

| Code | Classe | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | C9 | Note /20 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Ne pas connecter directement Pronote.

---

# 42. Fiche professeur par séance

Chaque mission doit disposer d’une fiche imprimable contenant :

- titre ;
- niveau ;
- statut ;
- problématique ;
- situation de départ ;
- objectifs ;
- compétences ;
- connaissances ;
- prérequis ;
- matériel ;
- déroulé minute par minute ;
- consignes ;
- trace écrite attendue ;
- réponses attendues ;
- évaluation ;
- barème ;
- aides ;
- remédiation ;
- approfondissement ;
- durée ;
- sources ;
- points de vigilance.

---

# 43. Accessibilité

Prévoir dès l’architecture :

- navigation clavier ;
- focus visible ;
- contrastes suffisants ;
- boutons et zones cliquables suffisamment grands ;
- textes alternatifs ;
- taille de police confortable ;
- zoom 125 % ;
- zoom 150 % ;
- mode clair ;
- mode sombre ;
- mode vidéoprojecteur ;
- lecture facilitée ;
- option de police adaptée ;
- réduction des animations ;
- aucune information uniquement par couleur.

Résolution de référence :

**1366 × 768**

L’interface doit rester utilisable à 125 % et 150 % de zoom.

---

# 44. Consignes adaptées au REP

Une consigne = une action principale.

Éviter :

« Après avoir analysé les documents et observé la simulation, détermine l’engin le plus adapté et justifie ton choix. »

Préférer :

« Observe les trois engins. »

Puis :

« Choisis celui qui peut charger les gravats. »

Puis :

« Explique ton choix. »

Afficher une seule difficulté nouvelle importante à la fois.

---

# 45. Charge cognitive

Ne jamais afficher trop d’informations simultanément.

Utiliser :

- étapes courtes ;
- cartes ;
- panneaux repliables ;
- surlignage ;
- progression visible ;
- révélations progressives.

Afficher par exemple :

« Étape 2 sur 5 ».

---

# 46. Son et lecture à voix haute

Toutes les fonctions pédagogiques essentielles doivent fonctionner sans son.

Aucune information essentielle ne doit dépendre d’un son.

Si une lecture à voix haute est proposée :

- elle est optionnelle ;
- elle est désactivable ;
- elle n’est jamais nécessaire pour réussir ;
- utiliser uniquement les capacités locales du navigateur, par exemple `speechSynthesis` ;
- ne jamais utiliser d’API vocale distante.

---

# 47. Gamification

Gamification légère uniquement.

Possibilités :

- badges ;
- niveaux ;
- permis fictifs ;
- missions débloquées ;
- chantier visuellement évolutif.

Privilégier des noms neutres :

- Observation chantier ;
- Expertise énergie ;
- Diagnostic ;
- Sécurité programmée ;
- Maîtrise simulation.

Interdire :

- classement ;
- compétition entre élèves ;
- monnaie virtuelle ;
- loot boxes ;
- récompenses aléatoires ;
- streak quotidien ;
- mécanique addictive.

---

# 48. Écriture inclusive sobre

Lorsque le genre est pertinent, utiliser des formulations lisibles :

- « technicien ou technicienne » ;
- « conducteur ou conductrice » ;
- « élève » ;
- « personne ».

Éviter les graphies difficiles à lire comme `technicien·ne`.

---

# 49. Typographie

Dans tous les textes français destinés aux élèves ou au professeur :

- apostrophes courbes : ’ ;
- guillemets français : « … » ;
- pas d’apostrophes droites ;
- pas de guillemets droits ;
- pas de tiret cadratin.

Utiliser deux-points ou tiret simple lorsque nécessaire.

Créer un test qui détecte `'`, `"` et `—` dans les contenus pédagogiques français, avec exceptions documentées uniquement pour le code ou les formats techniques.

---

# 50. Simulation pédagogique

Ne pas chercher à reproduire un simulateur professionnel de conducteur d’engins.

Objectif : comprendre.

Priorités :

- relations cause / effet ;
- comparaison ;
- mesure ;
- expérimentation ;
- reproductibilité ;
- choix ;
- justification.

Paramètres possibles :

- masse ;
- volume ;
- distance ;
- temps ;
- énergie ;
- consommation ;
- charge ;
- stabilité simplifiée ;
- obstacles ;
- zones interdites ;
- nombre de trajets ;
- rayon d’action ;
- productivité pédagogique.

Privilégier 2D ou 2,5D.

Utiliser Three.js / React Three Fiber uniquement si la 3D apporte une réelle valeur pédagogique.

Ne pas rechercher le photoréalisme.

---

# 51. Limites du modèle

Chaque simulation importante doit pouvoir afficher :

**« Limites du modèle »**

Exemple :

« Cette simulation simplifie le comportement du sol, la météo, l’usure des machines et le comportement réel des conducteurs. »

Faire comprendre qu’un modèle est une représentation simplifiée et qu’il ne reproduit pas exactement la réalité.

---

# 52. Données techniques

Toute donnée présentée comme réaliste doit être sourcée.

Créer :

`content/data/sources.ts`

Pour les masses, puissances, capacités, consommations, dimensions, performances ou émissions réelles.

Si une donnée est créée pour les besoins de l’exercice, afficher clairement :

**« Valeur pédagogique fictive »**

Ne jamais inventer une valeur réaliste uniquement pour « faire crédible ».

---

# 53. Métiers

Ajouter ponctuellement des encarts facultatifs sur des métiers :

- conducteur ou conductrice d’engins ;
- technicien ou technicienne de maintenance ;
- chef ou cheffe de chantier ;
- géomètre ;
- ingénieur ou ingénieure ;
- technicien ou technicienne environnement ;
- urbaniste.

Ces contenus restent courts et ne détournent pas du programme de technologie.

---

# 54. Certificat

Après validation du parcours, permettre de produire localement :

**« Certificat de réussite Mission Chantier »**

Avec :

- code élève ;
- classe ;
- niveau ;
- date ;
- note /20 ;
- compétences.

Mention obligatoire :

« Document pédagogique interne. Ne constitue pas un diplôme officiel. »

Prévoir impression via navigateur.

---

# 55. Favicon et identité visuelle

Créer un favicon original évoquant :

- godet ;
- pelle stylisée ;
- casque ;
- lettres MC.

Formats : SVG, 16 px, 32 px, 180 px, 512 px.

Identité visuelle :

- chantier ;
- urbain ;
- industriel ;
- technique ;
- moderne ;
- lisible ;
- adapté à des collégiens sans être enfantin.

Le cas réel de Givors doit aussi évoquer la ville et l’espace public, pas seulement un univers « jaune chantier ».

---

# 56. Copyright

Afficher exactement :

**© 2026 - Mission Chantier - Yann Di Mauro**

Le nom de l’application doit provenir d’une constante centrale afin d’être modifiable facilement.

---

# 57. Technologies

Privilégier :

- Next.js ;
- React ;
- TypeScript strict ;
- Tailwind CSS ;
- Zod ou équivalent léger ;
- Vitest ;
- Playwright.

Application statique.

Utiliser si compatible :

```ts
output: "export"
```

Pas de backend.

---

# 58. Architecture des contenus

Séparer strictement code et contenus.

Prévoir par exemple :

```text
/content
  /5e
  /4e
  /assessments
  /givors
  /simulation
  /sources
  /data
  competencies.ts
  glossary.ts
  notebook.ts
  config.ts
```

Ne pas écrire les contenus pédagogiques importants directement dans les composants React.

Chaque mission doit posséder des métadonnées structurées.

---

# 59. Performance

Budget cible :

- JS initial compressé : idéalement < 500 Ko ;
- premier chargement hors médias lourds : idéalement < 3 Mo ;
- aucune requête tierce ;
- fonctionnement acceptable sur GPU intégré ;
- simulation stable autour de 30 FPS minimum ;
- Lighthouse Performance cible ≥ 90 sur machine correcte.

Créer un :

**« Mode performance »**

réduisant :

- ombres ;
- animations ;
- effets ;
- détails graphiques.

---

# 60. Hors ligne

Après un premier chargement complet, l’application doit rester utilisable si le réseau tombe.

Mettre en place :

- service worker versionné ;
- stratégie de cache explicite ;
- gestion propre des mises à jour.

Aucune dépendance réseau indispensable à l’exécution.

---

# 61. Sécurité Web

Désactiver autant que possible les permissions inutiles :

- caméra ;
- microphone ;
- géolocalisation ;
- notifications ;
- capteurs inutiles.

Prévoir :

- `Permissions-Policy` ;
- CSP stricte.

La configuration dépend de l’hébergement.

## Apache / InfinityFree

Prévoir un `.htaccess` adapté si cette cible est retenue.

## Vercel

Utiliser la configuration adaptée à Vercel.

Ne pas générer indistinctement les deux.

La cible d’hébergement reste une question ouverte tant qu’elle n’est pas décidée.

---

# 62. Aucune dépendance externe à l’exécution

Interdire :

- Google Fonts ;
- CDN obligatoire ;
- scripts distants ;
- API externe indispensable ;
- analytics ;
- trackers ;
- services vocaux distants.

Tout ce qui est nécessaire au fonctionnement pédagogique doit être embarqué localement.

---

# 63. Documentation du projet

Le projet doit disposer avant le lancement de l’étape 0 de :

```text
AGENTS.md
CLAUDE.md
docs/SPEC.md
ETAPE_0.md
docs/QUESTIONS_OUVERTES.md
docs/sources/givors/README.md
teacher-data/README.md
```

`AGENTS.md` est la source unique des règles permanentes.

`CLAUDE.md` renvoie simplement vers `AGENTS.md`.

`docs/SPEC.md` est la référence contractuelle complète.

---

# 64. Tests pédagogiques automatiques

Créer les premiers tests dès que les données de mission existent.

À partir de l’étape 4, ils sont obligatoires à chaque étape.

Vérifier au minimum :

1. toute mission possède une problématique ;
2. toute mission possède une durée ;
3. toute mission obligatoire possède une trace écrite ;
4. toute mission possède une activité ;
5. toute mission possède une évaluation ou une justification explicite ;
6. aucune mission ne dépasse 45 minutes ;
7. aucun fait Givors sans source locale ;
8. toute donnée technique réaliste possède une source ;
9. diagnostique = 0 % note ;
10. formatif = 0 % directement dans la note ;
11. coefficients = 100 % ;
12. absence ≠ zéro ;
13. note correcte ;
14. preuves cohérentes ;
15. plusieurs preuves pour les compétences évaluées du parcours essentiel ;
16. import / export sans perte ;
17. migrations valides ;
18. mauvais fichier élève détecté ;
19. aucun champ médical ;
20. aucune apostrophe droite dans les contenus français ;
21. aucun guillemet droit dans les contenus français ;
22. aucun tiret cadratin dans les contenus français ;
23. aucune dépendance réseau externe imprévue ;
24. aucun aménagement individuel dans `.mcconfig` ;
25. aucun corrigé sommative complet exposé dans le build élève ;
26. conflit cache / fichier correctement géré ;
27. `revision` incrémentée lors des modifications enseignant ;
28. réel et simulation explicitement distingués.

---

# 65. Plan de développement par étapes

## ÉTAPE 0 : analyse et ingénierie pédagogique

Aucun développement applicatif.

Lire `AGENTS.md`, `docs/SPEC.md`, `ETAPE_0.md` et les sources locales Givors.

Créer :

- `docs/ANALYSE_SPEC.md` ;
- `docs/PEDAGOGIE.md` ;
- `docs/COMPETENCES.md` ;
- `docs/EVALUATIONS.md` ;
- `docs/SEANCES_5E.md` ;
- `docs/SEANCES_4E.md` ;
- `docs/TRACES_ECRITES.md` ;
- `docs/FICHES_PROFESSEUR.md` ;
- `docs/RGPD.md` ;
- `docs/ARCHITECTURE.md` ;
- `docs/SAUVEGARDE.md` ;
- `docs/PROGRESSION_ANNUELLE.md` ;
- `docs/QUESTIONS_OUVERTES.md`.

Produire les matrices demandées et les parcours complet / essentiel.

STOP.

## ÉTAPE 1 : socle technique

Créer : Next.js, TypeScript strict, Tailwind, layout, navigation, thèmes, favicon, copyright, `/privacy`, accessibilité de base, mode vidéoprojecteur, mode performance, sécurité de base.

Aucune simulation complexe.

STOP.

## ÉTAPE 2 : sauvegarde et progression

Créer :

- code élève ;
- `.mcjson` ;
- `schemaVersion` ;
- `revision` ;
- `updatedAt` ;
- IndexedDB ;
- File System Access si disponible ;
- fallback Firefox ;
- `.bak` ;
- import ;
- export ;
- migrations ;
- détection mauvais fichier ;
- conflits cache / fichier ;
- suppression.

STOP.

## ÉTAPE 3 : moteur pédagogique

Créer les composants génériques :

- SituationReelle ;
- SimulationPedagogique ;
- Problematique ;
- Objectif ;
- Observe ;
- Hypothese ;
- Consigne ;
- Manipule ;
- Mesure ;
- Compare ;
- EcrisDansTonCours ;
- ARetenir ;
- IndiceProgressif ;
- Feedback ;
- LimitesDuModele ;
- Source ;
- BilanMission ;
- MissionTimer.

STOP.

## ÉTAPE 4 : évaluations et tests pédagogiques

Créer :

- diagnostic ;
- formatif côté élève ;
- collecte sommative ;
- preuves ;
- niveaux de maîtrise ;
- calcul des pondérations ;
- variantes ;
- seed ;
- format `.mctkey` ;
- tests pédagogiques automatiques.

STOP.

## ÉTAPE 5 : espace professeur

Créer `/teacher`.

Ajouter :

- `.mcconfig` ;
- import `.mctkey` ;
- import `.mcjson` ;
- import multiple ;
- correction automatique ;
- correction humaine ;
- application d’aménagement ;
- incrément de révision ;
- synthèse classe ;
- CSV ;
- vue Pronote ;
- export groupé des `.mcjson` corrigés ;
- ZIP si pertinent.

STOP.

## ÉTAPE 6 : prologue commun « Givors se transforme »

Créer le composant partagé puis les versions 5E-00 et 4E-00.

Ne pas dupliquer inutilement le code.

STOP.

## ÉTAPE 7 : premières missions 5e

Développer 5E-01 à 5E-06.

STOP.

## ÉTAPE 8 : premier moteur de simulation

Créer une simulation simple, mesurable, compréhensible.

Priorité 2D / 2,5D.

STOP.

## ÉTAPE 9 : fin du parcours 5e

Développer 5E-07 à 5E-12.

STOP.

## ÉTAPE 10 : finale 5e

Créer la finale 5e et tester plusieurs profils d’élèves.

STOP.

## ÉTAPE 11 : première partie 4e

Développer 4E-01 à 4E-05.

STOP.

## ÉTAPE 12 : programmation

Créer l’environnement de programmation par blocs ou pseudo-blocs.

Développer 4E-06.

STOP.

## ÉTAPE 13 : protocole et fin 4e

Développer 4E-07 à 4E-11.

Accorder une attention particulière au vrai protocole de test de 4E-08.

STOP.

## ÉTAPE 14 : finale 4e

Créer l’évaluation finale 4e.

STOP.

## ÉTAPE 15 : accessibilité et REP

Audit écran par écran : consignes, autonomie, charge cognitive, clavier, contraste, zoom, 1366 × 768, vidéoprojecteur, faible lecteur, faible attention.

STOP.

## ÉTAPE 16 : performance et hors ligne

Tester machine modeste, GPU intégré, réseau coupé, cache, reprise, mise à jour, Edge, Chrome, Firefox.

STOP.

## ÉTAPE 17 : RGPD et sécurité

Auditer requêtes, permissions, stockage, logs, dépendances, données.

STOP.

## ÉTAPE 18 : audit des sources

Auditer Givors, données techniques, photographies, droits, dates, contradictions et valeurs fictives.

STOP.

## ÉTAPE 19 : audit pédagogique global

Analyser progression, charge, durée, compétences, évaluations, redondances, trous, parcours essentiel et parcours complet.

STOP.

## ÉTAPE 20 : Playwright

Tester au minimum :

- élève 5e : Givors → cahier → mission → évaluation → sauvegarde → reprise ;
- élève 4e : analyse → panne → programmation → protocole ;
- professeur : config → import → correction → compétences → ZIP / CSV ;
- sauvegarde Edge / Chrome ;
- sauvegarde Firefox ;
- conflit cache / fichier ;
- mauvais fichier ;
- retour des résultats corrigés ;
- effacement RGPD.

STOP.

## ÉTAPE 21 : audit final

Exécuter :

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Créer `docs/AUDIT_FINAL.md`.

STOP.

---

# 66. Définition d’une étape terminée

Une étape n’est terminée que si :

- le travail demandé est réalisé ;
- la documentation est à jour ;
- les tests pertinents réussissent ;
- lint réussit ;
- TypeScript réussit ;
- build réussit ;
- un rapport `docs/rapports/ETAPE_XX.md` est produit.

Puis STOP.

Ne jamais commencer l’étape suivante sans instruction explicite.

---

# 67. Instruction de lancement

Commencer uniquement par l’étape 0.

Ne développer aucun écran applicatif.

Ne créer aucune simulation.

Ne commencer aucune étape ultérieure.

À la fin de l’étape 0, produire le bilan demandé dans `ETAPE_0.md`, puis s’arrêter.

Attendre exactement :

`CONTINUE ÉTAPE 1`
