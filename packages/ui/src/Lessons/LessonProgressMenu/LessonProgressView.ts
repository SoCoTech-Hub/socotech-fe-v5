import { useEffect, useState } from 'react'
import LessonProgressButton from './LessonProgressButton'
import getInProgressLessonsList from '@/snippets/lms/getInProgressLessonsList'
import { userId } from '@/context/constants'

interface LessonProgress {
  id: string
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

const LessonProgressView: React.FC = () => {
  const [data, setData] = useState<LessonProgress[]>([])

  useEffect(() => {
    const fetchInProgressLessons = async () => {
      if (userId) {
        const lessons = await getInProgressLessonsList({ userId })
        setData(lessons)
      }
    }
    fetchInProgressLessons()
  }, [])

  if (data.length) {
    return (
      <div className="mobile:px-4 rounded-lg mobile:bg-compBg overflow-scroll divide-y divide-gray-200 max-h-80 no-scrolly">
        {data.map((item) => (
          <div className="py-1" key={item.id}>
            <LessonProgressButton lessonProgress={item} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="text-textColor font-bold">No lesson in progress</div>
  )
}

export default LessonProgressView
