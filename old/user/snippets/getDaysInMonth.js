const GetDaysInMonth = (year, month, events) => {
	const days = []
	const dayOne = new Date(year, month, 1)
	const dayZ = new Date(year, month + 1, 0)

	// Get the first day of the month
	let firstDay = dayOne.getDay()
	// Handle the case where the first day is Sunday (0) and should be placed on the correct spot
	firstDay = firstDay === 0 ? 7 : firstDay

	// Get the last day of the month
	const lastDay = dayZ.getDate()

	const uniqueDates = new Set()

	const convertDate = (date) => {
		const eventDate = new Date(date)
		const year = eventDate.getFullYear()
		const month = eventDate.getMonth() + 1 // getMonth() returns 0-11
		const day = eventDate.getDate()
		return `${year}-${month.toString().padStart(2, '0')}-${day
			.toString()
			.padStart(2, '0')}`
	}

	// Add empty slots for before the first day of the month
	for (let i = 1; i < firstDay; i++) {
		const day = -i + 1
		const currentDate = new Date(year, month, day).toISOString().split('T')[0]
		const isToday = currentDate === new Date().toISOString().split('T')[0]
		if (!uniqueDates.has(currentDate)) {
			days.push({
				date: currentDate,
				isCurrentMonth: false,
				isToday: isToday,
				isSelected: false,
				isDayOff: false,
				events: events?.filter((event) => {
					const startDate = convertDate(event.start)
					const endDate = convertDate(event.end)
					return currentDate >= startDate && currentDate <= endDate
				})
			})
			uniqueDates.add(currentDate)
		}
	}

	// Add days for the current month
	for (let i = 0; i < lastDay; i++) {
		const currentDate = new Date(year, month, i + 1).toISOString().split('T')[0]
		const isToday = currentDate === new Date().toISOString().split('T')[0]
		if (!uniqueDates.has(currentDate)) {
			days.push({
				date: currentDate,
				isCurrentMonth: true,
				isToday,
				isSelected: false,
				isDayOff: false,
				events: events?.filter((event) => {
					const startDate = convertDate(event.start)
					const endDate = convertDate(event.end)
					return currentDate >= startDate && currentDate <= endDate
				})
			})
			uniqueDates.add(currentDate)
		}
	}

	// Add empty slots for after the last day of the month
	const remainingSlots = 7 - (days.length % 7) // 7 day grid

	for (let i = 0; i < remainingSlots; i++) {
		const nextMonth = month + 1
		const currentDate = new Date(year, nextMonth, i + 1)
			.toISOString()
			.split('T')[0]
		const isToday = currentDate === new Date().toISOString().split('T')[0]
		if (!uniqueDates.has(currentDate)) {
			days.push({
				date: currentDate,
				isCurrentMonth: false,
				isToday: isToday,
				isSelected: false,
				isDayOff: false,
				events: events?.filter((event) => {
					const startDate = convertDate(event.start)
					const endDate = convertDate(event.end)
					return currentDate >= startDate && currentDate <= endDate
				})
			})
			uniqueDates.add(currentDate)
		}
	}

	// Sort the days array by date
	days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
	return days
}

export default GetDaysInMonth
