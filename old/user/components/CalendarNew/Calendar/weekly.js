import { useState, useEffect, useRef } from 'react'
import { ClockIcon } from '@heroicons/react/20/solid'
import Header from '../header'
import EventModal from '../AddEvents/eventModal'
import TimeLine from '../timeline'
import getGQLRequest from '@/snippets/getGQLRequest'
import { getEventList } from '@/snippets/user/getEventList'
import { getEventItems } from '@/snippets/user/getEventItems'

import EventDetail from '../AddEvents/eventDetail'
import Modal from '@/components/Modal'

const WeeklyCalendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date())
	const [selectedDay, setSelectedDay] = useState([])
	const [selectedEvent, setSelectedEvent] = useState(null)
	const [eventList, setEventList] = useState([])
	const [selectedEventId, setSelectedEventId] = useState(null)
	const [isModalOpen, setModalOpen] = useState(false)
	const [isEventDetailModalOpen, setEventDetailModalOpen] = useState(false)

	// Sample refs, adjust based on your DOM structure
	const container = useRef(null)
	const containerNav = useRef(null)
	const containerOffset = useRef(null)

	useEffect(async () => {
		if (selectedEventId) {
			await getEventItems({ setSelectedDay: setSelectedEvent,itemId:selectedEventId })
		setEventDetailModalOpen(true)
		}
	}, [selectedEventId])

	useEffect(() => {
		getEventList({
			setEventList: setEventList,
			currentDate: currentDate,
			month: false
		})
	}, [currentDate])

	useEffect(() => {
		const currentMinute = new Date().getHours() * 60
		if (container.current && containerNav.current && containerOffset.current) {
			const { scrollHeight } = container.current
			const navHeight = containerNav.current.offsetHeight ?? 0
			const offsetHeight = containerOffset.current.offsetHeight ?? 0
			container.current.scrollTop =
				((scrollHeight - navHeight - offsetHeight) * currentMinute) / 1440
		}
	}, [container, containerNav, containerOffset])

	const updateDate = (e) => {
		getEventItems({ date: e, setSelectedDay: setSelectedDay })
		setEventDetailModalOpen(true)
	}

	return (
		<div
			className='flex w-full flex-col md:max-w-none md:flex md:flex-auto'
			style={{ height: '80vh' }}
		>
			<Header
				isOpen={isModalOpen}
				setIsOpen={setModalOpen}
				currentDate={currentDate}
				setCurrentDate={setCurrentDate}
			/>
			<TimeLine
				currentWeekStartDate={currentDate}
				eventItems={eventList}
				setEventId={setSelectedEventId}
			/>
			{isModalOpen ? (
				<EventModal
					isOpen={isModalOpen}
					setIsOpen={setModalOpen}
					eventList={eventList}
					setEventList={setEventList}
					isEdit={false}
					eventData={[]}
				/>
			) : (
				<></>
			)}
			{selectedEventId ? (
				<Modal
					setOpen={setEventDetailModalOpen}
					open={isEventDetailModalOpen}
				>
					<EventDetail event={selectedEvent} />
				</Modal>
			) : (
				<></>
			)}
			{selectedDay ? (
				<div className='px-4 py-10 sm:px-6 lg:hidden'>
					<ol className='divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5'>
						{selectedDay.map((event) => (
							<li
								key={event.id}
								className='group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50'
							>
								<div className='flex-auto'>
									<p className='font-semibold text-gray-900'>{event.name}</p>
									<time
										dateTime={event.datetime}
										className='mt-2 flex items-center text-gray-700'
									>
										<ClockIcon
											className='mr-2 h-5 w-5 text-gray-400'
											aria-hidden='true'
										/>
										{event.time}
									</time>
								</div>
								<a
									href={event.href}
									className='ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100'
								>
									Edit<span className='sr-only'>, {event.name}</span>
								</a>
							</li>
						))}
					</ol>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}
export default WeeklyCalendar
