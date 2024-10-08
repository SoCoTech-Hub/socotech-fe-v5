import { BorderLinearProgress } from './style'
import lessonProgressCalc from '@/snippets/lms/lessonProgressCalc'

export default function LessonProgressBar({ progresses = [], lesson = [] }) {
	return (
		<>
			<div className='p-3 mb-3 bg-white rounded-lg shadow-menu'>
				<div className='flex text-5xl font-semibold text-lessonFontColor '>
					{lesson?.subject?.name}
				</div>
				<div className='flex justify-between mb-4'>
					<div className='text-base text-gray-500'>{lesson?.name}</div>
				</div>

				<div className='flex flex-row px-1 justify-between py-0.5 pr-0.5 align-middle bg-gray-100 rounded-lg items-center'>
					<div className='flex-grow p-2 '>
						<BorderLinearProgress
							variant='determinate'
							value={lessonProgressCalc({
								totalSteps: progresses?.totalSteps,
								completedSteps: progresses?.completedSteps
							})}
						/>
					</div>

					<div
						className='ml-3 mr-2 menu-title'
						style={{ paddingTop: '3px' }}
					>
						{lessonProgressCalc({
							totalSteps: progresses?.totalSteps,
							completedSteps: progresses?.completedSteps
						})}
						% Completed
					</div>
				</div>
			</div>
		</>
	)
}
