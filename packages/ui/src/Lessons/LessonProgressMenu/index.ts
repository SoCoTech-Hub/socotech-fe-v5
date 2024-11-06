import LessonProgress from './LessonProgressView'
import { useAppContext } from '@/context/AppContext'

const LessonProgressMenu: React.FC = () => {
  const { state } = useAppContext()

  return (
    <div>
      <div className="p-3 text-xs rounded-lg shadow-md mobile:p-1 mobile:bg-navbarBg bg-compBg shadow-md mobile:font-bold mobile:w-full">
        <div className="text-textColor mobile:mb-2 mobile:text-xl">
          Lessons in progress
        </div>
        <div>
          <LessonProgress />
        </div>
      </div>
    </div>
  )
}

export default LessonProgressMenu
