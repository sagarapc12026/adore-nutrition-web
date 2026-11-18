import type { MDXComponents } from 'mdx/types';
import { PullQuote } from '@/components/pull-quote';
import { WaitlistCallout } from '@/components/waitlist-callout';

// Components available inside every .mdx article without importing them.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    PullQuote,
    WaitlistCallout,
    ...components,
  };
}
