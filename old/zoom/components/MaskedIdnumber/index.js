// import MaskedInput from "react-text-mask";
import React from 'react'
import InputMask from 'react-input-mask'

const MaskedIdnumber = ({ name, required = false, value, setter }) => {
	return (
		<div className='pb-2'>
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
				className='font-bold style2-input form-control text-textColor'
				mask='99 99 99 999 999 9'
				onChange={(event) => setter(event.target.value)}
				placeholder={`ID Number ${required ? '(Required)' : ''}`}
				name={name}
				id={name}
				value={value}
				required={required}
			/>
		</div>
	)
}
export default MaskedIdnumber