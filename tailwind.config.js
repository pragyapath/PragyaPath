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
        terra:   '#EE7924', // Vibrant Orange - energetic accents
        sage:    '#8BD3DD', // Soft Aqua - section backgrounds/accents
        gold:    '#C49A5C', // Warm Muted Gold - premium CTAs and highlights
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
        'glow': '0 0 50px -15px rgba(196, 154, 92, 0.30)',
        'card': '0 4px 24px rgba(15, 56, 61, 0.06)',
        'card-hover': '0 12px 48px rgba(15, 56, 61, 0.10)',
      }
    }
  },
  plugins: []
}
