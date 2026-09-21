"use client";

import { useState } from "react";
import { useProgression } from "@/providers/progression-provider";
import { SommativeSubmittedNotice } from "@/components/evaluation/SommativeSubmittedNotice";
import { evaluateCondition, type Comparator } from "@/lib/mission/block-program";
import { formatMessage } from "@/lib/format-message";
import { formatFrenchNumber } from "@/lib/format-number";
import { findAssessmentSubmission } from "@/lib/progression/model";
import { useShuffledForDisplay } from "@/lib/use-shuffled-for-display";
import { ACTIVITY_LABELS, BLOCK_PROGRAM_LABELS, SOMMATIVE_LABELS } from "@content/engine";

export type BlockProgramComparatorOption = { id: Comparator; label: string };
export type BlockProgramThresholdOption = { id: string; label: string; valueM: number };
export type BlockProgramActionOption = { id: string; label: string };
export type BlockProgramScenario = { id: string; label: string; distanceM: number };

type SommativeBlockProgramProps = {
  missionId: string;
  itemId: string;
  comparatorOptions: readonly BlockProgramComparatorOption[];
  thresholdOptions: readonly BlockProgramThresholdOption[];
  actionOptions: readonly BlockProgramActionOption[];
  elseActionOptions?: readonly BlockProgramActionOption[];
  scenarios: readonly BlockProgramScenario[];
  /** Appelé après la remise réussie, pour permettre à la mission d’en tenir compte (ex. déblocage de « Mission terminée »). */
  onSubmitted?: () => void;
};

const SELECT_CLASS = "rounded-md border border-border bg-surface px-2 py-1 text-sm";

/**
 * Environnement de pseudo-blocs sommative : les menus déroulants intégrés
 * aux blocs préservent l’utilisation au clavier. L’exécution affiche le
 * comportement littéral sur chaque scénario, jamais un jugement
 * « correct/incorrect ». Le dépôt reste "pending" jusqu’à la correction dans
 * `/teacher`.
 */
export function SommativeBlockProgram({
  missionId,
  itemId,
  comparatorOptions,
  thresholdOptions,
  actionOptions,
  elseActionOptions = [],
  scenarios,
  onSubmitted,
}: SommativeBlockProgramProps) {
  const { submitAssessment, snapshot } = useProgression();
  const [comparatorId, setComparatorId] = useState("");
  const [thresholdId, setThresholdId] = useState("");
  const [actionId, setActionId] = useState("");
  const [elseActionId, setElseActionId] = useState("");
  const [tested, setTested] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const shuffledComparatorOptions = useShuffledForDisplay(comparatorOptions);
  const shuffledThresholdOptions = useShuffledForDisplay(thresholdOptions);
  const shuffledActionOptions = useShuffledForDisplay(actionOptions);
  const shuffledElseActionOptions = useShuffledForDisplay(elseActionOptions);

  const alreadySubmitted =
    snapshot.status === "ready" && findAssessmentSubmission(snapshot.file, missionId, itemId) !== null;

  if (submitted || alreadySubmitted) {
    return <SommativeSubmittedNotice />;
  }

  const needsElseAction = elseActionOptions.length > 0;
  const configured = comparatorId !== "" && thresholdId !== "" && actionId !== "" && (!needsElseAction || elseActionId !== "");
  const threshold = thresholdOptions.find((option) => option.id === thresholdId);
  const action = actionOptions.find((option) => option.id === actionId);
  const elseAction = elseActionOptions.find((option) => option.id === elseActionId);

  function handleConfigChange<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setTested(false);
    };
  }

  async function handleSubmit() {
    if (!configured || !tested || !threshold) return;
    setSubmitting(true);
    await submitAssessment(missionId, itemId, "summative", {
      comparator: comparatorId,
      thresholdM: threshold.valueM,
      action: actionId,
      otherwise: elseActionId || null,
    });
    setSubmitting(false);
    setSubmitted(true);
    onSubmitted?.();
  }

  return (
    <div className="flex flex-col gap-4">
      <section aria-labelledby="program-title" className="flex flex-col gap-3 rounded-md border border-border bg-surface-muted p-4">
        <div>
          <h3 id="program-title" className="font-semibold text-ink">{BLOCK_PROGRAM_LABELS.programTitle}</h3>
          <p className="mt-1 text-sm text-ink-muted">{BLOCK_PROGRAM_LABELS.programDescription}</p>
        </div>
        <div className="w-fit rounded-md border border-sky-700 bg-sky-100 px-3 py-2 text-sm font-semibold text-sky-950">
          {BLOCK_PROGRAM_LABELS.eventIntro}
        </div>
        <div className="flex flex-wrap items-center gap-2 rounded-md border border-amber-700 bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-950">
          <span>{BLOCK_PROGRAM_LABELS.conditionIntro}</span>
          <select aria-label={BLOCK_PROGRAM_LABELS.comparatorFieldLabel} value={comparatorId} onChange={(event) => handleConfigChange(setComparatorId)(event.target.value)} className={SELECT_CLASS}>
            <option value="" disabled>{ACTIVITY_LABELS.choicePlaceholder}</option>
            {shuffledComparatorOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
          </select>
          <select aria-label={BLOCK_PROGRAM_LABELS.thresholdFieldLabel} value={thresholdId} onChange={(event) => handleConfigChange(setThresholdId)(event.target.value)} className={SELECT_CLASS}>
            <option value="" disabled>{ACTIVITY_LABELS.choicePlaceholder}</option>
            {shuffledThresholdOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
          </select>
        </div>
        <div className="ml-4 flex flex-wrap items-center gap-2 rounded-md border border-emerald-700 bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-950">
          <span>{BLOCK_PROGRAM_LABELS.actionIntro}</span>
          <select aria-label={BLOCK_PROGRAM_LABELS.actionFieldLabel} value={actionId} onChange={(event) => handleConfigChange(setActionId)(event.target.value)} className={SELECT_CLASS}>
            <option value="" disabled>{ACTIVITY_LABELS.choicePlaceholder}</option>
            {shuffledActionOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
          </select>
        </div>
        {needsElseAction ? (
          <div className="ml-4 flex flex-wrap items-center gap-2 rounded-md border border-violet-700 bg-violet-100 px-3 py-2 text-sm font-semibold text-violet-950">
            <span>{BLOCK_PROGRAM_LABELS.otherwiseIntro}</span>
            <select aria-label={BLOCK_PROGRAM_LABELS.otherwiseFieldLabel} value={elseActionId} onChange={(event) => handleConfigChange(setElseActionId)(event.target.value)} className={SELECT_CLASS}>
              <option value="" disabled>{ACTIVITY_LABELS.choicePlaceholder}</option>
              {shuffledElseActionOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
            </select>
          </div>
        ) : null}
      </section>

      <button
        type="button"
        disabled={!configured}
        onClick={() => setTested(true)}
        className="w-fit rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink disabled:opacity-50"
      >
        {BLOCK_PROGRAM_LABELS.testButton}
      </button>

      {tested && threshold && action ? (
        <ul className="flex flex-col gap-1 rounded-md border border-border bg-surface-muted p-3 text-sm text-ink">
          {scenarios.map((scenario, index) => {
            const triggered = evaluateCondition(scenario.distanceM, comparatorId as Comparator, threshold.valueM);
            const outcome = triggered
              ? formatMessage(BLOCK_PROGRAM_LABELS.outcomeTriggered, { action: action.label })
              : elseAction
                ? formatMessage(BLOCK_PROGRAM_LABELS.outcomeTriggered, { action: elseAction.label })
                : BLOCK_PROGRAM_LABELS.outcomeNotTriggered;
            return (
              <li key={scenario.id}>
                {formatMessage(BLOCK_PROGRAM_LABELS.scenarioOutcomeTemplate, {
                  scenario: String(index + 1),
                  distance: formatFrenchNumber(scenario.distanceM),
                  outcome,
                })}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm italic text-ink-muted">{BLOCK_PROGRAM_LABELS.runFirstNotice}</p>
      )}

      <button
        type="button"
        disabled={!tested || submitting}
        onClick={() => void handleSubmit()}
        className="w-fit rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast disabled:opacity-50"
      >
        {SOMMATIVE_LABELS.submitButton}
      </button>
    </div>
  );
}
