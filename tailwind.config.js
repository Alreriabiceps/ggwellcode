/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Apple-inspired color system
      colors: {
        // Core Apple grays (primary system)
        gray: {
          50: '#fafafa',
          100: '#f5f5f7', // Apple's lightest gray
          150: '#f2f2f7', // Apple's system background
          200: '#e8e8ed',
          300: '#d2d2d7',
          400: '#aeaeb2',
          500: '#8e8e93',
          600: '#636366',
          700: '#48484a',
          800: '#3a3a3c',
          900: '#1d1d1f', // Apple's darkest
        },
        
        // Apple blue (for primary actions)
        blue: {
          50: '#f0f8ff',
          100: '#e6f3ff',
          200: '#bde3ff',
          300: '#80ccff',
          400: '#40b3ff',
          500: '#007aff', // Apple's system blue
          600: '#0056cc',
          700: '#003d99',
          800: '#002966',
          900: '#001533',
        },
        
        // Apple green (for success states)
        green: {
          50: '#f0fff4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#34c759', // Apple's system green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        
        // Apple red (for destructive actions)
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ff3b30', // Apple's system red
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        
        // Apple orange (for warnings)
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ff9500', // Apple's system orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        
        // Apple purple (for premium features)
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#af52de', // Apple's system purple
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
      },
      
      // Apple-inspired typography
      fontFamily: {
        'system': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'display': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      
      // Apple's spacing system (based on 4px grid)
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '34': '8.5rem',   // 136px
        '38': '9.5rem',   // 152px
        '42': '10.5rem',  // 168px
        '46': '11.5rem',  // 184px
        '50': '12.5rem',  // 200px
        '54': '13.5rem',  // 216px
        '58': '14.5rem',  // 232px
        '62': '15.5rem',  // 248px
        '66': '16.5rem',  // 264px
        '70': '17.5rem',  // 280px
        '80': '20rem',    // 320px
        '96': '24rem',    // 384px
        '112': '28rem',   // 448px
        '128': '32rem',   // 512px
      },
      
      // Apple's typography scale
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.05em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.05em' }],
        '5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.05em' }],
        '6xl': ['3.75rem', { lineHeight: '4rem', letterSpacing: '-0.075em' }],
        '7xl': ['4.5rem', { lineHeight: '5rem', letterSpacing: '-0.075em' }],
        '8xl': ['6rem', { lineHeight: '6.5rem', letterSpacing: '-0.1em' }],
        '9xl': ['8rem', { lineHeight: '8.5rem', letterSpacing: '-0.1em' }],
      },
      
      // Apple's shadow system
      boxShadow: {
        'apple-sm': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'apple': '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)',
        'apple-md': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'apple-lg': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
        'apple-xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
        'apple-inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      
      // Apple's border radius
      borderRadius: {
        'apple-sm': '6px',
        'apple': '8px',
        'apple-md': '12px',
        'apple-lg': '16px',
        'apple-xl': '20px',
        'apple-2xl': '24px',
        'apple-3xl': '32px',
      },
      
      // Apple's animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'apple-bounce': 'appleBounce 0.6s ease-out',
        'gentle-float': 'gentleFloat 3s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        appleBounce: {
          '0%': { transform: 'translateY(-4px)' },
          '50%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-4px)' },
        },
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      
      // Apple's backdrop blur
      backdropBlur: {
        'apple': '20px',
        'apple-md': '12px',
        'apple-lg': '32px',
      },
    },
  },
  plugins: [],
} 