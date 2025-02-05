import type { Config } from 'tailwindcss'

const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
	theme: {
		fontFamily: {
			inter: ['Inter', 'sans-serif'],
			roboto: ['Roboto', 'sans-serif'],
			nunito: ['Nunito', 'sans-serif'],
		},
		colors: {
			transparent: 'transparent',
			white: '#ffffff',
			black: '#000000',
			main: '#09090b',        // zinc-950
			secondary: '#18181b',   // zinc-900
			accent: '#27272a',      // zinc-800
			cove: '#71717a',        // zinc-500
			zinc: {
				50: '#fafafa',
				100: '#f4f4f5',
				200: '#e4e4e7',
				300: '#d4d4d8',
				400: '#a1a1aa',
				500: '#71717a',
				600: '#52525b',
				700: '#3f3f46',
				800: '#27272a',
				900: '#18181b',
				950: '#09090b',
			},
			blue: {
				dark: '#09090b',      // Zinc-950
				100: '#fafafa',       // Zinc-50
				200: '#e4e4e7',       // Zinc-200
				300: '#ffffff',       // Pure white
				400: '#a1a1aa',       // Zinc-400
			},
			red: {
				100: '#fee2e2',
				400: '#f87171',
				800: '#991b1b',
			},
			green: {
				100: '#dcfce7',
				800: '#166534',
			},
		},
		extend: {
			 keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
      },
		},
	},
  darkMode: "class",
 plugins: [require('@tailwindcss/forms')({ strategy: 'class' })],
} satisfies Config

export default config
