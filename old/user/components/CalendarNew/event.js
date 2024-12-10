import classNames from '@/snippets/classNames'

export default function EventItem({ day,key }) {
	return (
		<div
			key={`${key}-${day.date}`}
			className={classNames(
				day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
				'relative px-3 py-2'
			)}
		>
			<time
				dateTime={day.date}
				className={
					day.isToday
						? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
						: undefined
				}
			>
				{day?.date ? day.date?.split('-')?.pop()?.replace(/^0/, '') : ''}
			</time>
			{day.events.length && (
				<ol className='mt-2'>
					{day.events.map((event) => (
						<li key={event.id}>
							<a
								href={event.href}
								className='flex group'
							>
								<p className='flex-auto font-medium text-gray-900 truncate group-hover:text-indigo-600'>
									{event.title}
								</p>
								<time
									dateTime={event.start}
									className='flex-none hidden ml-3 text-gray-500 group-hover:text-indigo-600 xl:block'
								>
									{event.start}
								</time>
							</a>
						</li>
					))}
					{/* {day.events.length > 2 && (
						<li className='text-gray-500'>+ {day.events.length - 2} more</li>
					)} */}
				</ol>
			)}
		</div>
	)
}
