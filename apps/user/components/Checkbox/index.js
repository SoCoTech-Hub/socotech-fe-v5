const Checkbox = ({ label = ' ', setter, value }) => {
	function onChange(event) {
		setter ? setter(event.target.checked) : console.log(label)
	}
	return (
		<div className='my-2 '>
			<input
				id={label == ' ' ? label.replace(' ', '') : 'check'}
				type='checkbox'
				onChange={(e) => onChange(e)}
				value={value}
				checked={value}
			/>
			<label
				className='px-2 pt-1 form-check-label text-textColor bg-compBg'
				htmlFor={label == ' ' ? label.replace(' ', '') : 'check'}
			>
				{label}
			</label>
		</div>
	)
}

export default Checkbox
