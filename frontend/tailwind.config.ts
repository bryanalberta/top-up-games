import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', 'var(--font-jakarta)', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      colors: {
        brand: {
          50: '#faf7f2',
          100: '#f3ece0',
          200: '#e7d8c0',
          300: '#d7bf99',
          400: '#c5a880', // Champagne Gold
          500: '#c5a880', // Champagne Gold
          600: '#b29367',
          700: '#9b7b51',
          800: '#7d613e',
          900: '#644e32',
          950: '#463520',
        },
        dark: {
          bg: '#030008', // Obsidian Velvet
          card: '#090714', // Royal Amethyst
          border: 'rgba(197, 168, 128, 0.12)', // Subtle Gold Border
        },
        theme: {
          text: '#ffffff',
          muted: '#a3a3ac',
        },
        accent: {
          gold: '#fbbf24', // Satin Gold
          neonBlue: '#00f2fe',
          purple: '#a855f7', // Royal Purple
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
        'mesh-pattern': 'radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%)',
      },
      animation: {
        'glow': 'glow 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #c5a880, 0 0 10px #c5a880' },
          '100%': { boxShadow: '0 0 10px #c5a880, 0 0 30px #a855f7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
