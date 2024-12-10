import { useEffect, useRef, useState } from 'react'
import {
	// Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	//InputBase,
	Rating,
	TextareaAutosize
} from '@mui/material'
import RatingsDisplay from '@/components/RatingsDisplay'
import RatingBox from '@/components/RatingBox'
// import LessonReplyForm from "@/components/LessonReplyForm"
import LessonReviewDisplay from '@/components/LessonReviewDisplay'
import api from '@/api/api'
import { mapLessonRating, range, STARS } from '@/lib/utils'
import { profileId } from '@/context/constants'
import Btn from '@/components/Btn'
import router from 'next/router'
import ContentLock from '../ContentLock'
const LessonRating = ({ lesson }) => {
	const emptyReview = {
		starRating: 0,
		description: '',
		user: { id: profileId }, //called user but linked to profile
		lesson: { id: lesson.id }
	}
	const replyInputRef = useRef(null)

	const [total, setTotal] = useState(0)
	const [setReply] = useState(emptyReview)
	const [review, setReview] = useState(emptyReview)
	const [average, setAverage] = useState(0)
	const [setDisabled] = useState(true)
	const [submitted] = useState(0)
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
			.then(({ ok }) => (ok ? router.reload() : null))

	// const submitReply = async () => {
	//   submit(reply)
	//   setReply(emptyReview)
	//   setDisabled(true)
	//   replyInputRef.current.value = ""
	// }

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
			<div className='mb-3 ml-3 text-textColor'>Ratings & Reviews</div>
			<div className='p-4 rounded-lg shadow-outline bg-compBg   mobile:mb-8'>
				<div className='flex items-center justify-between w-full gap-2 mobile:flex-wrap'>
					<div className='desktop:w-1/3 laptop:w-1/3 mobile:w-full mobile:mb-4 '>
						<RatingBox
							average={average}
							total={total}
						/>
					</div>
					<div className='desktop:w-1/3 laptop:w-1/3 mobile:w-full desktop:border-l-2 laptop:border-l-2 desktop:border-r-2 laptop:border-r-2 col-4 border-themeColorMain'>
						<div className='flex h-48 justify-self-center item'>
							<div className='self-center w-full'>
								<RatingsDisplay ratings={ratings} />
							</div>
						</div>
					</div>

					{lesson.hasReview ? (
						<div className='desktop:w-1/3 laptop:w-1/3 mobile:w-full mobile:mt-2'>
							<div className='flex flex-wrap items-center w-full h-48 p-4 rounded-lg bg-themeColorMain'>
								<div className='w-full mb-1 text-center text-black'>
									Tell us about your experience.
								</div>
								<div className='w-full text-center text-black'>
									We would love to know.
								</div>
								<div className='flex justify-center w-full mt-2'>
									{/* <Btn
										color='bg-black'
										label='Write a review'
										onClickFunction={toggleReviewModal}
									/> */}
									<ContentLock
										price={lesson?.price}
										bgColor={'bg-compBg'}
										children={
											<>
												<button
													onClick={() => toggleReviewModal()}
													className='w-full pt-2 pb-2 text-xs font-bold text-center bg-black rounded-full text-themeColorMain'
												>
													Write a review
												</button>
											</>
										}
									/>

									<Dialog
										open={isModalOpen}
										onClose={toggleReviewModal}
										aria-labelledby='form-dialog-title'
									>
										<div className='bg-compBg border-2 border-textColor rounded-lg'>
											<DialogTitle
												id='form-dialog-title text-center'
												className='text-textColor'
											>
												Review this lesson
											</DialogTitle>
											<DialogContent>
												<DialogContentText>
													<div className='text-textColor'>
														Rate your experience
													</div>
												</DialogContentText>

												<Rating
													style={{ stroke: '#fff' }}
													name='user-rating-stars'
													onChange={(_, value) =>
														setReview({
															...review,
															starRating: value
														})
													}
													size='small'
												/>

												<div className='my-2 mt-3 text-base text-textColor'>
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
													className='w-full p-4 rounded-lg bg-compBg border-2 text-textColor border-textColor'
												/>
											</DialogContent>
											<DialogActions className='mx-auto '>
												<Btn
													label='Submit'
													color='bg-themeColorMain'
													disable={isEmptyReview}
													onClickFunction={toggleReviewModal}
												/>

												{/* <Button
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
                          paddingRight: '1em',
                        }}
                      >
                        Submit
                      </Button> */}
											</DialogActions>
										</div>
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
						{/* <div className="w-1/2 item">
              <div className="ml-5 text-base font-bold">Sort by:</div>
              <InputBase
                className="w-full px-4 py-2 text-gray-700 rounded-lg bg-compBg"
                placeholder="Type something..."
              />
            </div> */}
						{/* <div className="w-1/2 item">
              <div className="ml-5 text-base font-bold">Filter by:</div>
              <InputBase
                className="w-full px-4 py-2 text-gray-700 rounded-lg bg-compBg"
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
						userId={profileId}
						lessonId={lesson.id}
						setReply={setReply}
						submitted={submitted}
						setIsDisabled={setDisabled}
						replyInputRef={replyInputRef}
					/>
					{/* <div className="mt-4 ">
            <LessonReplyForm
              isDisabled={disabled}
              inputRef={replyInputRef}
              onSubmit={submitReply}
            />
          </div> */}
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default LessonRating
