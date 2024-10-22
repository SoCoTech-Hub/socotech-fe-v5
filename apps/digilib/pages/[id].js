import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import DigilibHeader from '@/components/DigilibHeader'
import IFrame from '@/components/IFrame'
import { SEO } from '@/components/SeoHead'
import { isPaying, orgName, profileId, userId } from '@/context/constants'
import api from '@/api/api'
import client from '@/api/apolloClient'
import getGQLRequest from '@/snippets/getGQLRequest'
import TimeTracks from '@/snippets/timeTracks'
import GetKBArticle from 'graphql/queries/GetKBArticle'
import GetKBReads from 'graphql/queries/GetKBReads'
import kBReadUpdate from 'graphql/mutations/kBReadUpdate'
import kBReadCreate from 'graphql/mutations/kBReadCreate'
import GetKBPaths from 'graphql/queries/GetKBPaths'

export default function Article({ article }) {
	const startTime = new Date()

	if (!article?.attachment) {
		const seo = {
			title: 'Topic - Article Not Found',
			description: 'No Articles were found!'
		}

		return (
			<div>
				<SEO
					description={seo.description}
					title={seo.title}
				/>

				<div>Resource not found</div>
			</div>
		)
	}

	const [loading, setLoading] = useState(true)
	const [updateKBRead] = useMutation(kBReadUpdate)
	const [createKBRead] = useMutation(kBReadCreate)

	useQuery(GetKBReads, {
		variables: {
			knowledgeBaseID: article.id,
			profileID: profileId
		},
		fetchPolicy: 'network-only',
		onCompleted: (data) => {
			if (isPaying) {
				if (!data.kbReads.length) {
					createKBRead({
						variables: {
							profileID: profileId,
							knowledgeBaseID: article.id,
							kbCategoryID: article.categories[0].id,
							read: true
						}
					})
				} else {
					updateKBRead({
						variables: {
							kbReadID: data.kbReads[0].id,
							read: true
						}
					})
				}
			}
		}
	})

	useEffect(async () => {
		const { timeTracks } = await getGQLRequest({
			endpoint: `timeTracks`,
			where: `knowledgeBase:{id:${article.id}},user:{id:${userId}}`,
			fields: `id`
		})
		if (!timeTracks.length) {
			const timeStamp = new Date()
			await api.post('/time-tracks', {
				user: { id: userId },
				knowledgeBase: { id: article.id },
				timeSpent: (timeStamp - startTime) / 1000 / 60,
				isComplete: true
			})
		}
	}, [])

	const seo = {
		title: `${orgName} - ${article?.name}`,
		description: article?.name
	}

	return (
		<>
			<div className='col row'>
				<SEO
					description={seo.description}
					title={seo.title}
				/>
				<div className='space-y-10 desktop:gx-5 laptop:gx-5 gy-4 mobile:gx-4'>
					<div className=''>
						<DigilibHeader
							name={article?.name}
							loading={loading}
							category={article?.categories[0]?.name}
							subject={article?.subject?.name}
							downloadLink={article?.attachment?.url}
							download={article?.download ? article.download : false}
						/>
					</div>
					<div className='pl-3 pr-3'></div>
				</div>
			</div>
			<div className='p-4 rounded-lg bg-compBg'>
				<IFrame
					src={article?.attachment?.url}
					setLoading={setLoading}
				/>
				<TimeTracks
					knowledgeBase={article?.id}
					userId={userId}
				/>
			</div>
		</>
	)
}

export async function getStaticProps({ params }) {
	try {
		const data = await client.query({
			query: GetKBArticle,
			variables: {
				knowledgeBaseID: params.id
			}
		})
		return {
			props: {
				article: data?.data?.knowledgeBase ? data.data.knowledgeBase : null
			},
			revalidate: 60 // attempt to re-generate the page In 60 seconds
		}
	} catch {
		return {
			props: {
				article: null
			},
			revalidate: 60 // attempt to re-generate the page In 60 seconds
		}
	}
}

export async function getStaticPaths() {
	const { data } = await client.query({
		query: GetKBPaths
	})
	const paths = data?.knowledgeBases?.map((article) => `/${article.id}`) || []
	return { paths, fallback: true }
}
