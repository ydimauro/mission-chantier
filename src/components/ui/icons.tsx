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

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M3 11.5L12 4l9 7.5V21h-6v-6H9v6H3z" />
    </svg>
  );
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
      <path d="M10 12v2h4v-2" />
    </svg>
  );
}

export function ChartBarIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <line x1="4" y1="20" x2="20" y2="20" />
      <rect x="6" y="11" width="3" height="7" fill="currentColor" stroke="none" />
      <rect x="11" y="7" width="3" height="11" fill="currentColor" stroke="none" />
      <rect x="16" y="4" width="3" height="14" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FlaskIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <line x1="10" y1="3" x2="14" y2="3" />
      <line x1="10" y1="3" x2="10" y2="9" />
      <line x1="14" y1="3" x2="14" y2="9" />
      <path d="M10 9l-5 10a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3L14 9" />
    </svg>
  );
}

export function QuestionIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function TargetIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function MessageCircleIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 9.8 9.8 0 0 1-4.5-1.1L3 20l1.1-4.1A8.38 8.38 0 0 1 3 11.5a9 9 0 0 1 18 0z" />
      <line x1="8" y1="12" x2="8.01" y2="12" />
      <line x1="12" y1="12" x2="12.01" y2="12" />
      <line x1="16" y1="12" x2="16.01" y2="12" />
    </svg>
  );
}

export function HammerIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M14 5l5 5-2 2-2-2-8.5 8.5-2-2L13 8l-2-2 3-1z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BricksIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M3 5h8v5H3zM13 5h8v5h-8zM7 12h10v5H7zM3 19h8v-5H3zM13 19h8v-5h-8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PaintRollerIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <rect x="4" y="4" width="12" height="6" rx="1" fill="currentColor" stroke="none" />
      <path d="M16 7h2v5h-5v5" />
      <line x1="13" y1="17" x2="18" y2="22" />
    </svg>
  );
}

export function TreeIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M12 3l6 7h-3l4 5h-5l3 4H7l3-4H5l4-5H6z" fill="currentColor" stroke="none" />
      <path d="M12 19v3" />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M3 7h11v9H3zM14 11h4l3 3v2h-7z" fill="currentColor" stroke="none" />
      <circle cx="7" cy="18" r="2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="18" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LightbulbIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M12 3a6 6 0 0 0-4 10.5c.5.5 1 1.5 1 2.5h6c0-1 .5-2 1-2.5A6 6 0 0 0 12 3z" />
      <path d="M9 18h6" />
      <path d="M10 21h4" />
    </svg>
  );
}

export function FlagIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <line x1="5" y1="21" x2="5" y2="3" />
      <path d="M5 4h13l-3 4 3 4H5" />
    </svg>
  );
}

export function SlidersIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <circle cx="9" cy="7" r="2" fill="currentColor" stroke="none" />
      <line x1="4" y1="16" x2="20" y2="16" />
      <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CompareIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <rect x="4" y="10" width="5" height="10" />
      <rect x="14" y="5" width="5" height="15" />
    </svg>
  );
}

export function PencilIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function WarningIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function BookIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v16h5.5A2.5 2.5 0 0 1 20 21.5z" />
    </svg>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg {...commonProps} className={className}>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="12" x2="12" y2="7" />
      <line x1="12" y1="12" x2="15.5" y2="14" />
    </svg>
  );
}
