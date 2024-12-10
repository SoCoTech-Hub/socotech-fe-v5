import { useAppContext } from '@/context/AppContext'
import { AppBg, baseUrl } from '@/context/constants'

const InMailModal = ({ open = false, children }) => {
	const state = useAppContext()
	return (
		<>
			{open ? (
				<div
					className='fixed inset-0 flex items-center justify-center w-full overflow-hidden main-modal animated fadeIn faster'
					style={{ background: 'rgb(0,0,0,.5)', zIndex: 300 }}
					id='InMailModal'
					tabIndex='-1'
					role='dialog'
					aria-labelledby='ComposeMail'
					aria-hidden='true'
				>
					<div
						className='w-11/12 mx-auto overflow-y-auto rounded-lg shadow-lg bg-compBg h-3/4 modal-container '
						style={{
							background: AppBg
						}}
					>
						<div
							className='px-3 py-3 text-left modal-content no-scrolly'
							id='scrollplz'
						>
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
export default InMailModal
