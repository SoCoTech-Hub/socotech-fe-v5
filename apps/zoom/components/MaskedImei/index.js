import React from 'react'
import InputMask from 'react-input-mask'
const MaskedImei = ({ name, required = false, value, setter }) => {
	return (
		<div className='pb-2 mt-2 mb-2'>
			<InputMask
				className='font-bold style2-input form-control text-textColor'
				mask='9999 9999 9999 999'
				onChange={(event) => setter(event.target.value)}
				placeholder={`Sim IMEI number ${required ? '(Required)' : ''}`}
				name={name}
				id={name}
				value={value}
				required={required}
			/>
		</div>
	)
}
export default MaskedImei
