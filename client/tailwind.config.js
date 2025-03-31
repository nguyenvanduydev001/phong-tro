/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        main: '1100px'
      },
      backgroundColor: {
        'main-blue': '#1266DD',
        'main-pink': '#F73859',
        'main-red': '#E13427',
        'main-yellow': '#FEBB02',
        'overlay-70': 'rgba(0,0,0,0.7)',
        'overlay-30': 'rgba(0,0,0,0.3)',
      },
      colors: {
        'main-blue': '#1266DD',
        'main-pink': '#F73859',
        'main-red': '#E13427'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
}