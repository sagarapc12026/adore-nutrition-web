import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,mdx}', './mdx-components.tsx'],
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#FFF8F2',
          100: '#FFE9DA',
          200: '#FCD2B6',
          300: '#F8B48A',
          400: '#F19568',
          500: '#E07A4D', // primary brand
          600: '#C45F36',
          700: '#9A4825',
        },
        blush: '#F4C2B0',
        rose: '#E89B89',
        cream: '#FBF4EB',
        sage: { DEFAULT: '#A6C2A8', dark: '#6B8A6E' }, // success only
        coral: '#D9534F', // safety alerts only — never use as a brand color
        ink: { DEFAULT: '#2A1810', mid: '#5A3F33', soft: '#7A5A4D', mute: '#B69A8C' },
        bg: { DEFAULT: '#FBF4EB', warm: '#FFF6F0' },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
        card: '1.25rem',
        lg: '1rem',
        xl: '1.75rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(42,24,16,0.04), 0 1px 3px rgba(42,24,16,0.06)',
        warm: '0 4px 16px rgba(193,95,54,0.10), 0 2px 6px rgba(42,24,16,0.05)',
        lift: '0 20px 50px rgba(193,95,54,0.14), 0 8px 16px rgba(42,24,16,0.06)',
        hero: '0 40px 90px rgba(193,95,54,0.18), 0 16px 32px rgba(42,24,16,0.08)',
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'float-in': 'float-in 0.7s cubic-bezier(0.4, 0, 0.2, 1) both',
        'success-in': 'success-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) both',
        shake: 'shake 0.45s ease-in-out',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.6)', opacity: '0.35' },
        },
        'float-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'success-in': {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '15%': { transform: 'translateX(-7px)' },
          '30%': { transform: 'translateX(7px)' },
          '45%': { transform: 'translateX(-5px)' },
          '60%': { transform: 'translateX(5px)' },
          '80%': { transform: 'translateX(-2px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
