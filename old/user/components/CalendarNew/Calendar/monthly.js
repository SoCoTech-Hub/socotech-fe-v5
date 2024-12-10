import { useEffect, useState } from 'react'
import Header from '../header'
import EventItem from '../event'
import WeekDays from '../weekDays'
import CalendarDays from '../calendarDays'
import GetDaysInMonth from '@/snippets/getDaysInMonth'
import EventModal from '../AddEvents/eventModal'
import EventDetailModal from '../AddEvents/eventDetailModal'
import { getEventList } from '@/snippets/user/getEventList'
import { getEventItems } from '@/snippets/user/getEventItems'
import Overlay from '@/components/Overlay'

const MonthlyCalendar = () => {
	const [eventList, setEventList] = useState([])
	const [currentDate, setCurrentDate] = useState(new Date())
	const [selectedDay, setSelectedDay] = useState([])
	const [isModalOpen, setModalOpen] = useState(false)
	const [isEventDetailModalOpen, setEventDetailModalOpen] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	useEffect(() => {
		getEventList({
			setEventList: setEventList,
			currentDate: currentDate,
			month: true
		})
	}, [currentDate])

	const updateDate = (e) => {
		getEventItems({ date: e, setSelectedDay: setSelectedDay })
		setIsOpen(true)
	}

	return (
		<div className='w-full rounded-lg lg:flex lg:h-full lg:flex-col shadow-menu'>
			<Header
				isOpen={isModalOpen}
				setIsOpen={setModalOpen}
				setCurrentDate={setCurrentDate}
				currentDate={currentDate}
			/>
			<div className='shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col'>
				<WeekDays />
				<div className='flex text-xs leading-6 text-gray-700 bg-gray-200 lg:flex-auto'>
					<div className='hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px'>
						{GetDaysInMonth(
							currentDate.getFullYear(),
							currentDate.getMonth(),
							eventList
						).map((day) => (
							<EventItem
								key={day.date}
								day={day}
							/>
						))}
					</div>
					<CalendarDays
						days={GetDaysInMonth(
							currentDate.getFullYear(),
							currentDate.getMonth(),
							eventList
						)}
						updateDate={updateDate}
					/>
				</div>
			</div>
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
			<Overlay
				bgColor='compBg'
				isOpen={isOpen}
				setOpen={setIsOpen}
				width={'full'}
				height={58}
				onClose={() => setIsOpen(false)}
				content={
					<>
						<EventDetailModal selectedDay={selectedDay} />
					</>
				}
			/>
		</div>
	)
}
export default MonthlyCalendar
