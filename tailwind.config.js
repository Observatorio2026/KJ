/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta del manual de marca Kevin Jiménez
        morado: '#3E3185',        // R62 G49 B133
        moradoprofundo: '#241A5E',
        moradoclaro: '#5B4CB8',
        amarillo: '#F1B809',      // R241 G184 B9
        naranja: '#E27815',       // R226 G120 B21
        verde: '#28949B',         // R40 G148 B155
        hueso: '#F6F5FA',
        grafito: '#2A2733',
      },
      fontFamily: {
        // El Messiri viene del manual; Outfit sustituye a Clover Display en web
        display: ['"El Messiri"', 'Georgia', 'serif'],
        sans: ['Outfit', 'Geist', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: { medida: '68ch' },
      borderRadius: { hoja: '60% 5% 60% 5%' },
    },
  },
  plugins: [],
}
