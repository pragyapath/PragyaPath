/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './public/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        // Theme colours come from CSS variables (public/css/input.css),
        // so every utility switches between light and dark mode.
        // Token names kept from the old theme so existing classes re-theme.
        paper:   'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        ink:     'rgb(var(--c-bg-alt) / <alpha-value>)',      // alternate section background
        stone:   'rgb(var(--c-heading) / <alpha-value>)',     // headings, primary text
        muted:   'rgb(var(--c-muted) / <alpha-value>)',
        gold:    'rgb(var(--c-accent) / <alpha-value>)',      // links, primary buttons
        terra:   'rgb(var(--c-saffron) / <alpha-value>)',
        saffron: 'rgb(var(--c-saffron) / <alpha-value>)',
        sage:    'rgb(var(--c-bg-alt) / <alpha-value>)',
        line:    'rgb(var(--c-line) / <alpha-value>)',
        bronze:  'rgb(var(--c-brass-text) / <alpha-value>)',
        brass:   'rgb(var(--c-brass) / <alpha-value>)',
        band:    'rgb(var(--c-band) / <alpha-value>)',
        dusk:    'rgb(var(--c-heading) / <alpha-value>)',
      },
      fontFamily: {
        // serif = display (Bodoni Moda); sans/ui = Manrope; deva = Devanagari accents
        serif: ['"Bodoni Moda"', 'Didot', 'Georgia', 'serif'],
        sans:  ['"Manrope"', 'system-ui', 'sans-serif'],
        ui:    ['"Manrope"', 'system-ui', 'sans-serif'],
        deva:  ['"Tiro Devanagari Sanskrit"', '"Noto Serif Devanagari"', 'serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      boxShadow: {
        'glow': '0 0 60px -20px rgba(201, 165, 94, 0.45)',
        'card': '0 4px 24px rgba(17, 20, 43, 0.06)',
        'card-hover': '0 12px 48px rgba(17, 20, 43, 0.12)',
      }
    }
  },
  plugins: []
}
