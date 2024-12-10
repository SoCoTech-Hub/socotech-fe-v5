import { BorderLinearProgress } from './style'
import lessonProgressCalc from '@/snippets/lms/lessonProgressCalc'
import Btn from '@/components/Btn'
import { useRouter } from 'next/router'
import ShareLinks from '../ShareLinks'

export default function LessonProgress({
	progresses = [],
	lesson = []
	// rating = [],
	// hasRating = false,
}) {
	const router = useRouter()

	return (
		<>
			<div className='pt-3'>
				<div className='flex justify-between'>
					<div className='flex text-2xl font-bold text-textColor mobile:ml-1'>
						{lesson?.subject?.name}
					</div>
					<div className='mt-2'>
						<Btn
							label='Back'
							color='bg-themeColorMain'
							link={`/.`}
						/>
					</div>
				</div>
				<div className='flex flex-row justify-between mb-4 mobile:ml-1'>
					<div className='text-textColor mobile:text-lg'>{lesson?.name}</div>
					<div className='pt-4 mx-4'>
						<ShareLinks
							news={{ url: `/${lesson.id}` }} //TODO check if right or not
						// onClick={upvoteEventHandler}
						// name={'share'}
						/>
					</div>
					{/* {hasRating ? (
            <div className="self-center item">
              <StyledRating
                name="average rating"
                value={rating?.starRating}
                size="medium"
                precision={0.1}
                readOnly
              />
            </div>
          ) : (
            <></>
          )} */}
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

				<div className='flex flex-row px-1 justify-between py-0.5 pr-0.5 align-middle bg-compBg rounded-lg items-center'>
					<div className='flex-grow p-2'>
						<BorderLinearProgress
							variant='determinate'
							className='text-themeColorMain'
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
