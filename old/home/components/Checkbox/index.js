import React from 'react'

const Checkbox = ({ label, setter, value }) => {
	function onChange(event) {
		setter ? setter(event.target.checked) : console.log(label)
	}
	return (
		<div className='form-check'>
			<input
				id={label}
				className='form-check-input'
				type='checkbox'
				onChange={(e) => onChange(e)}
				value={value}
				checked={value}
			/>
			<label
				className='text-xs form-check-label'
				htmlFor={label}
			>
				{label}
			</label>
		</div>
	)
}

export default Checkbox
