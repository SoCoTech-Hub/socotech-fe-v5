const CommentField = ({
	id = 'input',
	value,
	placeholder = 'Input Text Here',
	icon,
	type = 'text',
	onChange
}) => {
	return (
		<div>
			<div className='relative mx-2 mt-2 mb-4 rounded-md'>
				<textarea
					rows={5}
					autoComplete='off'
					name={id}
					id={id}
					className='block w-full rounded-md border-0 py-1.5 pr-10 pl-2 text-textColor mobile:text-sm mobile:leading-6 no-scrolly bg-compBg'
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					type={type}
					style={{ resize: 'none' }}
				/>
				<div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'>
					<div
						className='w-5 h-5'
						aria-hidden='true'
					>
						{icon}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CommentField
