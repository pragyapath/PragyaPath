/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './public/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        // Pragya Path palette — saffron from the logo, dusk indigo of the
        // Kathmandu Valley evening, on near-white paper.
        // Token names are kept from the old theme so existing classes re-theme.
        base:    '#FAF9F6', // paper — page background
        surface: '#FFFFFF', // white — raised panels, form
        stone:   '#1F2347', // dusk indigo — headings, primary text, dark bands
        ink:     '#F0EEF4', // mist — alternate section background
        muted:   '#4F5372', // indigo grey — body / secondary text (7:1 on paper)
        gold:    '#B9541A', // deep saffron — links, buttons (AA with white text)
        terra:   '#EC7A31', // logo saffron — accents on dark backgrounds only
        sage:    '#E7E4EF', // soft mist — tinted fills
        line:    '#E2DFEA', // hairlines and borders
        bronze:  '#8F6430', // singing-bowl bronze — small details
        dusk:    '#1F2347',
        saffron: '#EC7A31',
      },
      fontFamily: {
        // `serif` = display face (Outfit, matches the logo lettering);
        // `sans` = reading face (Literata). Names kept so existing classes still apply.
        serif: ['"Outfit"', 'system-ui', 'sans-serif'],
        sans:  ['"Literata"', 'Georgia', 'serif'],
        ui:    ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      boxShadow: {
        'glow': '0 0 50px -15px rgba(185, 84, 26, 0.30)',
        'card': '0 4px 24px rgba(31, 35, 71, 0.06)',
        'card-hover': '0 12px 48px rgba(31, 35, 71, 0.10)',
      }
    }
  },
  plugins: []
}
