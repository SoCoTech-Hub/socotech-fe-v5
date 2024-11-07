import { useEffect, useState } from 'react'
import { baseUrl, isPaying, mainUrl, userId } from '@/context/constants'
import { PullRightIcon } from '../SvgIcons'
import { LockIcon } from '../SvgIcons/LockIcon'
import getGQLRequest from '@/snippets/getGQLRequest'
import Btn from '../Btn'

const Report = ({ subject, setSubject, grade }) => {
	const [reportData, setReportData] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch all data concurrently and wait for all promises to resolve
				const responses = await Promise.all([
					getGQLRequest({
						endpoint: 'lessons',
						fields: 'id,name,duration,subjectCategory{name},price',
						where: `subject:${subject},grades:${grade}`
					}),
					getGQLRequest({
						endpoint: 'progresses',
						fields:
							'lesson{id},completedSteps,totalSteps,timeSpent,isActive,isComplete',
						where: `user:${userId},subject:${subject},lesson:{grades:${grade}}`
					}),
					getGQLRequest({
						endpoint: 'quizResponses',
						fields: 'lesson{id},isCompleted,points,response',
						where: `user:${userId},lesson:{subject:${subject},grades:${grade}}`
					})
				])

				// Destructure the responses
				const [lessonsData, progressesData, quizResponsesData] = responses
				const { lessons } = lessonsData
				const { progresses } = progressesData
				const { quizResponses } = quizResponsesData

				// Combine and calculate required fields
				const data = lessons.map((lesson) => {
					const progress =
						progresses?.find((p) => p.lesson.id === lesson.id) || {}
					const quizResponse =
						quizResponses?.find((q) => q.lesson.id === lesson.id) || {}

					// Calculate the number of questions for the quizResults
					const questionCount =
						quizResponse?.response?.reduce((total, responseItem) => {
							if (responseItem.__component === 'lesson.matrix-sorting') {
								return total + responseItem.criterion_answer.length
							}
							return total + 1
						}, 0) || 0

					return {
						lessonId: lesson.id,
						category: lesson.subjectCategory.name,
						lessonName: lesson.name,
						videoCompleted:
							progress.isComplete ||
							(progress.isActive &&
								quizResponse?.isCompleted &&
								progress?.timeSpent >= lesson.duration)
								? 'Yes'
								: 'No',
						quizResults: questionCount
							? `${((quizResponse.points / questionCount) * 100).toFixed(0)}%`
							: '-',
						TotalCompleted: progress.isComplete
							? '100%'
							: progress?.completedSteps
							? `${(
									(progress.completedSteps / progress.totalSteps) *
									100
							  ).toFixed(0)}%`
							: '0%',
						isComplete: progress?.isComplete,
						access: isPaying ? true : lesson.price ? false : true
					}
				})

				setReportData(data)
			} catch (error) {
				console.error('Error fetching report data:', error)
			}
		}

		fetchData()
	}, [subject, grade])

	return (
		<>
			<Btn
				label='Back'
				onClickFunction={() => setSubject(null)}
				color='mx-2 mb-2'
				textSize='text-md'
				textColor='text-themeColorMain'
				borderColor='border border-themeColorMain border-2'
			/>
			<div className='p-6 text-textColor bg-compBg mobile:px-0'>
				<div className='overflow-x-auto'>
					<table className='min-w-full overflow-hidden rounded-lg shadow-md bg-compBg'>
						<thead className='text-black bg-themeColorMain'>
							<tr>
								<th className='px-6 py-3 text-center mobile:hidden'>
									Lesson ID
								</th>
								<th className='px-6 py-3 text-left mobile:hidden'>
									Subject Category
								</th>
								<th className='px-6 py-3 text-left mobile:px-0 mobile:text-center'>
									Lesson
								</th>
								<th className='py-3 text-center mobile:px-0'>Video Complete</th>
								<th className='px-6 py-3 text-left mobile:px-0 mobile:text-center'>
									Quiz Result
								</th>
								<th className='px-6 py-3 text-center mobile:px-0 mobile:text-center'>
									Total
								</th>
							</tr>
						</thead>
						<tbody>
							{reportData.map((row, index) => (
								<tr
									key={row.lessonId}
									className='border-b bg-compBg hover:bg-themeColorMain hover:text-black'
								>
									<td className='py-3 text-center mobile:hidden'>
										<a
											href={
												row.isComplete == 'Yes'
													? ''
													: row.access
													? `${mainUrl}/lms/${row.lessonId}`
													: `${mainUrl}/auth/subscribe?from=${baseUrl}`
											}
											className='py-3 cursor-pointer hover:text-black'
										>
											{row.lessonId}
										</a>
									</td>
									<td className='py-3 mobile:hidden'>
										<a
											href={
												row.isComplete == 'Yes'
													? ''
													: row.access
													? `${mainUrl}/lms/${row.lessonId}`
													: `${mainUrl}/auth/subscribe?from=${baseUrl}`
											}
											className='py-3 cursor-pointer hover:text-black'
										>
											{row.category}
										</a>
									</td>
									<td className='py-3 mobile:pl-4'>
										<a
											href={
												row.isComplete == 'Yes'
													? ''
													: row.access
													? `${mainUrl}/lms/${row.lessonId}`
													: `${mainUrl}/auth/subscribe?from=${baseUrl}`
											}
											className='py-4 text-left cursor-pointer hover:text-black'
										>
											{row.lessonName}
										</a>
									</td>
									<td className='py-3 text-center'>
										<a
											href={
												row.isComplete == 'Yes'
													? ''
													: row.access
													? `${mainUrl}/lms/${row.lessonId}`
													: `${mainUrl}/auth/subscribe?from=${baseUrl}`
											}
											className='py-3 cursor-pointer hover:text-black'
										>
											{row.videoCompleted}
										</a>
									</td>
									<td className='py-3 text-center'>
										<a
											href={
												row.isComplete == 'Yes'
													? ''
													: row.access
													? `${mainUrl}/lms/${row.lessonId}`
													: `${mainUrl}/auth/subscribe?from=${baseUrl}`
											}
											className='px-6 py-3 cursor-pointer hover:text-black'
										>
											{row.quizResults}
										</a>
									</td>
									<td className='py-3 text-center'>
										<a
											href={
												row.isComplete == 'Yes'
													? ''
													: row.access
													? `${mainUrl}/lms/${row.lessonId}`
													: `${mainUrl}/auth/subscribe?from=${baseUrl}`
											}
											className='px-6 py-3 cursor-pointer hover:text-black'
										>
											{row.TotalCompleted}
										</a>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default Report
