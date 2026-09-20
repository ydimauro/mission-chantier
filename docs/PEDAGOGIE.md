# Ingénierie pédagogique

## 1. Démarche générale

Chaque mission obligatoire suit autant que possible la chaîne :

OBSERVER → SE QUESTIONNER → FORMULER UNE HYPOTHÈSE → MANIPULER OU TESTER → MESURER → COMPARER → COMPRENDRE → ÉCRIRE DANS LE COURS → S’ENTRAÎNER → ÊTRE ÉVALUÉ → RÉINVESTIR

La succession « cours à lire / QCM / cours à lire / QCM » est interdite. Concrètement :

- une mission ne commence jamais par un pavé de cours ; elle commence par une observation, une question ou un mini-diagnostic ;
- le cours se construit progressivement, en petites unités, généralement après la manipulation ;
- l’évaluation formative est intégrée dans le fil de l’activité, pas isolée en fin de leçon.

## 2. Structure fixe d’une mission obligatoire

1. reprise (rappel de la séance précédente ou du point de départ) ;
2. problématique ;
3. activité ;
4. manipulation, test ou simulation ;
5. trace écrite ;
6. évaluation ;
7. bilan ;
8. sauvegarde.

Répartition indicative des 45 minutes (voir durées précises par mission dans `docs/SEANCES_5E.md` et `docs/SEANCES_4E.md`) :

| Phase | Durée indicative |
| --- | --- |
| Rappel, question initiale ou diagnostic | 3 à 5 min |
| Activité principale | 18 à 22 min |
| Construction du cours | 8 à 10 min |
| Évaluation | 7 à 10 min |
| Bilan | 2 à 3 min |

## 3. Progression spiralaire T1 / T2 / T3

- T1 : usages et interactions des objets et systèmes techniques.
- T2 : structure, fonctionnement, comportement.
- T3 : création, conception, réalisation, innovation.

Les trois thèmes ne forment pas trois blocs successifs étanches. Une même mission peut réactiver T1 en ouverture (usage observé) puis approfondir T2 ou T3. La répartition dominante par mission est indiquée dans `docs/SEANCES_5E.md` et `docs/SEANCES_4E.md` (colonne « Thème dominant »), mais des rappels croisés sont attendus (par exemple 5E-12 réactive T1 via les usages du quartier, T2 via l’organisation interne des engins déjà vue, et T3 via la conception de l’organisation du chantier).

## 4. Boucle réflexive début / fin

### 5e
- 5E-00 : l’élève écrit sur son cahier « À ton avis, comment transforme-t-on une partie d’une ville ? ». Réponse conservée sur papier, non numérisée, non notée.
- 5E-12 : retour explicite sur cette réponse (« Ouvre ton cahier à la première séance. Relis ce que tu avais écrit. Qu’ajouterais-tu aujourd’hui ? Qu’avais-tu oublié ? Cite trois choses que tu comprends maintenant mieux. »). Non noté.

### 4e
- 4E-00 : même principe.
- 4E-11 : reprise de la réponse de 4E-00.

Dans les deux niveaux, la boucle réflexive est placée avant l’évaluation finale, jamais après (une finale peut occuper les 45 minutes complètes, la boucle réflexive ne doit donc jamais dépendre du temps restant après elle).

## 5. Élèves rapides

Activités facultatives proposées lorsqu’un élève termine en avance (liste type, déclinée par mission dans `docs/SEANCES_5E.md` / `docs/SEANCES_4E.md`) :

- défi facultatif ;
- question « Et si… ? » ;
- comparaison supplémentaire ;
- mini-simulation ;
- optimisation libre.

Règles strictes : ces activités ne contiennent aucune connaissance essentielle unique, ne rapportent aucun point indispensable, et ne pénalisent jamais un élève qui ne les fait pas.

## 6. Construction du cours sur papier

L’application ne remplace jamais le cahier. Chaque moment « Écris dans ton cours » demande une production courte : titre, hypothèse, observation, phrase à compléter, définition courte, tableau, schéma, chaîne d’énergie ou d’information, formule simple, résultat, conclusion, justification courte. Jamais de recopie de long paragraphe. Volume cible : environ une page A4 par séance.

Structure recommandée quand elle est pertinente :

- Ce que je pense ;
- Ce que j’observe ;
- Ce que je teste ;
- Ce que je comprends ;
- Ce que je retiens.

Le bouton « J’ai terminé d’écrire » ne valide jamais à lui seul une compétence : il déclenche la suite du parcours, pas une preuve de maîtrise.

Chaque séance dispose d’une version imprimable « Fiche de cours aménagée » (titres préparés, phrases à compléter, tableaux, schémas partiellement préparés, mots-clés, zones de réponse courtes). Aucune mention du motif d’usage de cette version n’est enregistrée (voir `docs/RGPD.md`).

## 7. Adaptation REP

### 7.1 Consignes
Une consigne = une action principale. Découper les consignes complexes en plusieurs consignes courtes et successives plutôt qu’une phrase longue à subordonnées. Une seule difficulté nouvelle importante à la fois.

### 7.2 Charge cognitive
Étapes courtes, cartes, panneaux repliables, surlignage, progression visible (« Étape 2 sur 5 »), révélations progressives plutôt qu’un écran chargé.

### 7.3 Aides à trois niveaux (activités formatives)
- Indice 1 : petit rappel.
- Indice 2 : orientation plus précise.
- Indice 3 : aide forte.

L’usage des aides ne retire pas automatiquement des points ; il peut être enregistré localement comme indicateur pédagogique non sensible. Pendant les sommatives, les aides sont désactivées par défaut, sauf aménagement explicitement appliqué par le professeur (voir `docs/EVALUATIONS.md`).

### 7.4 Feedback formatif
Boucle obligatoire : ERREUR → FEEDBACK → INDICE → NOUVEL ESSAI. Jamais de simple « Faux » sans reformulation orientée (exemples dans `docs/SPEC.md` § 22, repris dans `docs/EVALUATIONS.md`).

## 8. Son

Toutes les fonctionnalités pédagogiques essentielles fonctionnent sans son. Si une lecture à voix haute est proposée, elle est optionnelle, désactivable, jamais nécessaire pour réussir, et utilise uniquement les capacités locales du navigateur (`speechSynthesis`), jamais un service vocal distant.

## 9. Gamification légère

Autorisé : badges, niveaux, permis fictifs, missions débloquées, évolution visuelle du chantier, avec des noms neutres (Observation chantier, Expertise énergie, Diagnostic, Sécurité programmée, Maîtrise simulation).

Interdit : classement, compétition entre élèves, monnaie virtuelle, loot boxes, récompenses aléatoires, streak quotidien, mécanique addictive.

## 10. Écriture inclusive sobre

Formulations lisibles quand le genre est pertinent : « technicien ou technicienne », « conducteur ou conductrice », ou emploi de termes épicènes (« élève », « personne »). Les graphies à point médian (`technicien·ne`) sont évitées.

## 11. Typographie française

Dans tout contenu destiné aux élèves ou au professeur : apostrophes courbes ’, guillemets français « … », jamais d’apostrophe droite, jamais de guillemet droit, jamais de tiret cadratin (utiliser deux-points ou tiret simple). Un test automatique dédié est prévu dès l’ÉTAPE 4 (`docs/SPEC.md` § 49 et § 64, tests 20 à 22), avec exceptions documentées réservées au code et aux formats techniques.

## 12. Métiers

Encarts facultatifs et courts sur des métiers liés au chantier et à l’urbanisme (conducteur ou conductrice d’engins, technicien ou technicienne de maintenance, chef ou cheffe de chantier, géomètre, ingénieur ou ingénieure, technicien ou technicienne environnement, urbaniste). Ces encarts ne détournent jamais du programme de technologie et ne portent aucune connaissance essentielle.

## 13. Six questions de contrôle avant validation d’une activité

1. Un élève fragile peut-il comprendre seul ce qu’il doit faire ?
2. Est-il réellement en train d’apprendre de la technologie ?
3. Que doit-il écrire dans son cours ?
4. Le professeur peut-il expliquer pourquoi une compétence est considérée comme maîtrisée ?
5. L’élève le plus lent peut-il terminer en 45 minutes ?
6. L’élève sait-il immédiatement s’il travaille sur un fait réel ou une simulation ?

Ces six questions doivent être vérifiées pour chaque mission lors de son développement effectif (ÉTAPES 6 à 14) et lors de l’audit pédagogique global (ÉTAPE 19).
