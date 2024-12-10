const EventCard = ({ event }) => {
	const date1 = new Date(event.start)
	const date2 = new Date(event.end)

	const options = { hour: '2-digit', minute: '2-digit' }
	const timeStart = date1.toLocaleTimeString([], options)
	const timeEnd = date2.toLocaleTimeString([], options)

	return (
		<div className='rounded-lg bg-appBg shadow-menu'>
			{event.image ? (
				<img
					src={event.image?.url}
					alt={event.title}
					className='object-cover object-center rounded-lg'
				/>
			) : (
				<></>
			)}
			<div className='flex flex-col flex-wrap justify-between gap-3 desktop:p-3 laptop:p-3 mobile:p-2'>
				<div
					className='w-full leading-tight text-textColor desktop:text-lg laptop:text-lg mobile:text-sm desktop:text-center laptop:text-center mobile:text-center'
					dangerouslySetInnerHTML={{ __html: event.title }}
				/>
				<div className='flex flex-col gap-2'>
					{event.isLive && (
						<div
							className='overflow-y-auto max-h-32 text-textColor desktop:text-base laptop:text-base mobile:text-sm desktop:text-left laptop:text-left mobile:text-left'
							dangerouslySetInnerHTML={{
								__html: event.url
							}}
						/>
					)}
					{event.location && (
						<div
							className='overflow-y-auto max-h-32 text-textColor desktop:text-base laptop:text-base mobile:text-sm desktop:text-left laptop:text-left mobile:text-left'
							dangerouslySetInnerHTML={{
								__html: event.location
							}}
						/>
					)}
					<div
						className='overflow-y-auto max-h-32 text-textColor desktop:text-base laptop:text-base mobile:text-sm desktop:text-left laptop:text-left mobile:text-left'
						dangerouslySetInnerHTML={{
							__html: event.desciption
						}}
					/>

					<div className='mb-2 text-textColor desktop:text-sm laptop:text-sm mobile:text-xs'>
						{timeStart} - {timeEnd}
					</div>
				</div>

				{event.editable ? (
					<a
						href={`/user/events/edit?id=${event.id}`}
						className='w-full py-2 font-bold text-center text-black rounded-full text-md bg-themeColorMain'
					>
						Edit
						<span className='sr-only'>, {event.title}</span>
					</a>
				) : (
					<div
						className='w-full py-1 text-xs text-center text-black rounded-full bg-themeColorMain'
						style={{ backgroundColor: event.color }}
					>
						{event.subject?.name || event.title}
					</div>
				)}
			</div>
		</div>
	)
}

export default EventCard
