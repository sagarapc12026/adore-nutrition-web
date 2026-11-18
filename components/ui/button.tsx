import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

// Primary uses a peach-600 → peach-700 gradient: white text on peach-500 is only
// 3.0:1, so the brand peach is kept for surfaces and the darker steps carry the text.
const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-peach-600 to-peach-700 text-white shadow-warm hover:-translate-y-px hover:shadow-lift active:translate-y-0',
  secondary:
    'bg-white text-ink ring-1 ring-peach-200 shadow-soft hover:-translate-y-px hover:shadow-warm hover:ring-peach-300',
  ghost: 'text-peach-700 hover:bg-peach-100',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-[14px]',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-[16px]',
};

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', extra = '') {
  return [
    'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-pill font-sans font-semibold',
    'transition-[transform,box-shadow,background-color] duration-200 ease-out',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-peach-600',
    'disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0',
    variants[variant],
    sizes[size],
    extra,
  ].join(' ');
}

type ButtonProps = ComponentPropsWithoutRef<'button'> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className = '', ...props }: ButtonProps) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}

type LinkButtonProps = Omit<ComponentPropsWithoutRef<typeof Link>, 'className'> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function LinkButton({ variant, size, className = '', ...props }: LinkButtonProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}

/** Visible arrow that screen readers skip. */
export function Arrow() {
  return (
    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
      →
    </span>
  );
}
