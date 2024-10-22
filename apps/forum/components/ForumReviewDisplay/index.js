import { useEffect, useState } from 'react'
import { Avatar, Rating } from '@mui/material'
import { useStyles } from './style'
import api from '@/api/api'
import getGQLRequest from '@/snippets/getGQLRequest'
import { HeartIcon, LmsHelpfulIcon } from '@/components/SvgIcons'
import countRatings from '@/snippets/gql/countRatings'
import router from 'next/router'

const ForumReviewDisplay = ({ slug }) => {
	const classes = useStyles()
	const [parentRating, setParentRating] = useState(null)
	const [lessonRatings, setLessonRatings] = useState([])
	const reviews = lessonRatings.filter((rating) => rating.parentRating === null)
	const replies = lessonRatings.filter((rating) => rating.parentRating !== null)

	useEffect(async () => {
		let { forums } = await getGQLRequest({
			endpoint: `forums`,
			stateSetter: setLessonRatings,
			fields: `id,name,answer,likes{id}, saves{id},parentForum{id,likes{id},saves{id}},
      created_at,user{profile{id,firstName,lastName,profilePic{url}}},pin`,
			where: `slug:"${slug}"`
		})
		if (forums) {
			forums.map((x) =>
				x.parentForum ? gethelpfulCount(x.parentForum.id) : ''
			)
		}
	}, [])

	const gethelpfulCount = async (id) => {
		let result = await countRatings({
			id
		})
		updatehelpfulCount({ id, count: result.forumConnection })
	}

	const sethelpful = ({ parent, helpful }) => {
		api
			.put(`lesson-ratings/${parent}`, {
				helpful: parseInt(helpful) ? parseInt(helpful) : 0 + 1,
				lesson: { id: slug }
			})
			.then(({ ok }) => (ok ? router.reload() : null))
	}

	const updatehelpfulCount = ({ id, count }) => {
		const span = document.querySelector(`span#review-helpful-count-${id}`)
		if (span) span.innerHTML = count ?? 0
	}

	const displayChildren = (id) => {
		replies
			.filter((reply) => reply.parentRating.id === id)
			.map((reply) => Comment({ review: reply }))
	}

	const Comment = ({ review, hasChildren = false }) => (
		<div key={review.id}>
			{/* Reviews Start */}
			<div className='w-full p-3 rounded-lg shadow-outline desktop:mt-3 laptop:mt-3 mobile:mt-0 mobile:mb-3 bg-compBg'>
				<div className='flex space-x-2'>
					<div className=' item'>
						<div className='flex pt-1'>
							<Avatar
								alt={`Profile Image of ${review.user?.firstName} ${review.user?.lastName}`}
								src={review.user?.profilePic ? review.user?.profilePic.url : ''}
								className={classes.review}
								style={{ border: '2px solid #81cc71' }}
							/>
						</div>
					</div>
					<div className=' item'>
						<div className='flex flex-col'>
							<div className=' text-textColor'>{`${
								review.user?.firstName ? review.user.firstName : 'Unknown'
							} ${review.user?.lastName ? review.user.lastName : ''}`}</div>
							{review.starRating > 0 ? (
								<div className='text-base'>
									<Rating
										name='user rating'
										value={review.starRating}
										size='small'
										readOnly
										style={{
											color: 'rgba(214, 243, 121)'
										}}
									/>
								</div>
							) : (
								''
							)}
							<div className='text-xs text-textColor'>
								Posted:{' '}
								<span className=' text-textColor'>
									{new Date(review.created_at).toLocaleString()}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className='w-full pt-3 '>
					{/* <div className="text-base font-bold">{review.title}</div> */}
					<div className='my-3 text-md text-textColor'>
						{review?.description}
					</div>
					<div className='flex flex-row items-center py-2 space-x-1 align-items-middle'>
						{/* <div className='item'>
							<div className='text-sm text-textColor'>Helpful?</div>
						</div> */}
						<div
							className='pr-1 item'
							key={`review-helpful-count-${review.id}`}
						>
							<HeartIcon
								className='w-4 h-4 cursor-pointer '
								onClick={() =>
									sethelpful({
										parent: review.id,
										helpful: review.helpful
									})
								}
								style={{ fill: '#00eaff' }}
							/>
						</div>
						{review.helpful >= 1 ? (
							<div className='item'>
								<div className='px-1 text-base border-l border-black text-textColor'>
									<span>{review.helpful}</span> <HeartIcon />
								</div>
							</div>
						) : (
							<></>
						)}
						{/* <div className='item'>
              <div className='px-1 text-base border-l border-black'>
                <span>{review.helpful >= 1 ? review.helpful : '0'}</span>{' '}
                {review.helpful > 1 ? 'people' : 'person'} found this helpful
              </div>
            </div> */}
						{/* <div className="item">
              <img
                alt="Review Replay"
                src="./reply.svg"
                className="w-5 h-5 cursor-pointer"
                onClick={() => focusReplyInput(review.id, userId)}
              />
            </div> */}
					</div>
				</div>
			</div>
			{hasChildren ? (
				<div className='flex flex-col justify-items-end '>
					<div className='w-full ml-5 border-l-2 item border-themePrimary'>
						<div>{displayChildren(review.id)}</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	)

	if (reviews.length) {
		return reviews?.map((review) =>
			Comment({
				review,
				hasChildren: review.parentRating ? false : true
			})
		)
	} else {
		return <></>
	}
}

export default ForumReviewDisplay
