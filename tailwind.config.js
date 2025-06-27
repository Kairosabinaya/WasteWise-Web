/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#10B981',
        'brand-secondary': '#F8FAFC',
        'brand-dark': '#1F2937',
        'organic-green': '#059669',
        'recycle-blue': '#0EA5E9',
        'reward-purple': '#8B5CF6',
        'hazard-orange': '#F59E0B',
        'stat-coral': '#EF4444',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'surface-white': '#FFFFFF',
        'residue-gray': '#6B7280',
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

