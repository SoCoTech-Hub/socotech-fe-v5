import React from 'react'
import Fuse from 'fuse.js'

const index = ({ notes, setNoteList }) => {
	const filterNotes = ({ search }) => {
		const fuse = new Fuse(notes, {
			keys: ['created_at', 'note', 'subject.name']
		})
		const results = fuse.search(search)
		setNoteList(search ? results.map((result) => result.item) : notes)
	}

	return (
		<div className='w-full pr-4 ml-2 rounded-lg shadow-md col-xs-4'>
			<div className='relative ml-1 '>
				<img
					src='/support/search_icon.svg'
					alt='Search Icon'
					className='absolute w-12 h-12'
				/>
			</div>
			<div className=''>
				<input
					className='w-full py-3 pr-3 border-2 border-white rounded-lg bg-compBg pl-14 text-textColor'
					type='text'
					placeholder='Type your subject or date...'
					style={{ border: 'solid #EBEBEB 2px' }}
					onChange={(e) => filterNotes({ search: e.target.value })}
				/>
			</div>
		</div>
	)
}

export default index
