/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './public/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        // Modern & Bold Palette (Spiritual Contrast)
        base:    '#F4F9F9', // Crisp Off-White - main background
        surface: '#FFFFFF', // Pure White - elevated surface
        stone:   '#0F383D', // Very Dark Teal - primary text
        ink:     '#EBF3F3', // Light Tinted Background - subtle contrast areas
        muted:   '#1A6A73', // Deep Teal - secondary text/elements
        terra:   '#EE7924', // Vibrant Orange - active accents
        sage:    '#8BD3DD', // Soft Aqua - section backgrounds/accents
        gold:    '#EE7924', // Vibrant Orange - primary CTAs and highlights
        line:    '#8BD3DD', // Soft Aqua - borders and dividers
      },
      fontFamily: {
        serif: ['"Outfit"', 'system-ui', 'sans-serif'], // Elegant editorial serif for spiritual headings
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
