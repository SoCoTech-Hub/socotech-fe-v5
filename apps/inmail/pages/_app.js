import { useEffect } from 'react'
import Head from 'next/head'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/styles'
import 'react-quill/dist/quill.snow.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'tailwindcss/tailwind.css'
import '@/styles/themify-icons/themify-icons.css'
import '@/styles/globals.css'
import '@/styles/theme_core.css'
import '@/styles/form_styles.css'
import '@/styles/socoed_classes.css'
import Layout from '@/layouts/Layout'
import Protected from '@/snippets/protected'
import PageTracking from '@/snippets/pageTracking'
import { AppWrapper } from '@/context/AppContext'
import { ApolloProvider } from '@apollo/client'
import client from './api/apolloClient'

const theme = createTheme({
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true
			}
		}
	}
})

function MyApp({ Component, pageProps, modDevice }) {
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
			<AppWrapper>
				<ThemeProvider theme={theme}>
					<Protected device={modDevice}>
						<PageTracking />
						<ApolloProvider client={client}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</ApolloProvider>
					</Protected>
				</ThemeProvider>
			</AppWrapper>
		</>
	)
}

MyApp.getInitialProps = async (ctx) => {
	if (typeof window === 'undefined') {
		const deviceDetail = ctx.ctx.req.headers['user-agent']
		const modDevice = `device:${deviceDetail}`

		return {
			modDevice
		}
	} else {
		return {}
	}
}

export default MyApp
