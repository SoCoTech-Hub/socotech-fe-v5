import { useState, useRef } from 'react'
import { InfoIcon } from '@/components/SvgIcons/InfoIcon'

const Overlay = ({
	isOpen,
	onClose,
	title,
	content,
	confirmText,
	cancelText
}) => {
	const cancelButtonRef = useRef()

	return (
		<div>
			<div
				className={`fixed inset-0 z-50 overflow-y-auto ${
					isOpen ? 'block' : 'hidden'
				}`}
			>
				{isOpen && (
					<div>
						<div
							className='fixed inset-0 bg-gray-500 bg-opacity-75'
							onClick={() => onClose()}
						></div>
						<div className='flex items-center justify-center  mobile:w-3/4 mobile:h-1/2 mx-auto my-24 overflow-y-hidden'>
							<div className='relative bg-white rounded-lg p-4 mx-auto max-w-md z-50'>
								<div className='flex flex-col'>
									<div className='flex flex-row items-center'>
										<InfoIcon
											className='h-6 w-6 mr-3'
											aria-hidden='true'
											fill='#000'
										/>
										<span className='text-lg text-center font-semibold text-gray-900'>
											{title}
										</span>
									</div>
									<p className='mt-2 text-sm text-gray-500 mobile:text-xs leading-tight text-justify'>
										{content}
									</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Overlay
