import { useRef } from 'react'
//import MonthlyCalendar from "./Calendar/monthly";
import classNames from '@/app/snippets/classNames'
import { useState } from 'react'
import WeekDays from './weekDays'
import getGQLRequest from '@/snippets/getGQLRequest'

const days = [
	{ date: '2023-12-27', events: [] },
	{ date: '2023-12-28', events: [] },
	{ date: '2023-12-29', events: [] },
	{ date: '2023-12-30', events: [] },
	{ date: '2023-12-31', events: [] },
	{ date: '2024-01-01', isCurrentMonth: true, events: [] },
	{ date: '2024-01-02', isCurrentMonth: true, events: [] },
	{
		date: '2023-12-27',
		events: [
			{
				id: 1,
				name: 'Event Name',
				time: '10:00 AM',
				datetime: '2023-12-27T10:00',
				href: '#'
			},
			{
				id: 2,
				name: 'Sales meeting',
				time: '2PM',
				datetime: '2024-01-03T14:00',
				href: '#'
			}
		]
	},
	{ date: '2024-01-04', isCurrentMonth: true, events: [] },
	{ date: '2024-01-05', isCurrentMonth: true, events: [] },
	{ date: '2024-01-06', isCurrentMonth: true, events: [] },
	{
		date: '2024-01-07',
		isCurrentMonth: true,
		events: [
			{
				id: 3,
				name: 'Date night',
				time: '6PM',
				datetime: '2024-01-08T18:00',
				href: '#'
			}
		]
	},
	{ date: '2024-01-08', isCurrentMonth: true, events: [] },
	{ date: '2024-01-09', isCurrentMonth: true, events: [] },
	{ date: '2024-01-10', isCurrentMonth: true, events: [] },
	{ date: '2024-01-11', isCurrentMonth: true, events: [] },
	{
		date: '2024-01-12',
		isCurrentMonth: true,
		isToday: true,
		events: [
			{
				id: 6,
				name: "San-Mari's birthday party",
				time: '2PM',
				datetime: '2024-01-25T14:00',
				href: '#'
			}
		]
	},
	{ date: '2024-01-13', isCurrentMonth: true, events: [] },
	{ date: '2024-01-14', isCurrentMonth: true, events: [] },
	{ date: '2024-01-15', isCurrentMonth: true, events: [] },
	{ date: '2024-01-16', isCurrentMonth: true, events: [] },
	{ date: '2024-01-17', isCurrentMonth: true, events: [] },
	{ date: '2024-01-18', isCurrentMonth: true, events: [] },
	{ date: '2024-01-19', isCurrentMonth: true, events: [] },
	{ date: '2024-01-20', isCurrentMonth: true, events: [] },
	{ date: '2024-01-21', isCurrentMonth: true, events: [] },
	{
		date: '2024-01-22',
		isCurrentMonth: true,
		isSelected: true,
		events: [
			{
				id: 4,
				name: 'Maple syrup museum',
				time: '3PM',
				datetime: '2024-01-22T15:00',
				href: '#'
			},
			{
				id: 5,
				name: 'Hockey game',
				time: '7PM',
				datetime: '2024-01-22T19:00',
				href: '#'
			}
		]
	},
	{ date: '2024-01-23', isCurrentMonth: true, events: [] },
	{ date: '2024-01-24', isCurrentMonth: true, events: [] },
	{ date: '2024-01-25', isCurrentMonth: true, events: [] },
	{ date: '2024-01-26', isCurrentMonth: true, events: [] },
	{ date: '2024-01-27', isCurrentMonth: true, events: [] },
	{ date: '2024-01-28', isCurrentMonth: true, events: [] },
	{ date: '2024-01-29', isCurrentMonth: true, events: [] },
	{ date: '2024-01-30', isCurrentMonth: true, events: [] },
	{ date: '2024-01-31', isCurrentMonth: true, events: [] },
	{ date: '2024-02-01', events: [] },
	{ date: '2024-02-02', events: [] },
	{ date: '2024-02-03', events: [] },
	{
		date: '2024-02-04',
		events: [
			{
				id: 7,
				name: 'Cinnabon day!',
				time: '9PM',
				datetime: '2024-02-04T21:00',
				href: '#'
			}
		]
	},
	{ date: '2024-02-05', events: [] },
	{ date: '2024-02-06', events: [] }
]

export default function calanderFrame({ days }) {
	const [eventList, setEventList] = useState([])
	const [selectedDay, setSelectedDay] = useState([])
	const [isAddEventModalOpen, setAddEventModalOpen] = useState(false)
	const [eventDays, setEventDays] = useState([])

	useEffect(async () => {
		await getGQLRequest({
			endpoint: 'events',
			stateSetter: setEventDays,
			fields: 'id,title,desciption,start,end,image{url},url,location,color,private,editable,isLive,author{firstName,lastName,profilePic{url}}'
		})
	}, [])



	const updateDate = (e) => {
		setSelectedDay({
			events: [
				{
					id: 1,
					name: 'asdasdasd',
					time: '20:47',
					datetime: new Date().toISOString(),
					href: '#'
				},
				{
					id: 2,
					name: 'asdasasdasddasd',
					time: '20:47',
					datetime: new Date().toISOString(),
					href: '#'
				}
			]
		})
	}
	return (
		<div className='shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col'>
			<WeekDays />
			<div className='flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto'>
				<div className='hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px'>
					{days.map((day) => (
						<div
							key={day.date}
							className={classNames(
								day.isCurrentMonth ? 'bg-compBg' : 'bg-gray-50 text-gray-500',
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
								{day?.date
									? day.date?.split('-')?.pop()?.replace(/^0/, '')
									: ''}
							</time>
							{day.events.length > 0 && (
								<ol className='mt-2'>
									{day.events.slice(0, 2).map((event) => (
										<li key={event.id}>
											<a
												href={event.href}
												className='group flex'
											>
												<p className='flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600'>
													{event.name}
												</p>
												<time
													dateTime={event.datetime}
													className='ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block'
												>
													{event.time}
												</time>
											</a>
										</li>
									))}
									{day.events.length > 2 && (
										<li className='text-gray-500'>
											+ {day.events.length - 2} more
										</li>
									)}
								</ol>
							)}
						</div>
					))}
				</div>
				<div className='isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden'>
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
								'flex h-24 w-full items-center justify-center p-2 hover:border-themeColorMain hover:text-themeColorMain hover:underline focus:z-10'
							)}
							onClick={(e) => updateDate(e)}
						>
							<time
								dateTime={day.date}
								className={classNames(
									day.isSelected &&
									'flex h-6 w-6 items-center justify-center rounded-full',
									day.isSelected && day.isToday && 'bg-indigo-600',
									day.isSelected && !day.isToday && 'bg-gray-900',
									'ml-auto'
								)}
							>
								{day?.date
									? day.date?.split('-')?.pop()?.replace(/^0/, '')
									: ''}
							</time>
							<span className='sr-only'>{day.events.length} events</span>
							{day.events.length > 0 && (
								<span className='-mx-0.5 mt-auto flex flex-wrap-reverse'>
									{day.events.map((event) => (
										<span
											key={event.id}
											className='mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400'
										/>
									))}
								</span>
							)}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
