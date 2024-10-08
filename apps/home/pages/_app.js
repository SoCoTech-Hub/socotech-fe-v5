import { useEffect } from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'
import 'tailwindcss/tailwind.css'
import '@/styles/themify-icons/themify-icons.css'
import '@/styles/globals.css'
import '@/styles/theme_core.css'
import '@/styles/form_styles.css'
import '@/styles/socoed_classes.css'

export default function MyApp({ Component, pageProps }) {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const loader = document.getElementById('splashScreen')
			if (loader) {
				loader.style.display = 'none'
			}
		}
	}, [])
	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, user-scalable=no'
				/>
			</Head>
			<Component {...pageProps} />
		</>
	)
}
