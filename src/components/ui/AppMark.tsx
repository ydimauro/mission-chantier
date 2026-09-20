type AppMarkProps = {
  size?: number;
  className?: string;
};

/**
 * Marque visuelle de Mission Chantier : une grue stylisée au-dessus d’un
 * petit bâtiment, pour évoquer à la fois le chantier et la ville
 * (docs/SPEC.md § 55). Purement géométrique, aucune dépendance externe.
 */
export function AppMark({ size = 32, className }: AppMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      role="img"
      aria-label="Mission Chantier"
      className={className}
    >
      <rect width="48" height="48" rx="10" fill="#C2410C" />
      <rect x="8" y="31" width="9" height="9" fill="#FFFFFF" />
      <rect x="10.5" y="33.5" width="4" height="4" fill="#C2410C" />
      <line x1="10" y1="40" x2="39" y2="40" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <line x1="17" y1="40" x2="17" y2="12" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <line x1="17" y1="12" x2="39" y2="16" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <line x1="17" y1="12" x2="9" y2="15" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <line x1="36" y1="17" x2="36" y2="27" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="33" y="27" width="6" height="5" rx="1" fill="#FFFFFF" />
    </svg>
  );
}
