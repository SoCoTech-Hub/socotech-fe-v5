import { useState } from 'react'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import SortableList from '@/components/SortableList'
import SortableItem from '@/components/SortableList/SortableItem'
import config from '@/snippets/lms/mathJax'

const SortingChoice = ({
	questionIndex,
	question,
	answers,
	selectedAnswers,
	selectedAnswersSetter,
	isResult = false
}) => {
	const [answersArray, setAnswersArray] = useState(answers)

	const handleAnswerSorting = (sortedItems) => {
		setAnswersArray(sortedItems)

		selectedAnswersSetter({
			...selectedAnswers,
			[questionIndex]: {
				__component: question.__component,
				question: question.question,
				answer: sortedItems
			}
		})
	}

	const AnswerBar = ({ children, answer }) => {
		if (isResult) {
			let bgColor = 'bg-compBg'

			if (selectedAnswers[questionIndex]) {
				const answerSplit = answers.map((a) => a.id)
				const userAnswer = selectedAnswers[questionIndex].answer

				const correctAnswerIndex = answerSplit.indexOf(answer)
				const userAnswerIndex = userAnswer.indexOf(answer)

				if (correctAnswerIndex === userAnswerIndex) {
					bgColor = 'bg-green-500 text-textColor'
				} else {
					bgColor = 'bg-red-500 text-textColor'
				}
			}

			return (
				<div
					className={`flex flex-row w-full px-4 py-5 text-center ${bgColor} shadow-outline rounded-lg focus:outline-none focus:ring focus:border-themeSecondary`}
				>
					{children}
				</div>
			)
		}

		return (
			<div className='flex flex-row w-full px-4 py-5 text-center rounded-lg shadow-outline cursor-pointer text-textColor bg-compBg focus:outline-none focus:ring focus:border-themeSecondary'>
				{children}
			</div>
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
				return <p align='center'>Question not answered</p>
			}

			return <p align='center'>Points: {points}</p>
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
								<div dangerouslySetInnerHTML={{ __html: question.question }} />
							</MathJax>
						) : (
							<div dangerouslySetInnerHTML={{ __html: question.question }} />
						)}
					</div>

					<div
						className='text-textColor desktop:text-xl laptop:text-xl mobile:text-lg'
						id='instruction'
					>
						Sort the options below
					</div>

					<div
						className='desktop:text-base laptop:text-base mobile:text-sm'
						id='answer'
					>
						<div className='flex flex-col w-full space-y-4'>
							{isResult && (
								<>
									{answersArray.map((answer, i) => (
										<div
											className='item'
											key={i}
										>
											<AnswerBar answer={answer}>
												<div className='justify-start item'>
													<ImportExportIcon />
												</div>
												<div className='flex justify-center w-full'>
													{answer.answer.includes('`') ||
													answer.answer.includes('$') ? (
														<MathJax
															inline
															dynamic
														>
															<div
																dangerouslySetInnerHTML={{
																	__html: answer.answer
																}}
															/>
														</MathJax>
													) : (
														<div
															dangerouslySetInnerHTML={{
																__html: answer.answer
															}}
														/>
													)}
												</div>
											</AnswerBar>
										</div>
									))}
								</>
							)}

							{!isResult && (
								<SortableList
									questions={answersArray}
									handleQuestionChange={handleAnswerSorting}
								>
									{answersArray.map((answer, answerIndex) => (
										<SortableItem
											key={`answer-${question.id}-${answerIndex}`}
											index={answerIndex}
											component={
												<div className='item'>
													<AnswerBar answer={answer}>
														<div className='justify-start item'>
															<ImportExportIcon />
														</div>
														<div className='flex justify-center w-full'>
															<p>{answer.answer}</p>
														</div>
													</AnswerBar>
												</div>
											}
										/>
									))}
								</SortableList>
							)}
							{renderAnswerPoints()}
						</div>
					</div>
				</div>
			</div>
		</MathJaxContext>
	)
}

export default SortingChoice
