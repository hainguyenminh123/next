import type {Config} from "tailwindcss";

export default {
	darkMode: ["class"],
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1280px",
			},
		},
		extend: {
			fontSize: {
				base: "2rem",
			},
			fontFamily: {
				sans: ['var(--font-readex-pro)', 'system-ui', 'sans-serif'],
				heading: ['var(--font-readex-pro)', 'Georgia', 'serif']
			},
			colors: {
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
				forest: {
					DEFAULT: "hsl(var(--forest))",
					light: "hsl(var(--forest-light))",
				},
				"premium-red": {
					DEFAULT: "hsl(var(--premium-red))",
					light: "hsl(var(--premium-red-light))",
				},
				"festive-gold": {
					DEFAULT: "hsl(var(--festive-gold))",
					light: "hsl(var(--festive-gold-light))",
				},
				beige: "hsl(var(--beige))",
				cream: "hsl(var(--cream))",
				earth: {
					DEFAULT: "hsl(var(--earth))",
					light: "hsl(var(--earth-light))",
				},
				charcoal: "hsl(var(--charcoal))",
				linen: "hsl(var(--linen))",
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
				xl: "1rem",
				"2xl": "1.25rem",
				"3xl": "1.5rem",
			},
			boxShadow: {
				soft: "0 2px 8px -2px hsl(30 20% 20% / 0.08)",
				medium: "0 4px 16px -4px hsl(30 20% 20% / 0.12)",
				lift: "0 8px 24px -8px hsl(30 20% 20% / 0.15)",
			},
			keyframes: {
				"accordion-down": {
					from: {height: "0"},
					to: {height: "var(--radix-accordion-content-height)"},
				},
				"accordion-up": {
					from: {height: "var(--radix-accordion-content-height)"},
					to: {height: "0"},
				},
				"fade-in": {
					from: {opacity: "0"},
					to: {opacity: "1"},
				},
				"slide-up": {
					from: {opacity: "0", transform: "translateY(20px)"},
					to: {opacity: "1", transform: "translateY(0)"},
				},
				"slide-down": {
					from: {opacity: "0", transform: "translateY(-10px)"},
					to: {opacity: "1", transform: "translateY(0)"},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out forwards",
				"slide-up": "slide-up 0.6s ease-out forwards",
				"slide-down": "slide-down 0.3s ease-out forwards",
			},
			spacing: {
				"18": "4.5rem",
				"22": "5.5rem",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
