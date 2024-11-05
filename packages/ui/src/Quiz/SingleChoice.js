import { useState, useEffect } from 'react'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import config from '@/snippets/lms/mathJax'

const SingleChoice = ({
	questionIndex,
	question,
	answers,
	selectedAnswers,
	selectedAnswersSetter,
	isResult = false
}) => {
	const [answerSelected, setAnswerSelected] = useState(null)

	useEffect(() => {
		if (
			selectedAnswers !== null &&
			selectedAnswers[questionIndex] !== undefined
		) {
			setAnswerSelected(selectedAnswers[questionIndex].single_answer)
		}
	}, [selectedAnswers, questionIndex])

	const handleSelectAnswer = (answer) => {
		selectedAnswersSetter({
			...selectedAnswers,
			[questionIndex]: {
				__component: question.__component,
				question: question.question,
				single_answer: [answer]
			}
		})
	}

	const AnswerBar = ({ children, answer, isCorrect }) => {
		if (isResult) {
			let bgColor = ''
			if (answerSelected && answerSelected[0].answer == answer.answer) {
				if (isCorrect) {
					bgColor = 'bg-themeColorMain text-black'
				} else {
					bgColor = 'bg-red-500 text-textColor'
				}
			} else {
				if (answer.is_correct) {
					bgColor = 'bg-themeColorMain text-black'
				} else {
					// bgColor = 'border-red-500 border-2 text-black'
					bgColor = 'text-textColor '
				}
			}

			return (
				<div
					className={`flex flex-row items-center text-textColor align-middle w-full px-2 py-1 text-center shadow-outline rounded-lg focus:outline-none focus:ring focus:border-themeColorSecondary ${bgColor}`}
				>
					{children}
				</div>
			)
		}

		return (
			<button
				onClick={() => handleSelectAnswer(answer)}
				className={`flex flex-row items-center align-middle  w-full px-2 py-1 text-center shadow-outline cursor-pointer rounded-full border-2 ${
					answerSelected
						? answerSelected[0] == answer
							? 'bg-themeColorMain border-black text-black font-bold'
							: 'bg-compBg border-white text-textColor'
						: 'bg-compBg text-textColor'
				}`}
			>
				{children}
			</button>
		)
	}

	const renderAnswerPoints = () => {
		if (isResult) {
			const points = selectedAnswers[questionIndex]
				? selectedAnswers[questionIndex].single_answer[0].points
					? selectedAnswers[questionIndex].single_answer[0].points
					: selectedAnswers[questionIndex].single_answer[0].is_correct
					? 1
					: 0
				: null

			if (points === null) {
				return (
					<p
						className='text-textColor text-md'
						align='center no-item-text'
					>
						Question not answered
					</p>
				)
			}

			return (
				<p
					className='text-sm text-textColor'
					align='center'
				>
					Points: {points}
				</p>
			)
		}

		return null
	}

	return (
		<MathJaxContext config={config}>
			<div>
				<div className='flex flex-col w-full space-y-5'>
					<div
						className='w-full my-3 desktop:text-lg laptop:text-lg mobile:text-base'
						id='question'
					>
						{question.image && (
							<div className='w-full my-3'>
								<img
									src={question.image.url}
									alt='image'
								/>
							</div>
						)}
						{question.question.includes('`') ||
						question.question.includes('$') ? (
							<MathJax
								inline
								dynamic
							>
								<div
									className='text-textColor'
									dangerouslySetInnerHTML={{ __html: question.question }}
								/>
							</MathJax>
						) : (
							<div
								className='text-textColor'
								dangerouslySetInnerHTML={{ __html: question.question }}
							/>
						)}
					</div>

					<div
						className='text-textColor desktop:text-xl laptop:text-xl mobile:text-lg'
						id='instruction'
					>
						Choose an answer
					</div>
					<div
						className='desktop:text-base laptop:text-base mobile:text-sm'
						id='answer'
					>
						<div className='flex flex-col w-full space-y-4'>
							{answers?.map((answer, answerIndex) => (
								<div
									key={`answer-${question.id}-${answerIndex}`}
									className='item'
								>
									<AnswerBar
										answer={answer}
										isCorrect={
											answer.points ? answer.points : answer.is_correct
										}
									>
										<div
											className='grid w-full place-content-center'
											style={{ minHeight: '80px', maxHeight: '175px' }}
										>
											{answer?.media ? (
												<img
													src={answer.media.url}
													alt='image'
													className='my-1'
												/>
											) : (
												<></>
											)}
											<div className='flex justify-center w-full'>
												{answer.answer.includes('`') ||
												answer.answer.includes('$') ? (
													<MathJax
														inline
														dynamic
													>
														<div
															className='leading-tight break-words'
															dangerouslySetInnerHTML={{
																__html: answer.answer
															}}
														/>
													</MathJax>
												) : (
													<div
														className='leading-tight break-words'
														dangerouslySetInnerHTML={{ __html: answer.answer }}
													/>
												)}
											</div>
										</div>
									</AnswerBar>
								</div>
							))}
							{renderAnswerPoints()}
						</div>
					</div>
				</div>
			</div>
		</MathJaxContext>
	)
}

export default SingleChoice
