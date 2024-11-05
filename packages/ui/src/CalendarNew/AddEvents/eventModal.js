import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { organizationId, profileId, userId } from '@/context/constants'
import DateTimePickField from '@/components/DateTimePickField'
import api from '@/api/api'
import Overlay from '@/components/Overlay'
import Alert from '@/components/Alert'

export default function EventModal({
	eventList,
	setEventList,
	isOpen,
	setIsOpen,
	isEdit,
	eventData
}) {
	const router = useRouter()
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [location, setLocation] = useState('')
	const [href, setHref] = useState('')
	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	function convertDate(isoDate) {
		const date = new Date(isoDate)

		let year = date.getFullYear()
		let month = ('0' + (date.getMonth() + 1)).slice(-2)
		let day = ('0' + date.getDate()).slice(-2)
		let hour = ('0' + date.getHours()).slice(-2)
		let minute = ('0' + date.getMinutes()).slice(-2)

		return `${year}-${month}-${day}T${hour}:${minute}`
	}
	function updateEndTime(time) {
		if (!startDate) return null
		const startDateObj = new Date(startDate)
		const [hours, minutes] = time.split(':')

		const updatedEndDate = new Date(
			startDateObj.getFullYear(),
			startDateObj.getMonth(),
			startDateObj.getDate(),
			parseInt(hours),
			parseInt(minutes)
		)

		return updatedEndDate.toISOString()
	}

	function extractTimeFromDate(dateString) {
		if (!dateString) return ''
		const date = new Date(dateString)
		let hours = ('0' + date.getHours()).slice(-2)
		let minutes = ('0' + date.getMinutes()).slice(-2)
		return `${hours}:${minutes}`
	}

	useEffect(() => {
		if (eventData) {
			setTitle(eventData.title)
			setDescription(eventData.desciption)
			setLocation(eventData.location)
			setHref(eventData.url)
			setStartDate(convertDate(eventData.start))
			setEndDate(convertDate(eventData.end))
		}
	}, [eventData])

	useEffect(() => {
		if (startDate) {
			const startDateObj = new Date(startDate)
			setEndDate(
				convertDate(
					new Date(
						startDateObj.getFullYear(),
						startDateObj.getMonth(),
						startDateObj.getDate(),
						startDateObj.getHours() + 1, // Default to one hour later
						startDateObj.getMinutes()
					)
				)
			)
		}
	}, [startDate])

	const handleOpenModal = () => {
		if (setIsOpen) {
			setIsOpen(!isOpen)
		} else {
			router.push('/events')
		}
	}

	const handleAddEvent = async (e) => {
		e.preventDefault()
		setLoading(true)

		// Convert startDate and endDate to ISOString format
		const startDateObj = new Date(startDate)
		const endDateObj = new Date(endDate)

		// Convert both to ISOString
		const startISO = startDateObj.toISOString()
		const endISO = endDateObj.toISOString()

		if (isEdit) {
			const { ok } = await api.put(`/events/${eventData.id}`, {
				end: endISO,
				start: startISO,
				title: title,
				desciption: description,
				url: href,
				location: location,
				private: true,
				editable: true,
				organization: { id: organizationId },
				author: { id: profileId },
				student: { id: userId }
			})
			if (ok) {
				router.push('/events')
			} else {
				setError('Something went wrong')
			}
		} else {
			const { data, ok } = await api.post('/events', {
				end: endISO,
				start: startISO,
				title: title,
				desciption: description,
				href: href,
				location: location,
				private: true,
				editable: true,
				organization: { id: organizationId },
				author: { id: profileId },
				student: { id: profileId }
			})

			if (ok) {
				setEventList([
					...eventList,
					{
						id: data.id,
						datetime: data.endDate,
						name: data.title,
						time: data.startDate,
						href: data.href
					}
				])
				setIsOpen(false)
			} else {
				setError('Something went wrong')
			}
		}
		setLoading(false)
		handleOpenModal()
		return
	}

	return (
		<Overlay
			bgColor='compBg'
			isOpen={isOpen}
			setOpen={setIsOpen}
			width={'11/12'}
			height={'full'}
			onClose={() => setIsOpen(false)}
			content={
				<div className='flex items-center justify-center h-full'>
					<form
						className={`w-full rounded-lg shadow-2xl bg-compBg`}
						onSubmit={(e) => handleAddEvent(e)}
					>
						<div className='p-3'>
							<div className='grid items-end space-y-2 text-textColor '>
								<label className=''>Title</label>
								<input
									className='mb-3 placeholder-gray-400 bg-compBg'
									type='text'
									name='title'
									placeholder='Add Title'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
								<label className=''>Start Date and Time</label>
								<DateTimePickField
									className='text-textColor bg-compBg'
									type='datetime-local'
									placeholder='Start Date and Time'
									onChange={(e) => setStartDate(e.target.value)}
									value={startDate}
								/>
								{startDate && (
									<>
										<label className=''>End Time</label>
										<DateTimePickField
											className='text-textColor bg-compBg'
											type='time'
											placeholder='End Time'
											onChange={(e) =>
												setEndDate(updateEndTime(e.target.value))
											}
											value={extractTimeFromDate(endDate)}
										/>
									</>
								)}
								<label className=''>URL</label>
								<input
									className='mb-3 placeholder-gray-400 text-textColor bg-compBg'
									type='text'
									name='url'
									placeholder='Add URL'
									value={href}
									onChange={(e) => setHref(e.target.value)}
								/>
								<label className=''>Location</label>
								<input
									className='mb-3 placeholder-gray-400 text-textColor bg-compBg'
									type='text'
									name='location'
									placeholder='Add Location'
									value={location}
									onChange={(e) => setLocation(e.target.value)}
								/>
								<label className=''>Description</label>
								<input
									className='mb-3 placeholder-gray-400 text-textColor bg-compBg'
									type='text'
									name='text'
									placeholder='Add Description'
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
							<div className='flex justify-between'>
								<button
									onClick={(e) => handleAddEvent(e)}
									className='px-4 py-2 text-black rounded-lg bg-themeColorMain'
									disabled={loading}
								>
									{loading
										? 'Loading...'
										: !isEdit
										? 'Add Event'
										: 'Update Event'}
								</button>
								<Alert error={error} />
								<button
									className='px-4 py-2 rounded-lg text-textColor bg-compBg border-1 border-themeColorMain'
									onClick={() => handleOpenModal()}
								>
									Cancel
								</button>
							</div>
						</div>
					</form>
				</div>
			}
		/>
	)
}
