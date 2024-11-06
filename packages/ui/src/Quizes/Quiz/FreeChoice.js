import { useState, useEffect } from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import config from '@/snippets/lms/mathJax'

const FreeChoice = ({
	questionIndex,
	question,
	answers,
	selectedAnswers,
	selectedAnswersSetter,
	isResult = false
}) => {
	const [typedAnswer, setTypedAnswer] = useState('')

	useEffect(() => {
		if (
			selectedAnswers !== null &&
			selectedAnswers[questionIndex] !== undefined
		) {
			setTypedAnswer(selectedAnswers[questionIndex].answer)
		}
		if (selectedAnswers && questionIndex) {
			if (selectedAnswers[questionIndex] === undefined) {
				setTypedAnswer('')
			}
		}
	}, [selectedAnswers, questionIndex])

	const handleAnswerTyping = (answer) => {
		selectedAnswersSetter({
			...selectedAnswers,
			[questionIndex]: {
				__component: question.__component,
				question: question.question,
				answer: answer
			}
		})
	}

	let bgColor = 'bg-compBg'

	if (isResult) {
		const answerSplit = typedAnswer.toString().toLowerCase().split(' ')
		const answersArray = answers.map((a) => a.answer.toString().toLowerCase())
		const wordsMatch = answerSplit.filter((word) => answersArray.includes(word))

		if (wordsMatch.length) {
			bgColor = 'bg-green-500 text-textColor'
		} else {
			bgColor = 'bg-red-500 text-textColor'
		}
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
				<>
					<p align='center'>
						Answer: {answers.map((answer) => answer.answer).toString()}
					</p>
					<p
						className='text-sm text-textColor'
						align='center'
					>
						Points: {points}
					</p>
				</>
			)
		}

		return null
	}

	return (
		<MathJaxContext config={config}>
			<div>
				<div className='flex flex-col w-full space-y-5'>
					<div
						className='w-full mt-3 desktop:text-lg laptop:text-lg mobile:text-base text-textColor'
						id='question'
					>
						{question.image && (
							<div className='w-full my-3'>
								<img
									src={question.image.url}
									alt='Image'
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
									className='text-base text-textColor'
									dangerouslySetInnerHTML={{ __html: question.question }}
								/>
							</MathJax>
						) : (
							<div
								className='text-base text-textColor'
								dangerouslySetInnerHTML={{ __html: question.question }}
							/>
						)}
					</div>

					<div
						className='text-textColor desktop:text-xl laptop:text-xl mobile:text-lg'
						id='instruction'
					>
						Provide your answer below
					</div>
					<div
						className='desktop:text-base laptop:text-base mobile:text-sm'
						id='answer'
					>
						<div className='flex flex-col w-full space-y-4'>
							<div className='mx-1 item'>
								{typedAnswer.includes('`') || typedAnswer.includes('$') ? (
									<MathJax
										inline
										dynamic
									>
										<TextareaAutosize
											minRows={4}
											name='freeChoiceAnswer'
											id='freeChoiceAnswer'
											className={`w-full p-3 border-2 border-white ${bgColor} rounded-lg text-textColor`}
											placeholder='Type your answer here'
											onChange={(e) => handleAnswerTyping(e.target.value)}
											value={typedAnswer}
											disabled={isResult}
										/>
										{/* <input
                      className={`w-1/4 px-5 py-3 ${bgColor} text-sm text-textColor rounded-lg`}
                      type='text'
                      name='freeChoiceAnswer'
                      id='freeChoiceAnswer'
                      placeholder='Your answer here...'
                      onChange={(e) => handleAnswerTyping(e.target.value)}
                      value={typedAnswer}
                      disabled={isResult}
                    /> */}
									</MathJax>
								) : (
									<TextareaAutosize
										minRows={4}
										className={`w-full p-3 border-2 border-white ${
											isResult ? 'bg-compBg' : 'bg-compBg'
										} rounded-lg text-textColor`}
										placeholder='Type your answer here'
										onChange={(e) => handleAnswerTyping(e.target.value)}
										value={typedAnswer}
										disabled={isResult}
									/>
									// <input
									//   className={`w-1/4 px-5 py-3 ${bgColor} text-sm text-textColor rounded-lg`}
									//   type='text'
									//   name='freeChoiceAnswer'
									//   id='freeChoiceAnswer'
									//   placeholder='Your answer here...'
									//   onChange={(e) => handleAnswerTyping(e.target.value)}
									//   value={typedAnswer}
									//   disabled={isResult}
									// />
								)}
							</div>
							{renderAnswerPoints()}
						</div>
					</div>
				</div>
			</div>
		</MathJaxContext>
	)
}

export default FreeChoice
