import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F1A", // Vercel/Linear dark
        foreground: "#EDEDED",
        surface: "rgba(255,255,255,0.03)",
        surfaceHover: "rgba(255,255,255,0.06)",
        borderLight: "rgba(255,255,255,0.1)",
        glass: {
          light: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.08)",
        },
        primary: {
          DEFAULT: "#6366f1", // Indigo 500
          dark: "#4f46e5", // Indigo 600
        },
        accent: {
          DEFAULT: "#a855f7", // Purple 500
          dark: "#9333ea", // Purple 600
        },
        brandContext: "#06B6D4", // Cyan
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-luxury": "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
        "gradient-brand": "linear-gradient(to right, #6366F1, #8B5CF6, #06B6D4)",
      },
      boxShadow: {
        'glow-primary': '0 0 40px rgba(99, 102, 241, 0.35)',
        'glow-accent': '0 0 40px rgba(168, 85, 247, 0.35)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glow-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-x": "gradient-x 15s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        }
      }
    },
  },
  plugins: [],
};
export default config;
