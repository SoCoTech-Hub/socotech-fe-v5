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
			<div className='p-3 text-xs rounded-lg bg-compBg shadow-menu'>
				<div className={` text-textColor text-xs ${Text} `}>
					Lessons in progress
				</div>
				<div className={`text-textColor ml-3 text-xs ${Text}`}>
					<LessonProgress />
				</div>
			</div>
		</div>
	)
}

export default LessonProgressMenu
