import { useState } from 'react'
import { EyeActiveIcon, EyeIcon, LockIcon } from '@/components/SvgIcons'

const InputField = ({
	id = 'input',
	placeholder = 'Input Text Here',
	icon,
	type = 'text',
	onChange,
	value,
	max
}) => {
	const [showPassword, setShowPassword] = useState(false)
	const [showDateInput, setShowDateInput] = useState(false)

	const togglePasswordVisibility = () => setShowPassword(!showPassword)
	const toggleDateVisibility = () => setShowDateInput(!showDateInput)

	const isPassword = type === 'password'
	const isDate = type === 'date'
	const inputType = isPassword
		? showPassword
			? 'text'
			: 'password'
		: isDate
		? showDateInput
			? 'date'
			: 'text'
		: type

	return (
		<div
			className='relative mt-2 rounded-md shadow-sm'
			onFocus={isDate ? toggleDateVisibility : undefined}
			onBlur={isDate ? toggleDateVisibility : undefined}
		>
			<div className={`my-1 rounded-lg shadow-md ${icon ? 'relative' : ''}`}>
				{/* Icon Handling */}
				{icon && (
					<div className='absolute inset-y-0 left-0 flex items-center pl-4'>
						{icon === 'ti-lock' ? (
							showPassword ? (
								<i
									className='-mt-1 text-lg cursor-pointer text-themeColorMain ti-unlock'
									onClick={togglePasswordVisibility}
								></i>
							) : (
								<LockIcon
									className='w-4 cursor-pointer'
									onClick={togglePasswordVisibility}
									aria-hidden='true'
								/>
							)
						) : (
							<i className={`-mt-1 text-lg text-themeColorMain ${icon}`}></i>
						)}
					</div>
				)}

				{/* Input Field */}
				<input
					id={id}
					name={id}
					type={inputType}
					className={`w-full text-themeColorMain bg-compBg bg-opacity-20 rounded-lg pl-12 py-3 block border-2 ring-inset ring-white placeholder-gray-300 focus:ring-2 focus:ring-inset focus:ring-themeColorMain mobile:text-sm mobile:leading-6 ${
						icon ? (isPassword ? 'py-1.5 pl-7 pr-12' : 'py-1.5 pl-7') : 'px-3'
					}`}
					placeholder={placeholder}
					onChange={onChange}
					autoComplete={
						type === 'password'
							? 'current-password'
							: type === 'email'
							? 'username'
							: type
					}
					value={value}
					max={max}
					checked={type === 'checkbox' ? value : undefined}
				/>

				{/* Password Visibility Toggle */}
				{isPassword && (
					<div
						className='absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer'
						onClick={togglePasswordVisibility}
					>
						{showPassword ? (
							<EyeIcon className='w-4' />
						) : (
							<EyeActiveIcon className='w-4' />
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default InputField
