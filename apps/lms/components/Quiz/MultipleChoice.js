import { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import config from '@/snippets/lms/mathJax'

const MultipleChoice = ({
	questionIndex,
	question,
	answers,
	selectedAnswers,
	selectedAnswersSetter,
	isResult = false
}) => {
	const [answerSelected, setAnswerSelected] = useState([])

	useEffect(() => {
		if (
			selectedAnswers !== null &&
			selectedAnswers[questionIndex] !== undefined
		) {
			setAnswerSelected(selectedAnswers[questionIndex].answer)
		}
	}, [selectedAnswers, questionIndex])

	const handleSelectAnswer = (answer) => {
		let answersArray = []

		if (!answerSelected.includes(answer)) {
			answersArray = [...answerSelected, answer]
		} else {
			answersArray = answerSelected.filter((a) => a !== answer)
		}

		selectedAnswersSetter({
			...selectedAnswers,
			[questionIndex]: {
				__component: question.__component,
				answer: answersArray,
				question: question.question
			}
		})
	}

	const AnswerBar = ({ children, answer, isCorrect }) => {
		if (isResult) {
			let bgColor = 'bg-compBg '

			if (answerSelected.includes(answer)) {
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
					bgColor = 'text-textColor'
				}
			}

			return (
				<div
					className={`flex flex-row items-center align-middle w-full px-2 py-1 text-center shadow-outline rounded-lg ${bgColor}`}
				>
					{children}
				</div>
			)
		}

		return (
			<button
				onClick={() => handleSelectAnswer(answer)}
				className={`w-full px-2 py-1 text-center shadow-outline cursor-pointer rounded-full border-2   ${
					answerSelected.includes(answer)
						? 'bg-themeColorMain border-black text-black font-bold  '
						: 'bg-compBg text-textColor border-white'
				}`}
			>
				{children}
			</button>
		)
	}

	const renderAnswerPoints = () => {
		if (isResult) {
			const points = selectedAnswers[questionIndex]
				? selectedAnswers[questionIndex].points
					? selectedAnswers[questionIndex].points
					: selectedAnswers[questionIndex].is_correct
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
				<div className='flex flex-col space-y-5'>
					<div
						className='w-full mt-3 desktop:text-lg laptop:text-lg mobile:text-base text-textColor'
						id='question'
					>
						{question.image ? (
							<div className='w-full my-3'>
								<img
									src={question.image.url}
									alt='image'
								/>
							</div>
						) : (
							<></>
						)}
						{question.question.includes('`') ||
						question.question.includes('$') ? (
							<MathJax
								inline
								dynamic
							>
								<div
									className='text-base leading-tight break-words text-textColor'
									dangerouslySetInnerHTML={{ __html: question.question }}
								/>
							</MathJax>
						) : (
							<div
								className='text-base leading-tight break-words text-textColor'
								dangerouslySetInnerHTML={{ __html: question.question }}
							/>
						)}
					</div>

					<div
						className='text-textColor desktop:text-xl laptop:text-xl mobile:text-lg'
						id='instruction'
					>
						Choose one or more answers
					</div>
					<div
						className='desktop:text-base laptop:text-base mobile:text-sm'
						id='answer'
					>
						<div className='flex flex-col w-full space-y-4 '>
							{answers?.map((answer, answerIndex) => (
								<div
									key={`answer-${question.id}-${answerIndex}`}
									className='item '
								>
									<AnswerBar
										answer={answer}
										isCorrect={answer.is_correct}
									>
										<div
											className='grid w-full h-20 place-content-center'
											style={{ minHeight: '80px', maxHeight: '175px' }}
										>
											{answer?.media ? (
												<img
													src={answer.media.url}
													alt='image'
													className='my-1 '
												/>
											) : (
												<></>
											)}
											<div className='flex justify-center w-full '>
												{answer.answer.includes('`') ||
												answer.answer.includes('$') ? (
													<MathJax
														inline
														dynamic
													>
														<div
															className='text-sm leading-tight break-words'
															dangerouslySetInnerHTML={{
																__html: answer.answer
															}}
														/>
													</MathJax>
												) : (
													<div
														className='text-sm leading-tight break-words'
														dangerouslySetInnerHTML={{ __html: answer.answer }}
													/>
												)}
											</div>
											<div className='justify-end'>
												<Checkbox
													checked={answerSelected.includes(answer)}
													onChange={() => handleSelectAnswer(answer)}
													name={`answer-${answer.id}`}
													disabled={isResult}
													style={{
														color: answerSelected.includes(answer)
															? 'black'
															: 'rgba(214, 243, 121)'
													}}
												/>
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

export default MultipleChoice
