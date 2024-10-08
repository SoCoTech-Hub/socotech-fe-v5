import React from 'react'
import { MailPlaneIcon } from '../SvgIcons'
import { baseUrl } from '@/context/constants'

const NoMail = () => {
	return (
		<div className='w-full p-4 card mobile:p-2 mobile:mb-28 bg-themeColorMain'>
			<div className='space-y-6 '>
				<div className='pr-10 mr-24 text-4xl font-bold leading-tight text-black mobile:mr-0 mobile:p-1 mobile:leading-10'>
					There is no mail
				</div>
				<div className='mobile:float-right laptop:hidden desktop:hidden'>
					{/* <img
						src={`${baseUrl}/paper_plane.gif`}
						alt='Shows Welcome Image'
						className='object-contain'
						height={150}
						width={150}
					/> */}
				</div>
				<div className='w-3/4 mr-28 mobile:p-1 mobile:mr-0 mobile:w-4/5'>
					<p className='text-xl font-normal leading-tight text-black'>
						When you have messages, they will display here
					</p>
				</div>
			</div>
			{/* <div className='absolute desktop:bottom-16 right-4 mobile:hidden laptop:bottom-16 mobile:bottom-5 gap-x-14'>
				<img
					src={`${baseUrl}/paper_plane.gif`}
					alt='Shows Welcome Image'
					className='object-contain'
					height={150}
					width={150}
				/>
			</div> */}
		</div>
	)
}

export default NoMail
