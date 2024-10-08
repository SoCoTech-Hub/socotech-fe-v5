import { BorderLinearProgress } from './style'
import lessonProgressCalc from '@/snippets/lms/lessonProgressCalc'

export default function LessonProgressBar({ progresses = [], lesson = [] }) {
	return (
		<>
			<div className='p-3 mb-3'>
				<div className='flex text-5xl mobile:text-2xl font-semibold text-textColor'>
					{lesson?.subject?.name}
				</div>
				<div className='flex justify-between mb-4'>
					<div className='text-base text-textColor mobile:text-xl'>
						{lesson?.name}
					</div>
				</div>

				<div className='flex flex-row px-1 justify-between py-0.5 pr-0.5 align-middle bg-compBg rounded-lg items-center'>
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
						className='ml-3 mr-2 text-themeColorMain mobile:text-xs'
						style={{ paddingTop: '3px' }}
					>
						{lessonProgressCalc({
							totalSteps: progresses?.totalSteps,
							completedSteps: progresses?.completedSteps
						})}
						% COMPLETED
					</div>
				</div>
			</div>
		</>
	)
}
