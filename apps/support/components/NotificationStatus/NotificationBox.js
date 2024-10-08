import React from 'react'

const NotificationBox = ({ theme, title, value }) => {
	return (
		<div>
			<div className={`h-24 rounded-lg flex-grow flex align-items-center p-3`}>
				<div className=''>
					<div className='w-full font-bold desktop:text-xl laptop:text-xl text-left text-black mobile:text-md'>
						{title}
					</div>
					<div className='w-full font-bold desktop:text-xl laptop:text-xl text-left text-black mobile:text-lg'>
						{value}
					</div>
				</div>
			</div>
		</div>
	)
}

export default NotificationBox
