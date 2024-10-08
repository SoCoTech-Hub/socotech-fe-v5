import { useEffect, useState } from 'react'
import LessonProgressButton from './LessonProgressButton'
import getInProgressLessonsList from '@/snippets/lms/getInProgressLessonsList'
import { userId } from '@/context/constants'

const LessonProgressView = () => {
	const [data, setData] = useState([])

	useEffect(async () => {
		if (userId) {
			setData(await getInProgressLessonsList({ userId }))
		}
	}, [userId])

	if (data.length) {
		return (
			<div className='pr-4 overflow-scroll divide-y divide-themeColorMain max-h-80 no-scrolly'>
				{data.map((item) => (
					<div
						className='py-1'
						key={item.id}
					>
						<LessonProgressButton lessonProgress={item} />
					</div>
				))}
			</div>
		)
	}
	return (
		<>
			<div className='text-textColor'>No lesson in progress</div>
		</>
	)
}
export default LessonProgressView
