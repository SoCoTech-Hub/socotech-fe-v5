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
			body: ['Helvetica', 'Open Sans']
		},
		fill: (theme) => ({
			themeColorMain: theme('colors.themeColorMain'),
			themeColorSecondary: theme('colors.themeColorSecondary'),
			textColor: theme('colors.textColor'),
			textColorSecondary: theme('colors.textColorSecondary')
		}),
		stroke: (theme) => ({
			themeColorMain: theme('colors.themeColorMain'),
			themeColorSecondary: theme('colors.themeColorSecondary'),
			textColor: theme('colors.textColor'), 
			textColorSecondary: theme('colors.textColorSecondary') 
		}),
		extend: {
			colors: {
				themeColorMain: '#81cc71',
				themeColorSecondary: '#206969',
				mainColor404: '#495B7A',
				menuBlog: '#089DB0',
				appBg: '#FAFBFD',
				appBgDark: '#1c2234',
				compBg: '#FFFFFF',
				compBgDark: '#2b3143',
				auth: '#D9DADD',
				textColor: '#000000',
				textColorSecondary: '#fff',
				login: '#F8D833',
				registerA: '#F8D833',
				registerC: '#F4CED1',
				registerE: '#6097E9',
				textHeading: '#000000'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
}
