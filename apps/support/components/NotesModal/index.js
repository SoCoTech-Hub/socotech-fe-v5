import api from '@/api/api'
import Btn from '@/components/Btn'

const NotesModal = ({ id, isOpen, setIsOpen, refetchNotes }) => {
	const submit = async () => {
		await api.delete(`/notes/${id}`)
		setIsOpen(!isOpen)
		refetchNotes()
	}

	return (
		<div>
			<div
				className='fixed inset-0 z-50 flex items-center justify-center w-full p-4 overflow-hidden main-modal animated fadeIn faster'
				style={{ background: 'rgb(0,0,0,.2)' }}
				id='exampleModal'
				tabIndex='-1'
				role='dialog'
				aria-labelledby='LogTicket'
				aria-hidden='true'
			>
				<div className='mx-auto overflow-y-auto bg-compBg rounded-lg shadow-lg modal-container md:max-w-11/12  '>
					<div className='px-4 py-4 text-left modal-content bg-appBg'>
						<div className='mb-4 font-bold leading-tight text-center text-textColor text-lg'>
							Are you sure you want to delete this note?
							<br />
							<span className='mt-1 text-sm font-normal text-textColor'>
								This is a permanent action
							</span>
						</div>
						<div className='flex justify-center'>
							<div className='flex gap-2'>
								<Btn
									onClickFunction={submit}
									label='Yes, delete'
									color='bg-themeColorMain'
								/>
								<Btn
									onClickFunction={() => setIsOpen(!isOpen)}
									label='No, keep'
									color='bg-themeColorMain'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NotesModal
