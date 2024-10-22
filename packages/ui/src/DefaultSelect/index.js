import { useState, useEffect } from "react"
import { Autocomplete, TextField } from "@mui/material"
import { withStyles } from "@mui/styles"

const WhiteTextField = withStyles({
  root: {
    "& .MuiInput-underline:before": {
      borderBottomColor: "#fff8",
    },
    "& .MuiInput-underline:hover:before": {
      display: "none",
    },
    "& .MuiInput-underline:after": {
      display: "none",
    },
  },
})(TextField)

export default function DefaultSelect({
	options,
	id,
	name,
	className = 'font-bold style2-input w-full text-textColor bg-compBg',
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
			//  if (typeof value === "number") {
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
		<div className='mt-2 mb-2 font-bold form-group text-textColor bg-compBg '>
			<Autocomplete
				value={autocompleteValue}
				className={className}
				onChange={onChange}
				options={options}
				getOptionLabel={(option) => option.name}
				autoComplete={false}
				disabled={false || !options.length}
				style={{ color: '#fff' }}
				renderInput={(params) => (
					<div className='pt-1.5'>
						<WhiteTextField
							className='px-2 '
							variant='standard'
							{...params}
							inputProps={{
								...params.inputProps,
								name,
								id,
								required,
								placeholder,
								autoComplete: 'off',
								style: { color: '#fff' }
							}}
						/>
					</div>
				)}
			/>
		</div>
	)
}