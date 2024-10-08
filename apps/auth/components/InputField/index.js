import { useState } from 'react'
import { EyeActiveIcon, EyeIcon, LockIcon, NavEventsIcon } from '../SvgIcons'

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
	const [showInput, setShowInput] = useState(false)
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}
	const toggleInputVisibility = () => {
		setShowInput(!showInput)
	}

	return (
		<div
			className='relative mt-2 rounded-md shadow-sm'
			onFocus={type == 'date' ? toggleInputVisibility : () => {}}
			onBlur={type == 'date' ? toggleInputVisibility : () => {}}
		>
			<div className={`my-1 rounded-lg shadow-md ${icon ? 'relative' : ''}`}>
				<div className='absolute inset-y-0 left-0 flex items-center pl-4'>
					{icon ? (
						<span className='mobile:text-sm'>
							{icon == 'ti-lock' ? (
								showPassword ? (
									<i
										className={`-mt-1 text-lg text-themeColorMain ti-unlock`}
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
						</span>
					) : (
						<></>
					)}
				</div>
				<input
					id={id}
					name={id}
					type={
						type == 'password'
							? showPassword
								? 'text'
								: type
							: type == 'date'
							? showInput
								? type
								: 'text'
							: type
					}
					className={`w-full text-themeColorMain bg-black bg-opacity-20 rounded-lg pl-12 py-3 block border-2 ring-inset ring-white placeholder-gray-300 focus:ring-2 focus:ring-inset focus:ring-themeColorMain mobile:text-sm mobile:leading-6 ${
						icon
							? type == 'password'
								? 'py-1.5 pl-7 pr-12'
								: 'py-1.5 pl-7'
							: 'px-3'
					}`}
					placeholder={placeholder}
					onChange={onChange}
					autoComplete={
						type == 'password'
							? 'current-password'
							: type == 'email'
							? 'username'
							: type
					}
					value={value}
					max={max}
					checked={type == 'checkbox' ? value : ''}
				/>
				{type == 'password' ? (
					<div
						className='absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer'
						onClick={togglePasswordVisibility}
					>
						<span className='mobile:text-sm'>
							{showPassword ? (
								<EyeIcon className='w-4' />
							) : (
								<EyeActiveIcon className='w-4' />
							)}
						</span>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}

export default InputField
