import { useState, useEffect } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import useStyles from './styles'
import config from '@/snippets/lms/mathJax'
import Btn from '../Btn'

let options = null
let isTouch = false
let DndProviderBackend = null

const MatrixSort = ({
	questionIndex,
	question,
	answers,
	selectedAnswers,
	selectedAnswersSetter,
	isResult = false
}) => {
	const classes = useStyles()
	const [selectedAnswersList, setSelectedAnswers] = useState([])
	const [answersList, setAnswersList] = useState([])
	const [lastItemDropped, setLastItemDropped] = useState({})

	useEffect(() => {
		if (selectedAnswers && selectedAnswers[questionIndex]?.criterion_answer) {
			const criterionAnswer = selectedAnswers[questionIndex].criterion_answer
			const answersIds = criterionAnswer.map((item) => item.answer.id)

			// Filter answers based on the criterion_answer
			const filteredAnswers = answers.answers?.filter(
				(answer) => !answersIds.includes(answer.id)
			)

			setAnswersList(filteredAnswers)
			setSelectedAnswers(criterionAnswer)
		} else {
			setAnswersList(answers.answers)
		}
	}, [questionIndex])

	useEffect(() => {
		if (JSON.stringify(lastItemDropped) !== '{}') {
			//  setDroppedItems((prevItems) => [...prevItems, lastItemDropped]);
			let selectedAnswersObj = []

			if (selectedAnswers !== null && selectedAnswers[questionIndex]) {
				selectedAnswersObj =
					selectedAnswers[questionIndex].criterion_answer || []
			}

			selectedAnswersSetter((prevSelectedAnswers) => {
				const existingAnswerIndex = (
					prevSelectedAnswers[questionIndex]?.criterion_answer || []
				).findIndex((item) => item.criterion.id === lastItemDropped.criterionId)

				if (existingAnswerIndex !== -1) {
					// Replace the existing answer
					const updatedAnswers = [
						...(prevSelectedAnswers[questionIndex]?.criterion_answer || [])
					]
					updatedAnswers[existingAnswerIndex] = {
						criterion: answers.criterions.find(
							(x) => x.id === lastItemDropped.criterionId
						),
						answer: answers.answers.find(
							(x) => x.id === parseInt(lastItemDropped.answerId)
						),
						correct:
							parseInt(lastItemDropped.answerId) === lastItemDropped.criterionId
					}

					return {
						...prevSelectedAnswers,
						[questionIndex]: {
							__component: question.__component,
							question: question.question,
							criterion_answer: updatedAnswers
						}
					}
				} else {
					// Add a new answer
					return {
						...prevSelectedAnswers,
						[questionIndex]: {
							__component: question.__component,
							question: question.question,
							criterion_answer: [
								...(prevSelectedAnswers[questionIndex]?.criterion_answer || []),
								{
									criterion: answers.criterions.find(
										(x) => x.id === lastItemDropped.criterionId
									),
									answer: answers.answers.find(
										(x) => x.id === parseInt(lastItemDropped.answerId)
									),
									correct:
										parseInt(lastItemDropped.answerId) ===
										lastItemDropped.criterionId
								}
							]
						}
					}
				}
			})
		}
	}, [lastItemDropped])

	useEffect(() => {
		if (process.browser) {
			const isTouchDevice = () => {
				return (
					'ontouchstart' in window ||
					navigator.maxTouchPoints > 0 ||
					navigator.msMaxTouchPoints > 0
				)
			}

			isTouch = isTouchDevice()

			if (isTouch) {
				const hasNative =
					document &&
					(document.elementsFromPoint || document.msElementsFromPoint)

				const getDropTargetElementsAtPoint = (x, y, dropTargets) => {
					return dropTargets.filter((t) => {
						const rect = t.getBoundingClientRect()
						return (
							x >= rect.left &&
							x <= rect.right &&
							y <= rect.bottom &&
							y >= rect.top
						)
					})
				}

				DndProviderBackend = TouchBackend

				options = {
					getDropTargetElementsAtPoint:
						!hasNative && getDropTargetElementsAtPoint
				}
			} else {
				DndProviderBackend = HTML5Backend
			}
		}
	}, [process.browser])

	const clearAnswers = () => {
		setSelectedAnswers([])
		setAnswersList(answers.answers)
		selectedAnswersSetter({
			...selectedAnswers,
			[questionIndex]: {
				__component: question.__component,
				question: question.question,
				criterion_answer: []
			}
		})
	}

	const handleDragDrop = (criterionId, answerId) => {
		const updatedQuestionList = question.criterion_answer.filter(
			(criterion) => criterion.id !== criterionId
		)
		let answersListUpdated = answersList

		// Check if the new answer is being dropped on a previously selected answer
		if (selectedAnswersList.find((x) => x.criterion.id == criterionId)) {
			const prevAnswer = selectedAnswersList.find(
				(x) => x.criterion.id == criterionId
			)

			// Add the previously dropped answer back to the answers list
			answersListUpdated = [
				...answersListUpdated,
				answers.answers.find((answer) => answer.id === prevAnswer.answer.id)
			]
		}
		// Remove the dropped answer from the available answers
		setAnswersList(
			answersListUpdated.filter((item) => item.id !== parseInt(answerId))
		)

		// Update selectedAnswers state with the selected answer for a specific criterion
		setSelectedAnswers((prevSelectedAnswers) => {
			const existingAnswerIndex = prevSelectedAnswers.findIndex(
				(item) => item.criterion.id === criterionId
			)

			if (existingAnswerIndex !== -1) {
				// Replace the existing answer
				const updatedAnswers = [...prevSelectedAnswers]
				updatedAnswers[existingAnswerIndex] = {
					criterion: answers.criterions.find((x) => x.id == criterionId),
					answer: answers.answers.find((x) => x.id == answerId),
					correct: criterionId == answerId
				}

				return updatedAnswers
			} else {
				// Add a new answer
				return [
					...prevSelectedAnswers,
					{
						criterion: answers.criterions.find((x) => x.id == criterionId),
						answer: answers.answers.find((x) => x.id == answerId),
						correct: criterionId == answerId
					}
				]
			}
		})
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
				return <div className='font-bold text-white'>Question not answered</div>
			}

			return <div className='font-bold text-white'>Points: {points}</div>
		}

		return null
	}

	if (!DndProviderBackend) {
		return <p className='text-xs text-textColor'>Refresh your page</p>
	}

	return (
		<MathJaxContext config={config}>
			<div>
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
				{!isResult ? (
					<div className='items-end justify-start w-48 my-4'>
						<Btn
							label='Clear Answers'
							onClickFunction={() => clearAnswers()}
							color='bg-themeColorMain'
							padding='py-2'
							fontWeight='bold'
						/>
					</div>
				) : (
					<></>
				)}

				<div className='flex flex-row'>
					<div
						className={
							isResult
								? 'flex-col mx-2 desktop:w-full laptop:w-full mobile:w-full mobile:mb-6'
								: 'flex-col mx-2 desktop:w-2/3 laptop:w-2/3 mobile:w-1/2 mobile:mb-6'
						}
					>
						<div
							id='Question'
							className='text-black bg-componentBg radius-xl'
							style={{ height: '500px', overflowY: 'auto' }}
						>
							{answers.criterions?.map((criterion) => (
								<div
									className='p-2 text-white border-black border-y'
									key={criterion.id}
									onDragOver={(e) => e.preventDefault()}
									onDrop={(e) => {
										e.preventDefault()
										const criterionId = criterion.id
										const answerId = e.dataTransfer.getData('text/plain')
										handleDragDrop(criterionId, answerId)
										setLastItemDropped({ criterionId, answerId }) // Set last item dropped
									}}
								>
									{criterion.criterion.includes('`') ||
									criterion.criterion.includes('$') ? (
										<MathJax
											inline
											dynamic
										>
											<div className='flex flex-row w-full'>
												<div
													className={classes.criterionWrapper}
													dangerouslySetInnerHTML={{
														__html: criterion.criterion
													}}
												/>
											</div>
										</MathJax>
									) : (
										<div className='flex flex-row w-full'>
											<div
												className={classes.criterionWrapper}
												dangerouslySetInnerHTML={{
													__html: criterion.criterion
												}}
											/>
										</div>
									)}
									{selectedAnswersList.length ? (
										selectedAnswersList?.find(
											(item) =>
												parseInt(item.criterion.id) === parseInt(criterion.id)
										) ? (
											<div
												className={`rounded-xl m-2 px-4 py-2 ${
													isResult
														? selectedAnswersList?.find(
																(item) =>
																	parseInt(item.criterion.id) ===
																	parseInt(criterion.id)
														  ).correct
															? 'bg-green-500 text-textColor'
															: 'bg-red-500 text-textColor'
														: 'bg-themeColorMain text-black'
												}`}
											>
												{selectedAnswersList.length
													? selectedAnswersList?.find(
															(item) =>
																parseInt(item.criterion.id) ===
																parseInt(criterion.id)
													  )?.answer?.answer
													: ''}
											</div>
										) : (
											<div className='items-center justify-center px-4 py-2 m-2 text-white border-2 border-dashed rounded-xl bg-compBg border-themeColorMain'>
												Selected answer goes here
											</div>
										)
									) : (
										<div className='items-center justify-center px-4 py-2 m-2 text-white border-2 border-dashed rounded-xl bg-compBg border-themeColorMain'>
											Selected answer goes here
										</div>
									)}
								</div>
							))}
						</div>
					</div>

					<div
						className={
							isResult ? 'hidden' : 'flex-col mx-2 overflow-scroll no-scrolly'
						}
					>
						<div
							id='answers-container'
							className='p-2 rounded-xl bg-themeColorMain gap-x-2 gap-y-4'
						>
							{answersList?.map((answer) => (
								<div
									key={answer.id}
									className='py-2 text-black border-black border-y'
									draggable
									onDragStart={(e) =>
										e.dataTransfer.setData('text/plain', answer.id)
									}
								>
									<div className='flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-compBg rounded-xl'>
										{answer?.answer?.includes('`') ||
										answer?.answer?.includes('$') ? (
											<MathJax
												inline
												dynamic
											>
												<div
													className={classes.criterionWrapper}
													dangerouslySetInnerHTML={{ __html: answer.answer }}
													style={{
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center'
													}}
												/>
											</MathJax>
										) : (
											<div
												className={classes.criterionWrapper}
												dangerouslySetInnerHTML={{ __html: answer.answer }}
												style={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center'
												}}
											/>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className='flex flex-row justify-center my-4'>
				{renderAnswerPoints()}
			</div>
		</MathJaxContext>
	)
}

export default MatrixSort
