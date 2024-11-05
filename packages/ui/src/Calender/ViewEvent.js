import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import Btn from '@/components/Btn'
import Modal from '@/components/Modal'
import AddEvent from './AddEvent'
import Alert from '@/components/Alert'
import { organizationId } from '@/context/constants'
import getReadableDate from '@/snippets/user/getReadableDate'
import ChangeAttendance from '@/snippets/user/updateAttendance'
import RemoveEvent from '@/snippets/user/removeEvent'
import getDataRequest from '@/snippets/getDataRequest'
import BtnLink from '../BtnLink'

export default function ViewEvent({ setOpenDetails, actualEvent, calendarO }) {
	const [event, setEvent] = useState(null)
	const [editEvent, setEditEvent] = useState(false)
	const [success, setSuccess] = useState()
	const [error, setError] = useState()
	const router = useRouter()

	useEffect(async () => {
		if (actualEvent?.id) {
			await getDataRequest(`/events/${actualEvent.id}`, setEvent, [])
		}
	}, [actualEvent])

	const handleYesAttendance = () => {
		ChangeAttendance(event.id, true, event.start, event.end)
		setSuccess(`Thank you for attending ${event.title}!`)
	}
	const handleNoAttendance = () => {
		ChangeAttendance(event.id, false, event.start, event.end)
		setError('We will see you next time.')
	}
	const handleRemove = () => {
		if (event.editable) {
			RemoveEvent({
				id: event.id,
				organizationId: organizationId
			})
			actualEvent.remove()
			router.reload()
		}
		setOpenDetails(false)
	}
	return (
		<>
			<Modal setOpen={setOpenDetails}>
				<div className='bg-compBg flex mobile:flex-col mobile:h-screen mobile:py-6'>
					{event?.image ? (
						event?.url ? (
							<div className='mobile:w-full laptop:w-5/6 desktop:w-5/6'>
								<a href={event.url}>
									<img
										src={event.image.url}
										className='w-full mobile:-mb-20 h-fit'
									/>
								</a>
							</div>
						) : (
							<div className='mobile:w-full laptop:w-5/6 desktop:w-5/6'>
								<img
									src={event.image.url}
									className='w-full mobile:-mb-20 h-fit object-cover object-center rounded-lg'
								/>
							</div>
						)
					) : event?.url ? (
						<div className='mobile:w-full laptop:w-5/6 desktop:w-5/6'>
							<a href={event?.url}>
								<img
									src='https://api.lorem.space/image?w=600&h=600'
									className='w-full mobile:-mb-20 h-fit object-cover object-center'
								/>
							</a>
						</div>
					) : (
						<div className='mobile:w-full laptop:w-5/6 desktop:w-5/6'>
							<img
								src='https://api.lorem.space/image?w=600&h=600'
								className='w-full mobile:-mb-20 h-fit object-cover object-center'
							/>
						</div>
					)}
					<Alert
						success={success}
						error={error}
					/>
					<div className='mobile:pt-20 pt-6 text-textColor'>
						<div className='align-middle text-center text-2xl pt-4 px-6'>
							{event?.title ? <h2>{event.title}</h2> : <></>}
							<div className='text-lg pt-2'>
								Date: {getReadableDate(event?.start)} -{' '}
								{getReadableDate(event?.end)}{' '}
							</div>
							{event?.desciption ? (
								<>
									{event.desciption.indexOf('<br/>') ||
									event.desciption.indexOf('<br>') ? (
										<div
											className='text-textColor'
											dangerouslySetInnerHTML={{ __html: event.desciption }}
										></div>
									) : (
										<ReactMarkdown children={event.desciption} />
									)}
								</>
							) : (
								<></>
							)}
							{event?.isLive ? (
								<div className='text-md text-center '>
									Will you attend the event?
									<div className='flex flex-row place-content-center'>
										<Btn
											label='Yes'
											color='bg-themeColorMain'
											textSize='text-md'
											textColor='text-textColor font-bold'
											borderColor='border-themeColorMain'
											onClickFunction={handleYesAttendance}
										/>
										<Btn
											label='No'
											color='bg-themeColorSecondary'
											textSize='text-md'
											textColor='text-textColor font-bold'
											borderColor='border-themeColorSecondary'
											onClickFunction={handleNoAttendance}
										/>
									</div>
								</div>
							) : (
								<></>
							)}
							{event?.url ? (
								<div className='align-middle text-center my-3'>
									<BtnLink
										label='Go to event'
										color='bg-themeColorMain'
										textSize='text-sm'
										textColor='text-textColor font-bold'
										borderColor='border-themeColorMain'
										link={event.url}
									/>
								</div>
							) : (
								<></>
							)}
							<div className='pt-2'>
								{event?.private ? (
									<>
										<label className='bg-info rounded-lg py-1 w-56 text-lg'>
											Private Event
										</label>
										{event?.editable ? (
											<div className='flex flex-row place-content-center pt-2'>
												<div className='flex flex-nowrap'>
													<Btn
														label='Edit Event'
														color='bg-themeColorMain'
														textSize='text-sm'
														textColor='text-textColor font-bold'
														borderColor='border-themeColorMain'
														onClickFunction={() => {
															setEditEvent(true)
															setOpenDetails(true)
														}}
													/>
													<div className='flex flex-nowrap'>
														{event?.editable ? (
															<Btn
																label='Delete Event'
																color='bg-danger '
																textSize='text-sm'
																textColor='text-textColor font-bold'
																borderColor='border-danger'
																onClickFunction={handleRemove}
															/>
														) : (
															<></>
														)}
													</div>
												</div>
												{event?.url ? (
													<Btn
														label='Go to Event'
														color='bg-themeColorMain'
														textSize='text-sm'
														textColor='text-textColor font-bold'
														borderColor='border-themeColorMain'
													/>
												) : (
													<></>
												)}
											</div>
										) : (
											<></>
										)}
									</>
								) : (
									<></>
								)}
							</div>
						</div>
					</div>
				</div>
			</Modal>
			{editEvent ? (
				<AddEvent
					setOpenAddModal={setOpenDetails}
					isEdit={true}
					eventParam={event}
					calendarO={calendarO}
				/>
			) : (
				<></>
			)}
		</>
	)
}
