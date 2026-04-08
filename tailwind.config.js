/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bima-primary': '#0D9488',
        'bima-secondary': '#F0FDF9',
        'bima-dark': '#065F46',
        'bima-darker': '#064E3B',
        'bima-energy': '#D97706',
        'bima-energy-dark': '#B45309',
        'bima-energy-light': '#FEF3C7',
        'bima-accent': '#7C3AED',
        'bima-driver': '#2563EB',
        'bima-driver-dark': '#1E40AF',
        'bima-danger': '#DC2626',
        'bima-button': '#164c51',
        'bima-button-dark': '#0C2521',
        'bima-button-secondary': '#D48931',
        'bima-button-secondary-dark': '#6d1e04',
        'text-primary': '#064E3B',
        'text-secondary': '#6B7280',
        'surface-white': '#FFFFFF',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(13, 148, 136, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(13, 148, 136, 0.4)' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(13, 148, 136, 0.15)',
        'card': '0 2px 6px rgba(0, 0, 0, 0.04)',
        'glow-teal': '0 4px 14px rgba(13, 148, 136, 0.25)',
      },
    },
  },
  plugins: [],
}
