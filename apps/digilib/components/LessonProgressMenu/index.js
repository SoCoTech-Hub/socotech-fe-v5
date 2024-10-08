import LessonProgress from './LessonProgressView'
import { useAppContext } from '@/context/AppContext'
import {
	// ComponentBg,
	Text
} from '@/context/constants'

const LessonProgressMenu = () => {
	const { state } = useAppContext()
	return (
		<div>
			<div className='p-3 text-xs rounded-lg mobile:p-1 mobile:bg-navbarBg bg-compBg shadow-menu mobile:font-bold mobile:w-full'>
				<div className='text-textColor mobile:mb-2 mobile:text-xl'>
					Lessons in progress
				</div>
				<div
					className='text-textColor'
				>
					<LessonProgress />
				</div>
			</div>
		</div>
	)
}

export default LessonProgressMenu
