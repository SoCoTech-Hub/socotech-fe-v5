import { useState } from 'react'
import Alert from '../Alert'

const DatePickField = ({
	id,
	placeholder = 'Input Text Here',
	onChange,
	value,
	required
}) => {
	const [showInput, setShowInput] = useState(false)
	const [year, setYear] = useState(value ? new Date(value).getFullYear() : '')
	const [month, setMonth] = useState(
		value ? new Date(value).getMonth() + 1 : ''
	)
	const [day, setDay] = useState(value ? new Date(value).getDate() : '')
	const [error, setError] = useState('')

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]

	const handleYearChange = (event) => {
		setYear(event.target.value)
		updateDate(event.target.value, month, day)
	}

	const handleMonthChange = (event) => {
		const monthIndex = monthNames.indexOf(event.target.value) + 1
		setMonth(monthIndex)
		updateDate(year, monthIndex, day)
	}

	const handleDayChange = (event) => {
		setDay(event.target.value)
		updateDate(year, month, event.target.value)
	}

	const updateDate = (year, month, day) => {
		if (!year || !month || !day) {
			setError('Please complete the date')
			return
		}
		const formattedMonth = month.toString().padStart(2, '0')
		const formattedDay = day.toString().padStart(2, '0')
		const formattedDate = `${year}-${formattedMonth}-${formattedDay}`

		if (isValidDate(formattedDate)) {
			setError('')
			onChange({ target: { value: formattedDate, name: id } })
			return
		} else {
			setError('Please enter a valid date')
		}
	}

	const isValidDate = (dateString) => {
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/ // YYYY-MM-DD format
		if (!dateString.match(dateRegex)) return false

		const date = new Date(dateString)
		return !isNaN(date.getTime())
	}

	const yearOptions = Array.from(
		{ length: 80 },
		(_, i) => new Date().getFullYear() - i
	)
	const monthOptions = monthNames
	const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1)

	const toggleInputVisibility = () => {
		setShowInput(!showInput)
	}

	return (
		<div className='relative my-3 rounded-md shadow-sm'>
			<div className='rounded-lg shadow-md '>
				{showInput ? (
					<div className='flex flex-row'>
						<select
							value={year}
							onChange={handleYearChange}
							className='block w-1/3 px-3 py-3 pl-12 mr-2 border-2 border-white rounded-lg placeholder-compBg bg-compBg text-textColor bg-opacity-20 ring-inset ring-white focus:ring-2 focus:ring-inset focus:ring-themeColorMain mobile:text-sm mobile:leading-6'
						>
							<option
								value=''
								disabled
								className='bg-compBg'
							>
								Year
							</option>
							{yearOptions.map((y, index) => (
								<option
									key={`${y}-${index}`}
									value={y}
									className='bg-compBg'
								>
									{y}
								</option>
							))}
						</select>
						<select
							value={month ? monthNames[month - 1] : ''}
							onChange={handleMonthChange}
							className='block w-1/3 px-3 py-3 pl-12 mr-2 border-2 border-white rounded-lg placeholder-compBg bg-compBg text-textColor bg-opacity-20 ring-inset ring-white focus:ring-2 focus:ring-inset focus:ring-themeColorMain mobile:text-sm mobile:leading-6'
						>
							<option
								value=''
								disabled
								className='bg-compBg'
							>
								Month
							</option>
							{monthOptions.map((m, index) => (
								<option
									key={`${m}-${index}`}
									value={m}
									className='bg-compBg'
								>
									{m}
								</option>
							))}
						</select>
						<select
							value={day}
							onChange={handleDayChange}
							className='block w-1/3 px-3 py-3 pl-12 placeholder-gray-300 border-2 border-white rounded-lg bg-compBg text-textColor bg-opacity-20 ring-inset ring-white focus:ring-2 focus:ring-inset focus:ring-themeColorMain mobile:text-sm mobile:leading-6'
						>
							<option
								value=''
								disabled
								className='bg-compBg'
							>
								Day
							</option>
							{dayOptions.map((d, index) => (
								<option
									key={`${d}-${index}`}
									value={d}
									className='bg-compBg'
								>
									{d}
								</option>
							))}
						</select>
					</div>
				) : (
					<input
						type='text'
						onFocus={toggleInputVisibility}
						onBlur={toggleInputVisibility}
						required={required}
						className='block w-full px-3 py-3 pl-12 placeholder-gray-300 border-2 border-white rounded-lg bg-compBg text-textColor bg-opacity-20 ring-inset ring-white focus:ring-2 focus:ring-inset focus:ring-themeColorMain mobile:text-sm mobile:leading-6'
						placeholder={`${placeholder} ${
							required && !value ? '(Required)' : ''
						} ${value ? value : ''}`}
					/>
				)}

				<Alert error={error} />
			</div>
		</div>
	)
}

export default DatePickField
