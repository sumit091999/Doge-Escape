/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        doge: {
          dark: '#1a1510',
          darker: '#0f0c08',
          stone: '#8b7355',
          wood: '#c8a060',
          dirt: '#a07840',
          grass: '#d4a84b',
          gold: '#f0b429',
          emerald: '#f7c948',
          diamond: '#e8a317',
          redstone: '#e04040',
          coal: '#2a2015',
          iron: '#e8dcc8',
          lava: '#f09030',
          water: '#c89430',
        }
      },
      fontFamily: {
        pixel: ['"Comic Neue"', 'cursive'],
        heading: ['"Orbitron"', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'flicker': 'flicker 1.5s ease-in-out infinite',
        'wag': 'wag 0.4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(240, 180, 41, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(240, 180, 41, 1)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        wag: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(15deg)' },
          '75%': { transform: 'rotate(-15deg)' },
        },
      },
      boxShadow: {
        'pixel': '4px 4px 0px rgba(0, 0, 0, 0.5)',
        'pixel-lg': '8px 8px 0px rgba(0, 0, 0, 0.5)',
        'glow-green': '0 0 20px rgba(240, 180, 41, 0.6)',
        'glow-gold': '0 0 20px rgba(247, 201, 72, 0.6)',
      }
    },
  },
  plugins: [],
}
