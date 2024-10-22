import InputField from '@/components/InputField'

const MaskedMobile = ({ required = false, value, setter, placeholder }) => {
	const handleChange = (event) => {
		let inputValue = event.target.value

		// Remove all non-digit characters
		let numericValue = inputValue.replace(/\D/g, '')
		numericValue = numericValue.slice(0, 10)

		if (numericValue.length <= 10) {
			if (numericValue.length > 6) {
				numericValue = `${numericValue.slice(0, 3)}-${numericValue.slice(
					3,
					6
				)}-${numericValue.slice(6)}`
			} else if (numericValue.length > 3) {
				numericValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`
			}
		}
		setter(numericValue)
	}
	return (
		<InputField
			placeholder={`${placeholder} ${required ? '(Required)' : ''}`}
			value={value}
			onChange={handleChange}
			autoComplete={false}
		/>
	)
}
export default MaskedMobile
