// import MaskedInput from "react-text-mask";
import React from 'react'
import InputMask from 'react-input-mask'

const MaskedIdnumber = ({
	name,
	required = false,
	value,
	setter,
	disabled = false
}) => {
	return (
		<div className='mb-3'>
			{/* <MaskedInput
        className="font-bold style2-input form-control text-grey-900"
        mask={[
          /\d/,
          /\d/,
          " ",
          /\d/,
          /\d/,
          " ",
          /\d/,
          /\d/,
          " ",
          /\d/,
          /\d/,
          /\d/,
          " ",
          /\d/,
          /\d/,
          /\d/,
          " ",
          /\d/,
        ]}
        onChange={(event) => setter(event.target.value)}
        placeholder={`ID Number ${required ? "(Required)" : ""}`}
        name={name}
        id={name}
        value={value}
        required={required}
      /> */}
			<InputMask
				className='p-3 rounded-lg w-full border-2 border-white text-textColor bg-compBg'
				mask='** ** ** *** *** *'
				onChange={(event) => setter(event.target.value)}
				placeholder={`ID Number / Passport Number ${
					required ? '(Required)' : ''
				}`}
				name={name}
				id={name}
				value={value}
				required={required}
				disabled={false}
			/>
		</div>
	)
}
export default MaskedIdnumber
