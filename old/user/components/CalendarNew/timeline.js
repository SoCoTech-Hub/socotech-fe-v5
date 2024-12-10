import { useRef } from 'react'

export default function TimeLine({
	currentWeekStartDate,
	eventItems,
	setIsOpen,
	isOpen,
	setEventId
}) {
	const container = useRef(null)
	const containerNav = useRef(null)
	const containerOffset = useRef(null)

	const startOfWeek = new Date(currentWeekStartDate)
	const endOfWeek = new Date(currentWeekStartDate)
	endOfWeek.setDate(endOfWeek.getDate() + 6)

	const formatDayWithDate = (date) => {
		const dateNumber = date.getDay()
		const dayAbbreviation = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
			dateNumber
		]

		return (
			<div className='flex items-center justify-center py-3'>
				<span>
					{dayAbbreviation}{' '}
					<span className='items-center justify-center font-semibold text-gray-900'>
						{date.getDate()}
					</span>
				</span>
			</div>
		)
	}

	function HourlyLines() {
		const hours = [
			'12AM',
			'1AM',
			'2AM',
			'3AM',
			'4AM',
			'5AM',
			'6AM',
			'7AM',
			'8AM',
			'9AM',
			'10AM',
			'11AM',
			'12PM',
			'1PM',
			'2PM',
			'3PM',
			'4PM',
			'5PM',
			'6PM',
			'7PM',
			'8PM',
			'9PM',
			'10PM',
			'11PM'
		]

		return hours.map((hour, index) => (
			<>
				<div key={index}>
					<div className='sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right grid g text-xs leading-5 text-gray-400'>
						{hour}
					</div>
				</div>
				<div />
			</>
		))
	}

	const manageModel = (id) => {
		setEventId(id)
		// setIsOpen(!isOpen)
	}

	// Utility function to calculate the grid position
	function calculateGridPosition(date) {
		const dayDifference = Math.floor(
			(date - startOfWeek) / (1000 * 60 * 60 * 24)
		)
		const hourPosition = date.getHours()
		const halfHourPosition = date.getMinutes() < 30 ? 0 : 1 // 0 for the first half, 1 for the second half

		// Now each day has 48 slots (24 hours * 2 slots per hour)
		const gridPosition =
			dayDifference * 48 + hourPosition * 2 + halfHourPosition + 1

		return gridPosition
	}

	// Utility function to format time
	function formatTime(date) {
		// Implement your logic to format the time
	}

	const renderEvent = (event) => {
		const start = new Date(event.start)
		const end = new Date(event.end)

		// Calculate the position and span of the event in the grid
		const gridStartRow = calculateGridPosition(start)
		const gridEndRow = calculateGridPosition(end)
		const gridColumn = start.getDay() // Assuming grid columns are days of the week starting from 1
		return (
			<li
				key={event.id}
				className='relative mt-px flex'
				style={{
					gridRow: `${gridStartRow} / span ${gridEndRow - gridStartRow}`,
					gridColumn
				}}
			>
				<button
					onClick={() => {
						manageModel(event.id)
					}}
					className='group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100'
				>
					<p className='order-1 font-semibold text-blue-700'>{event.title}</p>
					<p className='text-blue-500 group-hover:text-blue-700'>
						{/* <time dateTime={event?.start?.toISOString()}> */}
						<time dateTime={event?.start}>{formatTime(event.start)}</time> -
						{/* <time dateTime={event?.end?.toISOString()}> */}
						<time dateTime={event?.end}>{formatTime(event.end)}</time>
					</p>
				</button>
			</li>
		)
	}

	return (
		<div
			ref={container}
			className='isolate flex flex-auto flex-col overflow-auto bg-white'
		>
			<div
				// style={{ width: '165%' }}
				className='flex max-w-full flex-none flex-col'
			>
				<div
					ref={containerNav}
					className='sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8'
				>
					<div className='grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden ml-14'>
						{Array.from({ length: 7 }, (_, dayIndex) => {
							const currentDate = new Date(
								startOfWeek.getFullYear(),
								startOfWeek.getMonth(),
								startOfWeek.getDate() + dayIndex
							)
							return (
								<>
									<div
										key={dayIndex}
										className='flex items-center justify-center'
									>
										{formatDayWithDate(currentDate)}
									</div>
								</>
							)
						})}
					</div>

					<div className='-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid'>
						<div className='col-end-1 w-14' />
						{/* Display days of the week with dates for the current week */}
						{Array.from({ length: 7 }, (_, dayIndex) => {
							const currentDate = new Date(
								startOfWeek.getFullYear(),
								startOfWeek.getMonth(),
								startOfWeek.getDate() + dayIndex
							)
							return (
								<div
									key={dayIndex}
									className='flex items-center justify-center py-3'
								>
									{formatDayWithDate(currentDate)}
								</div>
							)
						})}
					</div>
				</div>
				<div className='flex flex-auto'>
					<div className='sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100' />
					<div className='grid flex-auto grid-cols-7 grid-rows-1 col-start-1 col-end-7 row-start-1 row-end-49 divide-x divide-gray-100'>
						{/* Horizontal lines */}
						<div
							className='col-start-1 col-end-8 row-start-1 grid divide-y divide-gray-100'
							style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
						>
							<div
								ref={containerOffset}
								className='row-end-1 h-7'
							></div>
							<HourlyLines />
						</div>
						{/* Vertical lines */}

						<div className='col-start-1 row-span-full' />
						<div className='col-start-2 row-span-full' />
						<div className='col-start-3 row-span-full' />
						<div className='col-start-4 row-span-full' />
						<div className='col-start-5 row-span-full' />
						<div className='col-start-6 row-span-full' />
						<div className='col-start-7 row-span-full' />
						{/* Events */}
						<ol
							className='col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8'
							style={{
								gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto'
							}}
						>
							{eventItems.map(renderEvent)}
						</ol>
						{/* Events */}
						<ol
							className='col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8'
							style={{
								gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto'
							}}
						>
							{/* style={{
					gridRow: `${gridStartRow} / span ${gridEndRow - gridStartRow}`,
					gridColumn
				}} */}
							<li
								className='relative mt-px flex sm:col-start-3'
								style={{ gridRow: '98 / span 12', gridColumn: 1 }}
							>
								<a
									href='#'
									className='group inset-1 rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100'
								>
									<p className='order-1 font-semibold text-pink-700'>
										Flight to Paris
									</p>
									<p className='text-pink-500 group-hover:text-pink-700'>
										<time dateTime='2024-01-12T07:30'>7:30 AM</time>
									</p>
								</a>
							</li>
							<li
								className='relative mt-px hidden sm:col-start-6 sm:flex'
								style={{ gridRow: '122 / span 24' }}
							>
								<a
									href='#'
									className='group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200'
								>
									<p className='order-1 font-semibold text-gray-700'>
										Meeting with design team at Disney
									</p>
									<p className='text-gray-500 group-hover:text-gray-700'>
										<time dateTime='2024-01-15T10:00'>10:00 AM</time>
									</p>
								</a>
							</li>
						</ol>
					</div>
				</div>
			</div>
		</div>
	)
}
