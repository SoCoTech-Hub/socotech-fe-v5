import { useAppContext } from '@/context/AppContext'
import { AppBg, baseUrl } from '@/context/constants'

const Modal = ({ open = true, setOpen = () => {}, children }) => {
	const state = useAppContext()
	return (
		<>
			{open ? (
				<div
					className='fixed inset-0 z-50 flex justify-center w-full overflow-scroll desktop:items-center laptop:items-center main-modal animated fadeIn faster'
					style={{
						background: 'rgb(0,0,0,.5)'
					}}
					id='exampleModal'
					tabIndex='-1'
					role='dialog'
					aria-hidden='true'
				>
					<div
						className='p-2 mx-auto overflow-y-auto shadow-lg bg-compBg mobile:mb-28 desktop:w-10/12 laptop:w-10/12 mobile:w-11/12 modal-container rounded-xl no-scrolly desktop:h-3/4 laptop:h-3/4 mobile:h-fit mobile:mt-24'
						style={{
							background: AppBg
						}}
					>
						<div
							className='text-left modal-content no-scrolly'
							id='scrollplz'
						>
							<div className='desktop:absolute laptop:absolute desktop:top-3 laptop:top-3 desktop:right-3 laptop:right-3 mobile:top-24 mobile:right-6 mobile:fixed'>
								<button
									onClick={() => setOpen(!open)}
									className='cursor-pointer'
								>
									<img
										className='w-7 h-7'
										src={`${baseUrl}/modal_close_topic.svg`}
										alt='Close'
										style={{
											position: 'relative',
											zIndex: '9999'
										}}
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
