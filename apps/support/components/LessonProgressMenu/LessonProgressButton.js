import { NoSsr } from '@mui/material'
import { BorderLinearProgressView } from './styles'
import Clamp from 'react-multiline-clamp'
import lessonProgressCalc from '@/snippets/lms/lessonProgressCalc'
// import { useAppContext } from "@/context/AppContext"
import {
	// baseUrl,
	mainUrl
} from '@/context/constants'
import { LessonBullet } from '../SvgIcons'

const LessonProgressButton = ({ lessonProgress }) => {
	const subjectName = lessonProgress.subject.name

	return (
		<div className='my-3 ml-3 '>
			<a href={`${mainUrl}/lms/${lessonProgress.lesson.id}`}>
				<div className='flex flex-wrap align-middle place-content-center'>
					<div className='w-full'>
						<div className='flex align-middle text-sm font-bold'>
							<div className='w-2 h-2 mt-1.5 mr-1 text-themeColorMain'>
								<LessonBullet />
							</div>
							<div className='text-textColor text-sm font-bold'>
								{subjectName}
							</div>
						</div>
						{/* <LessonBullet className='w-2 mr-1 ' /> */}
					</div>
					<div className='w-10/12'>
						<div className='text-xs   text-textColor'>
							<Clamp lines={1}>{lessonProgress.lesson.name}</Clamp>
						</div>
					</div>
					<div className='w-2/12'>
						<div className='flex justify-end w-full text-xs font-semibold align-middle item   text-themeColorMain'>
							{lessonProgressCalc({
								totalSteps: lessonProgress?.totalSteps,
								completedSteps: lessonProgress?.completedSteps
							})}
							%
						</div>
					</div>
				</div>

				<div className='w-full pt-1 mr-2 item'>
					<NoSsr>
						<BorderLinearProgressView
							variant='determinate'
							value={lessonProgressCalc({
								totalSteps: lessonProgress?.totalSteps,
								completedSteps: lessonProgress?.completedSteps
							})}
						/>
					</NoSsr>
				</div>
			</a>
		</div>
	)
}

export default LessonProgressButton
