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
			<div className='relative mt-2 rounded-md'>
				<textarea
					rows={1}
					autoComplete='off'
					name={id}
					id={id}
					className='block w-full rounded-md border-0 py-1.5 pr-10 pl-2 text-textColor mobile:text-sm mobile:leading-6 no-scrolly bg-compBg'
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					type={type}
					style={{resize: 'none'}}
				/>
				<div className='cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3'>
					<div
						className='h-5 w-5'
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
