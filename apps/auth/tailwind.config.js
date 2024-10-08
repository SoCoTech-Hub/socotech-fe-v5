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
			display: ['Helvetica'],
			body: ['Helvetica', 'Open Sans']
		},
		extend: {
			colors: {
				themeColorMain: '#D6F379',
				themeColorSecondary: '#E5E5E5',
				mainColor404: '#495B7A',
				auth: '#D9DADD',
				textColor: '#fff',
				textColorSecondary: '#000000',
				appBg: '#121212',
				compBg: '#181818',
				login: '#F8D833',
				registerA: '#F8D833',
				registerC: '#F4CED1',
				registerE: '#6097E9',
				textHeading: '#ccc'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
}
