import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        classic: {
          DEFAULT: "hsl(var(--primary))", // Keep default for ShadCN components
          foreground: "hsl(var(--primary-foreground))", // Keep default for ShadCN components
          primary: "#1a365d",    // Deep navy blue
          secondary: "#2b4c7e",  // Medium blue
          accent: "#4299e1",     // Bright blue
          muted: "#e2e8f0",      // Light gray-blue
          background: "#ffffff",
          text: "#1a202c",
          border: "#e2e8f0",
          focus: "#63b3ed",      // Light blue for focus states
          hover: "#2c5282",      // Darker blue for hover states
        },
        // Warm Neutrals with Pop
        warm: {
          primary: "#e2725b", // Coral
          secondary: "#30b8b2", // Teal
          accent: "#f6ad55", // Orange
          muted: "#f0e9d2", // Soft beige
          background: "#f7f7f7", // Light gray
          text: "#2d3748", // Dark gray for text
          border: "#d3d3d3", // Medium gray border
          focus: "#f6ad55", // Orange for focus states
          hover: "#c45c4a", // Darker coral for hover
        },
        mono: {
          primary: "#38a169", // Medium green
          secondary: "#68d391", // Light green
          accent: "#276749", // Dark green
          muted: "#c6f6d5", // Very light green
          background: "#f0fff4", // Very light green
          text: "#1a202c", // Dark gray for text
          border: "#9ae6b4", // Light green border
          focus: "#48bb78", // Green for focus
          hover: "#2f855a", // Darker green for hover
        },
        complementary: {
          primary: "#3182ce", // Blue
          secondary: "#63b3ed", // Light blue
          accent: "#ed8936", // Orange
          muted: "#bee3f8", // Very light blue
          background: "#ebf8ff", // Very light blue
          text: "#2d3748", // Dark gray for text
          border: "#90cdf4", // Light blue border
          focus: "#f6ad55", // Orange for focus
          hover: "#2c5282", // Darker blue for hover
        },
        // ... existing ShadCN colors ...
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-subtle": "pulse 2s infinite ease-in-out",
        "shimmer": "shimmer 2s infinite",
        "slide-in-right": "slideInRight 0.5s forwards",
        "slide-in-left": "slideInLeft 0.5s forwards",
        "bounce-subtle": "bounce 2s infinite ease-in-out",
        "fadeIn": "fadeIn 0.5s ease-out forwards",
        "gradient-shift": "gradientShift 15s ease infinite",
      },
      backgroundImage: {
        'classic-gradient': 'linear-gradient(to right, #1a365d, #2b4c7e)',
        'warm-gradient': 'linear-gradient(to right, #e2725b, #30b8b2)',
        'mono-gradient': 'linear-gradient(to right, #38a169, #68d391)',
        'complementary-gradient': 'linear-gradient(to right, #3182ce, #ed8936)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config