import { useState } from 'react'
import { useRouter } from 'next/router'
import EventModal from '@/components/CalendarNew/AddEvents/eventModal'
import getGQLRequest from '@/snippets/getGQLRequest'
import { baseUrl } from '@/context/constants'

const EditEvent = ({ events }) => {
	const router = useRouter()
	const [eventList, setEventList] = useState(events)

	return events.id ? (
		<EventModal
			eventList={eventList}
			setEventList={setEventList} // Ensure setEventList is typed for Event[]
			isEdit={true}
			isOpen={true}
			setIsOpen={() => router.back()}
			eventData={events}
		/>
	) : (
		<div className='h-screen flex flex-col items-center justify-center space-y-10'>
			<div className='grid justify-items-center'>
				<div className='flex flex-col items-center justify-center'>
					<img
						src={`${baseUrl}/page404.gif`}
						alt='Error 404'
						className='w-full max-w-xl'
					/>
				</div>
				<div className='font-bold text-textColor '>
					Oops! This page does not exist
				</div>
				<div className='my-4'>
					<a
						onClick={() => router.push('/events')}
						className='w-64 py-2 font-bold text-center text-black rounded-full cursor-pointer d-inline-block bg-themeColorMain'
					>
						Back to Events
					</a>
				</div>
			</div>
		</div>
	)
}

export async function getServerSideProps({ req }) {
	const { profile } = req.cookies
	const { id } = req.__NEXT_INIT_QUERY

	const { events } = await getGQLRequest({
		endpoint: 'events',
		fields:
			'id, title, start, end, image {url},desciption, lesson {id},url,location',
		where: `editable: true, author: { id: ${profile} },id:${id}`
	})

	return {
		props: {
			events: events.length ? events[0] : []
		}
	}
}

export default EditEvent
