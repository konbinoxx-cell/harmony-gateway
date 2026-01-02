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
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        harmony: {
          blue: '#3b82f6',     // 主旋律
          green: '#10b981',    // 三度和声
          amber: '#f59e0b',    // 五度和声
          purple: '#8b5cf6',   // 七度和声
          pink: '#ec4899'      // 特殊效果
        },
        studio: {
          dark: '#0f172a',
          panel: '#1e293b',
          accent: '#334155',
          light: '#64748b'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 10px #3b82f6' },
          'to': { boxShadow: '0 0 20px #8b5cf6, 0 0 30px #ec4899' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)' },
          '50%': { transform: 'translateY(-20px) scaleY(1.2)' }
        }
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'studio-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        'knob-gradient': 'linear-gradient(145deg, #2d3748, #1a202c)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}