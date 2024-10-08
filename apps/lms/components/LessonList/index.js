import React from 'react'
import LessonListView from '@/components/LessonListView'

const LessonList = ({ subjectCategory = [], setSubject }) => {
	return (
		<div className='w-full desktop:p-4 laptop:p-4 mobile:p-1 rounded-lg bg-compBg mobile:grid mobile:grid-cols-1 shadow-menu laptop:mb-4'>
			<div className='desktop:mt-3 laptop:mt-3 mobile:mt-0 space-y-3 text-textColor '>
				{LessonListView({ subjectCategory, setSubject })}
			</div>
		</div>
	)
}

export default LessonList
