import React from 'react'

const SubjectButton = ({
	icon,
	color,
	title = 'Item',
	description,
	onClick,
	mobilemb = 'mobile:mb-3',
	id = 0
}) => {
	return (
		<div
			className={`cursor-pointer mobile:mx-3 ${mobilemb}`}
			data-tracking-action={`Click on subject ${title}`}
		>
			<button
				data-id={id}
				onClick={() => onClick(id)}
				data-tracking-action={`Click on subject ${title}`}
			>
				<div className='flex flex-row mt-2 align-middle align-items-center  '>
					<div className='item'>
						<div
							className={`w-10 h-10 p-2 rounded-full bg-lessonList ${color}`}
						>
							<div className='mx-auto my-auto text-lessonListIconColor'>
								{icon}
							</div>
						</div>
					</div>
					<div className='ml-2 item'>
						<div className='text-black'>{title}</div>
						{description ? (
							<div className='text-black text-xxs '>{description}</div>
						) : (
							''
						)}
					</div>
				</div>
			</button>
		</div>
	)
}

export default SubjectButton
