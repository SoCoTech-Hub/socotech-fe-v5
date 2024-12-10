const withPWA = require('@imbios/next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA({
	reactStrictMode: true,
	images: {
		domains: [process.env.NEXT_PUBLIC_DOMAIN]
	},
	basePath: process.env.NEXT_PUBLIC_BASE_URL,
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
						value: `default-src 'self' ${process.env.NEXT_PUBLIC_DOMAIN} ${process.env.NEXT_PUBLIC_MAIN_URL} youtube.com youtu.be www.youtube.com https://api.mailgun.net 'unsafe-inline'; connect-src *; img-src data: *; script-src-elem * 'unsafe-inline'; worker-src *;frame-src *;font-src * data: blob:`
					}
				]
			}
		]
	}
})
