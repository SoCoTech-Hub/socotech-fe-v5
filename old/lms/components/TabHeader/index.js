import React, { useState } from 'react'

const TabHeader = (
	title = 'Title Here',
	altText = title,
	tabId = '0',
	openTabNumber = tabId,
	iconSourcePath = './'
) => {
	const [openTab, setOpenTab] = useState(1)

	return (
		<div>
			<li
				className='flex w-1/3 -mb-px text-center last:mr-0'
				role='tab'
			>
				<a
					className={
						'text-xs font-bold uppercase px-3 block w-full leading-normal ' +
						(openTab === { openTabNumber }
							? ' border-b-8 border-themeColorSecondary'
							: ' bg-compBg ')
					}
					onClick={(e) => {
						e.preventDefault()
						setOpenTab({ tabId })
					}}
					data-toggle='tab'
					href='#link2'
				>
					<div className='flex flex-row items-center my-2 place-content-center'>
						<img
							src={iconSourcePath}
							alt={altText}
							className='w-6 h-6'
						/>
						<div
							className='ml-2 text-textColor'
							style={{ textTransform: 'none' }}
						>
							{title}
						</div>
					</div>
				</a>
			</li>
		</div>
	)
}

export default TabHeader
