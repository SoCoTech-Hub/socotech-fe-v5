import InputMask from 'react-input-mask'

const MaskedMobile = ({
	name,
	required = false,
	value = '',
	setter,
	onChange,
	placeholder
}) => {
	return (
		<div className='relative mt-2 rounded-md shadow-sm'>
			<div className='my-1 rounded-lg shadow-md'>
				<div className='absolute inset-y-0 left-0 flex items-center pl-4'></div>
				<InputMask
					autoComplete='off'
					className={`w-full text-themeColorMain bg-black bg-opacity-20 rounded-lg pl-12 py-3 block border-2 ring-inset ring-white placeholder-gray-300 focus:ring-2 focus:ring-inset focus:ring-themeColorMain mobile:text-sm mobile:leading-6 px-3`}
					mask='999 999 9999'
					onChange={onChange ? onChange : (event) => setter(event.target.value)}
					placeholder={`${placeholder} ${required ? '(Required)' : ''}`}
					name={name}
					id={name}
					value={value}
					required={required}
				/>
			</div>
		</div>
	)
}
export default MaskedMobile
