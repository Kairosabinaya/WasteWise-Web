/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#164c51',
        'brand-secondary': '#F8FAFC',
        'brand-dark': '#0C2521',
        'organic-green': '#164c51',
        'recycle-blue': '#164c51',
        'reward-purple': '#D48931',
        'hazard-orange': '#D48931',
        'stat-coral': '#6d1e04',
        'text-primary': '#0C2521',
        'text-secondary': '#6B7280',
        'surface-white': '#FFFFFF',
        'residue-gray': '#6d1e04',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'card': '0 2px 6px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}

