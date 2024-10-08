import { useState, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Script from 'next/script'
import { Box } from 'reflexbox'
import { makeStyles } from '@mui/styles'
import Link from 'next/link'
import 'react-circular-progressbar/dist/styles.css'
import { getNextButtonHref } from '@/lib/utils'
import Essay from '@/components/Quiz/Essay'
import FillBlank from '@/components/Quiz/FillBlank'
import FreeChoice from '@/components/Quiz/FreeChoice'
import MatrixSort from '@/components/Quiz/MatrixSort'
import MultipleChoice from '@/components/Quiz/MultipleChoice'
import SingleChoice from '@/components/Quiz/SingleChoice'
import SortingChoice from '@/components/Quiz/SortingChoice'
import api from '@/api/api'
import getDataRequest from '@/snippets/getDataRequest'
import { parseCookies } from '@/snippets/parseCookies'
// import { baseUrl } from "@/context/constants"
import Btn from '@/components/Btn'
import QuizBtn from '@/components/QuizBtn'
import LessonQuizProgressBar from '@/components/LessonProgressMenu/LessonQuizProgressBar'
import { baseUrl } from '@/context/constants'
import Overlay from '@/components/Overlay'

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex'
	},
	quizNav: {
		'& .MuiIconButton-root': {
			flex: '0 0 auto',
			backgroundColor: '#F6C253',
			padding: '10px',
			overflow: 'visible',
			borderRadius: '50%',
			color: '#ffffff'
		}
	},
	doughnutWrapper: {
		width: 128,
		height: 128
	}
}))

const typesAnswerObjects = {
	'lesson.single-choice-quiz': {
		key: 'single_answer',
		answer_key: 'answer',
		ReactComponent: SingleChoice,
		object: {
			is_correct: false,
			answer: '',
			// points: 10,
			media: null
		}
	},
	'lesson.multiple-choice-quiz': {
		key: 'answer',
		answer_key: 'answer',
		ReactComponent: MultipleChoice,
		object: {
			is_correct: false,
			answer: '',
			// points: null,
			media: null
		}
	},
	'lesson.free-choice': {
		key: 'correct_answer',
		ReactComponent: FreeChoice,
		answer_key: 'answer',
		object: {
			answer: ''
		}
	},
	'lesson.fill-blank': {
		key: 'answer',
		ReactComponent: FillBlank,
		answer_key: 'answer'
	},
	'lesson.essay': {
		key: 'keyword',
		ReactComponent: Essay,
		answer_key: 'keyword',
		object: {
			keyword: ''
		}
	},
	'lesson.sorting-choice': {
		key: 'answer',
		ReactComponent: SortingChoice,
		answer_key: 'answer',
		object: {
			answer: ''
		}
	},
	'lesson.matrix-sorting': {
		key: 'criterion_answer',
		ReactComponent: MatrixSort,
		answer_key: 'answer',
		object: {
			criterion: '',
			answer: ''
		}
	}
}

const QuizResult = ({
	id,
	questions,
	lesson,
	quizResponseId,
	Module,
	SelectedAnswers,
	TotalScore,
	ShowTotalScore
}) => {
	if (!id) {
		return <>Results not found</>
	}
	const classes = useStyles()
	const [selectedAnswers, setSelectedAnswers] = useState(SelectedAnswers)
	const [showTotalScore, setShowTotalScore] = useState(ShowTotalScore)
	const [currentQuestion, setCurrentQuestion] = useState(1)
	// const [minPassRate, setMinPassRate] = useState(0)
	const [loading, setLoading] = useState(false)
	const [nextButtonHref, setNextButtonHref] = useState('/')
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (Module) {
			const fetchNextButtonHref = async () => {
				setNextButtonHref('/')
				const href = await getNextButtonHref(lesson.id, 'quiz', Module.id)
				setNextButtonHref(href)
			}
			fetchNextButtonHref()
		}
	}, [Module])

	// useEffect(() => {
	//   if (showTotalScore) {
	//     const getMinPassRate = async () => {
	//       const response = await getDataRequest(`/lessons/${lesson.id}`, () => {})

	//       let minPassRateRes = 0

	//       if (response.length) {
	//         minPassRateRes = response[0].min_pass_rate
	//       }

	//       setMinPassRate(minPassRateRes)
	//     }

	//     getMinPassRate()
	//   }
	// }, [showTotalScore])

	const nextQuestion = () => {
		setCurrentQuestion(currentQuestion + 1)
	}

	const previousQuestion = () => {
		setCurrentQuestion(currentQuestion - 1)
	}

	const renderCurrentQuestion = () => {
		const questionIndex = currentQuestion - 1
		const currentQuestionObj = questions[questionIndex]

		if (currentQuestionObj) {
			const QuestionComponent =
				typesAnswerObjects[currentQuestionObj.__component].ReactComponent
			let answers =
				currentQuestionObj[
					typesAnswerObjects[currentQuestionObj.__component].key
				]

			if (currentQuestionObj.__component === 'lesson.matrix-sorting') {
				answers = {
					criterions: answers.map((a) => ({
						id: a.id,
						criterion: a.criterion
					})),
					answers: answers.map((a) => ({
						id: a.id,
						answer: a.answer
					}))
				}
			}

			return (
				<QuestionComponent
					questionIndex={questionIndex}
					question={currentQuestionObj}
					answers={answers}
					selectedAnswers={selectedAnswers}
					selectedAnswersSetter={setSelectedAnswers}
					isResult
				/>
			)
		}

		return <p align='center'>Question not found</p>
	}

	if (SelectedAnswers === null) {
		return <p align='center'>Loading result...</p>
	}

	const getQuizTotalScore = (isSiyavula) => {
		let totalPoints = 0

		if (isSiyavula) {
			SelectedAnswers.map(
				(answer) => (totalPoints += [].concat.apply([], answer.correct).length)
			)
		} else {
			questions.map((question) => {
				const key = typesAnswerObjects[question.__component].key

				if (
					question.__component === 'lesson.single-choice-quiz' ||
					question.__component === 'lesson.fill-blank' ||
					question.__component === 'lesson.free-choice' ||
					question.__component === 'lesson.sorting-choice'
				) {
					totalPoints += 1
				} else {
					if (question.__component === 'lesson.matrix-sorting') {
						totalPoints += question[key].length
					}
					if (question.__component === 'lesson.multiple-choice-quiz') {
						totalPoints += question[key].filter((a) => a.is_correct).length
					}

					if (question.__component === 'lesson.essay') {
						totalPoints += question[key].length
					}
				}
			})
		}

		return totalPoints
	}

	const confirmRetry = async () => {
		if (!quizResponseId) {
			return
		}
		setLoading(true)

		try {
			await api.delete(`/quiz-responses/${quizResponseId}`)
			const activityIds = Module.siyavula_activity_ids
			const reRoute = Module.isSiyavula
				? `/${lesson.id}/quiz/siyavula/${activityIds[0]}`
				: `/${lesson.id}/quiz/${id}`
			setLoading(false)
			Router.push(reRoute)
		} catch (err) {
			console.error(err)
		}
	}

	if (showTotalScore) {
		const quizTotalScore = getQuizTotalScore(Module.isSiyavula)
		const percentAccuracy = parseInt(
			((TotalScore / quizTotalScore) * 100).toFixed(0)
		)
		const href =
			// percentAccuracy >= parseInt(minPassRate)
			// ? nextButtonHref
			// : `/${lesson.id}`
			nextButtonHref

		/* NextButton */
		return (
			<Box
				variant='container'
				style={{ clear: 'both' }}
			>
				<div className='flex flex-col'>
					<div
						className='mt-3 mb-4 rounded-lg desktop:p-6 laptop:p-6 mobile:p-2'
						style={{
							backgroundColor:
								percentAccuracy < 50
									? '#e85640'
									: percentAccuracy < 100
									? '#f8d833'
									: '#d2ef79'
						}}
					>
						<div className='font-bold text-center text-textColor banner-main-text'>
							<img
								src={`${baseUrl}${
									percentAccuracy < 50
										? '/oops.gif'
										: percentAccuracy < 100
										? '/better.gif'
										: '/success.gif'
								}`}
								className='w-1/2 mx-auto mobile:w-full'
							/>
						</div>
					</div>
					<div>
						<div className='w-full p-3 text-xs rounded-lg mobile:p-1 mobile:bg-navbarBg bg-compBg shadow-menu mobile:font-bold'>
							<div
								className={`text-textColor mobile:mb-2 mobile:text-xl ${Text}`}
							>
								Quiz Results
							</div>
							<div className={` text-textColor ${Text}`}>
								<LessonQuizProgressBar
									percentAccuracy={percentAccuracy}
									subject={lesson.subject}
									lesson={lesson}
								/>
							</div>
							<div className='flex flex-row justify-end mt-2'>
								<Btn
									label='Retry Quiz'
									color='bg-themeColorMain'
									onClickFunction={() => setIsOpen(true)}
								/>

								<Link
									href={href}
									passHref
								>
									<Btn
										color='bg-themeColorMain'
										label='Next'
										link={href}
									/>
								</Link>
							</div>
						</div>
					</div>

					{/* <div className='overflow-scroll divide-y divide-gray-200 rounded-lg mobile:px-4 mobile:bg-compBg max-h-80 no-scrolly'>
						<div className='py-1'></div>
					</div> */}
				</div>
				<Overlay
					bgColor='compBg'
					setOpen={setIsOpen}
					isOpen={isOpen}
					width={'fit'}
					height={58}
					onClose={() => setIsOpen(false)}
					content={
						<>
							<div className='bg-compBg text-textColor'>
								<div className='text-xl text-textColor'>Are you sure?</div>
								<div className='my-4 text-sm'>
									Once you proceed, your current Quiz result will be deleted and
									you should do the Quiz again!
								</div>

								{loading ? (
									<div className='mx-4'>
										<Btn
											label={loading ? 'Loading...' : ''}
											color='bg-themeColorMain'
										/>
									</div>
								) : (
									<div className='flex flex-row justify-center'>
										<div className='mx-4'>
											<Btn
												label='Close'
												color='bg-themeColorMain mx-4'
												onClickFunction={() => setIsOpen(false)}
											/>
										</div>
										<div className='mx-4'>
											<Btn
												label={loading ? 'Loading...' : 'Confirm'}
												onClickFunction={confirmRetry}
												color='bg-themeColorMain'
											/>
										</div>
									</div>
								)}
							</div>
						</>
					}
				/>
			</Box>
		)
	}

	const seo = {
		title: `Topic - ${Module.title}`,
		description: Module.title,
		image: 'https://lms.topic.co.za/lms/logo.png',
		url: 'https://topic.co.za'
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
				<Script
					id='MathJax-script'
					src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
				></Script>
				<Script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/latest.js?config=AM_CHTML'></Script>
			</Head>
			{Module.questions && (
				<>
					<Box variant='quizs'>{/* Quiz to come here */}</Box>
				</>
			)}
			{Module.isSiyavula && (
				<Box variant='container'>
					<div className='text-sm text-textColor'>
						Siyavula Quiz Integration Coming Soon
					</div>
				</Box>
			)}
			{!Module.questions ||
				(!Module.isSiyavula && (
					<Box variant='container'>
						<div className=''>
							<div className='w-full rounded-lg desktop:p-6 laptop:p-6 mobile:p-2 bg-themeColorMain'>
								<div className='text-xl font-bold text-black'>
									{lesson.topic}
								</div>
								<div className='text-textColor menu-name'>{lesson.title}</div>
								<div className='text-base font-bold text-black desktop:mt-5 laptop:mt-5 mobileLmt-2'>
									Quiz
								</div>
							</div>
							<div className='flex flex-row items-center justify-between mt-6 align-middle'>
								<div className={classes.quizNav}>
									{/* <IconButton
                    aria-label="triangleClose"
                    onClick={previousQuestion}
                    className={`${
                      currentQuestion <= Module.questions.length &&
                      currentQuestion > 1
                        ? "visible"
                        : "invisible"
                    }`}>
                    <div className="w-4 h-4">
                      <img
                        src={`${baseUrl}/triangle_close.svg`}
                        alt=""
                        style={{ marginLeft: "-2px", padding: "1px" }}
                      />
                    </div>
                  </IconButton> */}
								</div>
								<div className='text-sm text-textColor'>
									<span>{currentQuestion}</span> of{' '}
									<span>{Module.questions.length}</span>
								</div>
								<div className={classes.quizNav}>
									{/* <IconButton
                    aria-label="triangleOpen"
                    onClick={nextQuestion}
                    className={`${
                      currentQuestion < Module.questions.length
                        ? "visible"
                        : "invisible"
                    }`}>
                    <div className="w-4 h-4">
                      <img
                        src={`${baseUrl}/triangle_open.svg`}
                        alt=""
                        style={{ marginLeft: "2px", padding: "1px" }}
                      />
                    </div>
                  </IconButton> */}
								</div>
							</div>

							{/* Quiz Type Here */}
							{renderCurrentQuestion()}

							<div className='flex flex-row justify-between mt-4 mb-16'>
								<div
									className={`${
										currentQuestion <= Module.questions.length &&
										currentQuestion > 1
											? 'visible'
											: 'invisible'
									}`}
								>
									<QuizBtn
										clickFunc={previousQuestion}
										addedClasses={`${
											currentQuestion <= Module.questions.length &&
											currentQuestion > 1
												? 'visible'
												: 'invisible'
										}`}
									/>
									{/* <Btn
                    color="bg-themeColorMain"
                    label="Previous"
                    onClickFunction={previousQuestion}
                  /> */}
									{/* <button
                    onClick={previousQuestion}
                    className="w-32 py-1 font-bold text-center text-white rounded-full cursor-pointer bg-themeColorMain"
                  >
                    Previous
                  </button> */}
								</div>
								<div
									className={`  ${
										currentQuestion === Module.questions.length
											? 'visible'
											: 'invisible'
									}`}
								>
									<Btn
										color='bg-themeColorSecondary'
										label='Show Total Score'
										onClickFunction={() => setShowTotalScore(true)}
									/>
									{/* <button
                    onClick={() => setShowTotalScore(true)}
                    className="py-1 font-bold text-center text-white rounded-full cursor-pointer w-44 bg-themeColorSecondary"
                  >
                    Show Total Score
                  </button> */}
								</div>
								<div
									className={`${
										currentQuestion < Module.questions.length
											? 'visible'
											: 'invisible'
									}`}
								>
									<QuizBtn
										next
										clickFunc={nextQuestion}
										addedClasses={`${
											currentQuestion < Module.questions.length
												? 'visible'
												: 'invisible'
										}`}
									/>
									{/* <Btn
                    color="bg-themeColorMain"
                    label="Next"
                    onClickFunction={nextQuestion}
                  /> */}
									{/* <button
                    onClick={nextQuestion}
                    className="w-32 py-1 font-bold text-center text-white rounded-full cursor-pointer bg-themeColorMain"
                  >
                    Next
                  </button> */}
								</div>
							</div>
							<div className='mobile:h-4'></div>
						</div>
						{!Module && (
							<p
								className='text-textColor text-md'
								align='center no-item-text'
							>
								Quiz Not Found
							</p>
						)}
					</Box>
				))}
		</>
	)
}

export async function getServerSideProps(context) {
	const { id, lesson } = context.query
	const cookies = parseCookies(context.req)
	const userId = parseInt(cookies.userid)

	let quizResponse = await getDataRequest(
		`/quiz-responses?user=${userId}&quiz=${id}&lesson=${lesson}&isCompleted=true`,
		() => {}
	)
	const lessonData = await getDataRequest(`/lessons/${lesson}`, () => {})
	return {
		props: {
			id: id ? id : 0,
			questions: quizResponse ? quizResponse[0].quiz.questions : [],
			lesson: lessonData ? lessonData : [],
			quizResponseId: quizResponse ? quizResponse[0].id : 0,
			Module: quizResponse ? quizResponse[0].quiz : [],
			SelectedAnswers: quizResponse ? quizResponse[0].response : [],
			TotalScore: quizResponse ? quizResponse[0].points : 0,
			ShowTotalScore: quizResponse ? quizResponse[0].quiz.isSiyavula : 0
		}
	}
}

export default QuizResult
