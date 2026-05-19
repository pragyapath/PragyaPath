/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './public/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        // Grounded Sanctuary Palette (Psychology-driven for Wellness)
        base:    '#1F2421', // Deep Forest/Olive - soothing, natural, deeply grounding
        surface: '#29302B', // Soft elevated earth tone - reduces eye strain
        stone:   '#F4EFE6', // Warm parchment/sand - gentle readability (no harsh whites)
        ink:     '#161917', // Deepest shadow for inverted contrast
        muted:   '#A3A8A4', // Soft sage green/grey for secondary reading
        terra:   '#C57B57', // Earthy terracotta/clay - human connection, warmth
        sage:    '#405045', // Mid-tone botanical green
        gold:    '#C4A25A', // Antique brass/gold - spiritual richness, singing bowls
        line:    '#3E4640', // Soft natural boundaries
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      boxShadow: {
        'glow': '0 0 50px -15px rgba(196, 162, 90, 0.25)',
      }
    }
  },
  plugins: []
}
