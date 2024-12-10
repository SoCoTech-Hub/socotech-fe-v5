import React from 'react'

const TicketBox = ({ theme, title, value }) => {
	return (
		<div>
			<div
				className={`h-24  ${theme} rounded-lg flex-grow flex align-items-center p-3 mobile:p-0`}
			>
				<div className=''>
					<div className='w-full desktop:text-xl laptop:text-xl text-left text-white mobile:text-xl'>
						{title}
					</div>
					<div className='w-full font-bold desktop:text-xl laptop:text-xl text-left text-white mobile:text-lg'>
						{value}
					</div>
				</div>
			</div>
		</div>
	)
}

export default TicketBox
