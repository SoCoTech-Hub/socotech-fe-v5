import Document, { Html, Head, Main, NextScript } from 'next/document'
import SplashScreen from '@/components/SplashScreen'
import FaviconList from '@/snippets/faviconList'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta charSet='utf-8' />
					<meta
						httpEquiv='X-UA-Compatible'
						content='IE=edge'
					/>
					<link
						href={`/manifest.json`}
						rel='manifest'
					/>
					{FaviconList.map((x) => (
						<link
							href={x.src}
							rel='icon'
							type='image/png'
							sizes={x.sizes}
						/>
					))}
					<meta
						name='theme-color'
						content='#000'
					/>
					<script
						id='gtm-script'
						dangerouslySetInnerHTML={{
							__html: `(function (w, d, s, l, i) {
								w[l] = w[l] || []
								w[l].push({
									'gtm.start': new Date().getTime(),
									event: 'gtm.js'
								})
								var f = d.getElementsByTagName(s)[0],
									j = d.createElement(s),
									dl = l != 'dataLayer' ? '&l=' + l : ''
								j.async = true
								j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
								f.parentNode.insertBefore(j, f)
							})(window, document, 'script', 'dataLayer', '${process.env.NEXT_PUBLIC_GTAG_ID}')`
						}}
					/>
				</Head>
				<body className='bg-appBg'>
					<noscript>
						<iframe
							src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTAG_ID}`}
							height='0'
							width='0'
							style={{
								display: 'none',
								visibility: 'hidden'
							}}
						></iframe>
					</noscript>
					<SplashScreen />
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
