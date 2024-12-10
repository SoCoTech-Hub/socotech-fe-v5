import { SEO } from '@/components/SeoHead'
import { Support } from '@/components/Support'

const seo = {
	title: 'Log a Ticket',
	description: 'Submit and manage your support tickets for assistance!'
}
const LogTicket = ({ url }) => {
	return (
		<>
			<SEO
				title={seo.title}
				description={seo.description}
			/>
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
