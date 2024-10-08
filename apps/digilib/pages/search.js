import React from 'react'
import Head from 'next/head'
import MainSearchResults from '@/components/MainSearchResults'
import GetKBSearchResults from 'graphql/queries/GetKBSearchResults'
import client from './api/apolloClient'

const search = ({ results }) => {
	const seo = {
		title: 'Topic - Search Categories',
		description: 'Search what categories you looking for!',
		image: 'https://lms.topic.co.za/digilib/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<div>
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

			<div className='w-full'>
				<MainSearchResults results={results} />
			</div>
		</div>
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
			results: data.knowledgeBases ? data.knowledgeBases : null
		}
	}
}
export default search
