/**
 * Validateur générique de métadonnées de mission (docs/SPEC.md § 64,
 * tests n° 1 à 6). Le contenu réel des missions arrive à partir de
 * l’ÉTAPE 6 ; ce validateur est prêt à s’appliquer à ce moment-là sur le
 * registre de missions qui sera alors créé (content/5e, content/4e), et est
 * vérifié dès maintenant sur des cas de test synthétiques
 * (test/pedagogy-validators.test.ts).
 */

export type MissionStatus = "essentielle" | "recommandee" | "approfondissement";

export type MissionDurations = {
  fastMinutes: number;
  averageMinutes: number;
  slowMinutes: number;
  absoluteMaxMinutes: number;
};

export type MissionMetadata = {
  id: string;
  status: MissionStatus;
  problematique: string;
  activite: string;
  /** null autorisé uniquement pour une mission APPROFONDISSEMENT (§ 11, § 64 test 3). */
  traceEcrite: string | null;
  evaluation: string | null;
  /** Justification explicite acceptée à la place d’une évaluation formelle (§ 64 test 5). */
  evaluationJustification: string | null;
  durations: MissionDurations;
};

export type MissionValidationIssue = {
  field: string;
  message: string;
};

/** Une mission RECOMMANDÉE reste obligatoire au sens du parcours complet ; seule
 * une mission APPROFONDISSEMENT est facultative (docs/SPEC.md § 11, § 17). */
export function isMissionObligatoire(status: MissionStatus): boolean {
  return status !== "approfondissement";
}

export function validateMissionMetadata(mission: MissionMetadata): MissionValidationIssue[] {
  const issues: MissionValidationIssue[] = [];

  if (!mission.problematique.trim()) {
    issues.push({ field: "problematique", message: "La mission ne déclare aucune problématique." });
  }

  if (!mission.activite.trim()) {
    issues.push({ field: "activite", message: "La mission ne déclare aucune activité." });
  }

  if (isMissionObligatoire(mission.status) && !mission.traceEcrite?.trim()) {
    issues.push({
      field: "traceEcrite",
      message: "Une mission obligatoire (essentielle ou recommandée) doit déclarer une trace écrite.",
    });
  }

  if (!mission.evaluation?.trim() && !mission.evaluationJustification?.trim()) {
    issues.push({
      field: "evaluation",
      message: "La mission doit déclarer une évaluation, ou une justification explicite de son absence.",
    });
  }

  const { fastMinutes, averageMinutes, slowMinutes, absoluteMaxMinutes } = mission.durations;
  if (![fastMinutes, averageMinutes, slowMinutes, absoluteMaxMinutes].every((value) => value > 0)) {
    issues.push({ field: "durations", message: "Les quatre durées doivent être des nombres positifs." });
  }
  if (slowMinutes > 45 || absoluteMaxMinutes > 45) {
    issues.push({
      field: "durations",
      message: "Aucune mission ne doit dépasser 45 minutes (durée lente ou maximum absolu).",
    });
  }

  return issues;
}
