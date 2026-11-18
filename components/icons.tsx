// Tiny inline icons for client components (paths from Lucide, ISC licence).
// Server components use lucide-react directly; these keep client bundles lean.
import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement> & { strokeWidth?: number };

function Base({ children, strokeWidth = 2, ...props }: P) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const CheckIcon = (p: P) => (
  <Base {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Base>
);
export const XIcon = (p: P) => (
  <Base {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Base>
);
export const MenuIcon = (p: P) => (
  <Base {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Base>
);
export const AlertIcon = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </Base>
);
