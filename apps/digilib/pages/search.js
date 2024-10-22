import MainSearchResults from '@/components/MainSearchResults'
import { SEO } from '@/components/SeoHead'
import GetKBSearchResults from 'graphql/queries/GetKBSearchResults'
import client from './api/apolloClient'

const search = ({ results }) => {
	const seo = {
		title: 'Search Categories',
		description: 'Search what categories you looking for!'
	}

	return (
		<>
			<SEO
				description={seo.description}
				title={seo.title}
			/>
			<div className='w-full shadow-md'>
				<MainSearchResults results={results} />
			</div>
		</>
	)
}
export async function getServerSideProps(context) {
	const { category, name_contains } = context.query
	const grades = context.req.cookies['Grades']
		.split(',')
		.filter((x) => x !== '')

	const { data } = await client.query({
		query: GetKBSearchResults,
		variables: {
			searchTerm: `${name_contains}`,
			categoryID: category ? [category] : [],
			gradesID: grades
		}
	})

	return {
		props: {
			results: data?.knowledgeBases?.length ? data.knowledgeBases : null
		}
	}
}
export default search
