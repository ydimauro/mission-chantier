import { MISSION_REGISTRY } from "@content/missions/registry";
import type { Level } from "@content/config";
import type { AssessmentSubmission } from "@/lib/schemas/assessment-submission";
import { computeGrade, type SummativeResult } from "@/lib/evaluations/grade";

function missionResult(missionId: string, submissions: readonly AssessmentSubmission[]): SummativeResult {
  const missionSubmissions = submissions.filter((submission) => submission.missionId === missionId);
  if (missionSubmissions.length === 0) return { id: missionId, status: "not-taken", score: null };
  if (missionSubmissions.some((submission) => submission.status === "pending")) {
    return { id: missionId, status: "pending", score: null };
  }
  const scores = missionSubmissions.flatMap((submission) =>
    submission.status === "corrected" && submission.score !== undefined ? [submission.score] : [],
  );
  if (scores.length !== missionSubmissions.length) return { id: missionId, status: "pending", score: null };
  return { id: missionId, status: "corrected", score: scores.reduce((sum, score) => sum + score, 0) / scores.length };
}

export function computeStudentGrade(level: Level, submissions: readonly AssessmentSubmission[]) {
  const missions = MISSION_REGISTRY.filter((mission) => mission.niveau === level);
  const intermediateIds = missions
    .filter((mission) => mission.evaluation !== null && /sommative intermédiaire|sommative intégrative/i.test(mission.evaluation))
    .map((mission) => mission.id);
  const finalId = missions.find((mission) => mission.id.endsWith("-FINAL"))?.id;
  if (!finalId) throw new Error(`Mission finale introuvable pour le niveau ${level}`);
  return computeGrade(
    intermediateIds.map((missionId) => missionResult(missionId, submissions)),
    missionResult(finalId, submissions),
  );
}
