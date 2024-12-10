import React from 'react'
import InputMask from 'react-input-mask'

const MaskedImei = ({ name, required = false, value, setter }) => {
	return (
		<InputMask
			className='w-full text-themeColorMain bg-white bg-opacity-20 rounded-lg p-3 block border-2 ring-inset ring-white placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-themeColorMain mobile:text-sm mobile:leading-6 shadow-md'
			mask='9999 9999 9999 999'
			onChange={(event) => setter(event.target.value)}
			placeholder={`Sim IMEI number ${required ? '(Required)' : ''}`}
			name={name}
			id={name}
			value={value}
			required={required}
		/>
	)
}
export default MaskedImei
