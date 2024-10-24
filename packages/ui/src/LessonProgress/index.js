import { BorderLinearProgress, StyledRating } from './style'
import lessonProgressCalc from '@/snippets/lms/lessonProgressCalc'

export default function LessonProgress({
	progresses = [],
	lesson = [],
	rating = [],
	hasRating = false
}) {
	return (
		<>
			<div className=''>
				<div className='flex text-5xl font-semibold text-lessonFontColor '>
					{lesson?.subject?.name}
				</div>
				<div className='flex justify-between mb-4'>
					<div className='text-base text-textColor'>{lesson?.name}</div>
					{hasRating ? (
						<div className='self-center item'>
							<StyledRating
								name='average rating'
								value={rating?.starRating}
								size='medium'
								precision={0.1}
								readOnly
							/>
						</div>
					) : (
						<></>
					)}
					{/* <div className="self-center item">
            <StyledRating
              name="average rating"
              value={rating?.starRating}
              size="medium"
              precision={0.1}
              readOnly
            />
          </div> */}
				</div>

				<div className='flex flex-row justify-between py-0.5 pr-0.5 align-middle bg-gray-100 rounded-lg items-center'>
					<div className='flex-grow p-1'>
						<BorderLinearProgress
							variant='determinate'
							value={lessonProgressCalc({
								totalSteps: progresses?.totalSteps,
								completedSteps: progresses?.completedSteps
							})}
						/>
					</div>

					<div
						className='ml-3 mr-2 text-xs font-bold percentageText'
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
