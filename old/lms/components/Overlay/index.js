import { useRef } from 'react'

const Overlay = ({
	isOpen,
	onClose,
	title,
	content,
	width = 'fit',
	height,
	bgColor = '#fff'
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
						<div className='flex items-center justify-center overflow-y-hidden desktop:my-72 laptop:my-52 mobile:my-60'>
							<div
								className={`w-${width} h-${height} relative z-50 laptop:p-4 desktop:p-4 mobile:py-3 mobile:px-1 bg-${bgColor} rounded-lg`}
							>
								<div className='flex flex-col'>
									<div className='flex flex-row items-center gap-4'>
										<span className='text-lg font-semibold text-center text-gray-900'>
											{title}
										</span>
										<img
											className='absolute right-0 w-6 h-6 mr-3 cursor-pointer top-4'
											src='/lms/modal_close_topic.svg'
											alt='Close'
											onClick={() => onClose()}
											aria-hidden='true'
										/>
									</div>
									<p className='text-sm leading-tight text-gray-500 mobile:text-xs'>
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
