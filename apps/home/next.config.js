const withPWA = require('@imbios/next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === 'development'
})
// const { BLOG_URL } = process.env
module.exports = withPWA({
	rewrites() {
		return [
			{
				source: '/auth',
				destination: `${process.env.NEXT_PUBLIC_AUTH_URL}`
			},
			{
				source: '/auth/:path*',
				destination: `${process.env.NEXT_PUBLIC_AUTH_URL}/:path*`
			},
			{
				source: '/blog',
				destination: `${process.env.NEXT_PUBLIC_BLOG_URL}`
			},
			{
				source: '/blog/:path*',
				destination: `${process.env.NEXT_PUBLIC_BLOG_URL}/:path*`
			},
			{
				source: '/digilib',
				destination: `${process.env.NEXT_PUBLIC_DIGILIB_URL}`
			},
			{
				source: '/digilib/:path*',
				destination: `${process.env.NEXT_PUBLIC_DIGILIB_URL}/:path*`
			},
			{
				source: '/forum',
				destination: `${process.env.NEXT_PUBLIC_FORUM_URL}`
			},
			{
				source: '/forum/:path*',
				destination: `${process.env.NEXT_PUBLIC_FORUM_URL}/:path*`
			},
			{
				source: '/lms',
				destination: `${process.env.NEXT_PUBLIC_LMS_URL}`
			},
			{
				source: '/lms/:path*',
				destination: `${process.env.NEXT_PUBLIC_LMS_URL}/:path*`
			},
			{
				source: '/support',
				destination: `${process.env.NEXT_PUBLIC_SUPPORT_URL}`
			},
			{
				source: '/support/:path*',
				destination: `${process.env.NEXT_PUBLIC_SUPPORT_URL}/:path*`
			},
			{
				source: '/user',
				destination: `${process.env.NEXT_PUBLIC_USER_URL}`
			},
			{
				source: '/user/:path*',
				destination: `${process.env.NEXT_PUBLIC_USER_URL}/:path*`
			}
		]
	},
	images: {
		domains: [`${process.env.NEXT_PUBLIC_DOMAIN}`]
	},

	basePath: '',
	async redirects() {
		return [
			{
				source: '/',
				destination: '/auth/welcome',
				permanent: true
			}
		]
	},

	async headers() {
		return [
			{
				// matching all API routes
				source: '/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
					},
					{
						key: 'Access-Control-Allow-Headers',
						value:
							'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
					},
					{
						key: 'Content-Security-Policy',
						value: `default-src * 'unsafe-inline'; style-src-elem * 'unsafe-inline'; font-src * 'unsafe-inline'; connect-src * 'unsafe-inline'; img-src * 'unsafe-inline'; script-src-elem * 'unsafe-inline'; worker-src * 'unsafe-inline'`
					}
				]
			}
		]
	}
})
