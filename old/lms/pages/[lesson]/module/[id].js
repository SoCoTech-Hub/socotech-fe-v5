import { forwardRef, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box } from 'reflexbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Slide from '@mui/material/Slide'
import Alert from '@/components/Alert'
import PaperComponent from '@/components/PaperComponent'
import LessonProgressBar from '@/components/LessonProgressBar'
import LessonListDisplay from '@/components/LessonListDisplay'
import Btn from '@/components/Btn'
import VideoPlayer from '@/components/VideoPlayer'
import AWSVideoPlayer from '@/components/VideoPlayer2'
import Load from '@/components/Load'
import api from '@/api/api'
import { useMutation, useQuery } from '@apollo/client'
import GetLessonModuleNote from 'graphql/queries/GetLessonModuleNote'
import NotesCreate from 'graphql/mutations/NotesCreate'
import NotesUpdate from 'graphql/mutations/NotesUpdate'
import { cloudinaryVideoUrl, userId, profileId } from '@/context/constants'
import { getNextButtonHref } from '@/lib/utils'
import getDataRequest from '@/snippets/getDataRequest'
import TimeTracks from '@/snippets/timeTracks'
import getGQLRequest from '@/snippets/getGQLRequest'

let timeSpent = 0

const Transition = forwardRef(function Transition(props, ref) {
	return (
		<Slide
			direction='up'
			ref={ref}
			{...props}
		/>
	)
})

const Module = ({ lesson, module }) => {
	const router = useRouter()

	if (router.isFallback) {
		return <div>Loading lesson...</div>
	}
	const [progress, setProgress] = useState([])
	const [errorMessages, setErrorMessages] = useState('')
	const [completed, setCompleted] = useState(0)
	const [timeTrack, setTimeTrack] = useState(null)
	let startTime = new Date()
	let [lessonTime, setLessonTime] = useState(0)
	const [open, setOpen] = useState(false)

	const [nextButtonHref, setNextButtonHref] = useState('/')

	const [noteText, setNoteText] = useState(data?.notes[0]?.note || '')
	const [noteID, setNoteID] = useState()

	const { data, loading, error } = useQuery(GetLessonModuleNote, {
		variables: { lessonID: lesson.id, profileID: profileId },
		fetchPolicy: 'network-only',
		onCompleted: (userNote) => {
			setNoteText(userNote?.notes[0]?.note)
			setNoteID(userNote.notes[0]?.id)
		}
	})

	const [createNote] = useMutation(NotesCreate, {
		variables: {
			name: module.title,
			note: noteText,
			read: false,
			lessonModule: lesson.id,
			subject: lesson.subject.id,
			profile: profileId
		},
		onCompleted: (userNote) => {
			setNoteID(userNote.createNote.note.id)
		}
	})

	const [updateNote] = useMutation(NotesUpdate, {
		variables: { id: noteID, name: module.title, note: noteText }
	})

	const findProgress = async () => {
		const progresses = await getDataRequest(
			`/progresses?lesson=${lesson?.id}&user=${userId}`,
			() => {}
		) // using getDataReq due to cache
		if (progresses) {
			setProgress(progresses[0])
			return progresses[0]
		}
		return []
	}

	useEffect(async () => {
		if (userId) {
			await findProgress()
			const response = await getDataRequest(
				`/time-tracks?lesson=${lesson?.id}&user=${userId}&lessonModule=${module?.id}`,
				() => {}
			)
			if (!response.length) {
				const timeStamp = new Date()
				const time = await api.post(`/time-tracks/`, {
					user: { id: userId },
					lesson: lesson ? { id: lesson.id } : null,
					lessonModule: module ? { id: module.id } : null,
					timeSpent: (timeStamp - startTime) / 1000 / 60,
					isComplete: 0
				})
				setLessonTime(time)
				setCompleted(0)
			}
		}
	}, [])

	useEffect(() => {
		document.addEventListener('keyup', (e) => {
			if (e.key == 'PrintScreen') {
				navigator.clipboard.writeText('')
				alert('Screenshots disabled!')
			}
		})
		document.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.key == 'p') {
				alert('This section is not allowed to print or export to PDF')
				e.cancelBubble = true
				e.preventDefault()
				e.stopImmediatePropagation()
			}
			if (e.ctrlKey && e.key == 's') {
				alert('This section is not allowed to be saved')
				e.cancelBubble = true
				e.preventDefault()
				e.stopImmediatePropagation()
			}
		})
	}, [])
	useEffect(async () => {
		if (userId && lesson?.id && !progress?.isComplete) {
			let completeArray = []
			if (lesson?.lmsAssignments?.id) {
				let { assignmentReplies } = await getGQLRequest({
					endpoint: `assignmentReplies`,
					where: `isCompleted:true,assignment:{id:${lesson?.lmsAssignments?.id}},user:{id:${userId}},lesson:{id:${lesson?.id}}`,
					fields: `id`
				})
				if (assignmentReplies.length > 0) {
					completeArray?.push(true)
				} else {
					completeArray?.push(false)
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
						completeArray?.push(true)
					} else {
						completeArray?.push(false)
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
						completeArray?.push(true)
					} else {
						completeArray?.push(false)
						return
					}
				})
			}

			await findProgress()
			if (
				!completeArray.includes(false) &&
				progress?.id &&
				!progress?.isComplete
			) {
				const timeStamp = new Date()
				if (
					timeTrack?.length &&
					(timeStamp - startTime) / 1000 / 60 >= module?.duration
				) {
					const res = await api.put(`/time-tracks/${timeTrack[0]?.id}`, {
						isComplete: 1
					})
					if (res.ok) {
						setCompleted(1)
					} else {
						setErrorMessages('Something went wrong')
						return
					}
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

	useEffect(async () => {
		if (timeTrack?.length) {
			setCompleted(timeTrack[0].isComplete)
			timeSpent = timeTrack[0].timeSpent
			if (
				(lessonTime?.data ? lessonTime?.data?.timeSpent : lessonTime) +
					timeSpent +
					1 >=
				module?.duration
			) {
				await api
					.put(`/time-tracks/${timeTrack[0]?.id}`, {
						timeSpent: timeSpent + 1,
						isComplete: 1
					})
					.then(async () => {
						await findProgress()
					})
			}
		}
	}, [timeTrack])

	useEffect(async () => {
		setNextButtonHref('/')
		const href = await getNextButtonHref(lesson?.id, 'module', module?.id)
		setNextButtonHref(href)
	}, [])

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

	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
		if (noteID) {
			updateNote()
		} else {
			createNote()
		}
	}

	const markLessonComplete = async () => {
		if (timeTrack.length) {
			if (completed == 0) {
				const timeStamp = new Date()
				const res = await api.put(`/time-tracks/${timeTrack[0].id}`, {
					timeSpent: (timeStamp - startTime) / 1000 / 60,
					isComplete: 1
				})
				if (res.ok) {
					setCompleted(1)
				} else {
					setErrorMessages('Something went wrong')
					return
				}
			}
			router.push(nextButtonHref)
		}
		return
	}

	const seo = {
		title: `Topic - ${module.title}`,
		description: module.title,
		image: 'https://lms.topic.co.za/lms/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<>
			{module ? (
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
			) : (
				<Head>
					<title>Lesson: Module not found</title>
					<meta
						name='description'
						content='Lesson: Module not found'
						key='title'
					/>
				</Head>
			)}
			<LessonProgressBar
				lesson={lesson}
				progresses={progress}
			/>
			{lesson && module && !timeTrack ? (
				<TimeTracks
					lesson={lesson.id}
					module={module.id}
					activity='lessonModule'
					lessonResponseSetter={setTimeTrack}
				/>
			) : (
				<></>
			)}
			<div className=''>
				{module?.videoLink ? (
					module.videoLink.startsWith(process.env.NEXT_PUBLIC_CLOUDFRONT) ? (
						<AWSVideoPlayer src={module.videoLink} />
					) : module.videoLink.startsWith(cloudinaryVideoUrl) ? (
						<>
							{/* !!! workaround due to transforamtion overusage !!! */}
							<VideoPlayer src={module.videoLink} />
						</>
					) : (
						<video
							controls
							className='w-full h-96'
							src={module.videoLink}
						>
							{/* <source src={module.videoLink} type='video/*' />  */}
						</video>
					)
				) : module.content ? (
					<>
						<style
							dangerouslySetInnerHTML={{
								__html: module.content.css
							}}
						></style>
						<Box variant='container'>
							<div
								className='mt-5'
								dangerouslySetInnerHTML={{
									__html: module.content.html
								}}
							></div>
						</Box>
					</>
				) : (
					<></>
				)}
			</div>

			<div className='mt-2 mb-4'>
				<LessonListDisplay
					modules={lesson.modules}
					assignments={lesson.lmsAssignments}
					quizs={lesson.lmsQuizs}
					surveys={lesson.lmsSurveys}
					lessonid={lesson.id}
				/>
			</div>
			{/* Take Notes */}
			<div className='flex flex-row flex-wrap justify-center gap-2'>
				<Btn
					label='Back to Lesson'
					link={`/${lesson.id}`}
					onClickFunction={null}
					color='bg-themeColorMain'
					width='36'
					padding='py-2'
					// fontWeight='bold'
				/>
				<>
					{(lessonTime?.data ? lessonTime?.data?.timeSpent : lessonTime) +
						timeSpent +
						1 >=
						module?.duration && (
						<div className='mr-2'>
							<Btn
								label='Next step'
								color='bg-themeColorMain'
								link={nextButtonHref}
								onClickFunction={markLessonComplete}
								width='36'
								padding='py-2'
								// fontWeight='bold'
							/>
						</div>
					)}
					<Alert error={errorMessages} />
				</>
				<div className='pb-5'>
					<Btn
						label='Take notes'
						onClickFunction={handleClickOpen}
						color='bg-themeColorMain'
						width='36'
						padding='py-2'
						// fontWeight='bold'
					/>
					<Dialog
						disableBackdropClick={true}
						hideBackdrop
						disableScrollLock
						TransitionComponent={Transition}
						open={open}
						onClose={handleClose}
						PaperComponent={PaperComponent}
						aria-labelledby='draggable-dialog-title'
					>
						<div className='border-2 border-white rounded-lg bg-compBg text-textColor'>
							<DialogTitle
								style={{ cursor: 'move' }}
								id='draggable-dialog-title'
							>
								Lesson Notes
							</DialogTitle>
							<DialogContent>
								<DialogContentText>
									<TextareaAutosize
										className='px-2 my-2 border-2 rounded-lg'
										id='user_note'
										name='user_note'
										maxRows={4}
										minRows={4}
										value={noteText}
										onChange={(e) => setNoteText(e.target.value)}
										placeholder='Type notes here...'
										style={{
											width: '250px',
											backgroundColor: '#181818',
											color: 'white'
										}}
									></TextareaAutosize>
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<div className='flex flex-row justify-center w-full'>
									<div className=''>
										<Btn
											color='bg-themeColorMain'
											label='Save Notes'
											onClickFunction={handleClose}
										/>
									</div>
								</div>
							</DialogActions>
						</div>
					</Dialog>
				</div>
				<div className='mobile:h-4'></div>
			</div>
		</>
	)
}
// export async function getServerSideProps({ params }) {
// 	const { id, lesson } = params
// 	const { lesson: lessonData } = await getGQLRequest({
// 		endpoint: 'lesson',
// 		findOne: true,
// 		id: lesson,
// 		fields:
// 			'id, subject { id, name }, lmsQuizs {id, title, siyavulaActivityIds}, lmsSurveys { id, title}, lmsAssignments { id,  title,  question}, modules {  id, title}'
// 	})
// 	const module = await getDataRequest(
// 		`/lesson-modules/${id}?lessons=${lesson}`,
// 		() => {}
// 	)

// 	return {
// 		props: {
// 			lesson: lessonData ? lessonData : null,
// 			module: module ? module : null
// 		}
// 	}
// }

export async function getStaticProps({ params }) {
	const { id, lesson } = params
	const { lesson: lessonData } = await getGQLRequest({
		endpoint: 'lesson',
		findOne: true,
		id: lesson,
		fields:
			'id, subject { id, name }, lmsQuizs {id, title, siyavulaActivityIds}, lmsSurveys { id, title}, lmsAssignments { id,  title,  question}, modules {  id, title}'
	})
	const module = await getDataRequest(
		`/lesson-modules/${id}?lessons=${lesson}`,
		() => {}
	)

	return {
		props: {
			lesson: lessonData ? lessonData : null,
			module: module ? module : null
		},
		revalidate: 3600 //1 hour to revalidate (in seconds)
	}
}

export async function getStaticPaths() {
	const modules = await getDataRequest(`/lesson-modules`, () => {})

	// Get the paths we want to pre-render based on quizs
	const paths = modules.map((module) =>
		module?.lessons.map((x) => ({
			params: { lesson: x.id.toString(), id: module.id.toString() }
		}))
	)
	return {
		paths: paths.flat(),
		fallback: 'blocking'
	}
}

export default Module
