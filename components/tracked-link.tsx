'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { track, type CtaLocation } from '@/lib/analytics';

type Props = ComponentPropsWithoutRef<typeof Link> & { location: CtaLocation };

/** A Link that reports a cta_click with its location. */
export function TrackedLink({ location, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track('cta_click', { location });
        onClick?.(e);
      }}
    />
  );
}
