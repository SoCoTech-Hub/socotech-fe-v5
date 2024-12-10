import SubjectCard from '../SubjectCard'

const LessonListView = ({ subjectCategory, setSubject }) => {
	const subjects = subjectCategory?.subjects
	const sortedSubjects = subjects?.sort(
		(a, b) => parseInt(a['id'], 10) - parseInt(b['id'], 10)
	)

	const subjectList = sortedSubjects ? (
		<div className='grid desktop:grid-cols-5 laptop:grid-cols-4 mobile:grid-cols-3 place-items-stretch'>
			{sortedSubjects.map((subject) => (
				<div
					className='m-2'
					key={subject.id}
				>
					<SubjectCard
						subjectTitle={subject.name}
						setSubject={setSubject}
						id={parseInt(subject.id)}
						color={subject.color}
						// lessonCount={subject.lessonCount}
						icon={subject.icon.url}
					/>
				</div>
			))}
		</div>
	) : (
		<strong className='text-xs text-textColor'>Subjects loading...</strong>
	)

	return subjectCategory ? subjectList : <></>
}

export default LessonListView
