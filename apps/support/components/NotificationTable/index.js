import Avatar from '@/components/Avatar'
import NotificationHoverButton from '@/components/NotificationHoverButton'
import Pagination from '@/components/Pagination'
import Btn from '@/components/Btn'
import { getTimeDifferenceFromPostDate } from '@/snippets/user/getTimeDifferenceFromPostDate'
import { baseUrl, organizationId } from '@/context/constants'
import ReadAllUpdate from '@/snippets/readall'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import getGQLRequest from '@/snippets/getGQLRequest'
import { useMutation } from '@apollo/client'
import NotificationReadUpdate from 'graphql/mutations/NotificationReadUpdate'
import GetNotifications from 'graphql/queries/GetNotifications'
import delay from '@/snippets/delay'

const index = ({
	notificationList = [],
	profileId,
	page,
	setPage,
	pageSize,
	pageCount
}) => {
	const router = useRouter()
	const refreshPage = async () => {
		ReadAllUpdate({ notificationList })
		await delay(500)
		router.reload()
	}
	const useUpdateNotification = () => {
		const [updateNotification] = useMutation(NotificationReadUpdate, {
			refetchQueries: [GetNotifications]
		})

		return updateNotification
	}

	const updateNotification = useUpdateNotification()

	const [defaultAvatar, setDefaultAvatar] = useState('')

	useEffect(async () => {
		const { organization } = await getGQLRequest({
			endpoint: 'organization',
			fields: `favicon{url}`,
			findOne: true,
			id: organizationId
		})
		setDefaultAvatar(organization?.favicon?.url)
	}, [])

	return (
		<div className='rounded-lg bg-compBg shadow-menu'>
			<div className='flex flex-row items-center justify-between pt-4 pb-1 pl-8 pr-8  '>
				<div className='text-left text-textColor'>Notifications</div>
				<div className='text-left text-textColor'>
					<Btn
						onClickFunction={() => refreshPage()}
						label='Mark as read'
						textColor='black'
						buttonAnimation=''
						textSize='text-lg'
					/>
				</div>
			</div>
			<div className='mb-10 ml-8 mr-8'>
				<hr className='bg-compBg' />
			</div>
			<div className='px-4'>
				{notificationList.length ? (
					<>
						<table className='w-full'>
							<tbody>
								{notificationList.map((notification) => (
									<tr
										onClick={() =>
											updateNotification({
												variables: {
													id: notification.id,
													read: !notification.read
												}
											})
										}
										className='ml-4 hover:bg-compBg text-textColor'
										key={notification.id}
									>
										<td className='w-16'>
											<div className='flex items-center w-20 h-20 pl-3 align-middle '>
												<Avatar
													src={
														notification?.notification?.author?.profilePic?.url
															? notification?.notification?.author?.profilePic
																	?.url
															: defaultAvatar
													}
													size='56px'
													border={true}
												/>
											</div>
										</td>
										<td className='flex justify-between w-full'>
											<div className='flex flex-wrap w-full py-2 pl-4 pr-4 text-textColor'>
												<div className='w-full font-extrabold'>
													{!notification.read && (
														<img
															src={`${baseUrl}/red_dot.svg`}
															alt='Live Lessons'
															className='self-center float-left w-3 mr-2'
														/>
													)}
													{notification?.notification?.title}:
												</div>
												<div className='w-full pr-4 mr-10 break-words text-textColor'>
													{notification?.notification?.body}
												</div>
												<div className='font-bold text-textColor'>
													{getTimeDifferenceFromPostDate(
														notification?.notification?.created_at
													)}
												</div>
											</div>
											<div className='flex items-center justify-end w-full mr-4 align-middle text-textColor'>
												<NotificationHoverButton
													notificationResponseId={notification?.id}
													notificationRead={notification?.read}
													profileId={profileId}
												/>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Pagination
								className='pagination-bar'
								currentPage={page}
								totalCount={pageCount}
								pageSize={pageSize}
								onPageChange={(page) => setPage(page)}
							/>
						</div>
					</>
				) : (
					<div className='py-2 font-extrabold text-center text-textColor'>
						No Notifications
					</div>
				)}
			</div>
		</div>
	)
}

export default index
