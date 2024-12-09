//MOVED TO ARTICLE
// import { useState, useEffect } from 'react'
// import Head from 'next/head'
// import BlogHeader from '@/components/BlogHeader'
// import getGQLRequest from '@/snippets/getGQLRequest'
// import { profileId, organizationId } from '@/context/constants'
// import api from '@/api/api'

// export default function Article({ article }) {
// 	const [loading, setLoading] = useState(false)

// 	useEffect(async () => {
// 		const { articleReaders } = await getGQLRequest({
// 			endpoint: `articleReaders`,
// 			where: `article:{id:${article.id}},profile:{id:${profileId}},organization:{id:${organizationId}}`,
// 			fields: `id`
// 		})
// 		if (!articleReaders.length) {
// 			const { profiles } = await getGQLRequest({
// 				endpoint: `profiles`,
// 				where: `id:${profileId}`,
// 				fields: `schools{id}`
// 			})
// 			await api.post('/article-readers', {
// 				profile: { id: profileId },
// 				article: { id: article.id },
// 				organization: { id: organizationId },
// 				school: {
// 					id:
// 						profiles[0].schools && profiles[0].schools.length > 0
// 							? profiles[0].schools[0].id
// 							: null
// 				}
// 			})
// 		}
// 	}, [])

// 	const seo = {
// 		title: article.title ? `Topic - ${article.title}` : 'Topic - Blog',
// 		description: article?.shortDescription | article?.description | '',
// 		image: article?.image?.url | 'https://lms.topic.co.za/auth/logo.png',
// 		url: 'https://topic.co.za'
// 	}

// 	return (
// 		<>
// 			<Head>
// 				<title>{seo.title}</title>
// 				<meta
// 					name='title'
// 					content={seo.title}
// 				/>
// 				<meta
// 					name='description'
// 					content={seo.description}
// 				/>
// 				<meta
// 					property='og:type'
// 					content='website'
// 				/>
// 				<meta
// 					property='og:url'
// 					content={seo.url}
// 				/>
// 				<meta
// 					property='og:title'
// 					content={seo.title}
// 				/>
// 				<meta
// 					property='og:image'
// 					content={seo.image}
// 				/>
// 				<meta
// 					property='og:description'
// 					content={seo.description}
// 				/>
// 				<meta
// 					property='twitter:card'
// 					content='summary_large_image'
// 				/>
// 				<meta
// 					property='twitter:url'
// 					content={seo.url}
// 				/>
// 				<meta
// 					property='twitter:title'
// 					content={seo.title}
// 				/>
// 				<meta
// 					property='twitter:description'
// 					content={seo.description}
// 				/>
// 				<meta
// 					property='twitter:image'
// 					content={seo.image}
// 				/>
// 			</Head>
// 			<div className='pb-5 col row'>
// 				<div className='space-y-10 gx-5 gy-4 mobile:px-1'>
// 					<div className=''>
// 						<BlogHeader
// 							title={article?.title}
// 							loading={loading}
// 							imgSrc={article?.image?.url}
// 							textContent={article?.description} // Work from here
// 							author={`${article?.author?.firstName} ${article?.author?.lastName}`}
// 							datePosted={article?.published_at}
// 							setLoading={setLoading}
// 							blogPostId={article?.id}
// 							// blogPostSocials={article?.articleLike?.id}
// 							postId={article?.articleLike?.id}
// 							blogPost={article}
// 						/>
// 					</div>
// 					<div className='pl-3 pr-3'></div>
// 					<div className=''></div>
// 				</div>
// 			</div>
// 		</>
// 	)
// }

// export async function getServerSideProps({ params }) {
// 	const { article } = await getGQLRequest({
// 		endpoint: `article`,
// 		findOne: true,
// 		id: params.id,
// 		fields: `id,title,description,author{id,firstName,lastName},published_at,image{url},shortDescription`
// 	})
// 	return {
// 		props: {
// 			article: article
// 		}
// 	}
// }
