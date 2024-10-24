import UpcomingLiveLessonList from '@/components/UpcomingLiveLessonList'
import { useAppContext } from '@/context/AppContext'
import { baseUrl } from '@/context/constants'

const LiveLessonMenu: React.FC = () => {
  const { state } = useAppContext()

  return (
    <div>
      <div className="p-3 rounded-lg shadow-md bg-compBg">
        <div className="row">
          <div className="flex">
            <img
              src={`${baseUrl}/red_dot.svg`}
              alt="Live Lessons"
              className="self-center float-left w-3 pb-3 mr-2"
            />
            <div className="menu-title pb-3 text-textColor">
              Upcoming Live Lessons
            </div>
          </div>
        </div>
        <div className="flex flex-col max-h-80 overflow-scroll no-scrolly">
          {UpcomingLiveLessonList()}
        </div>
      </div>
    </div>
  )
}

export default LiveLessonMenu
