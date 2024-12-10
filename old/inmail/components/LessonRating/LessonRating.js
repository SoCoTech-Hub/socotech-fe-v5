import { useEffect, useRef, useState } from 'react'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	InputBase,
	Rating,
	TextareaAutosize
} from '@mui/material'
import RatingsDisplay from '@/components/RatingsDisplay'
import RatingBox from '@/components/RatingBox'
import LessonReplyForm from '@/components/LessonReplyForm'
import LessonReviewDisplay from '@/components/LessonReviewDisplay'
import api from '@/api/api'
import { mapLessonRating, range, STARS } from '@/lib/utils'

const LessonRating = ({ lesson, userid }) => {
	const emptyReview = {
		starRating: 0,
		description: '',
		user: { id: userid },
		lesson: { id: lesson.id }
	}

	const replyInputRef = useRef(null)

	const [total, setTotal] = useState(0)
	const [reply, setReply] = useState(emptyReview)
	const [review, setReview] = useState(emptyReview)
	const [average, setAverage] = useState(0)
	const [disabled, setDisabled] = useState(true)
	const [submitted, setSubmitted] = useState(0)
	const [isModalOpen, setModalOpen] = useState(false)
	const [ratings, setRatings] = useState(STARS)

	const isEmptyReview = review.starRating === 0 || review.description === ''

	const toggleReviewModal = () => setModalOpen(!isModalOpen)

	const getCount = async (id) =>
		api
			.get(`/lesson-ratings/count?starRating=${id}&lesson=${lesson.id}`)
			.then((response) => ({
				id: id,
				percentage: 0,
				total: response.data ?? 0
			}))

	const submit = async (obj) =>
		api
			.post('lesson-ratings', obj)
			.then(({ ok }) => (ok ? setSubmitted(submitted + 1) : null))

	const submitReply = async () => {
		submit(reply)
		setReply(emptyReview)
		setDisabled(true)
		replyInputRef.current.value = ''
	}

	const submitReview = async () => submit(review)

	useEffect(async () => {
		const requests = range(1, 5).map(getCount)

		await Promise.all(requests)
			.then(mapLessonRating)
			.then(({ total, average, ratings }) => {
				setTotal(total)
				setAverage(average)
				setRatings(ratings)
			})
			.catch((error) => console.error('[getting ratings]', error.message))
	}, [submitted])

	useEffect(async () => {
		if (!isModalOpen && !isEmptyReview) {
			await submitReview()
				.catch((error) => console.error('[submitting review]', error.message))
				.finally(() => setReview(emptyReview))
		}
	}, [isModalOpen, isEmptyReview])

	return (
		<div className=''>
			<div className='mb-3 ml-3 font-semibold text-ls'>Ratings & Reviews</div>
			<div className='p-4 rounded-lg shadow-outline bg-compBg'>
				<div className='flex flex-row items-center justify-between w-full space-x-2'>
					<div className=''>
						<RatingBox
							average={average}
							total={total}
						/>
					</div>
					<div className='border-l-2 border-r-2 col-4 border-borderRating'>
						<div className='flex h-48 justify-self-center item'>
							<div className='self-center w-full'>
								<RatingsDisplay ratings={ratings} />
							</div>
						</div>
					</div>

					{lesson.hasReview ? (
						<div className=''>
							<div className='h-48 p-4 rounded-lg w-52 bg-themeColorMain'>
								<div className='mb-1 text-textColor text-md'>
									Tell us about your experience.
								</div>
								<div className='text-textColor text-md '>
									We would love to know.
								</div>
								<div className='mt-2'>
									<button
										onClick={toggleReviewModal}
										className='w-full pt-2 pb-2 text-base font-bold text-center bg-compBg rounded-full text-themeColorMain'
									>
										Write a review
									</button>
									<Dialog
										open={isModalOpen}
										onClose={toggleReviewModal}
										aria-labelledby='form-dialog-title'
									>
										<DialogTitle id='form-dialog-title text-center'>
											Review this lesson
										</DialogTitle>
										<DialogContent>
											<DialogContentText>
												Rate your experience
											</DialogContentText>
											<Rating
												name='user-rating-stars'
												onChange={(_, value) =>
													setReview({
														...review,
														starRating: value
													})
												}
												size='small'
											/>

											<div className='my-2 text-base font-bold'>
												Tell us about it:
											</div>
											<TextareaAutosize
												minRows={3}
												maxRows={5}
												onChange={(e) =>
													setReview({
														...review,
														description: e.target.value
													})
												}
												placeholder='Write a description of your experience...'
												defaultValue=''
												value={review.description}
												className='w-full p-5 bg-compBg rounded-lg'
											/>
										</DialogContent>
										<DialogActions className='mx-auto'>
											<Button
												onClick={toggleReviewModal}
												disabled={isEmptyReview}
												style={{
													backgroundColor: '#6255D0',
													width: '240px',
													borderRadius: '99999px',
													color: '#ffffff',
													textTransform: 'none',
													fontWeight: 'bold',
													paddingTop: '1em',
													paddingBottom: '1em',
													paddingLeft: '1em',
													paddingRight: '1em'
												}}
											>
												Submit
											</Button>
										</DialogActions>
									</Dialog>
								</div>
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
				{lesson.hasComment ? (
					<div className='flex flex-row w-full mt-3 space-x-5 justify-evenly'>
						<div className='w-1/2 item'>
							<div className='ml-5 text-base font-bold'>Sort by:</div>
							<InputBase
								className='w-full px-4 py-2 bg-compBg rounded-lg text-textColor'
								placeholder='Type something...'
							/>
						</div>
						{/* <div className="w-1/2 item">
              <div className="ml-5 text-base font-bold">Filter by:</div>
              <InputBase
                className="w-full px-4 py-2 text-gray-700 bg-compBg rounded-lg"
                placeholder="Type something..."
              />
            </div> */}
					</div>
				) : (
					<></>
				)}
			</div>
			{lesson.hasComment ? (
				<div>
					<LessonReviewDisplay
						userId={userid}
						lessonId={lesson.id}
						setReply={setReply}
						submitted={submitted}
						setIsDisabled={setDisabled}
						setSubmitted={setSubmitted}
						replyInputRef={replyInputRef}
					/>
					<div className='mt-4 '>
						<LessonReplyForm
							isDisabled={disabled}
							inputRef={replyInputRef}
							onSubmit={submitReply}
						/>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default LessonRating
