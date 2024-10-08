import { CloseIcon } from '../SvgIcons'

const Overlay = ({
	isOpen,
	onClose,
	title,
	content,
	width,
	height,
	bgColor = '#fff'
}) => {
	return isOpen ? (
		<div>
			<div
				className={`fixed inset-0 z-50 overflow-y-auto ${
					isOpen ? 'block' : 'hidden'
				}`}
			>
				{isOpen && (
					<div className='fixed inset-0 bg-gray-500 bg-opacity-75'>
						<div className='flex items-center justify-center overflow-y-hidden mobile:px-2 laptop:px-8 desktop:px-32 mobile:my-20 mobile:mx-auto laptop:my-8 desktop:my-8 mobile:w-full mobile:h-1/2'>
							<div
								className={`w-${width} h-${height} relative z-50 desktop:p-4 laptop:p-4 mobile:p-3 mx-auto bg-${bgColor} rounded-lg`}
							>
								<div className='flex flex-col'>
									<div className='flex flex-row items-center gap-4 mobile:mt-4'>
										<span className='text-lg font-semibold text-center text-textColor'>
											{title}
										</span>
										<div className='absolute right-0 mr-3 top-4 '>
											<CloseIcon
												className='w-6 h-6 rounded-full cursor-pointer bg-themeColorMain'
												stroke='none'
												alt='Close'
												onClick={() => onClose()}
												aria-hidden='true'
											/>
										</div>
									</div>
									<p className='mt-2 text-sm leading-tight text-justify text-gray-500 mobile:text-xs'>
										{content}
									</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	) : (
		<></>
	)
}

export default Overlay
