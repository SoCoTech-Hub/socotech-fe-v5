import { useState, useEffect } from 'react'
import Avatar from '@/components/Avatar'
import { getTimeDifferenceFromPostDate } from '@/snippets/user/getTimeDifferenceFromPostDate'
import getGQLRequest from '@/snippets/getGQLRequest'
// import handleArticleUpvote from '@/snippets/blog/handleArticleUpvote'
import { baseUrl, profileId } from '@/context/constants'
// import { useAppContext } from '@/context/AppContext'
import BtnSm from '@/components/BtnSm'
import { useRouter } from 'next/router'
import ShareLinks from '@/components/ShareLinks'
import { HeartIcon, LikesIcon } from '@/components/SvgIcons'
import api from '@/api/api'
import Link from 'next/link'

const BlogPost = ({
	imgSrc,
	title,
	description,
	authorName,
	authorProfilePic,
	datePosted,
	handleArticleSave,
	blogPostId, //
	blogPostSocials //
}) => {
	const router = useRouter()
	// const [articleLikes, setArticleLikes] = useState([])
	const [articleLikeLoves, setArticleLikeLoves] = useState([])
	const [socialId, setSocialId] = useState(null)
	const [socialLoves, setSocialLoves] = useState([])
	const [allLoves, setAllLoves] = useState([])
	const [lovesTotal, setLovesTotal] = useState(0)
	const [isLoved, setIsLoved] = useState(false)
	const [loading, setLoading] = useState(true)
	const [feed, setFeed] = useState([])

	let mediaUrl = imgSrc ? imgSrc : `${baseUrl}/dummypost.png`

	useEffect(() => {
		router.events.on('routeChangeStart', setLoading(true))
		router.events.on('routeChangeComplete', setLoading(false))
	}, [])

	useEffect(() => {
		const socialLovesArray = socialLoves || []
		const articleLikeLovesArray = articleLikeLoves || []
		if (socialLovesArray.length || articleLikeLovesArray.length) {
			const mergedArray = socialLovesArray.concat(articleLikeLovesArray)
			const uniqueArray = Array.from(
				new Set(mergedArray.map(JSON.stringify)),
				JSON.parse
			)
			setAllLoves(uniqueArray)
			setLovesTotal(uniqueArray.length)
		}
	}, [socialLoves, articleLikeLoves])

	useEffect(async () => {
		if (blogPostId) {
			const { article } = await getGQLRequest({
				endpoint: 'article',
				id: blogPostId,
				findOne: true,
				fields: `articleLike{id,loves{id}}`
			})
			if (article?.articleLike?.loves) {
				setArticleLikeLoves(article?.articleLike?.loves)
			}

			if (article?.articleLike?.loves) {
				setLovesTotal(article.articleLike.loves.length)
				if (article.articleLike.loves.find((x) => x.id == profileId)) {
					setIsLoved(true)
				}
			}

			let { feeds } = await getGQLRequest({
				endpoint: `feeds`,
				fields: `id, social{id,loves{id}}`,
				where: `url:"/blog/${blogPostId}"`,
				stateSetter: setFeed
			})
			if (feeds.length) {
				setSocialId(feeds[0]?.social?.id)
				setSocialLoves(feeds[0]?.social?.loves)
			}
		}
	}, [blogPostId])

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
				await api.put(`/feeds/${feed.id}`, { social: { id: res.data.id } })
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
				await api.put(`articles/${blogPostId}`, {
					articleLike: { id: res.data.id }
				})
				setLovesTotal(res.data.loves.length)
			}
		}
	}

	return (
		<div className='p-3 mb-2 rounded-lg shadow-md bg-compBg'>
			<div className='flex flex-row justify-between mb-2'>
				<div className='flex flex-row items-center h-auto align-middle'>
					<div className='ml-1 avatar'>
						<Avatar
							src={authorProfilePic}
							size='45px'
							border={true}
							borderColor='white'
						/>
					</div>
					<div className='pl-2 text-textColor mobile:pl-2'>
						{authorName !== 'undefined undefined' ? authorName : 'No Name'}
					</div>
				</div>
			</div>
			<div className='pl-2 text-xs font-thin text-textColor'>
				{getTimeDifferenceFromPostDate(datePosted)}
			</div>

			<div className='mt-1'>
				<div className={`text-sm pl-2 text-textColor mobile:pb-1 pb-2`}>
					<div className='line-clamp-1'>
						<div
							className='overflow-x-hidden'
							dangerouslySetInnerHTML={{ __html: title }}
						/>
					</div>
				</div>
			</div>
			<div className='m-2 cursor-pointer'>
				<a href={`${baseUrl}/${blogPostId}`}>
					<img
						src={mediaUrl}
						alt='Blog Image'
						className='w-full rounded-lg shadow-md'
					/>
				</a>
			</div>
			<div className='mx-2'>
				<div className='flex flex-row justify-between h-5 py-1 align-middle w-52 gap-x-2'>
					<div className='flex justify-between align-middle'>
						<div
							className='w-6 rounded-lg cursor-pointer'
							onClick={() => upvoteEventHandler('loves')}
							data-tracking-action={`Loved article: ${title}`}
						>
							{isLoved ? (
								<LikesIcon
									name={'likes'}
									data-tracking-action={`Loved article: ${title}`}
								/>
							) : (
								<HeartIcon
									name={'loves'}
									data-tracking-action={`Loved article: ${title}`}
								/>
							)}
						</div>
						<div className={`text-xs my-1 font-bold text-textColor`}>
							{lovesTotal}
						</div>
					</div>
					<div className='h-2'>
						<ShareLinks
							news={{ url: `/${blogPostId}` }}
							name={'share'}
						/>
					</div>
					<div className='laptop:mx-6 desktop:mx-4 mobile:mx-4'>
						<BtnSm
							label={loading ? 'Loading' : 'Save'}
							id={blogPostId}
							onClickFunction={handleArticleSave}
							trackingAction={`Saved article: ${title}`}
							color='bg-themeColorMain'
							width='px-4 py-1 mb-2'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BlogPost
