const AddTimestamp = () => {
	const date = new Date()

	// Format date to 'YYYY-MM-DDTHH:MM:SS'
	const formattedDate = date.toISOString().slice(0, 19)

	// Get timezone offset in minutes and convert to HH:MM format
	const timezoneOffset = -date.getTimezoneOffset()
	const offsetHours = String(
		Math.floor(Math.abs(timezoneOffset) / 60)
	).padStart(2, '0')
	const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0')
	const offsetSign = timezoneOffset >= 0 ? '+' : '-'
	const timezoneFormatted = `${offsetSign}${offsetHours}:${offsetMinutes}`

	// Combine date and timezone offset
	return `${formattedDate}${timezoneFormatted}`
}
export default AddTimestamp