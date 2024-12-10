import React, { useState } from 'react'

const InputField = ({
	disabled = false,
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
		<div className={`mb-3 ${icon ? 'icon-input' : ''}`}>
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
				className={` text-textColor bg-compBg fw-600 w-full p-3 border-2 border-white rounded-lg`}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				disabled={disabled}
				autoComplete='off'
			/>
		</div>
	)
}

export default InputField
