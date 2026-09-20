# Fiches professeur par séance

Chaque mission dispose, à terme, d’une fiche imprimable. Ce document donne le gabarit commun et la trame minute par minute de chaque mission à partir des informations déjà figées dans `docs/SEANCES_5E.md` et `docs/SEANCES_4E.md`. Les fiches imprimables définitives (mise en page prête à imprimer) seront générées lors du développement effectif de chaque mission (ÉTAPES 6 à 14), sans qu’il s’agisse à ce stade de développement applicatif.

## 1. Gabarit d’une fiche professeur

1. **Titre**
2. **Niveau** (5e ou 4e)
3. **Statut** (ESSENTIELLE / RECOMMANDÉE / APPROFONDISSEMENT)
4. **Problématique**
5. **Situation de départ** (réel Givors, Quartier des Ateliers, ou les deux)
6. **Objectifs** : voir `docs/SEANCES_5E.md` / `docs/SEANCES_4E.md`
7. **Compétences** : voir `docs/COMPETENCES.md`
8. **Connaissances** : voir `docs/SEANCES_5E.md` / `docs/SEANCES_4E.md`
9. **Prérequis** : voir tableaux § 3 et § 4 ci-dessous
10. **Matériel** : voir tableaux § 3 et § 4 ci-dessous
11. **Déroulé minute par minute** : voir § 3 et § 4 ci-dessous (calé sur la durée « élève moyen »)
12. **Consignes** : rédigées selon la règle « une consigne = une action principale » (`docs/PEDAGOGIE.md` § 7.1), déclinées à partir des champs « Activité » et « Manipulation » de `docs/SEANCES_5E.md` / `docs/SEANCES_4E.md` ; le texte définitif de chaque consigne est rédigé au moment du développement de l’écran correspondant.
13. **Trace écrite attendue** : voir `docs/TRACES_ECRITES.md`
14. **Réponses attendues** : pour les activités formatives, les réponses correctes et les formulations de feedback (ERREUR → FEEDBACK → INDICE → NOUVEL ESSAI) sont rédigées avec le contenu de chaque mission lors du développement ; pour les sommatives, les réponses attendues et le barème sont exclusivement dans `.mctkey` (jamais dans une fiche professeur imprimable qui pourrait circuler avec le build élève).
15. **Évaluation** et **barème éventuel** : voir `docs/EVALUATIONS.md` et `docs/SEANCES_5E.md` / `docs/SEANCES_4E.md`
16. **Aides** : voir `docs/PEDAGOGIE.md` § 7.3 et champ « Aides » de chaque mission
17. **Remédiation** et **Approfondissement** : voir champ correspondant de chaque mission
18. **Durée** : voir tableaux de synthèse de `docs/SEANCES_5E.md` / `docs/SEANCES_4E.md`
19. **Sources** : voir champ « Sources nécessaires » de chaque mission et `docs/RGPD.md` / `docs/ANALYSE_SPEC.md` § 4 pour l’état des sources Givors
20. **Points de vigilance** : voir tableaux § 3 et § 4 ci-dessous

## 2. Modèle de déroulé minute par minute

Calé sur la durée « élève moyen » de chaque mission, réparti en cinq blocs (reprise, activité principale, construction du cours, évaluation, bilan), conformément à `docs/PEDAGOGIE.md` § 2. Les missions diagnostiques (5E-00, 4E-00) suivent une structure différente : observation, questions diagnostiques, trace écrite, bilan (pas de bloc évaluation noté).

## 3. Trame 5e

### 3.1 Déroulé minute par minute (durée « élève moyen »)

| Mission | Reprise | Activité | Cours | Évaluation | Bilan | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 5E-00 | observation 10 | questions diagnostiques 8 | trace écrite 5 | aucune | 2 | 25 |
| 5E-01 | 3 | 16 | 7 | 6 | 1 | 33 |
| 5E-02 | 3 | 13 | 7 | 4 | 1 | 28 |
| 5E-03 | 3 | 16 | 7 | 5 | 1 | 32 |
| 5E-04 | 4 | 17 | 7 | 6 | 1 | 35 |
| 5E-05 | 4 | 16 | 8 | 5 | 1 | 34 |
| 5E-06 | 4 | 16 | 8 | 5 | 1 | 34 |
| 5E-07 | 3 | 14 | 6 | 5 | 1 | 29 |
| 5E-08 | 4 | 18 | 7 | 6 | 1 | 36 |
| 5E-09 | 4 | 15 | 7 | 6 | 1 | 33 |
| 5E-10 | 4 | 17 | 7 | 7 | 1 | 36 |
| 5E-11 | 3 | 15 | 7 | 6 | 1 | 32 |
| 5E-12 | 4 | 19 | 8 | 6 | 1 | 38 |
| 5E-FINAL | 3 | 17 | 6 | 8 | 1 | 35 |

### 3.2 Prérequis, matériel et points de vigilance

| Mission | Prérequis | Matériel | Points de vigilance |
| --- | --- | --- | --- |
| 5E-00 | aucun | cahier, photographies Givors | ne pas expliquer tout le simulateur à ce stade ; ton neutre sur le projet urbain |
| 5E-01 | 5E-00 | cahier, poste élève | bien faire déboucher chaque idée sur une notion technologique |
| 5E-02 | 5E-01 | cahier, poste élève | éviter tout jugement de valeur sur « détruire » un bâtiment habité |
| 5E-03 | 5E-01 | cahier, poste élève | ne pas transformer l’activité en jeu de reconnaissance visuelle seule |
| 5E-04 | 5E-03 | cahier, poste élève | exiger une justification, pas seulement un choix correct |
| 5E-05 | 5E-01, 5E-03 | cahier, poste élève | schéma MEI = trace écrite prioritaire, ne pas la sacrifier au temps |
| 5E-06 | 5E-05 | cahier, poste élève | la mini-situation de panne reste une introduction, pas un vrai diagnostic |
| 5E-07 | 5E-02 | cahier, poste élève | rester factuel sur les contraintes d’usage partagé de l’espace public |
| 5E-08 | 5E-04, 5E-06 | cahier, poste élève | afficher « Limites du modèle » ; ne pas dépasser la fenêtre de simulation prévue |
| 5E-09 | 5E-06 | cahier, poste élève | le programme reste très court, une seule variable modifiée |
| 5E-10 | 5E-09 | cahier, poste élève | vérifier l’alternative clavier au glisser-déposer de blocs |
| 5E-11 | 5E-04 | cahier, poste élève, `content/data/sources.ts` | chaque donnée réaliste sourcée, sinon « Valeur pédagogique fictive » |
| 5E-12 | 5E-01 à 5E-11 | cahier (dont la page de 5E-00), poste élève | prévoir le raccourci de remédiation si le temps presse ; ne pas oublier la relecture du cahier |
| 5E-FINAL | ensemble du parcours 5e | cahier, poste élève | situation réellement nouvelle, jamais un copier-coller de 5E-12 |

## 4. Trame 4e

### 4.1 Déroulé minute par minute (durée « élève moyen »)

| Mission | Reprise | Activité | Cours | Évaluation | Bilan | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 4E-00 | observation 10 | questions diagnostiques 8 | trace écrite 5 | aucune | 2 | 25 |
| 4E-01 | 3 | 16 | 7 | 6 | 1 | 33 |
| 4E-02 | 4 | 16 | 7 | 6 | 1 | 34 |
| 4E-03 | 4 | 16 | 7 | 6 | 1 | 34 |
| 4E-04 | 3 | 15 | 7 | 6 | 1 | 32 |
| 4E-05 | 4 | 16 | 7 | 7 | 1 | 35 |
| 4E-06 | 4 | 17 | 7 | 7 | 1 | 36 |
| 4E-07 | 3 | 14 | 6 | 5 | 1 | 29 |
| 4E-08 | 4 | 18 | 7 | 7 | 1 | 37 |
| 4E-09 | 3 | 15 | 7 | 7 | 1 | 33 |
| 4E-10 | 4 | 17 | 7 | 7 | 1 | 36 |
| 4E-11 | 4 | 19 | 8 | 6 | 1 | 38 |
| 4E-FINAL | 3 | 17 | 6 | 8 | 1 | 35 |

### 4.2 Prérequis, matériel et points de vigilance

| Mission | Prérequis | Matériel | Points de vigilance |
| --- | --- | --- | --- |
| 4E-00 | parcours 5e (ou équivalent) | cahier, photographies Givors | scénarisation différente de 5E-00 même si composant technique réutilisé |
| 4E-01 | 4E-00 | cahier, poste élève | ne pas sombrer dans l’exhaustivité technique, rester au niveau collège |
| 4E-02 | 4E-01 | cahier, poste élève | les cinq fonctions de la chaîne d’énergie doivent être nommées correctement |
| 4E-03 | 4E-02 | cahier, poste élève | rubrique « Limites du modèle » obligatoire et explicite |
| 4E-04 | 4E-02 | cahier, poste élève | ne pas confondre chaîne d’énergie et chaîne d’information |
| 4E-05 | 4E-01 à 4E-04 | cahier, poste élève | noter la démarche d’élimination, pas seulement la cause finale |
| 4E-06 | 4E-04, 4E-05 | cahier, poste élève | vérifier l’alternative clavier à la manipulation de blocs |
| 4E-07 | 5E-07 (rappel) | cahier, poste élève | comparaison réellement argumentée, pas un choix arbitraire |
| 4E-08 | 4E-04 | cahier, poste élève, tableau de mesures imprimé | exiger la répétition des essais ; ne pas accepter une mesure unique |
| 4E-09 | 5E-11 (rappel), 4E-03 | cahier, poste élève, `content/data/sources.ts` | chaque donnée réaliste sourcée, sinon « Valeur pédagogique fictive » |
| 4E-10 | 4E-07, 4E-09 | cahier, poste élève | cahier des charges simplifié fourni en début de mission, pas improvisé |
| 4E-11 | 4E-01 à 4E-10 | cahier (dont la page de 4E-00), poste élève | envisager l’aménagement `split` si la mission déborde pour un élève |
| 4E-FINAL | ensemble du parcours 4e | cahier, poste élève | situation réellement inconnue, jamais un copier-coller de 4E-11 |
