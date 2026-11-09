import type { DivisionSlug } from "@/content/divisions";

type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 32 32",
  "aria-hidden": true,
};

export const ArrowRight = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} viewBox="0 0 24 24" strokeWidth={1.6} className={className}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} viewBox="0 0 24 24" strokeWidth={1.6} className={className}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Plus = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} viewBox="0 0 24 24" strokeWidth={1.6} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Globe = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} viewBox="0 0 24 24" strokeWidth={1.5} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
  </svg>
);

export const Mail = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} viewBox="0 0 24 24" strokeWidth={1.5} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const Phone = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} viewBox="0 0 24 24" strokeWidth={1.5} className={className}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const Pin = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} viewBox="0 0 24 24" strokeWidth={1.5} className={className}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const Clock = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} viewBox="0 0 24 24" strokeWidth={1.5} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Chat = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} viewBox="0 0 24 24" strokeWidth={1.5} className={className}>
    <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1L4 20Z" />
  </svg>
);

export const Award = ({ className = "h-6 w-6" }: P) => (
  <svg {...base} className={className}>
    <circle cx="16" cy="12" r="8" />
    <circle cx="16" cy="12" r="4.5" />
    <path d="m11 18.5-2.5 9 7.5-3.5 7.5 3.5-2.5-9" />
  </svg>
);

const divisionIcons: Record<DivisionSlug, (p: P) => React.ReactElement> = {
  coffee: ({ className }) => (
    <svg {...base} className={className}>
      <ellipse cx="16" cy="16" rx="8.5" ry="12" transform="rotate(32 16 16)" />
      <path d="M11.5 7.5c4 3 1 8.5 4.5 10s3.5 4 4.5 7" />
    </svg>
  ),
  minerals: ({ className }) => (
    <svg {...base} className={className}>
      <path d="M9 6h14l5 7-12 14L4 13l5-7Z" />
      <path d="M4 13h24M12 6l-3 7 7 14 7-14-3-7M16 6v0" />
    </svg>
  ),
  "animal-health": ({ className }) => (
    <svg {...base} className={className}>
      <rect x="5" y="5" width="22" height="22" rx="6" />
      <path d="M16 10v12M10 16h12" />
    </svg>
  ),
  electrical: ({ className }) => (
    <svg {...base} className={className}>
      <path d="M18 3 7 18h8l-2 11 12-16h-8l1-10Z" />
    </svg>
  ),
  "agro-industry": ({ className }) => (
    <svg {...base} className={className}>
      <path d="M16 28V14" />
      <path d="M16 18c-6 0-9-4-9-10 6 0 9 4 9 10ZM16 14c0-5 3-9 9-9 0 6-3 9-9 9Z" />
      <path d="M8 28h16" />
    </svg>
  ),
  construction: ({ className }) => (
    <svg {...base} className={className}>
      <path d="M5 28h22M8 28V12l8-6 8 6v16" />
      <path d="M13 28v-7h6v7M12 14h2M18 14h2" />
    </svg>
  ),
  consultancy: ({ className }) => (
    <svg {...base} className={className}>
      <circle cx="16" cy="16" r="11" />
      <path d="m20.5 11.5-3 6-6 3 3-6 6-3Z" />
    </svg>
  ),
};

export function DivisionIcon({ slug, className = "h-7 w-7" }: { slug: DivisionSlug; className?: string }) {
  const Icon = divisionIcons[slug];
  return <Icon className={className} />;
}
