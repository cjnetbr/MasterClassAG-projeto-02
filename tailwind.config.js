/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E4036', // Musgo
        accent: '#F7A693', // Salmão
        secondary: '#1BB0CE', // Ciano
        background: '#F2F0E9', // Creme
        dark: '#1A1A1A', // Carvão
        clean: '#34AF23', // Verde marca
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
