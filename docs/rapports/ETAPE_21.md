# BILAN ÉTAPE 21 : audit final

Date : 2026-09-21

Périmètre : `docs/SPEC.md` § 65, exécution du pipeline final, contrôle du déploiement et mise à jour de `docs/AUDIT_FINAL.md`.

## 1. Pipeline obligatoire

| Commande | Résultat |
| --- | --- |
| `npm run lint` | réussi |
| `npm run typecheck` | réussi |
| `npm test` | 54 fichiers, 305 tests réussis |
| `npm run test:e2e` | 8 tests Playwright réussis |
| `npm run build` | réussi, 36 routes statiques |

Les cinq commandes imposées réussissent sur l’état final du projet.

## 2. Déploiement Vercel

Le build final a été déployé sur le projet Vercel `mission-chantier` :

- domaine public : `https://mission-chantier.vercel.app/` ;
- déploiement : `dpl_AV6yVzJyTv7hBvzRGi3jzcuJTKxd` ;
- état : Ready ;
- routes contrôlées : `/`, `/privacy`, `/teacher`, `/mission`, `/ressources` ;
- résultat : HTTP 200 sur les cinq routes.

Le domaine `attention-act.vercel.app` appartient à une autre application. Après détection de la confusion pendant l’audit, il a été rétabli sur son déploiement précédent. Mission Chantier reste uniquement sur `mission-chantier.vercel.app`.

## 3. Budget de poids

| Mesure | Résultat |
| --- | ---: |
| Taille totale de `/out` | 5,99 Mo |
| Fichiers | 243 |
| JavaScript | 1,84 Mo |
| Images | 2,62 Mo |
| Sons | 0 Mo |
| Fichiers supérieurs à 1 Mo | 0 |

La cible de 40 Mo est largement respectée et le seuil d’avertissement de 50 Mo n’est pas atteint. Le plus gros fichier pèse 726 Ko.

## 4. Sécurité et dépendances

`npm audit --omit=dev` ne relève aucune vulnérabilité dans les dépendances de production. Les tests de sécurité statique, l’effacement RGPD, l’absence d’API de transmission et les en-têtes Vercel restent validés.

## 5. Parcours fonctionnels

Les huit scénarios Playwright couvrent :

- le parcours 5e, de Givors à la reprise de progression ;
- le parcours 4e, de l’analyse au protocole ;
- le parcours professeur, jusqu’au retour du fichier corrigé et à l’affichage des résultats côté élève ;
- les sauvegardes Chromium et le repli Firefox ;
- les conflits cache et fichier ainsi que le mauvais identifiant ;
- l’effacement RGPD.

## 6. Limites restantes

- Firefox natif n’est pas automatisé dans cet environnement ; son chemin de repli est testé en simulant l’absence de l’API File System Access dans Chromium.
- La part exacte de l’application dans l’année scolaire attend toujours les horaires hebdomadaires et le nombre de semaines effectives.
- Aucune source institutionnelle sur le projet urbain de Givors n’a été fournie ; l’ancrage réel repose sur les photographies personnelles autorisées.

Ces limites ne bloquent pas l’utilisation pédagogique.

## 7. Conclusion

L’application satisfait la définition d’une étape terminée de `docs/SPEC.md` § 66. Le pipeline, les parcours, le déploiement, la sécurité et le budget de poids sont validés. Le rapport détaillé se trouve dans [docs/AUDIT_FINAL.md](../AUDIT_FINAL.md).

Fin de l’ÉTAPE 21. Fin du parcours d’étapes 0 à 21.

STOP.
