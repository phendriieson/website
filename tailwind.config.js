/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dossier: {
          bg: '#121417',
          surface: '#1B1E23',
          surface2: '#22262C',
          border: '#2C3038',
          text: '#E7E5DC',
          dim: '#93968E',
          accent: '#8A9160',
          accentDim: '#565C3B',
          accentBright: '#B7C17E',
          danger: '#7A2E2E',
          gold: '#B08D3E',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest2: '.2em',
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
}
