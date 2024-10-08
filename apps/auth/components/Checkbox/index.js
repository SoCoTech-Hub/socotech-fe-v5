import { useState } from 'react'

const Checkbox = ({ label = ' ', setter, value }) => {
	const [checked, setChecked] = useState(false)
	function onChange(event) {
		setChecked(event.target.checked)
		setter ? setter(event.target.checked) : console.log(label)
	}

	return (
		<div className='form-check'>
			<input
				id={label == ' ' ? label.replace(' ', '') : 'check'}
				className='form-check-input'
				type='checkbox'
				onChange={(e) => onChange(e)}
				value={checked}
				checked={checked}
				style={{
					backgroundColor: checked ? 'rgba(214, 243, 121)' : '#181818',
					borderColor: checked ? 'rgba(214, 243, 121, 50)' : 'white'
				}}
			/>
			<label
				className='text-xs form-check-label'
				htmlFor={label == ' ' ? label.replace(' ', '') : 'check'}
			>
				{label}
			</label>
		</div>
	)
}

export default Checkbox
