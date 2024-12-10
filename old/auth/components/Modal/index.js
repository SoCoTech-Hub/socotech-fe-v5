import { baseUrl } from '@/context/constants'
import { Close } from '@/components/SvgIcons'

const Modal = ({ open = true, setOpen = () => {}, children }) => {
	const handleOverlayClick = (e) => {
		// Check if the click target is the overlay (background) itself, not the modal content
		if (e.target.id === 'overlay') {
			setOpen(false)
		}
	}

	return (
		<>
			{open ? (
				<div
					id='overlay'
					onClick={handleOverlayClick}
					className='fixed inset-0 flex items-center justify-center w-full h-full animated fadeIn faster'
					style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 300 }}
					tabIndex='-1'
					role='dialog'
					aria-labelledby='LogTicket'
					aria-hidden='true'
				>
					<div
						className='relative w-full max-w-3xl rounded-lg shadow-lg bg-compBg'
						style={{
							position: 'relative',
							overflow: 'hidden',
							maxHeight: '80vh', // Ensure it fits within the viewport with some margin
							width: '90%', // Responsive width
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}
						onClick={(e) => e.stopPropagation()} // Prevents clicks inside the modal from closing it
					>
						{/* Close Button */}
						<div className='absolute z-50 top-2 right-2'>
							<button
								onClick={() => setOpen(false)}
								className='cursor-pointer'
							>
								<Close className='w-7 h-7' />
							</button>
						</div>

						{/* Content (e.g., Video) */}
						<div
							style={{
								position: 'relative',
								paddingTop: '56.25%', // 16:9 aspect ratio
								width: '100%',
								flex: '1 1 auto'
							}}
						>
							<div
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%'
								}}
							>
								{children}
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	)
}

export default Modal
