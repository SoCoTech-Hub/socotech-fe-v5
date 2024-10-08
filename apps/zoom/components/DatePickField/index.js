import React, { useState } from 'react'

const DatePickField = ({
	id,
	placeholder = 'Input Text Here',
	onChange,
	value,
	required
}) => {
	const [showMarkup, setShowMarkup] = useState(false)
	const handleClickShowMarkup = () => {
		setShowMarkup(!showMarkup)
	}

	return (
		<div className='mb-3 form-group'>
			<input
				id={id}
				name={id}
				className='font-bold style2-input form-control text-textColor'
				placeholder={placeholder}
				onChange={onChange}
				type={showMarkup ? 'date' : 'text'}
				onFocus={handleClickShowMarkup}
				required={required}
				value={value}
				InputLabelProps={{
					shrink: false,
					name: 'dob',
					id: 'dob',
					placeholder: placeholder
				}}
			/>
		</div>
	)
}

export default DatePickField
