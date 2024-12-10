import EventCard from './eventCard'

const EventDetailModal = ({ selectedDay }) => (
	<div className='mt-3 mb-1 desktop:px-3 mobile:px-1'>
		<div className='grid gap-4 desktop:grid-cols-4 laptop:grid-cols-3 mobile:grid-cols-2'>
			{selectedDay?.map((event) => (
				<EventCard
					key={event.id}
					event={event}
				/>
			))}
		</div>
	</div>
)

export default EventDetailModal
