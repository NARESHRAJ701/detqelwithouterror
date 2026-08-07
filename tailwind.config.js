/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#F9F8F6',
          paper: '#F4F3EF',
          dark: '#0E0E11',
          'dark-paper': '#16161C'
        },
        ink: {
          DEFAULT: '#0E0E11',
          muted: '#5A5A66',
          light: '#8E8E9A',
        },
        accent: {
          acid: '#7939a1',
          'acid-green': '#00E676',
          blue: '#2563EB',
          coral: '#FF5533',
          purple: '#8B5CF6',
          pink: '#EC4899',
          amber: '#F59E0B'
        },
        sticky: {
          yellow: '#FFF066',
          pink: '#FFC2E2',
          mint: '#B2F5EA',
          lavender: '#E2D5FF',
          orange: '#FFD1A9'
        }
      },
      fontFamily: {
        pixel: ['"Pixelify Sans"', '"Press Start 2P"', 'monospace'],
        sans: ['"Space Grotesk"', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        'brutalist': '4px 4px 0px 0px #0E0E11',
        'brutalist-lg': '8px 8px 0px 0px #0E0E11',
        'brutalist-sm': '2px 2px 0px 0px #0E0E11',
        'paper': '0 10px 30px -10px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        'sticky': '2px 8px 20px rgba(0,0,0,0.08)'
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      }
    },
  },
  plugins: [],
}
