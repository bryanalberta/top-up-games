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
        sans: ['var(--font-jakarta)', 'var(--font-inter)', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      colors: {
        brand: {
          50: '#e0fbfc',
          100: '#c2f7fa',
          200: '#91eff5',
          300: '#54e1ed',
          400: '#1fc8da',
          500: '#00f2fe', // Electric Neon Cyan
          600: '#06b6d4',
          700: '#0891b2',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        dark: {
          bg: '#050505', // Deep Obsidian Black
          card: '#0a0a0c', // Slightly lighter for cards
          border: 'rgba(255, 255, 255, 0.08)',
        },
        theme: {
          text: '#ffffff',
          muted: '#a1a1aa',
        },
        accent: {
          gold: '#fbbf24',
          neonBlue: '#00f2fe',
          purple: '#ff007f', // Hot Magenta
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'mesh-pattern': 'radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%)',
      },
      animation: {
        'glow': 'glow 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00f2fe, 0 0 10px #00f2fe' },
          '100%': { boxShadow: '0 0 10px #00f2fe, 0 0 30px #ff007f' },
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
