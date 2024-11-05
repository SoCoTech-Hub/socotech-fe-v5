import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Modal from '@/components/Modal'
import Btn from '@/components/Btn'
import InputField from '@/components/InputField'
import DateTimePickField from '@/components/DateTimePickField'
import TeacherSelect from '@/components/TeacherSelect'
import Checkbox from '@/components/Checkbox'
import {
	organizationId,
	grades,
	profileId,
	schools,
	provinces
} from '@/context/constants'
import AddPersonalEvent from '@/snippets/user/addPersonalEvent'
import getGQLRequest from '@/snippets/getGQLRequest'

export default function AddEvent({
	setOpenAddModal,
	isEdit,
	eventParam,
	calendarO
}) {
	const time = new Date().toTimeString()
	const timeSplit = time.split(' ')
	const router = useRouter()
	const [title, setTitle] = useState(eventParam.title)
	const [startDate, setStartDate] = useState(
		eventParam.startStr ? eventParam.startStr : eventParam.start.split('T')[0]
	)
	const [startTime, setStartTime] = useState(timeSplit[0])
	const [endDate, setEndDate] = useState(
		eventParam.endStr ? eventParam.endStr : eventParam.end.split('T')[0]
	)
	const [endTime, setEndTime] = useState(timeSplit[0])
	const [location, setLocation] = useState(eventParam.location)
	const [description, setDescription] = useState(eventParam.desciption)
	const [bookTeacher, setBookTeacher] = useState(false)
	const [teachers, setTeachers] = useState([])
	const [teacher, setTeacher] = useState(null)

	useEffect(async () => {
		await getGQLRequest({
			endpoint: 'users',
			stateSetter: setTeachers,
			fields: 'profile{id,firstName,lastName}',
			where: `role:{name:"Teacher"},profile:{organization:{id:${organizationId}},grades:{id:${grades}},provinces:{id:${provinces}}}`
		})
	}, [])

	const newStart = new Date(`${startDate} ${startTime}`)
	const startDateTime = newStart.toISOString()
	const newEnd = new Date(`${endDate} ${endTime}`)
	const endDateTime = newEnd.toISOString()
	const handleSubmit = async () => {
		const editedEvent = {
			id: eventParam.id,
			start: startDateTime,
			end: endDateTime,
			title: title,
			description: description,
			// image,
			location: location,
			authorId: profileId,
			profileId: profileId,
			orgId: organizationId,
			teacher: teacher,
			province: provinces[0],
			school: schools[0],
			grade: grades[0]
		}
		const newEvent = {
			start: startDateTime,
			end: endDateTime,
			title: title,
			description: description,
			// image,
			location: location,
			authorId: profileId,
			profileId: profileId,
			orgId: organizationId,
			teacher: teacher,
			province: provinces[0],
			school: schools[0],
			grade: grades[0]
		}
		if (isEdit) {
			await AddPersonalEvent(editedEvent)
			calendarO.addEvent(editedEvent)
		} else {
			await AddPersonalEvent(newEvent)
			calendarO.addEvent(newEvent)
		}
		setOpenAddModal(false)
		router.reload()
	}

	return (
		<Modal setOpen={setOpenAddModal}>
			<div className='w-screen h-screen pt-2 bg-compBg mobile:h-screen'>
				<div className='w-5/6 pl-20 laptop:pl-16 desktop:pl-16 mobile:pl-4'>
					<InputField
						placeholder='Insert event title'
						type='text'
						width=''
						onChange={(e) => setTitle(e.target.value)}
						value={title}
					/>
				</div>
				<div>
					<div className='flex flex-wrap pl-4 space-x-1 laptop:ml-12 desktop:ml-12'>
						<label className='py-3 font-semibold text-normal text-textColor'>
							Start date:
						</label>
						<DateTimePickField
							placeholder='Start Date'
							onChange={(event) => {
								setStartDate(event.target.value)
							}}
							required
							type='date'
							value={startDate}
						/>
						<label className='py-3 font-semibold text-normal text-textColor'>
							Start Time:
						</label>
						<DateTimePickField
							placeholder='Start Time'
							onChange={(event) => {
								setStartTime(event.target.value)
							}}
							required
							type='time'
							value={startTime}
						/>
					</div>
					<div className='flex flex-wrap pl-4 space-x-1 laptop:ml-12 desktop:ml-12 laptop:pl-4 desktop:pl-4'>
						<label className='py-3 font-semibold laptop:ml-1 desktop:ml-1 text-normal text-textColor'>
							End date:
						</label>
						<DateTimePickField
							placeholder='End Date'
							onChange={(event) => {
								setEndDate(event.target.value)
							}}
							required
							type='date'
							value={endDate}
						/>
						<label className='px-1 py-3 font-semibold laptop:pl-20 desktop:pl-20 text-normal text-textColor'>
							End Time:
						</label>
						<DateTimePickField
							placeholder='End Time'
							onChange={(event) => {
								setEndTime(event.target.value)
							}}
							required
							type='time'
							value={endTime}
						/>
					</div>
				</div>
				<div className='pb-3 pl-4 pr-1 laptop:pl-16 desktop:pl-16'>
					<textarea
						className='block w-5/6 px-2 py-1 border-2 rounded-lg resize-none text-md text-textColor form-textarea'
						rows='2'
						placeholder='Start typing your event location...'
						name='location'
						onChange={(event) => {
							setLocation(event.target.value)
						}}
						value={location}
					></textarea>
				</div>
				<div className='pb-3 pl-4 pr-1 laptop:pl-16 desktop:pl-16'>
					<textarea
						className='block w-5/6 px-2 py-1 mt-1 text-xs border-2 rounded-lg resize-none text-textColor form-textarea'
						rows='3'
						placeholder='Start typing your event description...'
						name='description'
						onChange={(event) => {
							setDescription(event.target.value)
						}}
						value={description}
					></textarea>
				</div>
				<div className='grid grid-cols-2 laptop:space-x-14 desktop:space-x-14'>
					<div className='col-end-1 col-start-0 mobile:pl-4 laptop:pl-16 desktop:pl-16'>
						<Checkbox
							label='Book a Teacher'
							setter={setBookTeacher}
							value={bookTeacher}
						/>
					</div>
					{bookTeacher ? (
						<div className='w-9/12 col-start-1 col-end-3 px-2 border-2 rounded-lg text-textColor'>
							<TeacherSelect
								className='style0-input form-control text-textColor'
								options={teachers}
								name='Teachers'
								valueSetter={setTeacher}
								value={teacher}
								valueKey='id'
							/>
						</div>
					) : (
						<></>
					)}
				</div>
				<div className='flex py-3 pr-16 ml-3 space-x-6 place-content-center laptop:pr-48 desktop:pr-48'>
					<Btn
						label='Submit'
						color='bg-themeColorMain'
						textSize='text-md'
						textColor='text-textColor font-bold'
						borderColor='border-themeColorMain'
						onClickFunction={() => handleSubmit()}
					/>
					<Btn
						label='Cancel'
						color='bg-themeColorSecondary'
						textSize='text-md'
						textColor='text-textColor font-bold'
						borderColor='border-themeColorSecondary'
						onClickFunction={() => setOpenAddModal(false)}
					/>
				</div>
			</div>
		</Modal>
	)
}
