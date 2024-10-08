import { useAppContext } from '@/context/AppContext'
import { AppBg, baseUrl } from '@/context/constants'

const Modal = ({ open = true, setOpen = () => {}, children }) => {
	const state = useAppContext()
	return (
		<>
			{open ? (
				<div
					className='fixed inset-0 flex items-center justify-center w-full overflow-hidden main-modal animated fadeIn faster'
					style={{ background: 'rgb(0,0,0,.5)', zIndex: 300 }}
					id='exampleModal'
					tabIndex='-1'
					role='dialog'
					aria-labelledby='LogTicket'
					aria-hidden='true'
				>
					<div
						className='w-11/12 mx-auto overflow-y-auto rounded-lg shadow-lg modal-container '
						style={{
							background: AppBg
						}}
					>
						<div
							className='h-full px-3 py-3 text-left bg-compBg modal-content no-scrolly'
							id='scrollplz'
						>
							<div className='absolute top-5 right-5'>
								<button
									onClick={() => setOpen(!open)}
									className='cursor-pointer'
								>
									<img
										className='w-7 h-7'
										src={`${baseUrl}/modal_close.svg`}
										alt='Close'
									/>
								</button>
							</div>
							{children}
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}
export default Modal
