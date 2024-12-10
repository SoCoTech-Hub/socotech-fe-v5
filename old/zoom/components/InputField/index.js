import React, { useState } from 'react'

const InputField = ({
	id = 'input',
	value,
	placeholder = 'Input Text Here',
	icon,
	type = 'text',
	onChange
}) => {
	const [showPassword, setShowPassword] = useState(false)
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className={`mb-3 form-group ${icon ? 'icon-input' : ''}`}>
			{icon ? (
				icon == 'ti-lock' ? (
					<a onClick={handleClickShowPassword}>
						<i
							className={`-mt-1 text-lg text-textColor ${
								showPassword ? 'ti-unlock' : 'ti-lock'
							}`}
						></i>
					</a>
				) : (
					<i className={`-mt-1 text-lg text-textColor ${icon}`}></i>
				)
			) : (
				<></>
			)}
			<input
				id={id}
				name={id}
				type={type == 'password' ? (showPassword ? 'text' : type) : type}
				className={`style2-input ${
					icon ? 'ps-5' : ''
				} form-control text-textColor fw-600`}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
			/>
		</div>
	)
}

export default InputField
