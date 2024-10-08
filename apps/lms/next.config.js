const withPWA = require('@imbios/next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA({
	reactStrictMode: true,
	images: {
		domains: [process.env.NEXT_PUBLIC_DOMAIN, 'res.cloudinary.com']
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
						// value: `default-src 'self' ${process.env.NEXT_PUBLIC_DOMAIN} ${process.env.NEXT_PUBLIC_MAIN_URL} ${process.env.NEXT_PUBLIC_BUCKET} ${process.env.NEXT_PUBLIC_PDF_URL}  vimeo.com player.vimeo.com 'unsafe-inline'; connect-src *; img-src *;script-src-elem * 'unsafe-inline'; script-src ${process.env.NEXT_PUBLIC_PDF_URL} ${process.env.NEXT_PUBLIC_DOMAIN}; worker-src *; child-src blob: ${process.env.NEXT_PUBLIC_DOMAIN} ${process.env.NEXT_PUBLIC_MAIN_URL} vimeo.com player.vimeo.com; font-src data: * cdnjs.cloudflare.com; object-src data:`,
						value: `default-src 'self' ${process.env.NEXT_PUBLIC_DOMAIN} ${process.env.NEXT_PUBLIC_MAIN_URL} ${process.env.NEXT_PUBLIC_BUCKET} ${process.env.NEXT_PUBLIC_PDF_URL}  ${process.env.NEXT_PUBLIC_CLOUDFRONT} vimeo.com player.vimeo.com 'unsafe-inline'; connect-src *; img-src *;script-src-elem * 'unsafe-inline'; script-src ${process.env.NEXT_PUBLIC_PDF_URL} ${process.env.NEXT_PUBLIC_DOMAIN}; worker-src * blob:; child-src blob: ${process.env.NEXT_PUBLIC_DOMAIN} ${process.env.NEXT_PUBLIC_MAIN_URL} ${process.env.NEXT_PUBLIC_CLOUDFRONT} vimeo.com player.vimeo.com youtube.com; font-src data: * cdnjs.cloudflare.com; object-src data:;  media-src *  blob:`
						// {
						//   key: "Content-Security-Policy",
						//   //value: `default-src 'self' ${process.env.NEXT_PUBLIC_DOMAIN} ${process.env.NEXT_PUBLIC_DOMAIN2}`,
						//   // value: `default-src 'self'; img-src * 'self' data: https:; style-src 'unsafe-inline'; manifest-src 'self'; connect-src * 'self' data: https:; script-src-elem * 'self' data: https:; worker-src * 'self' data: blob:;`,
						//   // value: `default-src 'self'; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; connect-src * data: blob: 'unsafe-inline'; img-src * 'self' data: https:; style-src 'unsafe-inline';font-src 'self' data:;manifest-src 'self';`,
						//   value: `default-src * data: https: blob: filesystem: about: ws: wss: 'unsafe-inline' 'unsafe-eval'; script-src * data: blob: 'unsafe-inline' 'unsafe-eval'; connect-src * data: https: blob: 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src * data: blob: ;  style-src * data: blob: 'unsafe-inline'; font-src * data: blob: 'unsafe-inline'; frame-ancestors * data: blob:;`,
						// },
					}
				]
			}
		]
	},
	basePath: process.env.NEXT_PUBLIC_BASE_URL
})
