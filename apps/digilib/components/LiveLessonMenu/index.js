import UpcomingLiveLessonList from '@/components/UpcomingLiveLessonList'
import { useAppContext } from '@/context/AppContext'
import {
	baseUrl,
	// ComponentBg,
	Text,
	} from '@/context/constants'

const LiveLessonMenu = () => {
	const { state } = useAppContext()
	return (
		<div>
			<div className='p-3 rounded-lg bg-compBg shadow-menu text-textColor'>
				{/* <div
          className={`text-xxs ${
          Text
          }`}
        >
          Live Lessons
        </div> */}
				<div className='row'>
					<div className='flex'>
						<img
							src={`${baseUrl}/red_dot.svg`}
							alt='Live Lessons'
							className='self-center float-left w-3 pb-3 mr-2'
						/>
						<div
							className='pb-3 menu-title text-textColor'
						>
							Upcoming Live Lessons
						</div>
					</div>
				</div>
				<div
					className='flex flex-col overflow-scroll text-textColor max-h-80 no-scrolly'
				>
					{UpcomingLiveLessonList()}
				</div>
			</div>
		</div>
	)
}

export default LiveLessonMenu
