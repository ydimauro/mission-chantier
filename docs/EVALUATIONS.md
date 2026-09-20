# Architecture des évaluations

## 1. Quatre familles d’évaluation

| Type | Corrigée où | Compte dans la note /20 | Peut sanctionner | Objectif |
| --- | --- | --- | --- | --- |
| Diagnostique | côté élève, sans barème | 0 % | non | représentations initiales, comparaison avec la fin de parcours |
| Formative | côté élève, immédiate | 0 % directement | non | boucle erreur → feedback → indice → nouvel essai, preuve de progression |
| Sommative intermédiaire | `/teacher` avec `.mctkey` | 40 % (poids cumulé) | oui | vérifie une compétence dans un contexte donné |
| Finale | `/teacher` avec `.mctkey` | 60 % | oui | transfert, pas seulement mémorisation |

Diagnostique 0 % + formative 0 % direct + sommatives intermédiaires 40 % + finale 60 % = coefficients totalisant 100 % de la note calculable, conformément à `docs/SPEC.md` § 27 et au test automatique n° 11 de § 64.

## 2. Évaluations diagnostiques

- ne comptent jamais dans la note ;
- ne sanctionnent pas ;
- peuvent orienter les aides proposées ensuite ;
- permettent une comparaison avec la fin du parcours (boucle réflexive, voir `docs/PEDAGOGIE.md` § 4).
- message affiché systématiquement : « Cette activité sert à savoir ce que tu connais déjà. Elle ne compte pas dans ta note. »
- format : plusieurs questions courtes intégrées à l’activité, jamais un long bloc diagnostique isolé.

Missions concernées : 5E-00, 4E-00.

## 3. Évaluations formatives

Corrigées immédiatement côté élève ; le corrigé formatif peut donc être embarqué dans le build (contrairement au corrigé sommatif).

Boucle obligatoire :

ERREUR → FEEDBACK → INDICE → NOUVEL ESSAI

Jamais de simple « Faux ». Exemples de reformulation orientée :

- « Observe à nouveau le rôle de cet élément. »
- « Quelle contrainte n’as-tu pas prise en compte ? »
- « Ton choix fonctionne, mais est-il le plus adapté à la distance ? »

Une évaluation formative peut produire une preuve de progression (indicateur), mais cette preuve pèse toujours moins qu’une preuve sommative dans le calcul du niveau de maîtrise (voir `docs/COMPETENCES.md` § 5).

## 4. Évaluations sommatives intermédiaires et finale

Architecture retenue : **correction locale dans `/teacher`**, jamais d’autocorrection embarquée côté élève pour ces évaluations.

Le poste élève enregistre uniquement : réponses, choix, valeurs saisies, résultats de simulation, programme produit, preuves nécessaires au calcul ultérieur. Il n’enregistre jamais un corrigé exploitable.

Message affiché à la remise d’une sommative : « Évaluation enregistrée. Ton résultat sera disponible après correction. »

Formats utilisables selon la mission : QCM, choix multiples, association, classement, schéma, glisser-déposer avec alternative clavier, lecture de données, simulation, diagnostic, programmation, protocole de test, choix justifié, réponse courte structurée. L’autocorrection n’est pas forcée lorsque l’évaluation humaine est plus fiable (notamment pour les réponses ouvertes de justification).

### 4.1 Liste des sommatives intermédiaires prévues

| Niveau | Mission | N° | Objet principal |
| --- | --- | --- | --- |
| 5e | 5E-04 | 1 | choix justifié d’un engin |
| 5e | 5E-05 | 2 | schéma matière / énergie / information |
| 5e | 5E-08 | 3 | simulation d’évacuation des gravats |
| 5e | 5E-10 | 4 | programmation d’une sécurité simple |
| 4e | 4E-02 | 1 | chaîne d’énergie complète |
| 4e | 4E-05 | 2 | diagnostic de panne |
| 4e | 4E-06 | 3 | programmation de la sécurité (blocs) |
| 4e | 4E-08 | 4 | protocole de test réel du capteur |
| 4e | 4E-11 | 5 | mission intégrative « Chantier intelligent » |

### 4.2 Finales

5E-FINAL et 4E-FINAL : situation nouvelle (différente de Givors et du Quartier des Ateliers), évaluation finale sommative et certificative à l’échelle de l’application, transfert évalué en priorité.

## 5. Preuves de compétence

Structure de preuve (exemple donné par le cahier des charges) :

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

Règles :

- une preuve formative est un indicateur de progression, jamais suffisante seule pour « Maîtrise satisfaisante » ;
- une preuve sommative est plus forte qu’une preuve formative ;
- une réussite en situation nouvelle (mission finale ou intégrative) est une preuve de transfert, condition nécessaire à « Très bonne maîtrise » (voir `docs/COMPETENCES.md` § 5) ;
- l’algorithme de synthèse des niveaux de maîtrise doit rester documenté et explicable au professeur, jamais une boîte noire.

## 6. Note sur 20

Pondération par défaut : sommatives intermédiaires 40 %, finale 60 %, diagnostique 0 %, formatif 0 % directement.

Une absence n’est jamais transformée automatiquement en zéro : état « Non passée » utilisé explicitement. Tant que toutes les évaluations obligatoires nécessaires ne sont pas corrigées, la note affichée porte la mention « Note provisoire ». Affichage recommandé au demi-point (exemple : « 14,5 / 20 »), le calcul interne conservant sa précision réelle.

> **Décision d’implémentation (ÉTAPE 4)**, `src/lib/evaluations/grade.ts` :
>
> - chaque sommative intermédiaire et la finale ont un état : « non passée », « en attente de correction » ou « corrigée » (avec un score) ;
> - une sommative « non passée » est exclue du calcul de la moyenne intermédiaire (jamais comptée comme 0) ;
> - la note reste « provisoire » tant qu’une sommative intermédiaire est en attente de correction, ou tant que la finale n’est pas corrigée (elle pèse à elle seule 60 %) ;
> - avant que la finale existe, une note provisoire peut déjà être calculée sur la seule base des sommatives intermédiaires corrigées (usage courant d’une note provisoire en cours d’année) ;
> - si aucune sommative n’est encore corrigée, aucune note n’est calculable (« Note non calculable pour le moment », à distinguer de « Non passée » qui concerne un item individuel).

## 7. Niveaux de maîtrise

Cinq niveaux : Non évaluée, Maîtrise insuffisante, Maîtrise fragile, Maîtrise satisfaisante, Très bonne maîtrise. Jamais dépendants uniquement d’une couleur à l’affichage (icône ou texte systématique en complément). Algorithme détaillé dans `docs/COMPETENCES.md` § 5.

## 8. Aides pendant les évaluations

- formatives : aides à trois niveaux disponibles (voir `docs/PEDAGOGIE.md` § 7.3) ;
- sommatives : aides désactivées par défaut ; réactivables uniquement via un aménagement explicitement appliqué par le professeur (`assessmentAccommodation`), jamais par choix spontané de l’élève en cours de sommative.

## 9. Aménagements individuels

Champ unique, jamais de motif médical enregistré :

```ts
assessmentAccommodation:
  "standard"
  | "reduced"
  | "split"
```

- `reduced` : moins d’items, couverture comparable des compétences essentielles ;
- `split` : évaluation fractionnée en deux parties.

Ne figure jamais dans `.mcconfig` (fichier collectif). Deux méthodes d’application possibles : import du `.mcjson` dans `/teacher`, application de l’aménagement, réenregistrement et remise du fichier à l’élève ; ou activation temporaire directement sur le poste avant l’évaluation. Toute modification enseignant de ce type augmente `revision` (voir `docs/SAUVEGARDE.md`).

## 10. Corrections et évaluation humaine

Pour les réponses ouvertes, `/teacher` permet un barème simple par défaut (0 / 0,5 / 1 point) ou un barème défini dans `.mctkey`. Le détail du flux de correction est décrit dans `docs/ARCHITECTURE.md` (espace `/teacher`) et sera implémenté à l’ÉTAPE 5.
