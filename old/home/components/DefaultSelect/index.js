import { useState, useEffect } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { withStyles } from '@mui/styles'

const WhiteTextField = withStyles({
	root: {
		'& .MuiInput-underline:before': {
			borderColor: '#e9f0fa'
		},
		'& .MuiInput-underline:hover:before': {
			display: '#e9f0fa'
		},
		'& .MuiInput-underline:after': {
			display: '#e9f0fa'
		}
	}
})(TextField)

export default function DefaultSelect({
	options,
	id,
	name,
	className = 'font-bold style2-input form-control text-textColor',
	valueSetter,
	placeholder = '',
	isSearchField = false,
	required = true,
	value = null,
	valueKey = 'id'
}) {
	const [autocompleteValue, setAutocompleteValue] = useState(null)

	useEffect(() => {
		if (!options.length || !value) {
			setAutocompleteValue(null)
		}

		if (options.length && value) {
			if (typeof value === 'number') {
				const selectedOption = options.filter((option) => option.id === value)
				setAutocompleteValue(selectedOption[0] || value)
			} else {
				setAutocompleteValue(value)
			}
		}
	}, [options.length, value])

	const onChange = (_, newValue) => {
		const selectedOption = options.filter((option) => option.id === value)
		if (newValue) {
			if (isSearchField) {
				valueSetter(name, newValue[valueKey])
			} else {
				valueSetter(newValue[valueKey])
			}

			setAutocompleteValue(newValue)
		} else {
			if (isSearchField) {
				valueSetter(name, '')
			} else {
				valueSetter('')
			}

			setAutocompleteValue(null)
		}
	}

	return (
		<div className='font-bold form-group'>
			<Autocomplete
				value={autocompleteValue}
				className={className}
				onChange={onChange}
				options={options}
				getOptionLabel={(option) => option.name}
				autoComplete={false}
				disabled={!options.length}
				renderInput={(params) => (
					<div className='pt-1.5'>
						<WhiteTextField
							className=''
							variant='standard'
							{...params}
							inputProps={{
								...params.inputProps,
								name,
								id,
								required,
								placeholder,
								autoComplete: 'off'
								// disableUnderline: true,
							}}
						/>
					</div>
				)}
			/>
		</div>
	)
}
