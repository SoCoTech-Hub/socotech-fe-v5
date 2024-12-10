import React from 'react'

const index = ({
	boxBackground = 'bg-blue-300',
	iconBackground = 'bg-blue-600',
	icon,
	mainText = '25',
	subText = 'Total Hours Spent'
}) => {
	return (
		<div>
			<div
				className={`flex items-center justify-center w-full py-4 ${boxBackground} rounded-2xl`}
			>
				<div className={`p-2 ${iconBackground} rounded-full icon`}>{icon}</div>
				<div className='my-auto ml-3 lettering'>
					<div className='text-4xl font-bold leading-none text-textColor main lettering'>
						{mainText}
					</div>
					<div className='text-xs leading-tight text-textColor sub heading'>
						{subText}
					</div>
				</div>
			</div>
		</div>
	)
}

export default index
