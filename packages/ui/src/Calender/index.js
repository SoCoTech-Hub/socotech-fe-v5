import { useEffect, useState } from 'react'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import AddEvent from '@/components/Calender/AddEvent'
import ViewEvent from '@/components/Calender/ViewEvent'

export default function Calendar({ eventList }) {
	const [openAddModal, setOpenAddModal] = useState(false)
	const [openDetails, setOpenDetails] = useState(false)
	const [events, setEvents] = useState([])
	const [event, setEvent] = useState(null)
	const [calendar, setCalendar] = useState(null)

	useEffect(async () => {
		if (eventList) {
			setEvents(eventList)
		}
	}, [eventList])
	useEffect(async () => {
		if (event) {
			setEvent(event)
		}
	}, [event])

	const eventHandle = (eventInfo) => {
		return <div>{eventInfo.event.title}</div>
	}
	const handleEventClick = (clickInfo) => {
		setEvent(clickInfo.event)
		setCalendar(clickInfo.view.calendar)
		setOpenDetails(!openDetails)
	}
	const handleDateSelect = (selectInfo) => {
		setEvent(selectInfo)
		setCalendar(selectInfo.view.calendar)
		setOpenAddModal(!openAddModal)
	}
	return (
		<>
			<section className='block max-w-full p-6 m-1 mt-3 text-textColor overflow-scroll bg-compBg shadow-sm rounded-lg desktop:w-full laptop:w-full mobile:w-full no-scrolly'>
				<FullCalendar
					contentHeight={'auto'}
					themeSystem='bootstrap5'
					plugins={[
						dayGridPlugin,
						interactionPlugin,
						timeGridPlugin,
						listPlugin,
						bootstrap5Plugin
					]}
					initialView='dayGridMonth'
					select={handleDateSelect}
					eventContent={eventHandle}
					eventDisplay='block'
					eventClick={handleEventClick}
					eventSources={[events]}
					headerToolbar={{
						left: 'prev,next today',
						center: 'title',
						right: 'dayGridYear,dayGridMonth,timeGridWeek,timeGridDay,listDay'
					}}
					buttonText={{
						prev: 'Prev',
						next: 'Next',
						listDay: 'Event list',
						dayGridYear: 'Year',
						dayGridMonth: 'Month',
						timeGridWeek: 'Week',
						timeGridDay: 'Day',
						today: 'Today'
					}}
					footerToolbar={{
						left: 'prev',
						right: 'next'
					}}
					buttonIcons={false}
					nowIndicator={true}
					stickyFooterScrollbar='auto'
					dayMaxEvents={2}
					moreLinkText=' more event(s)'
					moreLinkHint='Click to see more'
					dayPopoverFormat={{
						weekday: 'short',
						day: 'numeric',
						month: 'long'
					}}
					eventOrder='start'
					fixedWeekCount={false}
				/>
			</section>

			{openAddModal ? (
				<AddEvent
					setOpenAddModal={setOpenAddModal}
					isEdit={false}
					eventParam={event}
					calendarO={calendar}
				/>
			) : (
				<></>
			)}
			{openDetails ? (
				<ViewEvent
					setOpenDetails={setOpenDetails}
					actualEvent={event}
					calendarO={calendar}
				/>
			) : (
				<></>
			)}
		</>
	)
}
