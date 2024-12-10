const withPWA = require('@imbios/next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA({
	images: {
		domains: [
			process.env.NEXT_PUBLIC_DOMAIN,
			'youtube.com',
			'www.youtube.com',
			'youtu.be',
			'www.youtu.be',
			'i.ytimg.com',
			'y2u.be',
			'www.vimeo.com',
			'vimeo.com'
		]
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
						value: `default-src 'self' api.payfast.co.za youtube.com www.youtube.com youtu.be www.youtu.be i.ytimg.com y2u.be www.vimeo.com vimeo.com ${process.env.NEXT_PUBLIC_DOMAIN} ${process.env.NEXT_PUBLIC_MAIN_URL} ${process.env.NEXT_PUBLIC_BUCKET} 'unsafe-inline'; connect-src *; img-src data: *; script-src-elem * 'unsafe-inline'; worker-src *;frame-src *`
					}
				]
			}
		]
	}
})
