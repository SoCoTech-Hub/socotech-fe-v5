import LessonProgress from './LessonProgressView'

import {
	// ComponentBg,
	Text,
	
} from '@/context/constants'

const LessonProgressMenu = () => {
	
	return (
		<div>
			<div className='p-3 text-xs rounded-lg mobile:p-1 mobile:bg-navbarBg bg-compBg shadow-menu mobile:font-bold mobile:w-full'>
				<div
					className={`text-textColor mobile:mb-2 mobile:text-xl ${Text}`}
				>
					Lessons in progress
				</div>
				<div
					className={` text-textColor ${Text}`}
				>
					<LessonProgress />
				</div>
			</div>
		</div>
	)
}

export default LessonProgressMenu
