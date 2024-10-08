import { baseUrl } from '@/context/constants'
import React, { useState, useEffect } from 'react'

export default function DefaultSelectNew({
	options,
	id,
	name,
	className = 'w-full',
	valueSetter,
	placeholder = '',
	isSearchField = false,
	required = true,
	value = null,
	valueKey = 'id'
}) {
	const [autocompleteValue, setAutocompleteValue] = useState({
		option: null,
		inputValue: ''
	})
	const [showDropdown, setShowDropdown] = useState(false)

	useEffect(() => {
		if (!options.length || !value) {
			setAutocompleteValue({ option: null, inputValue: '' })
		} else {
			const selectedOption = options.find(
				(option) => option[valueKey] === value
			)
			setAutocompleteValue({
				option: selectedOption || null,
				inputValue: selectedOption ? selectedOption.name : ''
			})
		}
	}, [options, value, valueKey])

	const onSearchInputChange = (event) => {
		const inputValue = event.target.value
		setAutocompleteValue((prevState) => ({
			...prevState,
			inputValue
		}))
	}

	const filteredOptions = options.filter((option) =>
		option.name
			.toLowerCase()
			.includes(autocompleteValue.inputValue?.toLowerCase())
	)

	const onSelectOption = (option) => {
		setAutocompleteValue({
			option,
			inputValue: option.name
		})
		if (isSearchField) {
			valueSetter(name, option[valueKey])
		} else {
			valueSetter(option[valueKey])
		}
		toggleDropdown()
	}

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown)
	}

	return (
		<div className='relative desktop:my-2 laptop:my-2 mobile:my-1'>
			<div className={className}>
				<input
					id={id}
					type='text'
					className='w-full p-3 border-2 border-white rounded-lg cursor-pointer text-textColor bg-compBg'
					value={autocompleteValue.inputValue}
					onChange={onSearchInputChange}
					onClick={toggleDropdown}
					autoComplete='off'
					required={required}
					placeholder={placeholder}
				/>
				<button
					className='cursor-pointer'
					style={{
						position: 'absolute',
						right: '10px',
						top: '50%',
						transform: 'translateY(-50%)'
					}}
					onClick={() =>
						setAutocompleteValue({
							option: null,
							inputValue: ''
						})
					}
				>
					{autocompleteValue.inputValue ? (
						<img
							className='w-7 h-7'
							src={`${baseUrl}/modal_close_topic.svg`}
							alt='Close'
						/>
					) : (
						''
					)}
				</button>
				<div className='pl-2 border-black border-1' />
			</div>
			{showDropdown && (
				<div className='absolute z-10 w-full mt-2 border-2 rounded-md shadow-md cursor-pointer text-textColor bg-compBg overflow-y-scroll h-64'>
					{filteredOptions.length > 0 ? (
						filteredOptions.map((option) => (
							<div
								key={option[valueKey]}
								className='p-2 cursor-pointer hover:bg-themeColorMain hover:text-black'
								onClick={() => onSelectOption(option)}
							>
								{option.name}
							</div>
						))
					) : (
						<div className='p-2 text-gray-500'>No Options</div>
					)}
				</div>
			)}
		</div>
	)
}
