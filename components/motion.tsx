'use client';

import { LazyMotion, MotionConfig, m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

// Animation features load after hydration so they don't weigh on first paint.
const loadFeatures = () => import('./motion-features').then((mod) => mod.default);

const EASE = [0.4, 0, 0.2, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={loadFeatures} strict>
      {/* prefers-reduced-motion: every Framer transition becomes instant */}
      <MotionConfig reducedMotion="user" transition={reduce ? { duration: 0 } : undefined}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'figure';
};

/** Fades and lifts content in once as it enters the viewport. */
export function FadeUp({ children, className, delay = 0, as = 'div' }: FadeUpProps) {
  const reduce = useReducedMotion();
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}
