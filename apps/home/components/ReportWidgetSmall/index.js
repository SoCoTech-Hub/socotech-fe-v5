import React from 'react'

const index = ({
	color = 'bg-compBg',
	data = 'Test',
	title = 'Test',
	textColor = 'white',
	bgImage = 'banner-bg-4'
}) => {
	return (
		<div>
			<div className={`h-20 ${color} rounded-lg  ${bgImage}`}>
				<div className='flex justify-between'>
					<div
						className={`pt-3 pl-5 text-3xl font-bold text-${textColor} raleway`}
					>
						{data}
					</div>
				</div>

				<div className={`pl-5 leading-tight text-${textColor} raleway`}>
					{title}
				</div>
			</div>
		</div>
	)
}

export default index
