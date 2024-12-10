import { BorderLinearProgress } from './style'
import lessonProgressCalc from '@/snippets/lms/lessonProgressCalc'

export default function LessonProgressBar({ progresses = [], lesson = [] }) {
	return (
		<>
			<div className='my-3 bg-compBg  '>
				<div className='flex text-5xl font-semibold text-lessonFontColor '>
					{lesson?.subject?.name}
				</div>
				<div className='flex justify-between mb-4'>
					<div className='text-base text-textColor '>{lesson?.name}</div>
				</div>

				<div className='flex flex-row justify-between py-0.5 pr-0.5 align-middle bg-compBg rounded-lg'>
					<div
						className='flex-grow'
						style={{ paddingTop: '4px' }}
					>
						<BorderLinearProgress
							variant='determinate'
							value={lessonProgressCalc({
								totalSteps: progresses?.totalSteps,
								completedSteps: progresses?.completedSteps
							})}
						/>
					</div>

					<div
						className='ml-3 mr-2 text-xs font-bold percentageText '
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
