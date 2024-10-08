import { Support } from '@/components/Support'
import Head from 'next/head'
const seo = {
	title: 'Topic - Log a Ticket',
	description: 'Submit and manage your support tickets for assistance!',
	image: 'https://lms.topic.co.za/support/logo.png',
	url: 'https://topic.co.za'
}
const LogTicket = ({ url }) => {
	return (
		<>
			<Head>
				<title>{seo.title}</title>
				<meta
					name='title'
					content={seo.title}
				/>
				<meta
					name='description'
					content={seo.description}
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content={seo.url}
				/>
				<meta
					property='og:title'
					content={seo.title}
				/>
				<meta
					property='og:description'
					content={seo.description}
				/>
				<meta
					property='og:image'
					content={seo.image}
				/>
				<meta
					property='twitter:card'
					content='summary_large_image'
				/>
				<meta
					property='twitter:url'
					content={seo.url}
				/>
				<meta
					property='twitter:title'
					content={seo.title}
				/>
				<meta
					property='twitter:description'
					content={seo.description}
				/>
				<meta
					property='twitter:image'
					content={seo.image}
				/>
			</Head>
			<Support url={url} />
		</>
	)
}

export async function getServerSideProps(context) {
	const { profile } = context.req.cookies
	return {
		props: {
			url: context.query.url ? context.query.url : null,
			profileId: profile ? profile : null
		}
	}
}
export default LogTicket
