const SubjectCard = ({
	subjectTitle,
	setSubject,
	id,
	color = '#dd00ee',
	icon,
	//lessonCount = 0
}) => {
	return (
		<div
			className='w-full'
			id={id}
			value={id}
			onClick={() => setSubject(id)}
		>
			<div
				className={`h-auto overflow-hidden rounded-lg cursor-pointer bg-cover bg-center bg-compBg shadow-menu ${color} relative`}
				style={{
					 backgroundColor: color, backgroundImage: `url(${icon})`,
				}}
				>
				<div className='flex flex-wrap justify-between desktop:p-3 laptop:p-3 mobile:p-1'>
					<div className='w-full text-base mobile:text-sm font-bold leading-tight text-black desktop:h-28 laptop:h-28 mobile:h-20'>
						{subjectTitle}
					</div>
					{/* <div className='text-xs mobile:text-xxs text-right text-black'>
						{lessonCount} {lessonCount !== 1 ? 'Lessons' : 'Lesson'}
					</div> */}
				</div>
			</div>
		</div>
	)
}

export default SubjectCard
