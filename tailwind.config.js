/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './public/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        // Pragya Path — "temple at dusk": night indigo, singing-bowl brass,
        // logo saffron, on warm sandstone paper.
        // Token names kept from the old theme so existing classes re-theme.
        base:    '#F6F2EB', // sandstone paper — page background
        surface: '#FFFDF9', // warm white — raised panels, form
        stone:   '#1B1F3F', // indigo — headings, primary text
        ink:     '#EDE7DC', // deeper sandstone — alternate section background
        muted:   '#585C78', // indigo grey — body text (6.4:1 on paper)
        gold:    '#B4501A', // deep saffron — links, primary buttons
        terra:   '#E8823A', // logo saffron — accents on dark
        sage:    '#E9E2D4', // tinted fills
        line:    '#DDD5C7', // hairlines on paper
        bronze:  '#8C6A2F', // brass, readable on paper
        brass:   '#C9A55E', // brass — ornaments and labels on dark
        night:   '#11142B', // night indigo — dark sections
        dusk:    '#1B1F3F',
        saffron: '#E8823A',
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
