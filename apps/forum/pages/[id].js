import { useEffect, useState } from 'react'
import Alert from '@/components/Alert'
import Btn from '@/components/Btn'
import MdxEditor from '@/components/MdxEditor/MdxEditor'
import ForumReviewDisplay from '@/components/ForumReviewDisplay'
import { ForumReply } from '@/components/ForumReviewDisplay/ForumReplyWIP'
import { getTimeDifferenceFromPostDate } from '@/snippets/user/getTimeDifferenceFromPostDate'
import getGQLRequest from '@/snippets/getGQLRequest'
import { profileId, userId } from '@/context/constants'
import api from './api/api'
import Avatar from '@/components/Avatar'
import {
	CommentsIcon,
	HeartIcon,
	ImTrashIcon,
	PencilSquareIcon
} from '@/components/SvgIcons'
import Overlay from '@/components/Overlay'
import { SEO } from '@/components/SeoHead'

const DisplayForum = ({ forum, forumListItems, slug }) => {
	const [add, setAdd] = useState(0)
	const [show, setShow] = useState(false)
	const [editMain, setEditMain] = useState(false)
	const [openMain, setOpenMain] = useState(false)
	const [editID, setEditID] = useState('')
	const [open, setOpen] = useState(false)
	const [showReplies, setShowReplies] = useState(0)
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')
	let { id, name, question, user, updated_at, likes } = forum
	const [replies, setReplies] = useState([])
	const [message, setMessage] = useState('')
	const [likeList, setLikeList] = useState([likes])

	useEffect(() => {
		setReplies(sortRepliesByParentId(forumListItems))
		setLikeList(likes)
	}, [])

	const AddReply = async () => {
		setLoading(true)
		const { data, ok } = await api.post('/forums', {
			user: { id: parseInt(userId) },
			slug: slug,
			parentForum: { id: add },
			answer: message
		})
		if (ok) {
			const res = sortRepliesByParentId(replies, data)
			setReplies(res)
			setMessage('')
			setSuccess('Reply posted')
			setAdd(0)
		} else {
			setMessage('')
			setError('Something Went Wrong')
		}
		setLoading(false)
	}
	const updateReply = async () => {
		setLoading(true)
		if (editID) {
			const { data, ok } = await api.put(`/forums/${editID}`, {
				answer: message
			})
			if (ok) {
				const res = sortRepliesByParentId(replies, data)
				setReplies(res)
				setMessage('')
				setSuccess('Reply updated')
				setAdd(0)
			} else {
				setMessage('')
				setError('Something Went Wrong')
			}
		}
		setLoading(false)
		return
	}
	const deleteReply = async () => {
		setLoading(true)
		if (editMain) {
			const { ok, error } = await api.delete(`/forums/${editID}`)
			if (ok) {
				router.reload()
			} else {
				setError(error)
			}
		}
		setLoading(false)
		return
	}

	const updateMainReply = async () => {
		setLoading(true)
		if (editMain) {
			const { ok, error } = await api.put(`/forums/${id}`, {
				question: message
			})
			if (ok) {
				router.reload()
			} else {
				setError(error)
			}
		}
		setLoading(false)
		return
	}
	const deleteMainThread = async () => {
		setLoading(true)
		if (editMain) {
			const { ok, error } = await api.put(`/forums/${id}`, {
				question: message
			})
			if (ok) {
				router.push('/forums')
			} else {
				setError(error)
			}
		}
		setLoading(false)
		return
	}

	const MarkHelpful = async () => {
		setLoading(true)
		try {
			const liked = likeList.find((x) => x.id === profileId)

			if (liked) {
				const likeUpdate = likeList.filter((x) => x.id !== profileId)
				await api.put(`/forums/${id}`, {
					likes: likeUpdate
				})
				setLikeList(likeUpdate)
			} else {
				const likeUpdate = [...likeList, { id: profileId }]
				await api.put(`/forums/${id}`, {
					likes: likeUpdate
				})
				setLikeList(likeUpdate)
			}
			setLoading(false)
		} catch (error) {
			console.error('Error liking the post:', error)
			setLoading(false)
		}
	}
	const MarkReplyHelpful = async ({ postID, likesList }) => {
		setLoading(true)
		try {
			const liked = likesList.find((x) => x.id == profileId)

			if (liked) {
				const likeUpdate = likesList.filter((x) => x.id !== profileId)
				const { data } = await api.put(`/forums/${postID}`, {
					likes: likeUpdate
				})

				setReplies((prevReplies) => {
					return prevReplies.map((reply) => {
						if (reply.id === postID) {
							return { ...reply, likes: data.likes }
						} else if (reply.replies) {
							// If the reply has nested replies, update them recursively
							return {
								...reply,
								replies: reply.replies.map((nestedReply) => {
									if (nestedReply.id === postID) {
										return { ...nestedReply, likes: data.likes }
									}
									return nestedReply
								})
							}
						}
						return reply
					})
				})
			} else {
				const likeUpdate = [...likesList, { id: profileId }]
				const { data } = await api.put(`/forums/${postID}`, {
					likes: likeUpdate
				})
				setReplies((prevReplies) => {
					return prevReplies.map((reply) => {
						if (reply.id === postID) {
							return { ...reply, likes: data.likes }
						} else if (reply.replies) {
							// If the reply has nested replies, update them recursively
							return {
								...reply,
								replies: reply.replies.map((nestedReply) => {
									if (nestedReply.id === postID) {
										return { ...nestedReply, likes: data.likes }
									}
									return nestedReply
								})
							}
						}
						return reply
					})
				})
			}
			setLoading(false)
			return
		} catch (error) {
			console.error('Error liking the post:', error)
			setLoading(false)
			return
		}
	}

	const sortRepliesByParentId = (replyList, singleReply) => {
		const repliesMap = new Map()

		// Create a map of replies based on their parentForum.id

		replyList.forEach((reply) => {
			const parentId = singleReply
				? singleReply.parentForum?.id.toString()
				: reply.parentForum?.id || null

			if (!repliesMap.has(parentId)) {
				repliesMap.set(parentId, [])
			}

			if (singleReply && reply.id == singleReply.parentForum.id) {
				if (!reply.replies) {
					reply.replies = []
				}
				reply.replies.push(singleReply)
				repliesMap.get(parentId).push(reply)
			} else {
				repliesMap.get(parentId).push(reply)
			}
		})

		// Add singleReply to top level if it has no replies
		if (
			singleReply &&
			!repliesMap.has(singleReply.parentForum?.id.toString())
		) {
			repliesMap.set(singleReply.parentForum?.id.toString(), [singleReply])
		}

		// Structure replies hierarchically
		const structuredReplies = []
		repliesMap.forEach((replies, parentId) => {
			// If there are no parents, directly push replies
			if (!parentId) {
				structuredReplies.push(...replies)
			} else {
				const parentIndex = structuredReplies.findIndex(
					(item) => item.id === parentId
				)
				if (parentIndex !== -1) {
					if (!structuredReplies[parentIndex].replies) {
						structuredReplies[parentIndex].replies = []
					}
					structuredReplies[parentIndex].replies.push(...replies)
				} else {
					structuredReplies.push(...replies)
				}
			}
		})

		return structuredReplies
	}

	const seo = {
		title: `Topic - Forum:${forum.name}`,
		description:
			'Join the conversation and make it a positive space for everyone',
		image: 'https://lms.topic.co.za/forum/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<>
			<SEO
				title={seo.title}
				description={seo.description}
				image={seo.image}
				url={seo.url}
			/>
			<div className='flex flex-col gap-2 mb-8 text-white mobile:mb-24'>
				<div className='flex flex-row items-center justify-between mt-2.5'>
					<h1 className='p-2 m-2 text-2xl font-bold rounded-md shadow-md text-themeColorMain'>
						{name}
					</h1>
					<div className='flex flex-row justify-end my-2'>
						<Btn
							className='text-black'
							label='Back'
							color='bg-themeColorMain'
							link='/'
						/>
					</div>
				</div>

				<div className='flex flex-col w-full p-2 rounded-lg shadow-md bg-compBg'>
					<ForumReply
						userName={`${user?.profile?.firstName} ${
							user?.profile?.lastName ? user.profile.lastName : ''
						}`}
						profilePic={user?.profile?.profilePic?.url}
						message={question}
						createdAt={getTimeDifferenceFromPostDate(updated_at)}
						view={true}
					/>

					{editID == id && editMain ? (
						<div className='flex flex-row'>
							<div className='flex flex-col'>
								<div className='m-2'>
									<MdxEditor
										setValue={setMessage}
										value={message ? message : question}
										placeholder='Write your reply here'
									/>
								</div>
								<div className='flex felx-row'>
									<Btn
										disabled={loading || message.length < 1}
										label='Update Topic'
										color='bg-themeColorMain'
										type='submit'
										onClickFunction={() => updateMainReply()}
									/>
									<Btn
										disabled={loading}
										label='Cancel Update'
										color='bg-themeColorMain'
										type='cancel'
										onClickFunction={() => {
											setEditID('')
											setEditMain(false)
										}}
									/>
								</div>
								<div className='my-2'>
									<Alert
										success={success}
										error={error}
									/>
								</div>
							</div>
						</div>
					) : (
						<div className='flex flex-col p-2 mb-2 ml-3 border border-white rounded-md text-textColor mobile:text-xs'>
							<div dangerouslySetInnerHTML={{ __html: question }} />
							{user?.profile?.id == profileId && (
								<div className='flex justify-end '>
									<PencilSquareIcon
										stroke='#D6F379'
										className='w-4 h-4 cursor-pointer'
										onClick={() => {
											setEditID(id)
											setEditMain(true)
										}}
									/>
									<div className='pl-8 '>
										<ImTrashIcon
											className='w-4 h-4 cursor-pointer'
											fill='#F00'
											label='Delete'
											color='bg-themeColorMain'
											type='submit'
											onClick={() => {
												setEditID(id)
												setOpenMain(true)
											}}
										/>
									</div>
								</div>
							)}
						</div>
					)}

					<div className='flex items-center justify-between py-1 ml-2'>
						<div className='flex flex-row items-center'>
							<span className='pr-1 text-xs text-textColor'>
								<div className='flex flex-row justify-between cursor-pointer text-md'>
									<HeartIcon
										fill={
											likeList.find((x) => x.id == profileId) ? '#F00' : 'none'
										}
										stroke={
											likeList.find((x) => x.id == profileId) ? '#F00' : '#fff'
										}
										className='w-6 h-6'
										onClick={() => MarkHelpful()}
									/>
									<div className='pl-1 my-auto '>
										{likeList?.length ? likeList.length : '0'}{' '}
									</div>
									<div className='flex flex-row pl-4'>
										<CommentsIcon className='w-6 h-6' />
										<div className='pl-1 my-auto'>
											{replies?.length ? replies.length : '0'}{' '}
										</div>
									</div>
								</div>
							</span>
						</div>
					</div>
					<div className='flex flex-row my-2'>
						{replies?.length ? (
							<Btn
								className=''
								label={show ? 'Hide Comments' : 'Show Comments'}
								color='bg-themeColorMain'
								onClickFunction={() => setShow(!show)}
							/>
						) : (
							<></>
						)}
						<Btn
							className=''
							label={add ? 'Close Reply' : 'Reply'}
							color='bg-themeColorMain'
							onClickFunction={() => (add ? setAdd(0) : setAdd(id))}
						/>
					</div>
					{/* Main Popup */}
					<Overlay
						bgColor='compBg'
						isOpen={openMain}
						setOpen={setOpenMain}
						width={'full'}
						height={58}
						onClose={() => {
							setOpenMain(false)
							setEditID('')
						}}
						content={
							<>
								<div className='mx-auto overflow-y-auto md:max-w-11/12 '>
									<div className='px-4 py-4 text-left modal-content'>
										<div className='mb-4 text-lg font-bold leading-tight text-center text-textColor'>
											Are you sure you want to delete this Topic?
											<br />
											<span className='mt-1 text-sm font-normal text-textColor'>
												This is a permanent action
											</span>
										</div>
										<div className='flex justify-center'>
											<div className='flex gap-2'>
												<Btn
													onClickFunction={() => deleteMainThread()}
													label='Yes, delete'
													color='bg-themeColorMain'
												/>
												<Btn
													onClickFunction={() => {
														setOpenMain(false)
														setEditID('')
													}}
													label='No, keep'
													color='bg-themeColorMain'
												/>
											</div>
										</div>
									</div>
								</div>
							</>
						}
					/>
					{/* Reply PopUp */}
					<Overlay
						bgColor='compBg'
						isOpen={open}
						setOpen={setOpen}
						width={'full'}
						height={58}
						onClose={() => {
							setOpen(false)
							setEditID('')
						}}
						content={
							<>
								<div className='mx-auto overflow-y-auto md:max-w-11/12 '>
									<div className='px-4 py-4 text-left modal-content'>
										<div className='mb-4 text-lg font-bold leading-tight text-center text-textColor'>
											Are you sure you want to delete this Reply?
											<br />
											<span className='mt-1 text-sm font-normal text-textColor'>
												This is a permanent action
											</span>
										</div>
										<div className='flex justify-center'>
											<div className='flex gap-2'>
												<Btn
													onClickFunction={() => deleteReply()}
													label='Yes, delete'
													color='bg-themeColorMain'
												/>
												<Btn
													onClickFunction={() => {
														setOpen(false)
														setEditID('')
													}}
													label='No, keep'
													color='bg-themeColorMain'
												/>
											</div>
										</div>
									</div>
								</div>
							</>
						}
					/>

					{!show ? (
						<ForumReviewDisplay slug={slug} />
					) : (
						replies?.map((x, i) => (
							<div
								className='my-2 rounded-md text-textColor border-appBg border-1'
								key={`list-${i}`}
							>
								<div className='flex flex-col w-full p-2 rounded-lg shadow-md bg-compBg'>
									<div className='flex flex-row items-start justify-between'>
										<p className='flex flex-row items-start'>
											<div className='items-center px-2 py-2'>
												<Avatar src={x.user?.profile?.profilePic?.url} />
											</div>
											<div className=''>
												<div className='flex-row'>
													{x.user?.profile?.firstName}{' '}
													{x.user?.profile?.lastName
														? x.user.profile.lastName
														: ''}
												</div>
												<div className='flex-row -my-3'>
													{getTimeDifferenceFromPostDate(x.updated_at)}
												</div>
											</div>
										</p>
										<div className='float-right my-2'>
											<Btn
												className=''
												label={add == x.id ? 'Close Reply' : 'Reply'}
												color='bg-themeColorMain'
												onClickFunction={() => (add ? setAdd(0) : setAdd(x.id))}
											/>
										</div>
									</div>

									{editID == x.id ? (
										<div className='flex flex-col'>
											<div className='m-2'>
												<MdxEditor
													setValue={setMessage}
													value={message ? message : x.answer}
													placeholder='Write your reply here'
												/>
											</div>
											<div className='flex flex-row'>
												<Btn
													disabled={loading || message.length < 1}
													label='Update Reply'
													color='bg-themeColorMain'
													type='submit'
													onClickFunction={() => updateReply()}
												/>
												<Btn
													disabled={loading}
													label='Cancel Update'
													color='bg-themeColorMain'
													type='submit'
													onClickFunction={() => {
														setEditID('')
														setMessage('')
													}}
												/>
											</div>
											<div className='my-2'>
												<Alert
													success={success}
													error={error}
												/>
											</div>
										</div>
									) : (
										<div className='mx-2'>
											<div
												className=''
												dangerouslySetInnerHTML={{ __html: x.answer }}
											/>
											{x.user?.profile?.id == profileId && (
												<div className='flex justify-end '>
													<PencilSquareIcon
														stroke='#D6F379'
														className='w-4 h-4 cursor-pointer'
														onClick={() => {
															setEditID(x.id)
														}}
													/>
													<div className='pl-8 '>
														<ImTrashIcon
															className='w-4 h-4 cursor-pointer'
															fill='#F00'
															label='Delete'
															color='bg-themeColorMain'
															type='submit'
															onClick={() => {
																setEditID(x.id)
																setOpen(true)
															}}
														/>
													</div>
												</div>
											)}
										</div>
									)}
									<div className='flex flex-row cursor-pointer text-md'>
										<HeartIcon
											fill={
												x.likes?.find((x) => x.id == profileId)
													? '#F00'
													: 'none'
											}
											stroke={
												x.likes?.find((x) => x.id == profileId)
													? '#F00'
													: '#fff'
											}
											className='w-6 h-6'
											onClick={() =>
												MarkReplyHelpful({ postID: x.id, likesList: x.likes })
											}
										/>
										<div className='pl-1 my-auto '>
											{x.likes?.length ? x.likes.length : '0'}{' '}
										</div>
										<div className='flex flex-row pl-4'>
											<CommentsIcon
												className='w-6 h-6'
												onClick={() =>
													setShowReplies(x.id == showReplies ? 0 : x.id)
												}
											/>
											<div className='pl-1 my-auto'>
												{x.replies?.length ? x.replies.length : '0'}{' '}
											</div>
										</div>
									</div>
								</div>
								{showReplies == x.id ? (
									x.replies.map((y, k) => (
										<div
											className='my-2 rounded-md text-textColor border-appBg border-1'
											key={`list-${i}-${k}`}
										>
											<div className='flex flex-col w-full p-2 rounded-lg shadow-md bg-compBg'>
												<div className='flex flex-row items-start justify-between'>
													<p className='flex flex-row items-start'>
														<div className='items-center px-2 py-2'>
															<Avatar src={y.user?.profile?.profilePic?.url} />
														</div>
														<div className=''>
															<div className='flex-row'>
																{y.user?.profile?.firstName}{' '}
																{y.user?.profile?.lastName
																	? y.user.profile.lastName
																	: ''}
															</div>
															<div className='flex-row -my-3'>
																{getTimeDifferenceFromPostDate(y.updated_at)}
															</div>
														</div>
													</p>
												</div>

												<div className='mx-2'>
													<div
														className=''
														dangerouslySetInnerHTML={{ __html: y.answer }}
													/>
												</div>
												{y.user?.profile?.id == profileId ? (
													<div className='flex flex-col'>
														<div className='m-2'>
															<MdxEditor
																setValue={setMessage}
																value={message}
																placeholder='Write your reply here'
															/>
														</div>
														<Btn
															disabled={loading || message.length < 1}
															label='Submit Reply'
															color='bg-themeColorMain'
															type='submit'
															onClickFunction={() => AddReply()}
														/>
														<div className='my-2'>
															<Alert
																success={success}
																error={error}
															/>
														</div>
													</div>
												) : (
													<></>
												)}
												{y.user?.profile?.id == profileId ? (
													<div className='flex flex-col'>
														<div className='m-2'>
															<MdxEditor
																setValue={setMessage}
																value={message}
																placeholder='Write your reply here'
															/>
														</div>
														<Btn
															disabled={loading || message.length < 1}
															label='Submit Reply'
															color='bg-themeColorMain'
															type='submit'
															onClickFunction={() => AddReply()}
														/>
														<div className='my-2'>
															<Alert
																success={success}
																error={error}
															/>
														</div>
													</div>
												) : (
													<></>
												)}
											</div>
											{add == y.id ? (
												<div className='flex flex-col'>
													<div className='m-2'>
														<MdxEditor
															setValue={setMessage}
															value={message}
															placeholder='Write your reply here'
														/>
													</div>
													<Btn
														disabled={loading || message.length < 1}
														label='Submit Reply'
														color='bg-themeColorMain'
														type='submit'
														onClickFunction={() => AddReply()}
													/>
													<div className='my-2'>
														<Alert
															success={success}
															error={error}
														/>
													</div>
												</div>
											) : (
												<></>
											)}
										</div>
									))
								) : (
									<></>
								)}
								{add == x.id ? (
									<div className='flex flex-col'>
										<div className='m-2'>
											<MdxEditor
												setValue={setMessage}
												value={message}
												placeholder='Write your reply here'
											/>
										</div>
										<Btn
											disabled={loading || message.length < 1}
											label='Submit Reply'
											color='bg-themeColorMain'
											type='submit'
											onClickFunction={() => AddReply()}
										/>
										<div className='my-2'>
											<Alert
												success={success}
												error={error}
											/>
										</div>
									</div>
								) : (
									<></>
								)}
							</div>
						))
					)}
					{add == id ? (
						<div className='flex flex-col'>
							<div className='m-2'>
								<MdxEditor
									setValue={setMessage}
									value={message}
									placeholder='Write your reply here'
								/>
							</div>
							<Btn
								disabled={loading || message.length < 1}
								label='Submit Reply'
								color='bg-themeColorMain'
								type='submit'
								onClickFunction={() => AddReply()}
							/>
							<div className='my-2'>
								<Alert
									success={success}
									error={error}
								/>
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps({ query }) {
	const { id } = query

	const { forums } = await getGQLRequest({
		endpoint: 'forums',
		fields: `id,name,answer,question,likes{id}, saves{id},parentForum{id,likes{id},saves{id}},updated_at,user{profile{id,firstName,lastName,profilePic{url}}},pin`,
		where: `slug:"${id}"`
	})
	const [item1, ...otherItems] = forums

	return {
		props: {
			forum: item1,
			forumListItems: otherItems,
			slug: id
		}
	}
}
export default DisplayForum
