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
      <g fill="none" stroke="#E26721" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 7h29M13 7v32M8 11h5M5 7l4-4M13 7l5-4M34 7v18" />
        <path d="M34 25v4h-4" />
      </g>
      <path d="M5 40h38" stroke="#1F3650" strokeWidth="3" strokeLinecap="round" />
      <path d="M21 27h17v13H21zM24 23l6-5 6 5z" fill="#1F3650" />
      <path d="M24 31h3v3h-3zM30 31h3v3h-3zM35 31h2v7h-2z" fill="#E26721" />
      <path d="M16 33h5v7h-5z" fill="#E26721" />
      <path d="M17 35h3v2h-3z" fill="#FFFFFF" />
    </svg>
  );
}
