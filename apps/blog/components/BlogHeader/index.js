import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import BlogLoad from '@/components/BlogLoad'
import Alert from '@/components/Alert'
import { getTimeDifferenceFromPostDate } from '@/snippets/user/getTimeDifferenceFromPostDate'
import handleArticleUpvote from '@/snippets/blog/handleArticleUpvote'
import handleArticleSave from '@/snippets/blog/handleArticleSave'
import ReactMarkdown from 'react-markdown'
// import getDataRequest from '@/snippets/getDataRequest'
import {
	baseUrl,
	// ComponentBg,
	PrimaryColor,
	Text,
	profileId,
	organizationId
} from '@/context/constants'
import { useAppContext } from '@/context/AppContext'
import Btn from '@/components/Btn'
import getGQLRequest from '@/snippets/getGQLRequest'
import ShareLinks from '../ShareLinks'
import { HeartIcon, LikesIcon } from '../SvgIcons'
import api from '@/api/api'

const index = ({
	blogPostId,
	title,
	author,
	datePosted,
	textContent,
	loading,
	setLoading,
	imgSrc = '',
	blogPost
	// article,
}) => {
	const { state } = useAppContext()
	const [isLoved, setIsLoved] = useState(false)
	const [socialId, setSocialId] = useState(null)
	const [socialLoves, setSocialLoves] = useState([])
	const [allLoves, setAllLoves] = useState([])
	const [blogPostSocials, setBlogPostSocials] = useState(0)
	const [articleLikeLoves, setArticleLikeLoves] = useState([])
	// const [likesTotal, setLikesTotal] = useState(0)
	const [lovesTotal, setLovesTotal] = useState(0)
	const [success, setSuccess] = useState('')
	const router = useRouter()
	let mediaUrl = imgSrc ? imgSrc : `${baseUrl}/dummypost.png`

	useEffect(() => {
		const socialLovesArray = socialLoves || []
		const articleLikeLovesArray = articleLikeLoves || []

		if (socialLovesArray.length || articleLikeLovesArray.length) {
			const mergedArray = [...socialLovesArray, ...articleLikeLovesArray]

			const uniqueArray = mergedArray.length
				? Array.from(new Set(mergedArray.map(JSON.stringify)), JSON.parse)
				: []
			if (uniqueArray.length > 0) {
				setAllLoves(uniqueArray)
				setLovesTotal(uniqueArray.length)

				setIsLoved(uniqueArray.find((x) => x.id == profileId) ? true : false)
			}
		}
	}, [socialLoves])

	useEffect(async () => {
		if (blogPostId) {
			const { article } = await getGQLRequest({
				endpoint: 'article',
				id: blogPostId,
				findOne: true,
				fields: `articleLike{id,loves{id}}`
			})
			setBlogPostSocials(article.articleLike.id)
			setArticleLikeLoves(article.articleLike.loves)
			setIsLoved(article.articleLike.loves.find((x) => x.id == profileId))

			let { feeds } = await getGQLRequest({
				endpoint: `feeds`,
				fields: `social{id,loves{id}}`,
				where: `url:"/blog/${blogPostId}"`
			})
			if (feeds.length) {
				setSocialId(feeds[0]?.social.id)
				setSocialLoves(feeds[0]?.social?.loves)
			}
		}
	}, [])

	const upvoteEventHandler = async (upvoted) => {
		let updatedSocialsList = !isLoved
			? [...allLoves, { id: profileId }]
			: [...allLoves.filter((x) => x.id !== profileId)]
		setSocialLoves(updatedSocialsList)
		setArticleLikeLoves(updatedSocialsList)
		if (upvoted === 'loves') {
			setIsLoved(!isLoved)
			if (socialId) {
				const res = await api.put(`/socials/${socialId}`, {
					loves: updatedSocialsList
				})
			} else {
				const res = await api.post(`/socials`, {
					loves: updatedSocialsList
				})
				setSocialId(res.data.id)
			}
			if (blogPostSocials) {
				const res = await api.put(`/article-likes/${blogPostSocials}`, {
					loves: updatedSocialsList
				})

				setLovesTotal(res.data.loves.length)
			} else {
				const res = await api.post(`/article-likes`, {
					loves: updatedSocialsList
				})

				setLovesTotal(res.data.loves.length)
			}
		}
	}

	const handleSaveArticle = () => {
		handleArticleSave({
			id: profileId,
			article: blogPost
		})
		setSuccess('Article Saved')
	}

	return (
		<>
			<Head>
				<meta
					property='og:type'
					content='article'
				/>
				<meta
					property='twitter:card'
					content='summary_large_image'
				/>
				<meta
					property='og:image'
					content={mediaUrl}
				/>
				<meta
					property='twitter:image'
					content={mediaUrl}
				/>
				<meta
					property='twitter:title'
					content={title}
				/>
				<meta
					property='twitter:url'
					content={process.env.NEXT_PUBLIC_MAIN_URL}
				/>
				<meta
					property='og:url'
					content={process.env.NEXT_PUBLIC_MAIN_URL}
				/>
			</Head>
			<div className='w-full p-3 rounded-lg bg-compBg shadow-menu'>
				<div className=''>
					<div className='pt-2 pb-1 pl-6 pr-6 text-lg text-textColor mobile:p-1'>
						{title}
					</div>
					<div className='px-6 text-textColor mobile:p-1'>
						{author !== 'undefined undefined' ? author : 'No Name'} -{' '}
						{getTimeDifferenceFromPostDate(datePosted)}
					</div>
					<div className='p-6 rounded-lg shadow-outline bg-compBg mobile:p-1'>
						<img
							src={mediaUrl}
							alt={title}
							onLoad={() => setLoading(false)}
							className='object-contain w-full rounded-lg'
						/>
					</div>
					<div className='w-full'>
						<div className='flex justify-content-center'>
							<Alert success={success} />
						</div>
						<div className='flex flex-row justify-between px-6 pb-1 mobile:p-1'>
							<div className='flex flex-row items-center h-10 align-middle'>
								<div className='flex'>
									<div className='flex flex-row items-center h-5 align-middle'>
										<div
											className='pl-3 rounded-lg shadow-none cursor-pointer'
											onClick={() => upvoteEventHandler('loves')}
											data-tracking-action={`Loved article: ${title}`}
										>
											{isLoved ? (
												<LikesIcon
													className='w-6'
													name={'loves'}
													data-tracking-action={`Loved article: ${title}`}
												/>
											) : (
												<HeartIcon
													className='w-5'
													name={'loves'}
													data-tracking-action={`Loved article: ${title}`}
												/>
											)}
										</div>
										<div className='ml-1 text-xs text-textColor mobile:mt-1'>
											{lovesTotal}
										</div>
									</div>
								</div>
								<div className='ml-2'>
									<ShareLinks
										news={{ url: `/${blogPostId}` }}
										name={'share'}
									/>
								</div>
							</div>

							<div className='flex flex-wrap gap-2 mobile:ml-8'>
								<div className=''>
									<Btn
										color='bg-themeColorMain'
										label='Back'
										onClickFunction={() => router.push('/')}
										trackingAction={`return to blogs from article: ${title}`}
									/>
								</div>
								<div className=''>
									<Btn
										color='bg-themeColorMain'
										label='Save'
										onClickFunction={handleSaveArticle}
										trackingAction={`Saved article: ${title}`}
										id={blogPostId}
									/>
								</div>
							</div>
						</div>
						<div className='pt-3'>
							<div className='flex-shrink px-6 text-textColor mobile:p-1'>
								{textContent.indexOf('<br/>') || textContent.indexOf('<br>') ? (
									<div dangerouslySetInnerHTML={{ __html: textContent }}></div>
								) : (
									<ReactMarkdown children={textContent} />
								)}
							</div>
						</div>
						<div className='flex justify-end mr-4'>
							<div className='mt-4'>
								<Btn
									color='bg-themeColorMain'
									label='Back to list'
									onClickFunction={() => router.back()}
									trackingAction={`return to blogs from article: ${title}`}
								/>
							</div>
						</div>
					</div>
					<div className='flex items-center align-middle'>
						<BlogLoad loading={loading} />
					</div>
				</div>
			</div>
		</>
	)
}

export default index
