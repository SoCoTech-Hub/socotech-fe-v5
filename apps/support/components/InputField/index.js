import { useEffect, useState } from 'react'
import { EyeActiveIcon, EyeIcon, LockIcon } from '@/components/SvgIcons'
import { useDebounce } from '@/snippets/user/useDebounce'

const InputField = ({
	id = 'input',
	placeholder = 'Input Text Here',
	icon,
	type = 'text',
	onChange,
	value,
	autoComplete,
	max,
	min
}) => {
	const [showPassword, setShowPassword] = useState(false)
	const [showInput, setShowInput] = useState(false)
	const [tempValue, setTempValue] = useState(null)

	const debouncedValue = type == 'number' ? useDebounce(tempValue, 1000) : ''

	useEffect(() => {
		setTempValue(value)
	}, [value])

	useEffect(() => {
		if (type === 'number') {
			onChange({
				target: { value: debouncedValue, id }
			})
		}
	}, [debouncedValue, id, onChange, type])

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}
	const toggleInputVisibility = () => {
		setShowInput(!showInput)
	}

	const handleInputChange = (event) => {
		const { value } = event.target
		if (type == 'number') {
			let newValue = parseInt(value, 10)
			newValue = isNaN(newValue) ? '' : Math.max(min, Math.min(max, newValue))

			setTempValue(newValue)
		} else {
			onChange(event)
		}
	}

	return (
		<div
			className='relative mt-2 rounded-md shadow-md'
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
					className={`w-full text-themeColorMain bg-white bg-opacity-20 rounded-lg pl-12 py-3 block border-2 ring-inset ring-white placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-themeColorMain mobile:text-sm mobile:leading-6 ${
						icon
							? type == 'password'
								? 'py-1.5 pl-7 pr-12'
								: 'py-1.5 pl-7'
							: 'px-3'
					}`}
					placeholder={placeholder}
					onChange={handleInputChange}
					autoComplete={
						type == 'password'
							? 'current-password'
							: type == 'email'
							? 'username'
							: type
					}
					value={tempValue}
					max={max}
					min={min}
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
