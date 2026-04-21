/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '5rem',
      },
      screens: {
        '2xl': '1440px',
      },
    },
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        ivory: 'rgb(var(--ivory) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        indigo: 'rgb(var(--indigo) / <alpha-value>)',
        brass: 'rgb(var(--brass) / <alpha-value>)',
        oxblood: 'rgb(var(--oxblood) / <alpha-value>)',
        parchment: 'rgb(var(--parchment) / <alpha-value>)',
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        text: 'rgb(var(--text) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Fraunces', 'ui-serif', 'Georgia', 'serif'],
        serif: ['"EB Garamond"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 9vw, 10.5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4.6vw, 5rem)', { lineHeight: '1.04', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.5rem, 2.8vw, 2.625rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'body-lg': ['clamp(1rem, 1.05vw, 1.1875rem)', { lineHeight: '1.65' }],
        'micro': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
        wipe: 'cubic-bezier(0.7, 0, 0.2, 1)',
      },
      transitionDuration: {
        '420': '420ms',
        '620': '620ms',
        '720': '720ms',
        '900': '900ms',
        '1200': '1200ms',
      },
      letterSpacing: {
        widest: '0.18em',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
