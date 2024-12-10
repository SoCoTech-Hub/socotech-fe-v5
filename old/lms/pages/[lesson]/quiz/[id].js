import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import lodashShuffle from 'lodash.shuffle'
import Alert from '@/components/Alert'
import Btn from '@/components/Btn'
import useStyles from '@/components/Quiz/styles'
import api from '@/api/api'
import getDataRequest from '@/snippets/getDataRequest'
import typesAnswerObjects from '@/snippets/lms/typesAnswerObjects'
import { userId } from '@/context/constants'
import QuizBtn from '@/components/QuizBtn'

const Quiz = ({ lesson, quiz, id }) => {
	const router = useRouter()
	if (router.isFallback) {
		return <div className='text-xs text-textColor'>Loading Quiz...</div>
	}
	if (!quiz?.id) {
		return (
			<p
				className='text-textColor text-md'
				align='center no-item-text'
			>
				Quiz not found
			</p>
		)
	}

	const classes = useStyles()
	const [redirectTo, setRedirectTo] = useState('')
	const [isComplete, setIsComplete] = useState(false)
	const [timeTrack, setTimeTrack] = useState(null)
	let startTime = new Date()
	const [error, setError] = useState('')
	const [questions, setQuestions] = useState([])
	const [quizResponse, setQuizResponse] = useState(null)
	const [currentQuestion, setCurrentQuestion] = useState(1)
	const [selectedAnswers, setSelectedAnswers] = useState([])
	const userid = parseInt(userId)

	useEffect(async () => {
		if (userid) {
			const res = await getDataRequest(
				`/quiz-responses?user=${userid}&quiz=${id}`,
				() => {}
			)
			const time = await getDataRequest(
				`/time-tracks?user=${userid}&quiz=${id}`,
				() => {}
			)
			if (!time.length) {
				const timeStamp = new Date()
				const track = await api.post(`/time-tracks`, {
					user: { id: userid },
					lesson: lesson ? { id: lesson.id } : null,
					quiz: id ? { id: id } : null,
					timeSpent: (timeStamp - startTime) / 1000 / 60,
					isComplete: 0
				})
				setTimeTrack(track.data)
			} else {
				setTimeTrack(time[0])
			}
			if (res?.length) {
				setQuizResponse(res[0])
				if (res[0].isCompleted) {
					setRedirectTo(`/${lesson.id}/quiz/result/${quiz.id}`)
					// setRedirectTo(`/${lesson.id}`)
					return
				}
			} else {
				const res = await api.post('/quiz-responses', {
					user: {
						id: userid
					},
					quiz: id
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
					isCompleted: false,
					answer: [],
					points: 0
				})
				if (res.ok) {
					setQuizResponse(res.data)
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
		if (quiz && quiz.questions && quiz.questions.length) {
			setQuestions(
				quiz.questions.map((question) => {
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
	}, [quiz])

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

	const submit = async () => {
		setError('')

		if (!selectedAnswers) {
			setError('Please answer all questions')
			return
		}

		if (Object.keys(selectedAnswers).length !== quiz.questions.length) {
			setError('Please answer all questions')
			return
		}

		let totalPoints = 0
		let newResponse = {}

		Object.keys(selectedAnswers).map((index) => {
			let answerPoints = 0

			const selectedAnswer = selectedAnswers[index]
			const currentQuestionObj = quiz.questions[index]
			const key = typesAnswerObjects[selectedAnswer?.__component].key
			if (selectedAnswer?.__component === 'lesson.single-choice-quiz') {
				const answerObj = currentQuestionObj[key].filter(
					(a) => a.id === selectedAnswer.single_answer[0].id
				)[0]

				if (answerObj && answerObj.is_correct) {
					answerPoints += 1
				}
			}

			if (selectedAnswer?.__component === 'lesson.multiple-choice-quiz') {
				selectedAnswer.answer.map((answer) => {
					const answerObj = currentQuestionObj[key].filter(
						(a) => a.id === answer.id
					)[0]
					if (answerObj && answerObj.is_correct) {
						answerPoints += 1
					}
				})
			}

			if (selectedAnswer?.__component === 'lesson.essay') {
				const keywordsArray = currentQuestionObj[key].map((a) =>
					a.keyword.toString().toLowerCase()
				)
				const answerText = selectedAnswer.answer.toString().toLowerCase()
				const keywordsMatch = keywordsArray.filter((keyword) =>
					answerText.includes(keyword)
				)
				answerPoints += keywordsMatch.length
			}

			if (selectedAnswer?.__component === 'lesson.fill-blank') {
				const isCorrect =
					selectedAnswer?.answer.toString().toLowerCase().replace(/ /g, '') ==
					currentQuestionObj.answer.toString().toLowerCase().replace(/ /g, '')

				if (isCorrect) {
					answerPoints += 1
				}
			}

			if (selectedAnswer?.__component === 'lesson.free-choice') {
				const answerSplit = selectedAnswer.answer
					.toString()
					.toLowerCase()
					.split(' ')
				const answersArray = currentQuestionObj[key].map((a) =>
					a.answer.toString().toLowerCase().split(' ')
				)
				const isCorrect = answerSplit.filter((word) =>
					answersArray.some((answer) => answer.includes(word))
				)

				if (isCorrect.length) {
					answerPoints += 1
				}
			}

			if (selectedAnswer?.__component === 'lesson.sorting-choice') {
				const answerObj = currentQuestionObj[key].map((a) => a.id).sort()

				if (
					JSON.stringify(answerObj) === JSON.stringify(selectedAnswer.answer)
				) {
					answerPoints += 1
				}
			}

			if (selectedAnswer?.__component === 'lesson.matrix-sorting') {
				selectedAnswer.criterion_answer.map((x) => {
					if (x.criterion.id == x.answer.id) {
						answerPoints += 1
					}
				})
			}

			const newSelectedAnswers = { ...selectedAnswers }
			newSelectedAnswers[index].points = answerPoints

			totalPoints += answerPoints
			setSelectedAnswers(newSelectedAnswers)
			newResponse = newSelectedAnswers
		})

		const timeStamp = new Date()
		let res = {}
		try {
			quizResponse
				? (res = await api.put(`/quiz-responses/${quizResponse.id}`, {
						response: Object.values(newResponse),
						// answer: Object.values(newResponse),
						isCompleted: true,
						points: totalPoints
				  }))
				: (res = await api.post(`/quiz-responses`, {
						user: { id: userid },
						quiz: { id: id },
						lesson: { id: lesson.id },
						response: Object.values(newResponse),
						// answer: Object.values(newResponse),
						isCompleted: true,
						points: totalPoints
				  }))
			if (res.ok) {
				await api.put(`/time-tracks/${timeTrack.id}`, {
					timeSpent: (timeStamp - startTime) / 1000 / 60 + timeTrack.timeSpent,
					isComplete: true
				})
			} else {
				console.log({ res })
				return
			}
		} catch (e) {
			console.log(e)
			return
		}
		setRedirectTo(`/${lesson.id}/quiz/result/${quiz.id}`)
		return
	}

	const seo = {
		title: `Topic - ${quiz.title}`,
		description: quiz.title,
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
				{quiz.questions ? (
					<div variant='surveys'>{/* survey to come here */}</div>
				) : (
					<></>
				)}
				{quiz.isSiyavula && (
					<div variant='container'>
						<div className='text-xl text-textColor'>
							Siyavula Quiz Integration Coming Soon
						</div>
					</div>
				)}
				{!quiz.questions ||
					(!quiz.isSiyavula && (
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
									Quiz
								</div>
							</div>
							<div className='flex flex-row items-center justify-center w-full mt-6 align-middle'>
								<div className='text-sm text-textColor'>
									<span>{currentQuestion}</span> of{' '}
									<span>{quiz.questions.length}</span>
								</div>
							</div>
							{/* Quiz Type Here */}
							{renderCurrentQuestion()}
							<div className='flex flex-row justify-between'>
								<Alert error={error} />
							</div>
							<div className='flex flex-row justify-between mt-2 mb-10'>
								<div
									className={`${
										currentQuestion <= quiz.questions.length &&
										currentQuestion > 1
											? 'visible'
											: 'invisible'
									}`}
								>
									<div className={classes.quizNav}>
										<QuizBtn
											clickFunc={previousQuestion}
											addedClasses={`${
												currentQuestion <= quiz.questions.length &&
												currentQuestion > 1
													? 'visible'
													: 'invisible'
											}`}
										/>
									</div>
								</div>
								<div
									className={`mt-1 ${
										currentQuestion === quiz.questions.length
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
										currentQuestion < quiz.questions.length
											? 'visible'
											: 'invisible'
									}`}
								>
									<div className={classes.quizNav}>
										<QuizBtn
											next
											clickFunc={nextQuestion}
											addedClasses={`${
												currentQuestion < quiz.questions.length
													? 'visible'
													: 'invisible'
											}`}
										/>
									</div>
									<div className='mobile:h-4'></div>
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	)
}

export async function getStaticProps({ params }) {
	const { id, lesson } = params
	const lessonData = await getDataRequest(`/lessons/${lesson}`, () => {})
	const quiz = await getDataRequest(
		`/lms-quizs/${id}?lessons=${lesson}`,
		() => {}
	)
	return {
		props: {
			lesson: lessonData ? lessonData : null,
			id: id ? parseInt(id) : 0,
			quiz: quiz ? quiz : null
		},
		revalidate: 86400 / 3
	}
}

export async function getStaticPaths() {
	const quizs = await getDataRequest(`/lms-quizs`, () => {})

	// Get the paths we want to pre-render based on quizs
	const paths = quizs.map((post) =>
		post?.lessons.map((x) => ({
			params: { lesson: x.id.toString(), id: post.id.toString() }
		}))
	)
	return {
		paths: paths.flat(),
		fallback: true
	}
}

export default Quiz
