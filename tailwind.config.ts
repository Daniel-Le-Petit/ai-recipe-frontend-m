import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette principale avec le vert moderne #22c55e
        'herb-green': '#22c55e',      // Vert principal moderne
        'herb-dark': '#16a34a',       // Vert foncé pour contrastes
        'herb-light': '#4ade80',      // Vert clair pour variations
        'sage': '#22c55e',            // Même vert pour cohérence
        'sage-light': '#4ade80',      // Sage clair
        'sage-dark': '#16a34a',       // Sage foncé
        'warm-brown': '#8B4513',      // Brun chaud naturel (garde l'accent)
        'warm-brown-light': '#A05B20', // Brun chaud clair
        'beige-main': '#FDFBF5',      // Beige principal
        'beige-warm': '#F9F7F0',      // Beige chaud
        'text-dark': '#333333',       // Texte principal
        'text-medium': '#555555',     // Texte moyen
        'text-light': '#777777',      // Texte clair
        // Couleurs complémentaires harmonisées avec le nouveau vert
        'earth-clay': '#C2815B',      // Terre cuite
        'earth-sand': '#D4B896',      // Sable
        'nature-moss': '#22c55e',     // Mousse = même vert
        'nature-bark': '#6B4423'      // Écorce
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
export default config 