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
		boxShadow: {
			menu: '0px 0px 5px 0px rgba(0,0,0,0.03)',
			md: '0 6px 6px 0px rgba(0, 0, 0, 0.1)'
		},
		fontFamily: {
			display: ['Helvetica'],
			body: ['Helvetica', 'Open Sans']
		},
		fontSize: {
			xxs: '.5rem',
			xs: '.75rem',
			sm: '.875rem',
			tiny: '.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '4rem',
			'7xl': '5rem'
		},
		extend: {
			colors: {
				themeColorMain: '#D6F379',
				themeColorSecondary: '#E5E5E5',
				menuDashboard: '#1F6AF6',
				menuProfile: '#5F40B0',
				menuLessons: '#F29848',
				menuNotes: '#63D480',
				menuKB: '#EC394A',
				menuBlog: '#089DB0',
				menuLiveLesson: 'rgba(255, 0, 0, 0.25)',
				lessonList: 'rgba(255, 172, 49, 0.25)',
				lessonListIconColor: '#1f6af6',
				indepthColor: '#1f6af6',
				lessonFontColor: '#20325e',
				borderRating: '#6255D0',
				totalHours: 'rgba(31, 106, 246, 0.5)',
				totalHoursIcon: 'rgba(31, 106, 246, 1)',
				completedLessons: 'rgba(95, 64, 176, 0.5)',
				completedLessonsIcon: 'rgba(95, 64, 176, 1)',
				lessonsInProgress: 'rgba(99, 212, 128, 0.5)',
				lessonsInProgressIcon: 'rgba(99, 212, 128, 1)',
				avgQuiz: 'rgba(242, 152, 72, 0.5)',
				avgQuizIcon: 'rgba(242, 152, 72, 1)',
				digilibWelcome: '#FADA33',
				digilibWelcomeFont: '#22273B',
				digilibWelcomeButton: '#1F6AF6',
				digilibSeen: '#63D480',
				digilibUnseen: '#FF0000',
				mainColor404: '#495B7A',
				menuInmail: '#FCEE21',
				auth: '#D9DADD',
				menuApplications: '#00A99D',
				menuBursary: '#add844',
				textColor: '#fff',
				textColorSecondary: '#000000',
				appBg: '#121212',
				compBg: '#181818',
				pastExams: '#E17B9C',
				eResources: '#D2EF79',
				gettingStarted: '#508CE8',
				navbarBg: '#000000'
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
				},
				'animate-spin': {
					'0, 360': {
						transform: 'rotate(0deg)'
					},
					360: {
						transform: 'rotate(360deg)'
					}
				},
				'animate-ping': {
					'75%, 100%': {
						transform: 'translateX(1)',
						opacity: '0'
					}
				},
				'animate-pulse': {
					'0%, 100%': {
						opacity: '1S'
					},
					'50%': {
						opacity: '0.5'
					}
				},
				'animate-bounce': {
					'0%, 100%': {
						transform: 'translateY(-25%)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
					},
					'50%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
					}
				},
				animation: {
					'fade-in-down': 'fade-in-down 2s ease-out infinite',
					'fade-in-down-l': 'fade-in-down 2s ease-out infinite',
					'animate-spin': 'spin 1s linear infinite',
					'animate-ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) 2',
					'animate-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) o',
					'animate-bounce': 'bounce 1s infinite'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [require('@tailwindcss/line-clamp')]
}
