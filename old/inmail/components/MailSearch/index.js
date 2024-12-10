const index = ({ searchQuery, onSearch }) => {
	return (
		<div className='flex items-center align-middle border-gray-400 rounded-lg bg-compBg border-2 '>
			{/* <div className='mx-2 text-textColor'>
				<img
					src='/inmail/search_icon.svg'
					alt='Search Icon'
					className='w-16 h-12'
				/>
			</div> */}
			<div className='focus:outline-none'>
				<input
					className='mr-5 pl-4 text-textColor focus:outline-none bg-compBg'
					type='text'
					placeholder='Search mail...'
					value={searchQuery}
					onChange={onSearch}
				/>
			</div>
		</div>
	)
}

export default index
