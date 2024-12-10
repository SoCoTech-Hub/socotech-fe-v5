const DateTimePickField = ({
	id,
	placeholder = 'Input Text Here',
	onChange,
	value,
	required,
	type = 'time' // date, time, datetime-local
}) => {
	return (
		<div className='mb-3'>
			<input
				id={id}
				name={id}
				className='w-full font-bold text-textColor bg-compBg'
				style={{ stroke: '#fff' }}
				placeholder={placeholder}
				onChange={onChange}
				type={type}
				required={required}
				value={value}
			/>
		</div>
	)
}

export default DateTimePickField
