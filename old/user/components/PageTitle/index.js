import React from 'react'

const PageTitle = ({ PageTitle = 'No Title' }) => {
	return (
		<div>
			<div className='grid text-xl text-black rounded-lg mobile:p-2 bg-themeColorMain place-content-center desktop:py-2 laptop:py-2'>
				{PageTitle}
			</div>
		</div>
	)
}

export default PageTitle
