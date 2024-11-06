import { NoSsr } from '@mui/material'
import { BorderLinearProgressView } from './styles'
import Clamp from 'react-multiline-clamp'
import lessonProgressCalc from '@/snippets/lms/lessonProgressCalc'
import { mainUrl } from '@/context/constants'
import { LessonBullet } from '@/components/SvgIcons'

interface LessonProgress {
  subject: {
    name: string
  }
  lesson: {
    id: string
    name: string
  }
  totalSteps: number
  completedSteps: number
}

interface LessonProgressButtonProps {
  lessonProgress: LessonProgress
}

const LessonProgressButton: React.FC<LessonProgressButtonProps> = ({ lessonProgress }) => {
  const subjectName = lessonProgress.subject.name

  return (
    <div className="my-3 ml-3">
      <a href={`${mainUrl}/lms/${lessonProgress.lesson.id}`}>
        <div className="flex flex-wrap align-middle place-content-center">
          <div className="w-full">
            <div className="flex text-sm font-bold align-middle">
              <div className="w-2 h-2 mt-1.5 mr-1 text-themeColorMain">
                <LessonBullet />
              </div>
              <div className="text-sm font-bold text-textColor">
                {subjectName}
              </div>
            </div>
          </div>
          <div className="w-10/12">
            <div className="text-xs text-textColor line-clamp-1">
              <Clamp lines={1}>{lessonProgress.lesson.name}</Clamp>
            </div>
          </div>
          <div className="w-2/12">
            <div className="flex justify-end w-full text-xs font-semibold align-middle item text-themeColorMain">
              {lessonProgressCalc({
                totalSteps: lessonProgress?.totalSteps,
                completedSteps: lessonProgress?.completedSteps,
              })}
              %
            </div>
          </div>
        </div>

        <div className="w-full pt-1 mr-2 rounded-md shadow-md item">
          <NoSsr>
            <BorderLinearProgressView
              variant="determinate"
              value={lessonProgressCalc({
                totalSteps: lessonProgress?.totalSteps,
                completedSteps: lessonProgress?.completedSteps,
              })}
            />
          </NoSsr>
        </div>
      </a>
    </div>
  )
}

export default LessonProgressButton
