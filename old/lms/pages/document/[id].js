import { useState } from 'react'
import Head from 'next/head'
import getDataRequest from '@/snippets/getDataRequest'
import getGQLRequest from '@/snippets/getGQLRequest'
import ResourceIframe from '@/components/ResourceIframe'
import ResourceHeader from '@/components/ResourceHeader'

export default function Article({ lesson }) {
	if (!lesson.url) {
		return (
			<div>
				<Head>
					<title>Document Home Page</title>
					<meta
						name='description'
						content='Document Home Page'
						key='title'
					/>
				</Head>
				<div>Resource not found</div>
			</div>
		)
	}
	const [loading, setLoading] = useState(true)

	return (
		<>
			<div className='col row'>
				<Head>
					<title>
						{lesson.name ? `Document: ${lesson.name}` : 'Document Home Page'}
					</title>
					<meta
						name='description'
						content={
							lesson.name ? `Document: ${lesson.name}` : 'Document Home Page'
						}
						key='title'
					/>
				</Head>
				<div className='desktop:space-y-10 laptop:space-y-10 mobile:space-y-4'>
					<div className=''>
						<ResourceHeader
							name={lesson?.name}
							loading={loading}
							downloadLink={lesson?.url}
							downloadable={lesson?.related[0]?.materialsDownload}
						/>
					</div>
					<div className='pl-3 pr-3'></div>
					<div className=''></div>
				</div>
			</div>
			<div className='p-6 bg-compBg shadow-outline rounded-lg'>
				<ResourceIframe
					src={lesson.url}
					setLoading={setLoading}
				/>
			</div>
		</>
	)
}

export async function getStaticProps({ params }) {
	const lessons = await getDataRequest(`/upload/files/${params.id}`, () => {})
	return {
		props: {
			lesson: lessons
		},
		revalidate: 60 // attempt to re-generate the page In 60 seconds
	}
}
export async function getStaticPaths() {
	const { lessons } = await getGQLRequest({
		endpoint: `lessons`,
		fields: `resources{id}`
	})
	const paths =
		lessons
			?.map((lesson) =>
				lesson.resources.map((resource) => `/document/${resource.id}`)
			)
			.flat() || []
	// Pre-render only these paths at build time, will server-render pages on-demand if the path doesn't exist. : fallback: 'blocking'
	return { paths, fallback: 'blocking' }
}
