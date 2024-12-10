import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Script from 'next/script'
import { Box } from '@mui/material'
import { Alert, AlertTitle } from '@mui/material'
import Cookies from 'js-cookie'
import api from '@/api/api'
import userid from '@/snippets/getUserid'
import {
	getSiyavulaClientToken,
	getSiyavulaUserToken,
	getSiyavulaAnswers
} from '@/lib/siyavula'
import TimeTracks from '@/snippets/timeTracks'
import getDataRequest from '@/snippets/getDataRequest'

const SiyavulaQuiz = ({
	lesson,
	quizId,
	quizTitle,
	nextActivityId,
	activityId,
	activityIds
}) => {
	const [nextDisabled] = useState(false)
	const [submitDisabled, setSubmitDisabled] = useState(false)
	const [redirectTo, setRedirectTo] = useState('')

	const hasSiyavulaAccess = parseInt(Cookies.get('hasSiyavulaAccess'))
	const userUniqueId = decodeURI(Cookies.get('userUniqueId')).replace(
		/\s/gi,
		''
	)

	const [clientToken, setClientToken] = useState(null)
	const [userToken, setUserToken] = useState(null)

	useEffect(() => {
		if (quizId && userid) {
			const fetchQuizResponse = async () => {
				const quizResponse = await api.get('/quiz-responses', {
					user: userid,
					quiz: quizId
				})

				// Redirect the user to the previous page if it already completed the quiz before
				if (quizResponse.data.length && quizResponse.data[0].completed) {
					setRedirectTo(`/${lesson.id}`)
					return
				}
			}

			fetchQuizResponse()
		}
	}, [quizId, userid])

	useEffect(() => {
		if (redirectTo) {
			Router.push(redirectTo)
		}
	}, [redirectTo])

	useEffect(() => {
		const fetchSiyavulaToken = async () => {
			if (!hasSiyavulaAccess) {
				setRedirectTo(`/${lesson.id}`)
				return
			}

			const resToken = await getSiyavulaClientToken(setClientToken)
			await getSiyavulaUserToken(userUniqueId, resToken, setUserToken)
		}

		fetchSiyavulaToken()
	}, [])

	const submitQuiz = async (e) => {
		e.preventDefault()
		setSubmitDisabled(true)

		try {
			const siyavulaAnswers = await getSiyavulaAnswers(
				userUniqueId,
				clientToken
			)

			const attemptedAnswers = activityIds.map((aId) => {
				return siyavulaAnswers.filter(
					(answer) => answer.template_id === aId && answer.attempted
				)[0]
			})

			let maxPoints = 0

			const userAnswers = attemptedAnswers.map((answer) => {
				let points = 0

				const answerArrrayConcat = [].concat.apply([], answer.correct)
				points = answerArrrayConcat.filter((answer) => answer).length
				maxPoints += points

				return {
					activityId: answer.template_id,
					responses: answer.responses,
					durations: answer.durations,
					marks: answer.marks,
					correct: answer.correct,
					correctness: answer.correctness,
					random_seed: answer.random_seed,
					difficulty: answer.difficulty,
					attempted: answer.attempted,
					subject: answer.subject,
					activity_type: answer.activity_type,
					points: points
				}
			})

			await api.post(`/quiz-responses`, {
				user: {
					id: userid
				},
				quiz: {
					id: quizId
				},
				lesson: {
					id: lesson.id
				},
				response: userAnswers,
				completed: true,
				inprogress: false,
				points: maxPoints
			})

			document.location.href = `/lms/${lesson.id}/quiz/result/${quizId}`
		} catch (err) {
			setSubmitDisabled(false)
			console.error(err)
		}
	}

	const seo = {
		title:`Topic - ${quizTitle}`,
		description: quizTitle,
		image: 'https://lms.topic.co.za/auth/logo.png',
		url: 'https://topic.co.za'
	}

	if (!userToken) {
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
					align='center'
				>
					Loading question...
				</p>
			</div>
		)
	}

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
				<link
					rel='stylesheet'
					href='https://www.siyavula.com/static/themes/emas/siyavula-api/siyavula-api.min.css'
				/>
				<Script
					dangerouslySetInnerHTML={{
						__html: `
            var baseUrl = 'https://www.siyavula.com/';
            var token = '${clientToken}';
            var userToken = '${userToken}';
            var activityType = 'standalone';
            var templateId = ${activityId};
            var randomSeed;
            `
					}}
				></Script>
				<Script
					dangerouslySetInnerHTML={{
						__html: `
              // select the target node
              var target = document.querySelector('#question-content');

              // create an observer instance
              var observer = new MutationObserver(function(mutations) {
                if (mutations[0].type === 'childList' && document.querySelector('#check-answer-button')) {
                  document.querySelector('#check-answer-button').addEventListener("click", function (e) {
                    var data = Array.from(
                      new FormData(document.querySelector('form[name="questions"]')),
                      e => e.map(encodeURIComponent)
                    ).filter(e => e[0].startsWith('question') && !e[0].endsWith('readonly'))

                    var notAnswered = data.filter(e => e[1] === '')

                    if (notAnswered.length > 0) {
                      e.preventDefault()

                      if (!document.querySelector('#answer-error-alert')) {
                        var alertError = document.createElement('div')
                        alertError.id = 'answer-error-alert'
                        alertError.innerHTML = '<div class="MuiPaper-root MuiAlert-root MuiAlert-standardError MuiPaper-elevation0" role="alert"><div class="MuiAlert-icon"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg></div><div class="MuiAlert-message">Please, answer all the question before clicking the <strong>Final Check</strong> button</div></div>'


                        var my_element = document.getElementById('check-answer-button')
                        my_element.parentNode.insertBefore(alertError, my_element)
                      }
                    }
                  });
                } else {
                  document.querySelector('#bottom-action-buttons').style.display = 'flex'
                }
              });

              // configuration of the observer:
              var config = { attributes: true, childList: true, characterData: true }

              // pass in the target node, as well as the observer options
              observer.observe(target, config);
            `
					}}
				></Script>
				<Script
					type='text/javascript'
					src='https://www.siyavula.com/static/themes/emas/node_modules/mathjax/MathJax.js?config=TeX-MML-AM_HTMLorMML-full'
				></Script>
				<Script
					type='text/javascript'
					src='https://www.siyavula.com/static/themes/emas/siyavula-api/siyavula-api.js'
				></Script>
			</Head>
			<Box variant='container'>
				{lesson && quizId ? (
					<TimeTracks
						lesson={lesson.id}
						module={quizId}
						activity='quiz'
					/>
				) : (
					<></>
				)}
				<main
					key={`main-activity-${activityId}`}
					className='sv-region-main emas sv'
					style={{ paddingTop: 0, paddingBottom: 0 }}
				>
					<div
						id='monassis'
						className='monassis monassis--practice monassis--maths monassis--siyavula-api'
					>
						<div className='question-wrapper'>
							<div
								className='question-content'
								id='question-content'
							></div>
						</div>
					</div>
				</main>

				<div style={{ display: 'none' }}>
					<Alert severity='warning'>
						<AlertTitle>Warning</AlertTitle>
					</Alert>
				</div>

				<div
					className='flex flex-row justify-between mt-4'
					id='bottom-action-buttons'
					style={{ display: 'none' }}
				>
					<div></div>

					<div className={`${!nextActivityId ? 'visible' : 'invisible'}`}>
						<button
							onClick={submitQuiz}
							className={`w-32 py-1 font-bold text-center text-textColor rounded-full bg-themeSecondary ${
								!submitDisabled ? 'cursor-pointer' : ''
							}`}
							disabled={submitDisabled}
						>
							Submit
						</button>
					</div>

					<div
						className={`${
							nextActivityId || nextDisabled ? 'visible' : 'invisible'
						}`}
					>
						<a href={`/lms/${lesson.id}/quiz/siyavula/${nextActivityId}`}>
							<button className='w-32 py-1 font-bold text-center rounded-full cursor-pointer text-textColor'>
								Next
							</button>
						</a>
					</div>
				</div>
			</Box>
		</div>
	)
}

export async function getServerSideProps(context) {
	const { activityId, lesson } = context.query
	const lessonData = await getDataRequest(`/lessons/${lesson}`, () => {})
	let activityIds = []
	let nextActivityId = null
	let quiz = null

	try {
		if (lessonData.lms_quizs.length) {
			quiz = lessonData.lms_quizs.filter((q) => q.siyavula)[0] || null
		}

		if (quiz && activityId) {
			activityIds = quiz.siyavula_activity_ids

			const indexOfActivity = activityIds.indexOf(parseInt(activityId))

			if (indexOfActivity >= 0) {
				nextActivityId = activityIds[indexOfActivity + 1]
					? activityIds[indexOfActivity + 1]
					: null
			}
		}

		return {
			props: {
				lesson: lessonData,
				activityId,
				activityIds,
				nextActivityId,
				quizId: quiz ? quiz.id : null,
				quizTitle: quiz ? quiz.title : null
			}
		}
	} catch (e) {
		console.error(e)
	}

	return {
		props: {
			module: [],
			activityId,
			activityIds,
			nextActivityId,
			quizId: quiz ? quiz.id : null,
			quizTitle: quiz ? quiz.title : null
		}
	}
}

export default SiyavulaQuiz
