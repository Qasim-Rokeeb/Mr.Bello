import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        body: ['Inter', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
        'shimmer': {
            '0%, 100%': {
              'background-position': '-200% 0',
            },
            '50%': {
              'background-position': '200% 0',
            },
          },
        'bouncy-dot': {
          '0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
        'bounce-subtle': {
            '0%, 100%': {
              transform: 'translateY(0)',
              animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
            },
            '50%': {
              transform: 'translateY(-15%)',
              animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
            },
          },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        'toast-enter': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '25%': { transform: 'scale(1.1)', opacity: '0.5' },
          '50%': { transform: 'scale(0.95)', opacity: '0.8' },
          '75%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'toast-leave': {
            '0%': { opacity: '1', transform: 'scale(1)' },
            '100%': { opacity: '0', transform: 'scale(0.9)' },
        },
        'fire-pulse': {
            '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
            '50%': { transform: 'scale(1.2)', opacity: '1' },
        },
        'fire-flicker': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.6' },
        },
        'check-draw-circle': {
          'from': { 'stroke-dashoffset': '31.4' },
          'to': { 'stroke-dashoffset': '0' },
        },
        'check-draw-path': {
          '0%': { 'stroke-dashoffset': '9' },
          '50%': { 'stroke-dashoffset': '9' },
          '100%': { 'stroke-dashoffset': '0' },
        },
        'ripple': {
            'to': {
              transform: 'scale(4)',
              opacity: '0',
            },
          },
        'holographic-sheen': {
          '0%': { transform: 'translateX(-100%) rotate(20deg)' },
          '100%': { transform: 'translateX(200%) rotate(20deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '10%': { transform: 'scale(1.2)' },
          '20%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.2)' },
          '40%': { transform: 'scale(1)' },
        },
        float: {
            '0%': { transform: 'translateY(0px)', opacity: '0.7' },
            '50%': { transform: 'translateY(-20px)', opacity: '1' },
            '100%': { transform: 'translateY(0px)', opacity: '0.7' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'accordion-up': 'accordion-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'bouncy-dot': 'bouncy-dot 1s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 1.5s ease-in-out infinite',
        marquee: "marquee var(--duration) linear infinite",
        'toast-enter': 'toast-enter 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        'toast-leave': 'toast-leave 0.3s ease-in-out',
        'fire-pulse': 'fire-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fire-flicker': 'fire-flicker 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'check-draw-circle': 'check-draw-circle 0.5s ease-in-out forwards',
        'check-draw-path': 'check-draw-path 0.5s ease-in-out forwards',
        'ripple': 'ripple 0.6s linear',
        'holographic-sheen': 'holographic-sheen 3s infinite linear',
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
        float: 'float linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
