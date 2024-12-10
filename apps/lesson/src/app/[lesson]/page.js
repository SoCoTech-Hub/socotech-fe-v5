import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NoSsr } from '@mui/material'
import LessonProgress from '@/components/LessonProgress'
import LessonTabs from '@/components/LessonTabs'
import LessonRating from '@/components/LessonRating/LessonRating'
import Btn from '@/components/Btn'
import Load from '@/components/Load'
import { mainUrl, userId, profileId } from '@/context/constants'
import api from '@/api/api'
import { useMutation, useQuery } from '@apollo/client'
import GetZoomLessonOccupancy from 'graphql/queries/GetZoomLessonOccupancy'
import ZoomLessonCreate from 'graphql/mutations/ZoomLessonCreate'
import ZoomLessonUpdate from 'graphql/mutations/ZoomLessonUpdate'
import getGQLRequest from '@/snippets/getGQLRequest'
import getDataRequest from '@/snippets/getDataRequest'
import { parseCookies } from '@/snippets/parseCookies'
import { convertDateToDaysHoursMinSec } from '@/snippets/convertDateToDaysHoursMinSec'
import { useCountdown } from '@/hooks/useCountDown/useCountDown'

const lesson = ({
	lesson,
	progress,
	// rating,
	required
}) => {
	const router = useRouter()
	//FeatureImage
	const featureImageUrl = () => {
		return lesson.featuredImage
			? lesson.featuredImage.url
			: './featureimage.jpg'
	}

	const [countDownToLessonStart] = useCountdown(lesson.startDate)
	const [countDownToLessonEnd] = useCountdown(lesson.endDate)

	const { data, loading, error } = useQuery(GetZoomLessonOccupancy, {
		variables: { id: lesson.id, profileID: profileId }
	})

	const [createParticipant] = useMutation(ZoomLessonCreate)

	const [updateParticpant] = useMutation(ZoomLessonUpdate)

	const [days, hours, minutes, seconds] = convertDateToDaysHoursMinSec(
		countDownToLessonStart
	)

	useEffect(async () => {
		if (userId && lesson?.id && !progress?.isComplete) {
			const { progresses } = await getGQLRequest({
				endpoint: `progresses`,
				where: `user:{id:${userId}},lesson:{id:${lesson?.id}}`,
				fields: `id,totalSteps,completedSteps,isComplete`
			})
			progress = progresses?.length > 0 ? progresses[0] : []

			let completeArray = []
			if (lesson.lmsAssignments) {
				let { assignmentReplies } = await getGQLRequest({
					endpoint: `assignmentReplies`,
					where: `isCompleted:true,assignment:[${lesson?.lmsAssignments?.map(
						(assignment) => assignment.id
					)}],students:{id:${userId}},lesson:{id:${lesson?.id}}`,
					fields: `id`
				})
				if (assignmentReplies.length > 0) {
					completeArray.push(true)
				} else {
					completeArray.push(false)
					return
				}
			}
			if (lesson.lmsQuizs?.length > 0) {
				await lesson.lmsQuizs?.map(async (x) => {
					let { quizResponses } = await getGQLRequest({
						endpoint: `quizResponses`,
						where: `isCompleted:true,quiz:{id:${x?.id}},user:{id:${userId}},lesson:{id:${lesson?.id}}`,
						fields: `id`
					})
					if (quizResponses.length > 0) {
						completeArray.push(true)
					} else {
						completeArray.push(false)
						return
					}
				})
			}
			if (lesson.lmsSurveys?.length > 0) {
				await lesson.lmsSurveys?.map(async (x) => {
					let { surveyResponses } = await getGQLRequest({
						endpoint: `surveyResponses`,
						where: `isCompleted:true,survey:{id:${x?.id}},user:{id:${userId}},lesson:{id:${lesson?.id}}`,
						fields: `id`
					})
					if (surveyResponses.length > 0) {
						completeArray.push(true)
					} else {
						completeArray.push(false)
						return
					}
				})
			}
			if (
				!completeArray.includes(false) &&
				progress?.id &&
				!progress?.isComplete
			) {
				const response = await getDataRequest(
					`/time-tracks?lesson=${lesson?.id}&user=${userId}&quiz_null=true&survey_null=true`,
					() => {}
				)
				if (
					response.length &&
					response[0]?.timeSpent >= lesson?.modules[0]?.duration
				) {
					await api.put(`/time-tracks/${response[0].id}`, {
						isComplete: 1
					})
				}
				if (progress?.totalSteps === progress?.completedSteps) {
					await api
						.put(`/progresses/${progress?.id}`, {
							isComplete: 1
						})
						.then(() => {
							router.reload()
						})
				}
			}
		}
	}, [lesson.id])

	if (loading) {
		return (
			<>
				<Load />
			</>
		)
	}

	if (error) {
		console.error(error)
		return null
	}

	const handleLiveLessonClick = () => {
		if (data.lessonCurrent?.aggregate?.count >= data.lessonTotal[0]?.capacity) {
			router.push(`/livelessonfull`)
		} else if (lesson.link?.startsWith('http')) {
			window.location.href = lesson.link
		} else {
			if (data?.lessonUser?.length > 0) {
				updateParticpant({
					variables: {
						id: data?.lessonUser[0]?.id,
						active: true
					},
					onCompleted: () => {
						window.location.href = `${mainUrl}/zoom/webinar/${lesson.id}/${lesson.link}?participantID=${data?.lessonUser[0]?.id}`
					}
				})
			} else {
				createParticipant({
					variables: {
						id: profileId,
						lessonID: lesson.id,
						active: true
					},
					onCompleted: (zoomLessonData) => {
						window.location.href = `${mainUrl}/zoom/webinar/${lesson.id}/${lesson.link}?participantID=${zoomLessonData.createZoomLesson.zoomLesson.id}`
					}
				})
			}
		}
	}

	const seo = {
		title: `Topic - ${lesson.name}`,
		description: lesson.name,
		image: 'https://lms.topic.co.za/lms/logo.png',
		url: 'https://topic.co.za'
	}

	return lesson ? (
		<NoSsr>
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

			<div className=''>
				<img
					src={featureImageUrl()}
					alt='Lesson Image'
					className='object-cover w-full rounded-lg h-60 mobile:h-28'
				/>
				<div className='flex flex-col space-y-7 mobile:space-y-4'>
					<div className='w-full item'>
						<LessonProgress
							progresses={progress}
							lesson={lesson}
							// rating={rating}
							// hasRating={lesson.hasRating}
						/>
					</div>
					{lesson.isLiveLesson && (
						<div className='w-full mb-3 item'>
							{countDownToLessonStart > 0 ? (
								<p>
									Starting in:{' '}
									<span className='text-sm font-bold'>
										{`${
											days > 0 ? `${days} day(s)` : ''
										} ${hours}h ${minutes}min ${seconds}s`}
									</span>
								</p>
							) : (
								<>
									{countDownToLessonEnd > 0 ? (
										<Btn
											label='Start Lesson'
											color='bg-themeColorSecondary'
											target={
												lesson.link?.startsWith('http') ? '_blank' : '_self'
											}
											onClickFunction={() => handleLiveLessonClick()}
										/>
									) : lesson.modules.length ? (
										<Btn
											label='View Recording'
											color='bg-themeColorSecondary'
											link={`/${lesson.id}/module/${lesson.modules[0].id}`}
										/>
									) : (
										<p className='text-sm font-bold'>
											This session has ended. Recording coming soon
										</p>
									)}
								</>
							)}
						</div>
					)}
						<div className='w-full item'>
							<LessonTabs
								lesson={lesson}
								required={required}
							/>
						</div>
					{lesson.hasRating ? (
						<div className='w-full '>
							<LessonRating lesson={lesson} />
						</div>
					) : (
						<div className='w-full ' />
					)}
				</div>
			</div>
		</NoSsr>
	) : (
		<>
			<Head>
				<title>Lesson Not Found</title>
				<meta
					name='description'
					content='Lesson Not Found'
					key='title'
				/>
			</Head>
			<h>Oh no, Lesson not found</h>
		</>
	)
}

export async function getServerSideProps(context) {
	const { lesson } = context.query
	const cookies = parseCookies(context.req)
	const userId = parseInt(cookies.userid)
	if (lesson == '[object Object]') {
		return {
			props: {
				lesson: [],
				progress: [],
				// rating: '',
				required: []
			}
		}
	}
	const lessonObj = await getDataRequest(`/lessons/${lesson}`, () => {})
	const { progresses } = await getGQLRequest({
		endpoint: `progresses`,
		where: `user:{id:${userId}},lesson:{id:${lesson}}`,
		fields: `id,totalSteps,completedSteps,isComplete`
	})
	// const rating = await getDataRequest(
	//   `/lesson-ratings?user=${userId}&lesson=${lesson}`,
	//   () => {}
	// )
	let required = lessonObj.requiredLesson
		? await getGQLRequest({
				endpoint: `progresses`,
				where: `lesson:{id:${lesson.requiredLesson.id}},user:{id:${userId}},isComplete:true`,
				fields: `id,totalSteps,completedSteps,isComplete`
		  })
		: 0

	return {
		props: {
			lesson: lessonObj ? lessonObj : [],
			progress: progresses.length ? progresses[0] : [],
			// rating: rating ? rating[0] : "",
			required: required ? required.progresses : required
		}
	}
}

export default lesson
