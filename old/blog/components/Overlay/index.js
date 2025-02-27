import { useRef } from 'react'
import { CloseIcon } from '@/components/SvgIcons'
const Overlay = ({
	isOpen,
	onClose,
	title,
	content,
	width,
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
						/>
						<div className='flex items-center justify-center mx-auto my-40 overflow-y-hidden'>
							<div
								className={`${width} h-${height} relative z-50 p-4 bg-${bgColor} rounded-lg`}
							>
								<div className='flex flex-col'>
									<div className='flex flex-row items-center gap-4'>
										<span className='text-lg font-semibold text-center text-textColor'>
											{title}
										</span>
										<CloseIcon
											onClick={() => onClose()}
											className='absolute right-0 w-8 h-8 mr-3 cursor-pointer top-4'
										/>
									</div>
									<p className='text-sm leading-tight text-textColor mobile:text-xs'>
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
