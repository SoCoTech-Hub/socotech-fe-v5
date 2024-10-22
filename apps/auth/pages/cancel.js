import LogoOverlay from '@/components/LogoOverlay'
import { Page } from '@/components/Page'
import { baseUrl, mainUrl, orgName } from '@/context/constants'
import Head from 'next/head'
import Link from 'next/link'

const Cancel = ({ url }) => (
	<>
		<Head>
			<title>Redirect</title>
			<meta
				name='description'
				content='redirecting you'
			/>
		</Head>
		<Page
			header='Payment Failed'
			message='Something went wrong...'
			buttons={[
				<Link
					href={`/subscribe?from=${url}`}
					passHref
				>
					<div className='px-8 py-3 text-center rounded-lg cursor-pointer text-textColor bg-themeColorMain'>
						Try Again
					</div>
				</Link>,
				<a href={`${mainUrl}${url}`}>
					<div className='p-3 text-center rounded-lg cursor-pointer text-textColorSecondary bg-themeColorSecondary'>
						Return to {`${orgName}`}
					</div>
				</a>
			]}
		/>
	</>
)
export async function getServerSideProps(context) {
	const url = context.req.__NEXT_INIT_QUERY?.returnTo

	return {
		props: {
			url: url ? url : '/'
		}
	}
}

export default Cancel
