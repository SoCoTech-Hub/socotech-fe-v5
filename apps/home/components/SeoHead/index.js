import Head from 'next/head'

const SeoHead = () => {
	return (
		<Head>
			<meta charSet='utf-8' />
			<meta
				httpEquiv='X-UA-Compatible'
				content='IE=edge'
			/>

			<link
				href='/auth/manifest.json'
				rel='manifest'
			/>
			<link
				href='/auth/icon-192x192.png'
				rel='icon'
				type='image/png'
				sizes='192x192'
			/>
			<link
				href='/auth/icon-512x512.png'
				rel='icon'
				type='image/png'
				sizes='512x512'
			/>
			<link
				href='/auth/icon-192x192.png'
				rel='apple-touch-icon'
			/>
			<meta
				name='theme-color'
				content='#000'
			/>
		</Head>
	)
}
export default SeoHead
