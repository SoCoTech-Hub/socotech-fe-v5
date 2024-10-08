const GetDaysInWeek = (year, month) => {
	const days = []

	const dayOne = new Date(year, month, 1)
	const dayZ = new Date(year, month + 1, 0)

	// Get the first day of the month
	const firstDay = dayOne.getDay()
	// Get the last day of the month
	const lastDay = dayZ.getDate()

	const uniqueDates = new Set()

	// Add empty slots for days before the first day of the month
	for (let i = 0; i < firstDay - 2; i++) {
		const currentDate = new Date(year, month, i).toISOString().split('T')[0]
		if (!uniqueDates.has(currentDate)) {
			days.push({
				date: currentDate,
				isCurrentMonth: false,
				isToday: false,
				isSelected: false,
				isDayOff: false,
				events: []
			})
			uniqueDates.add(currentDate)
		}
	}

	// Add days for the current month
	for (let i = 1; i < lastDay + 2; i++) {
		const dateString = new Date(year, month, i).toISOString().split('T')[0]
		const isCurrentMonth = true
		const isToday = dateString === new Date().toISOString().split('T')[0]
		if (dateString && !uniqueDates.has(dateString)) {
			const day = {
				date: dateString,
				isCurrentMonth,
				isToday,
				isSelected: false,
				isDayOff: false,
				events: []
			}
			days.push(day)
			uniqueDates.add(dateString)
		}
	}

	// Add empty slots for days after the last day of the month
	const remainingSlots = 42 - days.length // Assuming a 6x7 grid

	for (let i = 0; i < remainingSlots; i++) {
		const currentDate = new Date(year, month + 1, i).toISOString().split('T')[0]
		if (!uniqueDates.has(currentDate)) {
			days.push({
				date: currentDate,
				isCurrentMonth: false,
				isToday: false,
				isSelected: false,
				isDayOff: false,
				events: []
			})
			uniqueDates.add(currentDate)
		}
	}

	// Sort the days array by date
	days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
	return days
}

export default GetDaysInWeek
