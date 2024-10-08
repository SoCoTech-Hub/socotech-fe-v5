import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Btn from '@/components/Btn'
import NotesModal from '@/components/NotesModal'
import Pagination from '@/components/Pagination'

const index = ({
	notes,
	refetchNotes,
	setDelete,
	isOpen,
	setIsOpen,
	deleteId
}) => {
	let pageSize = 10
	const [currentPage, setCurrentPage] = useState(1)
	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize
		const lastPageIndex = firstPageIndex + pageSize
		return notes?.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, notes])

	return (
		<div className='rounded-lg bg-compBg shadow-menu   mobile:overflow-scroll mobile:w-full'>
			<div className='pt-4 pb-3 pl-8 text-left text-textColor'>Your Notes</div>
			<div className='ml-8 mr-8'>
				<hr className='bg-compBg' />
			</div>
			<div className=''>
				<table className='w-full table-auto'>
					<thead>
						<tr>
							<th className='py-4 pl-8 text-textColor '>Date</th>
							<th className='px-8 py-4 text-textColor '>Note</th>
							<th className='py-4 pl-20 text-textColor '>Subject</th>
						</tr>
					</thead>
					<tbody>
						{currentTableData ? (
							currentTableData.map((note) => (
								<tr key={note.id}>
									<Link
										href={`/notes/${note.id}`}
										passHref
									>
										<td className='px-8 py-4 font-extrabold cursor-pointer text-textColor'>
											{note.created_at.split('T')[0]}
										</td>
									</Link>
									<Link
										href={`/notes/${note.id}`}
										passHref
									>
										<td className='px-8 py-4 cursor-pointer text-textColor'>
											{note?.name}
										</td>
									</Link>
									<Link
										href={`/notes/${note.id}`}
										passHref
									>
										<td className='py-4 pl-20 text-sm font-extrabold cursor-pointer text-textColor '>
											{note?.subject ? note.subject.name : ''}
										</td>
									</Link>
									<td className='w-20 pr-10 '>
										<Btn
											onClickFunction={() => setDelete(note.id)}
											label='Delete note'
											color='bg-themeColorMain'
											padding='px-3 py-2'
											width='32'
										/>
									</td>
									{isOpen && (
										<NotesModal
											id={deleteId}
											isOpen={isOpen}
											setIsOpen={setIsOpen}
											refetchNotes={refetchNotes}
										/>
									)}
								</tr>
							))
						) : (
							<tr>
								<td className='px-8 py-4 font-extrabold text-textColor'>
									No notes Found
								</td>
							</tr>
						)}
					</tbody>
				</table>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Pagination
						className='pagination-bar'
						currentPage={currentPage}
						totalCount={notes ? notes.length : 0}
						pageSize={pageSize}
						onPageChange={(page) => setCurrentPage(page)}
					/>
				</div>
			</div>
		</div>
	)
}

export default index
