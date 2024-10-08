import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import lodashShuffle from 'lodash.shuffle'
import Alert from '@/components/Alert'
import useStyles from '@/components/Quiz/styles'
import api from '@/api/api'
import getDataRequest from '@/snippets/getDataRequest'
import typesAnswerObjects from '@/snippets/lms/typesAnswerObjects'
import { userId } from '@/context/constants'
import Btn from '@/components/Btn'
import QuizBtn from '@/components/QuizBtn'
import getGQLRequest from '@/snippets/getGQLRequest'

const Survey = ({ lesson, survey, id }) => {
	const router = useRouter()
	if (router.isFallback) {
		return <div className='text-xs text-textColor'>Loading Survey...</div>
	}
	if (!survey?.id) {
		return (
			<p
				className='text-textColor text-md'
				align='center no-item-text'
			>
				Survey not found
			</p>
		)
	}
	const [progress, setProgress] = useState([])
	const classes = useStyles()
	const [redirectTo, setRedirectTo] = useState('')
	const [timeTrack, setTimeTrack] = useState(null)
	let startTime = new Date()
	const [error, setError] = useState('')
	const [questions, setQuestions] = useState([])
	const [surveyResponse, setSurveyResponse] = useState([])
	const [currentQuestion, setCurrentQuestion] = useState(1)
	const [selectedAnswers, setSelectedAnswers] = useState(null)
	const userid = parseInt(userId)

	useEffect(async () => {
		if (userid) {
			const res = await getDataRequest(
				`/survey-responses?user=${userid}&survey=${id}`,
				() => {}
			)
			const time = await getDataRequest(
				`/time-tracks?user=${userid}&survey=${id}`,
				() => {}
			)
			if (!time.length) {
				const timeStamp = new Date()
				const track = await api.post(`/time-tracks`, {
					user: { id: userid },
					lesson: lesson ? { id: lesson.id } : null,
					survey: id ? { id: id } : null,
					timeSpent: (timeStamp - startTime) / 1000 / 60,
					isComplete: 0
				})
				setTimeTrack(track.data)
			} else {
				setTimeTrack(time[0])
			}
			if (res?.length) {
				setSurveyResponse(res[0])
				if (res[0].isCompleted) {
					setRedirectTo(`/${lesson.id}`)
					return
				}
			} else {
				const res = await api.post('/survey-responses', {
					user: {
						id: userid
					},
					survey: id
						? {
								id: id
						  }
						: null,
					lesson: lesson.id
						? {
								id: lesson.id
						  }
						: null,
					response: null,
					answer: [],
					isCompleted: false,
					points: 0
				})
				if (res.ok) {
					setSurveyResponse(res.data)
					return
				} else {
					setError('Something went wrong')
					return
				}
			}
		}
	}, [userid])

	useEffect(() => {
		// Shuffle the answers
		if (survey && survey.questions && survey.questions.length) {
			setQuestions(
				survey.questions.map((question) => {
					const answersArray =
						question[typesAnswerObjects[question.__component].key]

					if (Array.isArray(answersArray)) {
						question[typesAnswerObjects[question.__component].key] =
							shuffleAnswers(answersArray)
					}
					if (question.__component == 'lesson.matrix-sorting') {
						question.answers = {
							criterions: shuffleAnswers(
								question.criterion_answer.map((a) => ({
									id: a.id,
									criterion: a.criterion
								}))
							),
							answers: shuffleAnswers(
								question.criterion_answer.map((a) => ({
									id: a.id,
									answer: a.answer
								}))
							)
						}
					}

					return question
				})
			)
		}
	}, [survey])
	useEffect(() => {
		if (redirectTo) {
			router.push(redirectTo)
		}
	}, [redirectTo])

	const nextQuestion = () => {
		setError('')
		setCurrentQuestion(currentQuestion + 1)
	}

	const previousQuestion = () => {
		setError('')
		setCurrentQuestion(currentQuestion - 1)
	}

	const shuffleAnswers = (answers) => {
		return lodashShuffle(answers)
	}

	const renderCurrentQuestion = () => {
		const questionIndex = currentQuestion - 1
		const currentQuestionObj = questions[questionIndex]
		if (currentQuestionObj) {
			const QuestionComponent =
				typesAnswerObjects[currentQuestionObj.__component].ReactComponent
			const answers =
				currentQuestionObj.__component !== 'lesson.matrix-sorting'
					? currentQuestionObj[
							typesAnswerObjects[currentQuestionObj.__component].key
					  ]
					: currentQuestionObj.answers

			return (
				<QuestionComponent
					questionIndex={questionIndex}
					question={currentQuestionObj}
					answers={answers}
					selectedAnswers={selectedAnswers}
					selectedAnswersSetter={setSelectedAnswers}
				/>
			)
		}

		return (
			<p
				className='text-textColor text-md'
				align='center no-item-text'
			>
				Question not found
			</p>
		)
	}

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

	const submit = async () => {
		setError('')

		if (!selectedAnswers) {
			setError('Please answer all questions')
			return
		}
		if (Object.keys(selectedAnswers).length !== survey.questions.length) {
			setError('Please answer all questions')
			return
		}
		const timeStamp = new Date()
		surveyResponse
			? await api.put(`/survey-responses/${surveyResponse.id}`, {
					response: selectedAnswers,
					answer: Object.values(selectedAnswers),
					isCompleted: true
			  })
			: await api.post(`/survey-responses`, {
					user: { id: userid },
					survey: { id: id },
					lesson: { id: lesson.id },
					response: selectedAnswers,
					answer: Object.values(selectedAnswers),
					isCompleted: true
			  })
		await api.put(`/time-tracks/${timeTrack.id}`, {
			timeSpent: (timeStamp - startTime) / 1000 / 60 + timeTrack.timeSpent,
			isComplete: true
		})
		await findProgress()
		if (userid && lesson?.id && !progress?.isComplete) {
			let completeArray = []
			if (lesson.lmsAssignments) {
				let { assignmentReplies } = await getGQLRequest({
					endpoint: `assignmentReplies`,
					where: `isCompleted:true,assignment:{id:${lesson?.lmsAssignments?.id}},user:{id:${userid}},lesson:{id:${lesson?.id}}`,
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
						where: `isCompleted:true,quiz:{id:${x?.id}},user:{id:${userid}},lesson:{id:${lesson?.id}}`,
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
						where: `isCompleted:true,survey:{id:${x?.id}},user:{id:${userid}},lesson:{id:${lesson?.id}}`,
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
					await api.put(`/progresses/${progress?.id}`, {
						isComplete: 1
					})
				}
			}
		}
		setRedirectTo(`/${lesson.id}`)
		return
	}

	const seo = {
		title: `Topic - ${survey.title}`,
		description: survey.title,
		image: 'https://lms.topic.co.za/lms/logo.png',
		url: 'https://topic.co.za'
	}

	if (!questions.length) {
		return (
			<div>
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
				<p
					className='text-xs text-textColor'
					align='center no-item-text'
				>
					Loading questions...
				</p>
			</div>
		)
	}

	return (
		<>
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

			<div style={{ width: '100%' }}>
				{survey.questions ? (
					<div variant='surveys'>{/* survey to come here */}</div>
				) : (
					<></>
				)}
				{!survey.questions || (
					<div className='w-full px-1'>
						<div className='mb-2'>
							<div className='font-bold text-textColor desktop:text-5xl laptop:text-5xl mobile:text-2xl'>
								{lesson?.subject?.name}
							</div>
							<div className='text-textColor desktop:text-4xl laptop:text-4xl mobile:text-xl'>
								{lesson.title}
								{lesson?.name}
							</div>
						</div>
						<div className='w-full mt-3 rounded-lg desktop:p-4 laptop:p-4 mobile:p-2 bg-themeColorMain'>
							<div className='font-bold text-black desktop:text-3xl laptop:text-3xl mobile:text-lg'>
								Survey
							</div>
						</div>
						<div className='flex flex-row items-center justify-center w-full mt-6 align-middle'>
							<div className='text-sm text-textColor'>
								<span>{currentQuestion}</span> of{' '}
								<span>{survey.questions.length}</span>
							</div>
						</div>
						{/* Survey Type Here */}
						{renderCurrentQuestion()}
						<div className='flex flex-row justify-between mt-4'>
							<Alert error={error} />
						</div>
						<div className='flex flex-row justify-between mt-4'>
							<div
								className={`${
									currentQuestion <= survey.questions.length &&
									currentQuestion > 1
										? 'visible'
										: 'invisible'
								}`}
							>
								<div className={classes.quizNav}>
									<QuizBtn
										clickFunc={previousQuestion}
										addedClasses={`${
											currentQuestion <= survey.questions.length &&
											currentQuestion > 1
												? 'visible'
												: 'invisible'
										}`}
									/>
								</div>
							</div>
							<div
								className={` mt-2 ${
									currentQuestion === survey.questions.length
										? 'visible'
										: 'invisible'
								}`}
							>
								<Btn
									color='bg-themeColorMain'
									label='Submit'
									onClickFunction={submit}
								/>
							</div>
							<div
								className={`${
									currentQuestion < survey.questions.length
										? 'visible'
										: 'invisible'
								}`}
							>
								<div className={classes.quizNav}>
									{/* <IconButton
                    aria-label="nextArrow"
                    onClick={nextQuestion}
                    className={`${
                      currentQuestion < survey.questions.length
                        ? "visible"
                        : "invisible"
                    }`}
                  >
                    <div className="w-5 h-5">
                      <img
                        src={`${baseUrl}/next_arrow.svg`}
                        alt=""
                        style={{ marginLeft: "2px" }}
                      />
                    </div>
                  </IconButton> */}
									<QuizBtn
										next
										clickFunc={nextQuestion}
										addedClasses={`${
											currentQuestion < survey.questions.length
												? 'visible'
												: 'invisible'
										}`}
									/>
								</div>
								<div className='mobile:h-4'></div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export async function getStaticProps({ params }) {
	const { id, lesson } = params
	const lessonData = await getDataRequest(`/lessons/${lesson}`, () => {})
	const survey = await getDataRequest(
		`/lms-surveys/${id}?lessons=${lesson}`,
		() => {}
	)
	return {
		props: {
			lesson: lessonData ? lessonData : null,
			id: id ? parseInt(id) : 0,
			survey: survey ? survey : null
		},
		revalidate: 86400 / 3
	}
}

export async function getStaticPaths() {
	const surveys = await getDataRequest(`/lms-surveys`, () => {})

	// Get the paths we want to pre-render based on quizs
	const paths = surveys.map((post) =>
		post?.lessons.map((x) => ({
			params: { lesson: x.id.toString(), id: post.id.toString() }
		}))
	)
	return {
		paths: paths.flat(),
		fallback: true
	}
}

export default Survey
