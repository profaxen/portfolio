/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        accent: {
          purple: '#7C3AED',
          blue: '#3B82F6',
          cyan: '#06B6D4',
        },
        bg: {
          primary: '#050510',
          secondary: '#0a0a1a',
        }
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #7C3AED, #3B82F6, #06B6D4)',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(124,58,237,0.4)',
        'glow-blue': '0 0 20px rgba(59,130,246,0.4)',
        'glow-cyan': '0 0 20px rgba(6,182,212,0.4)',
        'glass': '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
