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
        // Obsidian Forge Palette
        obsidian: {
          bg:        '#0B0D10',   // Primary Background: Obsidian Black
          secondary: '#15191F',   // Secondary Background: Graphite
          card:      '#1C222A',   // Card / Surface: Dark Steel
          subcard:   '#101419',   // Sidebar / Sub-surface
          border:    '#29313A',   // Borders
          hover:     '#232B35',
        },
        copper: {
          DEFAULT:   '#FF7A3D',   // Primary Accent: Electric Copper
          hover:     '#F5B942',   // Secondary Accent: Molten Gold
          400:       '#FF9461',
          500:       '#FF7A3D',
          600:       '#E65D1F',
        },
        gold: {
          DEFAULT:   '#F5B942',   // Molten Gold
          400:       '#FCD36A',
          500:       '#F5B942',
          600:       '#D99414',
        },
        titanium: {
          DEFAULT:   '#C8D0D9',   // Titanium Silver
          light:     '#F4F7FA',   // Ice White (Main Text)
          body:      '#AAB4BF',   // Body Text
          muted:     '#8D98A5',   // Steel Gray (Muted Text)
        },
        forge: {
          green:     '#36D399',   // Forge Green
          red:       '#FF4D4D',   // Ember Red
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'copper-gold': 'linear-gradient(135deg, #FF7A3D 0%, #F5B942 100%)',
        'forge-glow':  'radial-gradient(ellipse at 50% 0%, rgba(255,122,61,0.15) 0%, transparent 70%)',
        'gold-glow':   'radial-gradient(ellipse at 50% 100%, rgba(245,185,66,0.12) 0%, transparent 70%)',
      },
      boxShadow: {
        'copper-glow': '0 0 25px -5px rgba(255, 122, 61, 0.4)',
        'gold-glow':   '0 0 25px -5px rgba(245, 185, 66, 0.35)',
        'forge-card':  '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'fade-in':         'fadeIn 0.35s ease-out forwards',
        'slide-up':        'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-copper':    'pulseCopper 2s ease-in-out infinite',
        'float':           'float 3s ease-in-out infinite',
        'shimmer':         'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseCopper: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,122,61, 0.4)' },
          '50%':      { boxShadow: '0 0 20px 4px rgba(255,122,61, 0.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-4px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        }
      },
    },
  },
  plugins: [],
}
