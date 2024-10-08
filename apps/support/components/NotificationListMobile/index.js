import Avatar from '@/components/Avatar'
import NotificationHoverButton from '@/components/NotificationHoverButton'
import { getTimeDifferenceFromPostDate } from '@/snippets/user/getTimeDifferenceFromPostDate'
import Pagination from '@/components/Pagination'
import { baseUrl } from '@/context/constants'
import { useRouter } from 'next/router'
import ReadAllUpdate from '@/snippets/readall'
import Btn from '../Btn'

const NotificationListMobile = ({
	notificationList = [],
	profileId,
	page,
	setPage,
	pageSize,
	pageCount
}) => {
	const router = useRouter()

	const refreshPage = () => {
		ReadAllUpdate({ notificationList })
		router.reload()
	}

	return (
		<div className='mb-10 rounded-lg bg-compBg shadow-menu'>
			<div className='flex flex-row items-center justify-between pt-4 pb-1 pl-8  '>
				<div className='text-lg font-bold text-left text-textColor'>
					Notifications
				</div>
				<div className='font-normal text-left text-textColor'>
					<Btn
						onClickFunction={() => refreshPage()}
						label='Mark as read'
						textColor='black'
						textSize='text-lg'
						buttonAnimation=''
					/>
				</div>
			</div>
			<div className='ml-8 mr-8 desktop:mb-10 mobile:mb-5'>
				<hr className='bg-compBg' />
			</div>
			<div className='px-4'>
				{notificationList.length ? (
					<>
						<div className='w-full'>
							<div>
								{notificationList.map((notification) => (
									<div
										className='ml-4 cursor-pointer hover:bg-compBg '
										key={notification.id}
									>
										<div className='flex items-center w-full mr-4 align-middle justify-evenly '>
											<Avatar
												src={
													notification?.notification?.author?.profilePic?.url
												}
												size='56px'
												border={true}
											/>
											<div className='flex flex-wrap w-full py-2 pl-4 pr-4 body-text '>
												<div className='w-full font-extrabold text-textColor'>
													{!notification.read && (
														<img
															src={`${baseUrl}/red_dot.svg`}
															alt='Live Lessons'
															className='self-center float-left w-3 mr-2'
														/>
													)}
													{notification?.notification?.title}:
												</div>
												<div className='w-full break-word text-textColor'>
													{notification?.notification?.body}
												</div>
												<div className='font-bold text-textColor'>
													{getTimeDifferenceFromPostDate(
														notification?.notification?.created_at
													)}
												</div>
											</div>
											<NotificationHoverButton
												notificationResponseId={notification?.id}
												notificationRead={notification?.read}
												profileId={profileId}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
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
					<div className='py-2 font-extrabold text-center body-text'>
						No Notifications
					</div>
				)}
			</div>
		</div>
	)
}

export default NotificationListMobile
