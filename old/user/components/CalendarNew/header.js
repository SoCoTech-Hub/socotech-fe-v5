import { useState, useEffect, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	EllipsisHorizontalIcon
} from '@heroicons/react/20/solid'

import { useRouter } from 'next/router'
import ViewButton from './AddEvents/viewButton'

// Define getWeekNumber at the top
const getWeekNumber = (date) => {
	const today = new Date(date)
	const firstDayOfYear = new Date(today.getFullYear(), 0, 1)
	const pastDaysOfYear = (today.valueOf() - firstDayOfYear.valueOf()) / 86400000
	return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

export default function Header({
	isOpen,
	setIsOpen,
	currentDate,
	setCurrentDate
}) {
	const router = useRouter()
	const pathname = router.pathname

	const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
	const [currentWeek, setCurrentWeek] = useState(getWeekNumber(currentDate))

	useEffect(() => {
		const getCurrentDate = (date) => {
			const options = {
				year: 'numeric',
				month: 'long'
			}
			return date.toLocaleDateString('en-za', options)
		}
		if (!currentDate) {
			setCurrentDate(new Date())
		}
	}, [])
	const handlePrevMonthClick = () => {
		setCurrentMonth((prevMonth) => {
			const newMonth = prevMonth - 1 < 0 ? 11 : prevMonth - 1
			const newYear =
				newMonth === 11
					? currentDate.getFullYear() - 1
					: currentDate.getFullYear()
			const newDate = new Date(currentDate)
			newDate.setMonth(newMonth)
			newDate.setFullYear(newYear)
			setCurrentDate(newDate)
			return newMonth
		})
	}

	const handleNextMonthClick = () => {
		setCurrentMonth((prevMonth) => {
			const newMonth = prevMonth + 1 > 11 ? 0 : prevMonth + 1
			const newYear =
				newMonth === 0
					? currentDate.getFullYear() + 1
					: currentDate.getFullYear()
			const newDate = new Date(currentDate)
			newDate.setMonth(newMonth)
			newDate.setFullYear(newYear)
			setCurrentDate(newDate)
			return newMonth
		})
	}
	const handlePrevWeekClick = () => {
		setCurrentWeek((prevWeek) => prevWeek - 1)
		const newDate = new Date(currentDate)
		newDate.setDate(newDate.getDate() - 7)
		setCurrentDate(newDate)
	}

	const handleNextWeekClick = () => {
		setCurrentWeek((prevWeek) => prevWeek + 1)
		const newDate = new Date(currentDate)
		newDate.setDate(newDate.getDate() + 7)
		setCurrentDate(newDate)
	}

	const getCurrentDate = (date) => {
		const options = {
			year: 'numeric',
			month: 'long'
		}
		return date.toLocaleDateString('en-za', options)
	}

	return (
		<header className='flex items-center justify-between px-6 py-2 border-b border-white bg-navbarBg uppercase'>
			<h1 className='mx-auto text-2xl font-semibold indent-center text-textColor mobile:pr-4'>
				<time dateTime={currentDate.toISOString()}>
					{getCurrentDate(currentDate)}
				</time>
			</h1>
			<div className='flex items-right'>
				<div className='relative flex items-center rounded-md shadow-sm bg-themeColorMain md:items-stretch'>
					<button
						type='button'
						className='flex items-center justify-center w-12 pl-1 text-black h-9'
						onClick={
							pathname === '/events/weekly'
								? handlePrevWeekClick
								: handlePrevMonthClick
						}
					>
						<span className='sr-only'>{`Previous ${
							pathname === '/events/weekly' ? 'week' : 'month'
						}`}</span>
						<ChevronLeftIcon
							className='w-5 h-5'
							aria-hidden='true'
						/>
					</button>
					{/* <button
						type='button'
						className='hidden px-3.5 text-sm font-semibold text-black border-gray-300 border-y hover:bg-gray-50 focus:relative md:block'
					>
						Today
					</button> */}
					<span className='relative w-px h-5 -mx-px bg-black' />
					<button
						type='button'
						className='flex items-center justify-center w-12 pl-1 text-black h-9'
						onClick={
							pathname === '/events/weekly'
								? handleNextWeekClick
								: handleNextMonthClick
						}
					>
						<span className='sr-only'>{`Next ${
							pathname === '/events/weekly' ? 'week' : 'month'
						}`}</span>
						<ChevronRightIcon
							className='w-5 h-5'
							aria-hidden='true'
						/>
					</button>
				</div>
				{/* <div className='hidden md:ml-4 md:flex md:items-center'>
					{pathname == '/weekly' ? (
						<Menu
							as='div'
							className='relative'
						>
							<Menu.Button
								type='button'
								className='flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
							>
								Weekly View
								<ChevronDownIcon
									className='w-5 h-5 -mr-1 text-gray-400'
									aria-hidden='true'
								/>
							</Menu.Button>
							<Transition
								as={Fragment}
								enter='transition ease-out duration-100'
								enterFrom='transform opacity-0 scale-95'
								enterTo='transform opacity-100 scale-100'
								leave='transition ease-in duration-75'
								leaveFrom='transform opacity-100 scale-100'
								leaveTo='transform opacity-0 scale-95'
							>
								<Menu.Items className='absolute right-0 z-10 mt-3 overflow-hidden origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none'>
									<Menu.Item>
										<ViewButton
											url='/'
											label='Monthly View'
										/>
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</Menu>
					) : (
						<Menu
							as='div'
							className='relative'
						>
							<Menu.Button
								type='button'
								className='flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
							>
								Monthly View
								<ChevronDownIcon
									className='w-5 h-5 -mr-1 text-gray-400'
									aria-hidden='true'
								/>
							</Menu.Button>

							<Transition
								as={Fragment}
								enter='transition ease-out duration-100'
								enterFrom='transform opacity-0 scale-95'
								enterTo='transform opacity-100 scale-100'
								leave='transition ease-in duration-75'
								leaveFrom='transform opacity-100 scale-100'
								leaveTo='transform opacity-0 scale-95'
							>
								<Menu.Items className='absolute right-0 z-10 mt-3 overflow-hidden origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none'>
									<Menu.Item>
										<ViewButton
											url='/weekly'
											label='Weekly View'
										/>
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</Menu>
					)}

					<div className='w-px h-6 ml-6 bg-gray-300' />
					<ViewButton
						onClick={() => setIsOpen(!isOpen)}
						label='Create Event'
						className='px-3 py-2 ml-6 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						url={''}
					/>
				</div> */}

				{/* Dropdown to create event */}
				<Menu
					as='div'
					className='relative ml-6 md:hidden'
				>
					<Menu.Button className='flex items-center p-2 -mx-2 rounded-full text-themeColorMain'>
						<span className='sr-only'>Open menu</span>
						<EllipsisHorizontalIcon
							className='w-8 h-8'
							aria-hidden='true'
						/>
					</Menu.Button>

					<Transition
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<Menu.Items className='absolute right-0 z-10 mt-3 overflow-hidden origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none'>
							<div className='py-1 rounded-md bg-compBg text-themeColorMain border-themeColorMain border-1'>
								<Menu.Item>
									<ViewButton
										onClick={() => setIsOpen(!isOpen)}
										label='Create Event'
										url={''}
									/>
								</Menu.Item>
							</div>
							{/* <Menu.Items className='absolute right-0 z-10 mt-3 overflow-hidden origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none'> */}
							{pathname === '/events/weekly' ? (
								<Menu.Item>
									<ViewButton
										url='/events'
										label='Monthly View'
									/>
								</Menu.Item>
							) : (
								// <Menu.Item>
								// 	<ViewButton
								// 		url='/events/weekly'
								// 		label='weekly View'
								// 	/>
								// </Menu.Item>
								<></>
							)}
							{/* </Menu.Items> */}
							{/* dropdown for monthly and weekly view */}
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</header>
	)
}
