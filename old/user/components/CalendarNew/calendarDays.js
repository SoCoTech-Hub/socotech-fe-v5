import classNames from '@/snippets/classNames'

const CalendarDays = ({ days, updateDate }) => {
	return (
		<div className='grid w-full grid-cols-7 gap-px auto-rows-min'>
			{days.map((day) => (
				<button
					key={day.date}
					type='button'
					className={classNames(
						day.isCurrentMonth ? 'bg-compBg' : 'bg-appBg',
						(day.isSelected ?? day.isToday) && 'font-semibold',
						day.isSelected && 'text-themeColorMain',
						!day.isSelected && day.isToday && 'text-textColor',
						!day.isSelected &&
							day.isCurrentMonth &&
							!day.isToday &&
							'text-textColor',
						!day.isSelected &&
							!day.isCurrentMonth &&
							!day.isToday &&
							'text-textColor',
						'relative flex flex-col h-24 w-full items-center justify-center p-2 hover:border-themeColorMain hover:text-themeColorMain hover:underline focus:z-10'
					)}
					onClick={() => updateDate(day.date)} // Pass the date string to updateDate
				>
					<time
						dateTime={day.date}
						className={`ml-auto ${
							day.isSelected && 'h-6 w-6 font-bold rounded-full'
						} ${day.isSelected && day.isToday && 'bg-indigo-600 text-white'} ${
							day.isSelected && !day.isToday && 'bg-gray-900 text-white'
						} ${
							!day.isSelected &&
							day.isToday &&
							'px-0.5 h-6 w-6 font-bold bg-themeColorMain text-black rounded-2xl'
						}`}
					>
						{day?.date ? day.date?.split('-')?.pop()?.replace(/^0/, '') : ''}
					</time>
					<span className='sr-only'>
						{day.events.length > 0
							? `${day.events.length} events`
							: 'No events'}
					</span>
					{day.events.length > 0 && (
						<span className='absolute bottom-0 right-0 flex flex-row mb-2 mr-1'>
							{day.events.map((event) => (
								<span
									key={event.id}
									className={`m-0.5 rounded-lg ${
										event.private ? 'bg-menuDashboard' : 'bg-themeColorMain'
									} laptop:h-4 laptop:w-6 desktop:w-6 desktop:h-4 mobile:w-2 mobile:h-2`}
								/>
							))}
						</span>
					)}
				</button>
			))}
		</div>
	)
}

export default CalendarDays
