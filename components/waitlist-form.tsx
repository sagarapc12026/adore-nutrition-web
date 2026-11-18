'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { AlertIcon, CheckIcon } from './icons';
import { getRef, getUtm, track, type CtaLocation } from '@/lib/analytics';

type Variant = 'hero' | 'cta' | 'newsletter' | 'article';

const ctaLocation: Record<Variant, CtaLocation> = {
  hero: 'hero',
  cta: 'cta',
  newsletter: 'journal',
  article: 'article',
};

const copy: Record<Variant, { button: string; microcopy: string }> = {
  hero: { button: 'Join the waitlist', microcopy: 'No spam. Just a quiet note when we open early access.' },
  cta: { button: 'Save my spot', microcopy: 'No spam. Just a quiet note when we open early access.' },
  newsletter: { button: 'Send me Sundays', microcopy: 'One gentle email a week. Unsubscribe anytime.' },
  article: { button: 'Join the waitlist', microcopy: 'No spam. Just a quiet note when we open early access.' },
};

type FormValues = { email: string; company?: string };

// The zod schema is loaded on first focus (or submit) rather than with the page,
// keeping ~15 KB of validation code off the critical path.
const loadSchema = () => import('@/lib/waitlist-schema').then((mod) => mod.emailSchema);

const resolver: Resolver<FormValues> = async (values) => {
  const emailSchema = await loadSchema();
  const result = emailSchema.safeParse(values.email);
  if (result.success) return { values: { ...values, email: result.data }, errors: {} };
  return {
    values: {},
    errors: { email: { type: 'validation', message: result.error.issues[0]?.message ?? 'Please check your email.' } },
  };
};

export function WaitlistForm({ variant = 'hero', className = '' }: { variant?: Variant; className?: string }) {
  const id = useId();
  const inputId = `${id}-email`;
  const microId = `${id}-micro`;
  const errorId = `${id}-error`;
  const { button, microcopy } = copy[variant];
  const large = variant === 'cta';

  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver, defaultValues: { email: '', company: '' } });

  // Replays the CSS shake without remounting the input (instant under reduced motion).
  const wobble = () => {
    const el = fieldRef.current;
    if (!el) return;
    el.classList.remove('animate-shake');
    void el.offsetWidth; // force reflow so the animation restarts
    el.classList.add('animate-shake');
  };

  // The form is replaced on success: keep keyboard and screen-reader focus with the confirmation.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus({ preventScroll: true });
  }, [status]);

  const onValid = async ({ email, company }: FormValues) => {
    setServerError(null);
    track('waitlist_submit_attempt', { source: variant });
    const utm = getUtm();
    const ref = getRef(utm);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: variant, ref, utm, company }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        const reason = res.status === 429 ? 'rate_limited' : (data.error ?? `http_${res.status}`);
        throw new Error(reason);
      }
      track('waitlist_submit_success', { source: variant, ref });
      setStatus('success');
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown';
      track('waitlist_submit_error', { source: variant, reason });
      setServerError(
        reason === 'rate_limited'
          ? 'That was a lot of tries in a row. Give it a minute, then try again.'
          : 'Something went wrong on our side. Please try again in a moment.',
      );
      wobble();
    }
  };

  const onInvalid = () => {
    track('waitlist_submit_error', { source: variant, reason: 'validation' });
    wobble();
  };

  const errorMessage = errors.email?.message ?? serverError;

  return (
    <div className={`w-full ${large ? 'max-w-[560px]' : 'max-w-[520px]'} ${className}`}>
      <div role="status" aria-live="polite" className="sr-only">
        {status === 'success' ? 'You’re in. We’ll be in touch.' : ''}
      </div>

      {status === 'success' ? (
        <div
          ref={successRef}
          tabIndex={-1}
          className={`flex animate-success-in items-center gap-3 rounded-pill bg-gradient-to-r from-sage/50 via-sage/40 to-sage/60 px-5 outline-none ring-1 ring-sage-dark/25 ${large ? 'h-[72px]' : 'h-16'}`}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-dark text-white shadow-soft">
            <CheckIcon className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <p className="font-display text-[19px] leading-tight text-ink">
            You’re in. <span className="italic">We’ll be in touch.</span>
          </p>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit(onValid, onInvalid)}>
          <div
            ref={fieldRef}
            onAnimationEnd={(e) => e.currentTarget.classList.remove('animate-shake')}
            className={[
              'group/field flex flex-col gap-2 rounded-xl bg-white p-2 shadow-warm ring-1 transition-[box-shadow,ring-color] duration-300',
              'sm:flex-row sm:items-center sm:rounded-pill sm:p-1.5',
              'focus-within:shadow-[0_0_0_4px_rgba(224,122,77,0.12),0_4px_16px_rgba(193,95,54,0.10)] focus-within:ring-peach-300',
              errorMessage ? 'ring-coral/60' : 'ring-peach-200/70',
            ].join(' ')}
          >
            <label htmlFor={inputId} className="sr-only">
              Email address
            </label>
            <input
              id={inputId}
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="Your email, mama"
              aria-label="Email address"
              aria-invalid={errorMessage ? true : undefined}
              aria-describedby={errorMessage ? `${errorId} ${microId}` : microId}
              className={`min-w-0 flex-1 rounded-pill bg-transparent px-4 font-sans text-ink outline-none placeholder:text-ink-soft focus-visible:outline-none sm:px-5 ${large ? 'h-14 text-[17px]' : 'h-12 text-[16px]'}`}
              onFocus={() => void loadSchema()}
              {...register('email')}
            />
            {/* Honeypot: hidden from people and assistive tech */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              {...register('company')}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => track('cta_click', { location: ctaLocation[variant] })}
              aria-label={button}
              className={[
                'group inline-flex shrink-0 items-center justify-center gap-2 rounded-pill bg-gradient-to-b from-peach-600 to-peach-700 font-semibold text-white shadow-warm',
                'transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:shadow-lift active:translate-y-0',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach-600 disabled:opacity-80',
                large ? 'h-14 px-8 text-[16px]' : 'h-12 px-6 text-[15px]',
              ].join(' ')}
            >
              {isSubmitting ? (
                <>
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  />
                  <span>Saving…</span>
                </>
              ) : (
                <>
                  <span>{button}</span>
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </>
              )}
            </button>
          </div>

          {errorMessage && (
            <p
              id={errorId}
              className="mt-3 flex items-start gap-2 px-2 text-[13.5px] font-medium leading-snug text-ink"
            >
              <AlertIcon className="mt-px h-4 w-4 shrink-0 text-coral" strokeWidth={2.25} />
              {errorMessage}
            </p>
          )}
        </form>
      )}

      <p
        id={microId}
        className={`mt-3 flex items-center gap-2 px-2 text-[12.5px] text-ink-soft ${variant === 'cta' ? 'justify-center' : ''}`}
      >
        <CheckIcon className="h-3.5 w-3.5 shrink-0 text-sage-dark" strokeWidth={3} />
        {microcopy}
      </p>
    </div>
  );
}
