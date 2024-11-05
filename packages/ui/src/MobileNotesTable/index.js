import React from 'react'
import Link from 'next/link'
import { TopTrashIcon } from '@/components/SvgIcons'
import NotesModal from '@/components/NotesModal'

const index = ({
	notes,
	refetchNotes,
	setDelete,
	isOpen,
	setIsOpen,
	deleteId
}) => {
	return (
		<>
			{notes?.length ? (
				notes.map((note) => (
					<div
						className='w-full p-2'
						key={note?.id}
					>
						<div className='flex gap-2'>
							<div
								className='w-10 h-10 mt-2 font-bold text-textColor'
								onClick={() => setDelete(note.id)}
							>
								<TopTrashIcon />
							</div>
							<Link
								href={`/notes/${note.id}`}
								passHref
							>
								<div className='flex flex-wrap w-full '>
									<div className='flex justify-between w-full'>
										<div className='flex'>
											<div className='font-bold'>
												{note?.name ? note.name : ''}
											</div>
										</div>
										<div>{note.created_at.split('T')[0].replace('-', '/')}</div>
									</div>
									<div className='flex justify-between w-full'>
										<div className=''>
											{note?.subject ? note.subject.name : ''}
										</div>
									</div>
								</div>
							</Link>
							{isOpen && (
								<NotesModal
									id={deleteId}
									isOpen={isOpen}
									setIsOpen={setIsOpen}
									refetchNotes={refetchNotes}
								/>
							)}
						</div>
					</div>
				))
			) : (
				<div>No Notes Found</div>
			)}
		</>
	)
}

export default index
