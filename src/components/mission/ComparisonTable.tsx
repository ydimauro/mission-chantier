export type ComparisonOption = {
  id: string;
  label: string;
  /** Une valeur par critère, dans le même ordre que `criteriaLabels`. */
  criteriaValues: readonly string[];
};

type ComparisonTableProps = {
  criteriaLabels: readonly string[];
  options: readonly ComparisonOption[];
};

/**
 * Tableau de comparaison à colonnes de critères (docs/SPEC.md § 23),
 * extrait de `SommativeChoiceJustified` (ÉTAPE 7) pour être réutilisé tel
 * quel par les activités de lecture de données comparatives (ÉTAPE 9).
 */
export function ComparisonTable({ criteriaLabels, options }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left text-ink-muted">
            <th className="py-2 pr-3"> </th>
            {criteriaLabels.map((label) => (
              <th key={label} className="py-2 pr-3">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {options.map((option) => (
            <tr key={option.id} className="border-b border-border">
              <td className="py-2 pr-3 font-medium text-ink">{option.label}</td>
              {option.criteriaValues.map((value, index) => (
                <td key={criteriaLabels[index]} className="py-2 pr-3 text-ink">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
