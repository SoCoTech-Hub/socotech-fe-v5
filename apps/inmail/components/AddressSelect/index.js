import { useState, useEffect } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { withStyles } from '@mui/styles'

const WhiteTextField = withStyles({
	root: {
		'& .MuiInput-underline:before': {
			borderBottomColor: '#fff8'
		},
		'& .MuiInput-underline:hover:before': {
			display: 'none'
		},
		'& .MuiInput-underline:after': {
			display: 'none'
		}
	}
})(TextField)

export default function AddressSelect({
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
			// if (typeof value === "number") {
			const selectedOption = options.filter(
				(option) => parseInt(option.id) === parseInt(value)
			)
			setAutocompleteValue(selectedOption ? selectedOption[0] : '' || value)
			// } else {
			//   setAutocompleteValue(value)
			// }
		}
	}, [options.length, value])

	const onChange = (_, newValue) => {
		if (newValue) {
			if (isSearchField) {
				valueSetter(name, newValue[valueKey])
			} else {
				if (newValue?.uniqueId) {
					valueSetter(newValue.uniqueId)
				} else {
					valueSetter(newValue[valueKey])
				}
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
		return
	}
	return (
		<div className='font-bold'>
			<Autocomplete
				value={autocompleteValue}
				className={className}
				onChange={onChange}
				options={options}
				getOptionLabel={(option) =>
					option.name ||
					`${option?.firstName} ${option?.lastName} [${option?.uniqueId}]`
				}
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
								autoComplete: 'off',
								disableunderline: 'true'
							}}
						/>
					</div>
				)}
			/>
		</div>
	)
}
