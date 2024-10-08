import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import IFrame from '@/components/IFrame'
import DigilibHeader from '@/components/DigilibHeader'
import { isPaying, profileId, userId } from '@/context/constants'
import api from '@/api/api'
import getGQLRequest from '@/snippets/getGQLRequest'
import client from './api/apolloClient'
import { useMutation, useQuery } from '@apollo/client'
import GetKBArticle from 'graphql/queries/GetKBArticle'
import GetKBReads from 'graphql/queries/GetKBReads'
import kBReadUpdate from 'graphql/mutations/kBReadUpdate'
import kBReadCreate from 'graphql/mutations/kBReadCreate'
import GetKBPaths from 'graphql/queries/GetKBPaths'
import TimeTracks from '@/snippets/timeTracks'

export default function Article({ article }) {
	const startTime = new Date()

	if (!article?.attachment) {
		const seo = {
			title: 'Topic - Article Not Found',
			description: 'No Articles were found!',
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

	return (
		<>
			<div className='col row'>
				<Head>
					<title>{article?.name}</title>
					<meta
						name='description'
						content={article?.name}
						key='title'
					/>
				</Head>
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
			<div className='p-6 rounded-lg shadow-outline bg-compBg'>
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
