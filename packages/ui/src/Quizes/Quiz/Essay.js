import { useState, useEffect } from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import config from '@/snippets/lms/mathJax'

const Essay = ({
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

	const renderAnswerPoints = () => {
		if (isResult) {
			let points = selectedAnswers[questionIndex]
				? selectedAnswers[questionIndex].points
					? selectedAnswers[questionIndex].points
					: selectedAnswers[questionIndex].is_correct
					? 1
					: 0
				: null

			if (points === null) {
				return (
					<p align='center no-item-text text-textColor'>
						Question not answered
					</p>
				)
			}
			return (
				<>
					<p
						className='text-sm text-textColor'
						align='center'
					>
						Keywords: {answers.map((answer) => answer.keyword).toString()}
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
					<div className='flex flex-col'>
						<div
							className='w-full mt-3 desktop:text-lg laptop:text-lg mobile:text-base text-textColor'
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
										dangerouslySetInnerHTML={{
											__html: question.question
										}}
									/>
								</MathJax>
							) : (
								<div
									className='text-textColor'
									dangerouslySetInnerHTML={{
										__html: question.question
									}}
								/>
							)}
						</div>
					</div>

					<div
						className='text-textColor desktop:text-xl laptop:text-xl mobile:text-lg'
						id='instruction'
					>
						Complete the essay
					</div>
					<div
						className='mx-1 desktop:text-base laptop:text-base mobile:text-sm'
						id='answer'
					>
						{typedAnswer.includes('`') || typedAnswer.includes('$') ? (
							<MathJax
								inline
								dynamic
							>
								<TextareaAutosize
									rows={10}
									className={`w-full p-3 border-2 border-white ${bgColor} rounded-lg text-textColor`}
									placeholder='Type your answer here'
									onChange={(e) => handleAnswerTyping(e.target.value)}
									value={typedAnswer}
									disabled={isResult}
								/>
								{renderAnswerPoints()}
							</MathJax>
						) : (
							<>
								<TextareaAutosize
									rows={10}
									className={`w-full p-3 border-2 border-white ${
										isResult ? 'bg-compBg' : 'bg-compBg'
									} rounded-lg text-textColor`}
									placeholder='Type your answer here'
									onChange={(e) => handleAnswerTyping(e.target.value)}
									value={typedAnswer}
									disabled={isResult}
								/>
								{renderAnswerPoints()}
							</>
						)}
					</div>
				</div>
			</div>
		</MathJaxContext>
	)
}

export default Essay
