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
      <path d="M8 6h27v3H8zM13 9h4v29h-4zM8 12h5v3H8zM32 9h3v17h-3zM31 25h5v3h-5z" fill="#E26721" />
      <path d="M6 38h36v4H6zM20 27h17v11H20z" fill="#1F3650" />
      <path d="M24 24l5-5 5 5zM24 31h3v3h-3zM30 31h3v3h-3z" fill="#E26721" />
      <path d="M10 34h3v4h-3zM17 31h3v7h-3z" fill="#1F3650" />
      <path d="M35 13l5 3-5 3z" fill="#E26721" />
    </svg>
  );
}
