import { useState, useEffect } from 'react'
import getGQLRequest from '@/snippets/getGQLRequest'
import api from '@/api/api'
import { useAppContext } from '@/context/AppContext'
import { LikesIcon, CommentsIcon, HeartIcon, SendIcon } from '../SvgIcons'
import ShareLinks from '../ShareLinks'
import CommentField from '../CommentField'
import CommentDisplay from '../CommentDisplay'
import Modal from '../Modal'
import Overlay from '../Overlay'

const Social = ({ feedId, profileId, name, news }) => {
	const { state } = useAppContext()
	const [social, setSocial] = useState([])
	const [likesTotal, setLikesTotal] = useState(0)
	const [commentsTotal, setCommentsTotal] = useState(0)
	const [shareTotal, setShareTotal] = useState(0)
	const [lovesTotal, setLovesTotal] = useState(0)
	const [postId, setPostId] = useState(null)
	const [blog, setBlog] = useState(null)
	const [isLiked, setIsLiked] = useState(false)
	const [isLoved, setIsLoved] = useState(false)
	const [comment, setComment] = useState('')
	const [isComment, setIsComment] = useState(false)
	// const [commentsTotalClicked, setCommentsTotalClicked] = useState(false)
	const [commentsTotalShow, setCommentsTotalShow] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	useEffect(async () => {
		if (feedId) {
			let { feed } = await getGQLRequest({
				endpoint: `feed`,
				fields: `social{id}`,
				id: feedId,
				findOne: true
			})
			setPostId(feed?.social ? feed.social?.id : null)
		}
	}, [feedId])

	useEffect(async () => {
		if (news?.url) {
			if (news.url?.includes('/blog/')) {
				const blogId = news?.url.split('/blog/')[1]
				let { article } = await getGQLRequest({
					endpoint: `article`,
					fields: `id,articleLike{id}`,
					id: blogId,
					findOne: true
				})
				setBlog(article)
			}
		}
	}, [news])

	useEffect(async () => {
		if (postId) {
			const { social } = await getGQLRequest({
				endpoint: `social`,
				id: postId,
				findOne: true,
				fields: `likes{id},loves{id},comments{id,author{firstName,lastName,profilePic{url}},comment,created_at},shares{id}`,
				sort: 'comments{id:asc}'
			})
			if (social) {
				setSocial(social)
				// if (social.likes) {
				// 	setLikesTotal(social.likes.length)
				// }
				if (social.loves) {
					setLovesTotal(social.loves.length)
				}
				if (social.comments) {
					setCommentsTotal(social.comments.length)
				}
				if (social.share) {
					setShareTotal(social.share.length)
				}
			}
		}
	}, [postId])

	useEffect(async () => {
		if (postId) {
			// const socialLikes  = await getGQLRequest({
			// 	endpoint: `socials`,
			// 	fields: `likes{id}`,
			// 	where: `id:${postId},likes:{id:${profileId}}`
			// })
			const socialLoves = await getGQLRequest({
				endpoint: `socials`,
				fields: `loves{id}`,
				where: `id:${postId},loves:{id:${profileId}}`
			})
			// if (socialLikes ? socialLikes.socials[0]?.likes : false) {
			// 	setIsLiked(true)
			// }
			if (socialLoves ? socialLoves.socials[0]?.loves : false) {
				setIsLoved(true)
			}
		}
	}, [postId])

	const upvoteEventHandler = async (upvoted) => {
		if (!postId || postId === undefined) {
			let res = null

			if (upvoted === 'loves') {
				res = await api.post(`/socials`, { loves: { id: profileId } })

				setLovesTotal(1)
				setIsLoved(true)
				if (blog.id) {
					if (!blog?.articleLike) {
						const articleLikePost = await api.post(`/article-likes`, {
							loves: { id: profileId }
						})

						const { data } = await api.put(`articles/${blog.id}`, {
							articleLike: { id: articleLikePost.data.id }
						})

						setBlog(data)
					}
					if (blog?.articleLike) {
						let upDatedSocialsList = social.length
							? [...social[upvoted], { id: profileId }]
							: []

						await api.put(`/article-likes/${blog.articleLike.id}`, {
							loves: upDatedSocialsList
						})
					}
				}
			}
			// if (upvoted === 'likes') {
			// 	res = await api.post(`/socials`, {
			// 		likes: { id: profileId }
			// 	})
			// 	setLikesTotal(1)
			// 	setIsLiked(true)
			// if (news?.url?.contains('/blog')) {
			// 	res = await api.post(`/article-likes`, {
			// 		likes: {id: profileId}
			// 	})
			// }
			// }

			if (upvoted === 'comments') {
				res = await api.post(`/socials`, {
					comments: { id: profileId }
				})
				setCommentsTotal(1)
				setIsComment(true)
			}
			if (upvoted === 'share') {
				res = await api.post(`/socials`, {
					share: { id: profileId }
				})
				setShareTotal(1)
			}

			await api.put(`/feeds/${feedId}`, { social: { id: res.data.id } })
			setSocial(res.data)
			setPostId(res.data.id)
			return res.data.id
		} else {
			let upDatedSocialsList = !isLoved
				? [...social[upvoted], { id: profileId }]
				: [...social[upvoted].filter((x) => x.id !== profileId)]
			let res = null
			if (upvoted === 'loves') {
				res = await api.put(`/socials/${postId}`, { loves: upDatedSocialsList })

				setLovesTotal(res.data.loves.length)
				setIsLoved(!isLoved)
				if (blog.id) {
					if (!blog?.articleLike) {
						res = await api.post(`/article-likes`, {
							loves: { id: profileId }
						})
						const { data } = await api.put(`articles/${blog.id}`, {
							articleLike: { id: res.data.id }
						})
						setBlog(data)
					}
					if (blog?.articleLike) {
						let upDatedSocialsList = [...social[upvoted], { id: profileId }]

						res = await api.put(`/article-likes/${blog.articleLike.id}`, {
							loves: upDatedSocialsList
						})
					}
				}
			}
			if (upvoted === 'likes') {
				if (!isLiked) {
					res = await api.put(`/socials/${postId}`, {
						likes: upDatedSocialsList
					})

					setLikesTotal(res.data.likes.length)
					setLikesTotal(likesTotal + 1)
					setIsLiked(true)
				} else {
					let upDatedSocialsList = [
						...social[upvoted].filter((x) => x.id != profileId)
					]
					res = await api.put(`/socials/${postId}`, {
						likes: upDatedSocialsList
					})
					setLikesTotal(res.data.likes.length)
					setLikesTotal(likesTotal - 1)
					setIsLiked(false)
				}
			}
			if (upvoted === 'comments') {
				res = await api.put(`/socials/${postId}`, {
					comments: upDatedSocialsList
				})
				setCommentsTotal(res.data.comments.length)
			}
		}
	}

	const submitComment = async () => {
		if (!postId) {
			const res = await upvoteEventHandler('comments')
			if (res) {
				await api.post('/comments', {
					author: { id: profileId },
					comment: comment,
					socials: { id: res }
				})
			}
		} else {
			await api.post('/comments', {
				author: { id: profileId },
				comment: comment,
				socials: { id: postId }
			})
		}
		setCommentsTotal(commentsTotal + 1)
		setIsComment(false)
	}

	const comments = social.comments?.slice(0, 3)

	return (
		<>
			<div className='flex flex-row justify-between h-5 pb-1 align-middle'>
				<div className='flex mt-2'>
					<div className='flex flex-row items-center h-5 align-middle'>
						<div
							className='pl-3 rounded-lg shadow-none cursor-pointer '
							onClick={() => upvoteEventHandler('loves')}
							data-tracking-action={`Loved article: ${name}`}
						>
							{isLoved ? (
								<LikesIcon
									className='w-6'
									name={'loves'}
									data-tracking-action={`Loves article: ${name}`}
								/>
							) : (
								<HeartIcon
									className='w-5'
									name={'loves'}
									data-tracking-action={`Loves article: ${name}`}
								/>
							)}
						</div>
						<div className={`ml-2 text-textColor ${Text}`}>{lovesTotal}</div>
					</div>
					{/* <div className='flex flex-row items-center h-5 align-middle'>
						<div
							className='pl-3 rounded-lg shadow-none cursor-pointer '
							onClick={() => upvoteEventHandler('likes')}
							data-tracking-action={`Likes article: ${name}`}
						>
							{isLoved ? (
								<LikesIcon
									className='w-6'
									name={'likes'}
									data-tracking-action={`Loves article: ${name}`}
								/>
							) : (
								<HeartIcon
									className='w-5'
									name={'likes'}
									data-tracking-action={`Likes article: ${name}`}
								/>
							)}
						</div>
						<div className={`ml-2 text-textColor ${Text}`}>{likesTotal}</div>
					</div> */}
					<div
						className='flex flex-row items-center h-5 pl-5 align-middle cursor-pointer'
						data-tracking-action={`Comments: ${name}`}
					>
						<button
							onClick={() => setIsComment(!isComment)}
							className='flex'
						>
							<CommentsIcon
								className='w-5'
								name={'comments'}
								data-tracking-action={`Comments: ${name}`}
							/>
						</button>
						<button
							className={`ml-2 text-textColor ${Text}`}
							onClick={() => setIsComment(!isComment)}
						>
							{commentsTotal}
						</button>
					</div>
					<div
						className='flex flex-row items-center h-5 pl-4 align-middle cursor-pointer'
						data-tracking-action={`Share: ${name}`}
					>
						<ShareLinks
							news={news}
							onClick={upvoteEventHandler}
							name={'share'}
						/>

						<div className={`ml-2 text-textColor ${Text}`}>{shareTotal}</div>
					</div>
					{/* <div className="flex flex-row items-center h-5 align-middle">
                <div
                  className="w-4 p-1 ml-1 bg-red-500 rounded-lg shadow-none cursor-pointer"
                  data-tracking-action={`Loved article: ${name}`}>
                  <img
                    src={`${baseUrl}/likes.svg`}
                    alt="Heart"
                    onClick={upvoteEventHandler}
                    name={"loves"}
                    data-tracking-action={`Loved article: ${name}`}
                  />
                </div>
                <div
                  className={`ml-1 body-text ${
                Text
                  }`}>
                  {lovesTotal} Loves
                </div>
              </div> */}
				</div>
			</div>

			{isComment ? (
				<div className='p-2 mx-2.5 mt-4 border-2 rounded-lg'>
					<CommentField
						icon={<SendIcon onClick={() => submitComment()} />}
						onChange={(e) => setComment(e.target.value)}
						value={comment}
						placeholder='Write a comment...'
						type='text'
					/>
				</div>
			) : (
				<></>
			)}

			{isComment && comments ? (
				<>
					{[...comments]
						?.sort((a, b) => b.id - a.id)
						.slice(0, 3)
						.map((x, i) => (
							<div
								className='p-2 mt-1'
								key={i}
							>
								<CommentDisplay
									value={x.comment}
									profilePic={x.author.profilePic?.url}
									fullName={`${x.author.firstName} ${
										x.author.lastName ? x.author.lastName : ''
									}`}
									created_at={x.created_at}
								/>
							</div>
						))}
					{comments.length >= 3 ? (
						<div>
							<button
								className='ml-4 font-bold text-themeColorMain'
								onClick={() => setIsOpen(!isOpen)}
							>
								Show all Comments
							</button>
						</div>
					) : (
						<></>
					)}
				</>
			) : (
				<></>
			)}

			<Overlay
				bgColor='compBg'
				isOpen={isOpen}
				setOpen={setIsOpen}
				width={'full'}
				height={58}
				onClose={() => setIsOpen(false)}
				content={
					<>
						{social && social.comments && social.comments.length ? (
							<div>
								{[...social.comments]
									.sort((a, b) => b.id - a.id)
									.map((x, i) => (
										<div
											className='p-2'
											key={i}
										>
											<div className=''>
												<CommentDisplay
													value={x.comment}
													profilePic={x.author.profilePic?.url}
													fullName={`${x.author.firstName} ${
														x.author.lastName ? x.author.lastName : ''
													}`}
													created_at={x.created_at}
												/>
											</div>
										</div>
									))}
							</div>
						) : (
							<div className=' text-textColor'>No comments</div>
						)}
					</>
				}
			/>
		</>
	)
}

export default Social
