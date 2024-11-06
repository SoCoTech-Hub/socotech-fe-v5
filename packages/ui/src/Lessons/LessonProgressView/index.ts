import React, { useEffect, useState } from 'react'
import getInProgressLessonsList from '@/snippets/lms/getInProgressLessonsList'
import LessonProgressButton from '@/components/LessonProgressButton'

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

interface LessonProgressViewProps {
  userId: string
}

const LessonProgressView: React.FC<LessonProgressViewProps> = ({ userId }) => {
  const [data, setData] = useState<LessonProgress[]>([])

  useEffect(() => {
    const fetchInProgressLessons = async () => {
      const lessons = await getInProgressLessonsList({ userId })
      setData(lessons)
    }
    fetchInProgressLessons()
  }, [userId])

  if (data.length !== 0) {
    return (
      <div>
        {data.map((item) => (
          <LessonProgressButton key={item.id} lessonProgress={item} />
        ))}
      </div>
    )
  }
  return <div className="text-textColor">No lesson in progress</div>
}

export default LessonProgressView
