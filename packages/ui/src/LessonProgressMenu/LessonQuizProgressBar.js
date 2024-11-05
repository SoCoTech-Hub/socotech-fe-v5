import { NoSsr } from '@mui/material'
import { BorderLinearProgressView } from './styles'
import Clamp from 'react-multiline-clamp'
import { LessonBullet } from '../SvgIcons'

const LessonQuizProgressBar = ({ percentAccuracy, subject, lesson }) => {
	return (
		<div className='my-3 ml-3 '>
			<div className='flex flex-wrap align-middle place-content-center'>
				<div className='w-full'>
					<div className='flex text-sm font-bold align-middle'>
						<div className='w-2 h-2 mt-1.5 mr-1 text-themeColorMain'>
							<LessonBullet />
						</div>
						<div className='text-sm font-bold text-textColor'>
							{subject?.name}
						</div>
					</div>
				</div>
				<div className='w-10/12'>
					<div className='text-xs text-textColor'>
						<Clamp lines={1}>{lesson?.name ? lesson.name : ''}</Clamp>
					</div>
				</div>
				<div className='w-2/12'>
					<div className='flex justify-end w-full text-xs font-semibold align-middle item   text-themeColorMain'>
						{percentAccuracy} %
					</div>
				</div>
			</div>

			<div className='w-full pt-1 mr-2 item'>
				<NoSsr>
					<BorderLinearProgressView
						variant='determinate'
						value={percentAccuracy}
					/>
				</NoSsr>
			</div>
		</div>
	)
}

export default LessonQuizProgressBar
