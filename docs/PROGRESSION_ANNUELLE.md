# Progression annuelle

## 1. Méthode de calcul

Une mission obligatoire est terminable sur une seule séance de 45 minutes de travail pédagogique effectif (`docs/SPEC.md` § 9). Le nombre de séances correspond donc au nombre de missions retenues dans chaque parcours ; le nombre d’heures correspond au nombre de séances multiplié par 45 minutes.

## 2. Parcours complet et parcours essentiel

Le parcours essentiel exclut les missions de statut RECOMMANDÉE (aucune mission APPROFONDISSEMENT n’a été définie dans les deux parcours obligatoires à ce stade) tout en conservant la cohérence pédagogique, les connaissances essentielles, les évaluations indispensables, plusieurs preuves pour les compétences réellement évaluées, et la boucle réflexive début / fin (voir `docs/COMPETENCES.md` § 4).

### 2.1 Cycle 5e

| Parcours | Missions exclues | Nombre de séances | Durée totale |
| --- | --- | ---: | ---: |
| 5e complet | aucune | 14 | 10 h 30 |
| 5e essentiel | 5E-02, 5E-07 (RECOMMANDÉE) | 12 | 9 h 00 |

### 2.2 Cycle 4e

| Parcours | Missions exclues | Nombre de séances | Durée totale |
| --- | --- | ---: | ---: |
| 4e complet | aucune | 13 | 9 h 45 |
| 4e essentiel | 4E-07 (RECOMMANDÉE) | 12 | 9 h 00 |

### 2.3 Vérification de la cohérence du parcours essentiel

- boucle réflexive début / fin conservée dans les deux niveaux (5E-00 → 5E-12, 4E-00 → 4E-11), aucune de ces missions n’étant RECOMMANDÉE ;
- toutes les sommatives intermédiaires et les finales sont ESSENTIELLES, donc conservées ;
- les missions exclues (5E-02, 5E-07, 4E-07) sont formatives, non support unique d’une compétence évaluée (voir `docs/SEANCES_5E.md` / `docs/SEANCES_4E.md`) ;
- vérification des preuves multiples pour les compétences évaluées du parcours essentiel : voir `docs/COMPETENCES.md` § 4, aucune compétence évaluée ne repose sur un contexte unique, à l’exception documentée de C9 en 5e (voir la même section).

## 3. Part dans la progression annuelle

Le calcul de la part de Mission Chantier dans l’année scolaire nécessite quatre paramètres :

```text
annualPlanning:
  weeklyHours5e: À RENSEIGNER
  effectiveWeeks5e: À RENSEIGNER
  weeklyHours4e: À RENSEIGNER
  effectiveWeeks4e: À RENSEIGNER
```

Ces paramètres ne sont pas fournis à ce jour (voir `docs/QUESTIONS_OUVERTES.md`).

**Part de la progression annuelle : non calculable avec les données actuellement disponibles.**

Aucun horaire ni nombre de semaines n’a été inventé pour combler ce manque. Dès que l’enseignant renseigne les quatre paramètres dans `docs/QUESTIONS_OUVERTES.md`, ce document sera mis à jour avec le calcul de la part annuelle par niveau et par parcours (complet et essentiel).

## 4. Total général (parcours complet, deux niveaux confondus)

| | Nombre de séances | Durée totale |
| --- | ---: | ---: |
| Parcours complet (5e + 4e) | 27 | 20 h 15 |
| Parcours essentiel (5e + 4e) | 24 | 18 h 00 |
