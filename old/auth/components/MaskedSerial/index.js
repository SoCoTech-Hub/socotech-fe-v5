import React from 'react'
import InputMask from 'react-input-mask'

const MaskedSerial = ({ name, required = false, value, setter }) => {
	return (
		<InputMask
			className='w-full text-themeColorMain bg-white bg-opacity-20 rounded-lg p-3 block border-2 ring-inset ring-white placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-themeColorMain mobile:text-sm mobile:leading-6 shadow-md'
			mask='* - **** - * - *** - *** - *** - *** - ***'
			onChange={(event) => setter(event.target.value)}
			placeholder={`Tablet Serial Number ${required ? '(Required)' : ''}`}
			name={name}
			id={name}
			value={value}
			required={required}
		/>
	)
}
export default MaskedSerial
