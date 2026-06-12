import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
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
        heading: ['Outfit', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        "border-strong": "hsl(var(--border-strong))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        ink: {
          DEFAULT: "hsl(var(--ink))",
          2: "hsl(var(--ink-2))",
        },
        "off-white": "hsl(var(--off-white))",
        "warm-gray": "hsl(var(--warm-gray))",
        "text-dark": "hsl(var(--text-dark))",
        "text-mid": "hsl(var(--text-mid))",
        "text-light": "hsl(var(--text-light))",
        "green-status": "hsl(var(--green))",
        "green-bg": "hsl(var(--green-bg))",
        "red-bg": "hsl(var(--red-bg))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-in": { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-in-up": { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "scale-in": { "0%": { opacity: "0", transform: "scale(0.96)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        "slide-in-right": { "0%": { opacity: "0", transform: "translateX(20px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        "slide-in-left": { "0%": { opacity: "0", transform: "translateX(-20px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        "marquee": { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "gradient-shift": { "0%, 100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
        "blob": { "0%, 100%": { transform: "translate(0,0) scale(1)" }, "33%": { transform: "translate(20px,-30px) scale(1.05)" }, "66%": { transform: "translate(-15px,15px) scale(0.97)" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "glow": { "0%, 100%": { opacity: "0.4" }, "50%": { opacity: "0.9" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out both",
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "scale-in": "scale-in 0.5s ease-out both",
        "slide-in-right": "slide-in-right 0.6s ease-out both",
        "slide-in-left": "slide-in-left 0.6s ease-out both",
        "marquee": "marquee 30s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "blob": "blob 14s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        "glow": "glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
