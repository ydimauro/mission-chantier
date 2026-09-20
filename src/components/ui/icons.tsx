type IconProps = {
  className?: string;
};

const commonProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function SunIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <circle cx="12" cy="12" r="4" />
      <line x1="18" y1="12" x2="21" y2="12" />
      <line x1="16.24" y1="16.24" x2="18.36" y2="18.36" />
      <line x1="12" y1="18" x2="12" y2="21" />
      <line x1="7.76" y1="16.24" x2="5.64" y2="18.36" />
      <line x1="6" y1="12" x2="3" y2="12" />
      <line x1="7.76" y1="7.76" x2="5.64" y2="5.64" />
      <line x1="12" y1="6" x2="12" y2="3" />
      <line x1="16.24" y1="7.76" x2="18.36" y2="5.64" />
    </svg>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function ProjectorIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <line x1="12" y1="16" x2="12" y2="20" />
      <line x1="8" y1="20" x2="16" y2="20" />
    </svg>
  );
}

export function GaugeIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <circle cx="12" cy="13" r="8" />
      <line x1="12" y1="13" x2="16" y2="9" />
      <circle cx="12" cy="13" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    </svg>
  );
}
