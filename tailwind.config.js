/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FFFDF8',      // Primary background
        sidebarBg: '#DCE8D7',   // Sidebar background
        primaryBrand: '#2D5A45',// Primary button & brand accent
        primaryText: '#1E2B24', // Primary text
        charcoalMuted: '#52665B', // Secondary text
        borderPaper: '#E0E8DC',   // Crisp paper borders
        cardPaper: '#F3F7F0',     // Light sage paper containers
        sticky: {
          sage: '#B5D0AF',
          butter: '#F7EBAA',
          peach: '#F4B89B',
          lavender: '#C7B8DF',
          powderBlue: '#A2C0D4',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Fraunces', 'serif'],
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '18px',
        '3xl': '24px',
      },
      boxShadow: {
        'paper': '0 1px 3px 0 rgba(30, 43, 36, 0.04), 0 1px 2px -1px rgba(30, 43, 36, 0.03)',
        'sticky': '0 2px 6px 0 rgba(30, 43, 36, 0.06), 0 6px 14px -2px rgba(30, 43, 36, 0.05)',
        'modal': '0 16px 40px -6px rgba(30, 43, 36, 0.16)',
      },
    },
  },
  plugins: [],
}
