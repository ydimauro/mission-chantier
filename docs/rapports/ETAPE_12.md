# BILAN ÉTAPE 12 : programmation (4E-06)

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 12) : « Créer l’environnement de programmation par blocs ou pseudo-blocs. Développer 4E-06. STOP. »

## 1. Environnement partagé de pseudo-blocs

`SommativeBlockProgram` remplace la présentation provisoire par un environnement visuel composé de blocs :

- `QUAND` : événement capteur ;
- `SI` : comparateur et seuil ;
- `ALORS` : action lorsque la condition est vraie ;
- `SINON` : action alternative optionnelle.

Les choix restent des menus natifs intégrés dans les blocs. Ils sont donc utilisables au clavier et lisibles par les aides techniques, sans dépendance externe ni interface de glisser-déposer séparée.

Le programme doit être testé avant sa remise. Les scénarios affichent son comportement littéral, sans message de réponse correcte ou incorrecte. La réponse est déposée en sommative et corrigée uniquement dans `/teacher` au moyen d’un `.mctkey` enseignant.

## 2. Mission 4E-06

La mission [4E-06](../../content/4e/4e-06.ts) « Programmer la sécurité » est ajoutée au registre et à la séquence 4e.

| Élément | Réalisation |
| --- | --- |
| Problématique | « Peux-tu programmer une sécurité plus complète que celle vue en 5e ? » |
| Programme | Condition et alternative « SI / ALORS / SINON » |
| Essais | Quatre scénarios de distance pédagogique fictive |
| Évaluation | Sommative intermédiaire n° 3, sans correction côté élève |
| Trace écrite | Recopie du programme final et légende des blocs |
| Durée maximale | 45 minutes |

La mission conserve le bandeau « Simulation pédagogique ». Ses valeurs sont fictives et aucun fait sur Givors n’est présenté.

## 3. Réutilisation de 5E-10

5E-10 utilise automatiquement le nouvel environnement partagé sans changer sa logique pédagogique : condition, action, tests de scénarios et dépôt sommative. Il n’affiche pas de branche « SINON », qui reste facultative dans le composant générique.

## 4. Tests et vérification manuelle

Les tests couvrent :

- l’obligation de tester avant de remettre ;
- la remise sans correction visible ;
- la réinitialisation du test après un changement de programme ;
- la persistance de l’état « déjà remis » ;
- la branche « SINON », son caractère obligatoire lorsqu’elle est configurée et son exécution ;
- l’ajout de 4E-06 à la séquence, au registre et au contrôle typographique.

Vérification Chromium locale : 4E-06 affiche les blocs QUAND, SI, ALORS et SINON ; une configuration est testée sur les quatre scénarios ; la remise affiche seulement « Évaluation enregistrée. Ton résultat sera disponible après correction. ».

## 5. Qualité

| Vérification | Commande | Résultat |
| --- | --- | --- |
| Lint | `npm run lint` | aucun problème |
| TypeScript | `npm run typecheck` | aucune erreur |
| Tests | `npm run test` | 268/268 tests, 46 fichiers |
| E2E | `npm run test:e2e` | 1/1 test réussi |
| Build | `npm run build` | export statique généré, 30 routes dont `/mission/4e-06` |

## 6. Contrôle pédagogique

- Une consigne principale organise chaque étape : construire, tester, remettre, écrire.
- La mission mobilise explicitement événement, condition, entrée capteur, action et alternative.
- La trace écrite papier est obligatoire avant « Mission terminée ».
- L’élève le plus lent reste dans la limite contractuelle de 45 minutes.
- Le statut de simulation est visible et les données sont annoncées comme simplifiées.
- La sommative recueille plusieurs preuves : configuration du programme et essais sur quatre scénarios.

---

Fin de l’ÉTAPE 12.

Ne pas commencer l’ÉTAPE 13 avant l’instruction exacte : `CONTINUE ÉTAPE 13`.