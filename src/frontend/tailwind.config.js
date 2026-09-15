/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#f8fafc',    // Main page background
          subtle: '#f1f5f9',     // Section dividers & alternating stripes
          muted: '#e2e8f0',      // Faint backgrounds
        },
        surface: {
          DEFAULT: '#ffffff',    // Card / Panel white
          hover: '#f8fafc',      // Table row hover
          active: '#f1f5f9',     // Active row
          border: '#e2e8f0',     // Hairline border (slate-200)
          'border-strong': '#cbd5e1', // Stronger divider border (slate-300)
        },
        brand: {
          primary: '#0284c7',    // Refined maritime blue
          'primary-hover': '#0369a1',
          accent: '#2563eb',     // Action blue
          dark: '#0f172a',       // Deep ink
        },
        content: {
          primary: '#0f172a',    // Deep slate 900
          secondary: '#334155',  // Slate 700
          muted: '#64748b',      // Slate 500
          faint: '#94a3b8',      // Slate 400
        },
        risk: {
          low: {
            bg: '#ecfdf5',
            text: '#047857',
            border: '#a7f3d0',
            dot: '#10b981',
          },
          medium: {
            bg: '#fffbeb',
            text: '#b45309',
            border: '#fde68a',
            dot: '#f59e0b',
          },
          high: {
            bg: '#fff1f2',
            text: '#be123c',
            border: '#fecdd3',
            dot: '#f43f5e',
          },
          critical: {
            bg: '#fef2f2',
            text: '#b91c1c',
            border: '#fca5a5',
            dot: '#ef4444',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'dropdown': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'pill': '9999px',
      }
    },
  },
  plugins: [],
}
