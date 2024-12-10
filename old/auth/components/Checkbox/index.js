import { useState } from 'react'

const Checkbox = ({ label = ' ', setter, value }) => {
	const [checked, setChecked] = useState(false)
	function onChange(event) {
		setChecked(event.target.checked)
		setter ? setter(event.target.checked) : console.log(label)
	}

	return (
		<div className='flex flex-row items-center'>
			<input
				id={label == ' ' ? label.replace(' ', '') : 'check'}
				className='mr-1'
				type='checkbox'
				onChange={(e) => onChange(e)}
				value={checked}
				checked={checked}
				style={{
					backgroundColor: checked ? 'rgb(14,134,212)' : 'white',
					borderColor: checked ? 'white' : '#181818'
				}}
			/>
			<label
				className='form-check-label'
				htmlFor={label == ' ' ? label.replace(' ', '') : 'check'}
			>
				{label}
			</label>
		</div>
	)
}

export default Checkbox
