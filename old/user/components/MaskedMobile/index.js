// import MaskedInput from "react-text-mask";
import React from 'react'
import InputMask from 'react-input-mask'

const MaskedMobile = ({
	name,
	required = false,
	value,
	setter,
	placeholder,
	disabled = false
}) => {
	return (
		<div className='pb-2'>
			{/* <MaskedInput
        className="font-bold style2-input form-control text-grey-900 fw-600"
        mask={[
          "(",
          /\d/,
          /\d/,
          /\d/,
          ")",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
        onChange={(event) => setter(event.target.value)}
        placeholder={`${placeholder} ${required ? "(Required)" : ""}`}
        name={name}
        id={name}
        value={value}
        required={required}
      /> */}
			<InputMask
				className='w-full p-3 rounded-lg border-2 border-white text-textColor bg-compBg'
				mask='999 999 9999'
				onChange={(event) => setter(event.target.value)}
				placeholder={`${placeholder} ${required ? '(Required)' : ''}`}
				name={name}
				id={name}
				value={value}
				required={required}
				disabled={disabled}
			/>
		</div>
	)
}
export default MaskedMobile
