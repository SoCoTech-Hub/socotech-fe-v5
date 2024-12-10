import React from 'react'

const index = ({
	boxBackground = 'bg-blue-300',
	iconBackground = 'bg-blue-600',
	icon,
	mainText = '25',
	subText = 'Total Hours Spent'
}) => {
	return (
		<div className='h-20 px-1 py-2 mx-1'>
			<div
				className='leading-tight text-black font-bold'
				style={{ marginBottom: '-0.5rem' }}
			>
				{subText}
			</div>
			<div className={` ${iconBackground} rounded-lg float-right`}>{icon}</div>
			<div className='py-6 font-bold leading-none text-black heading main lettering'>
				{mainText}
				<div className='relative'></div>
			</div>
		</div>
	)
}

export default index
