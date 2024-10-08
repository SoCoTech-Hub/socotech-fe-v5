module.exports = {
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./layouts/*.{js,ts,jsx,tsx}'
	],
	darkMode: false, // or 'media' or 'class'

	theme: {
		screens: {
			mobile: { min: '1px', max: '1067px' },
			laptop: { min: '1068px', max: '1440px' },
			desktop: { min: '1441px' }
		},
		fontFamily: {
			sans: ['Helvetica', 'ui-sans-serif', 'system-ui'],
			serif: ['Helvetica', 'ui-serif', 'Georgia'],
			mono: ['Helvetica', 'ui-monospace', 'SFMono-Regular'],
			display: ['Helvetica'],
			body: ['Helvetica', 'Open Sans'],
			raleway: ['Raleway']
		},
		fontSize: {
			'3xs': ['0.6rem', { lineHeight: '1' }],
			'2xs': ['0.7rem', { lineHeight: '1' }],
			xs: ['0.75rem', { lineHeight: '1rem' }],
			sm: ['0.825rem', { lineHeight: '1.25rem' }],
			base: ['1rem', { lineHeight: '1.5rem' }],
			lg: ['1.125rem', { lineHeight: '1.75rem' }],
			xl: ['1.25rem', { lineHeight: '1.75rem' }],
			'2xl': ['1.5rem', { lineHeight: '2rem' }],
			'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
			'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
			'5xl': ['3rem', { lineHeight: '1' }],
			'6xl': ['3.75rem', { lineHeight: '1' }],
			'7xl': ['4.5rem', { lineHeight: '1' }],
			'8xl': ['6rem', { lineHeight: '1' }],
			'9xl': ['8rem', { lineHeight: '1' }]
		},
		extend: {
			colors: {
				themeColorMain: '#D6F379',
				themeColorSecondary: '#E5E5E5',
				mainColor404: '#495B7A',
				fieldIconColor: '#628CD2',
				auth: '#D9DADD',
				reportBg: '#E4E8E8',
				reportCard: '#62213B',
				textColor: '#fff',
				textColorSecondary: '#000000',
				appBg: '#121212',
				compBg: '#181818'
			},
			keyframes: {
				'fade-in-down': {
					'0%, 100%': {
						opacity: '0S',
						transform: 'translateX(6px)'
					},
					'50%': {
						opacity: '1',
						transform: 'translateX(0px)'
					}
				}
			},
			animation: {
				'fade-in-down': 'fade-in-down 2s ease-out infinite'
			}
		}
	},
	variants: {
		extend: {
			backgroundColor: ['hover', 'focus', 'active', 'visited'],
			textColor: ['hover', 'focus', 'active', 'visited']
		}
	},
	plugins: []
}
