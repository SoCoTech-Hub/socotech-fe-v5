import React, { useState, useEffect } from 'react'
import getGQLRequest from '@/snippets/getGQLRequest'
import api from '@/api/api'

const Social = ({ feedId, profileId }) => {
	const [social, setSocial] = useState([])
	const [likesTotal, setLikesTotal] = useState(0)
	const [lovesTotal, setLovesTotal] = useState(0)
	const [postId, setPostId] = useState(null)

	useEffect(async () => {
		let { feed } = await getGQLRequest({
			endpoint: `feed`,
			fields: `social{id}`,
			id: feedId,
			findOne: true
		})
		setPostId(feed.social ? feed.social.id : null)
	}, [feedId])
	useEffect(async () => {
		if (postId) {
			const { social } = await getGQLRequest({
				endpoint: `social`,
				id: postId,
				findOne: true,
				fields: `likes{id},loves{id}`
			})
			if (social) {
				setSocial(social)
				if (social.likes) {
					setLikesTotal(social.likes.length)
				}
				if (social.loves) {
					setLovesTotal(social.loves.length)
				}
			}
		}
	}, [postId])

	const upvoteEventHandler = async (event) => {
		let upvoted = event.target.name

		if (!postId || postId === undefined) {
			let res = null
			if (upvoted === 'loves') {
				res = await api.post(`/socials`, { loves: { id: profileId } })
				setLovesTotal(1)
			}
			if (upvoted === 'likes') {
				res = await api.post(`/socials`, { likes: { id: profileId } })
				setLikesTotal(1)
			}
			await api.put(`/feeds/${feedId}`, { social: { id: res.data.id } })
			setSocial(res.data)
			setPostId(res.data.id)
			return
		}
		const { profile } = await getGQLRequest({
			endpoint: `profile`,
			id: profileId,
			findOne: true,
			fields: `id`
		})

		let upDatedSocialsList = [...social[upvoted], profile]
		let res = null
		if (upvoted === 'loves') {
			res = await api.put(`/socials/${postId}`, { loves: upDatedSocialsList })
			setLovesTotal(res.data.loves.length)
		}
		if (upvoted === 'likes') {
			res = await api.put(`/socials/${postId}`, { likes: upDatedSocialsList })
			setLikesTotal(res.data.likes.length)
		}
	}

	return (
		<div>
			<div className='p-0 mt-3 card-body d-flex'>
				<div className='text-textColor d-flex align-items-center'>
					<div className='w-6 p-1 bg-yellow-500 rounded-full cursor-pointer '>
						<img
							src='/user/thumbs-up.svg'
							alt='Thumbs-Up'
							onClick={upvoteEventHandler}
							name={'likes'}
						/>
					</div>
					<div className='ml-2 mr-1 text-xs '>{likesTotal} Likes</div>
					<div className='w-6 p-1 ml-1 bg-red-500 rounded-full cursor-pointer'>
						<img
							src='/user/heart.svg'
							alt='Heart'
							onClick={upvoteEventHandler}
							name={'loves'}
						/>
					</div>
					<div className='ml-2 text-xs '>{lovesTotal} Loves</div>
				</div>
				{/* <div className="ml-6 text-gray-900 cursor-pointer d-flex align-items-center">
          <img src="/user/message-circle.svg" alt="Comment" className="" />
          <div className="ml-1 text-xs font-bold ">{comments} Comments</div>
        </div> */}
				{/* <div className="text-gray-900 cursor-pointer ms-auto d-flex align-items-center">
          <img src="/user/share-2.svg" alt="Share" />
          <span className="ml-1 text-xs font-bold">Share</span>
        </div> */}
			</div>
		</div>
	)
}

export default Social
