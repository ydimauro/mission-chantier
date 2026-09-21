"use client";

import { useState } from "react";
import { useProgression } from "@/providers/progression-provider";
import { SommativeSubmittedNotice } from "@/components/evaluation/SommativeSubmittedNotice";
import { evaluateCondition, type Comparator } from "@/lib/mission/block-program";
import { formatMessage } from "@/lib/format-message";
import { formatFrenchNumber } from "@/lib/format-number";
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
  scenarios: readonly BlockProgramScenario[];
  /** Appelé après la remise réussie, pour permettre à la mission d’en tenir compte (ex. déblocage de « Mission terminée »). */
  onSubmitted?: () => void;
};

const SELECT_CLASS = "rounded-md border border-border bg-surface px-2 py-1 text-sm";

/**
 * Programmation « pseudo-blocs » simplifiée, à base de menus déroulants
 * (docs/SEANCES_5E.md 5E-10), en attendant le véritable environnement de
 * programmation par blocs prévu à l’ÉTAPE 12 (docs/SPEC.md § 65). Sommative :
 * exécuter le programme affiche seulement son comportement littéral sur
 * chaque scénario (jamais un jugement « correct/incorrect »), conformément
 * à docs/SPEC.md § 30. Le dépôt reste "pending" jusqu’à la correction dans
 * `/teacher`.
 */
export function SommativeBlockProgram({
  missionId,
  itemId,
  comparatorOptions,
  thresholdOptions,
  actionOptions,
  scenarios,
  onSubmitted,
}: SommativeBlockProgramProps) {
  const { submitAssessment } = useProgression();
  const [comparatorId, setComparatorId] = useState("");
  const [thresholdId, setThresholdId] = useState("");
  const [actionId, setActionId] = useState("");
  const [tested, setTested] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (submitted) {
    return <SommativeSubmittedNotice />;
  }

  const configured = comparatorId !== "" && thresholdId !== "" && actionId !== "";
  const threshold = thresholdOptions.find((option) => option.id === thresholdId);
  const action = actionOptions.find((option) => option.id === actionId);

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
    });
    setSubmitting(false);
    setSubmitted(true);
    onSubmitted?.();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-surface p-3 text-sm text-ink">
        <span>{BLOCK_PROGRAM_LABELS.conditionIntro}</span>
        <select
          aria-label={BLOCK_PROGRAM_LABELS.comparatorFieldLabel}
          value={comparatorId}
          onChange={(event) => handleConfigChange(setComparatorId)(event.target.value)}
          className={SELECT_CLASS}
        >
          <option value="" disabled>
            {ACTIVITY_LABELS.choicePlaceholder}
          </option>
          {comparatorOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          aria-label={BLOCK_PROGRAM_LABELS.thresholdFieldLabel}
          value={thresholdId}
          onChange={(event) => handleConfigChange(setThresholdId)(event.target.value)}
          className={SELECT_CLASS}
        >
          <option value="" disabled>
            {ACTIVITY_LABELS.choicePlaceholder}
          </option>
          {thresholdOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-surface p-3 text-sm text-ink">
        <span>{BLOCK_PROGRAM_LABELS.actionIntro}</span>
        <select
          aria-label={BLOCK_PROGRAM_LABELS.actionFieldLabel}
          value={actionId}
          onChange={(event) => handleConfigChange(setActionId)(event.target.value)}
          className={SELECT_CLASS}
        >
          <option value="" disabled>
            {ACTIVITY_LABELS.choicePlaceholder}
          </option>
          {actionOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

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
