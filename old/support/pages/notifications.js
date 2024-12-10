import { useState } from 'react'
import UserCover from '@/components/UserCover'
import NotificationStatus from '@/components/NotificationStatus'
import NotificationTable from '@/components/NotificationTable'
import DigilibLoad from '@/components/DigilibLoad'
import NotificationListMobile from '@/components/NotificationListMobile'
import { useQuery } from '@apollo/client'
import GetNotifications from 'graphql/queries/GetNotifications'
import { SEO } from '@/components/SeoHead'

const Notifications = ({ newNotificationExpiry, profileId }) => {
	const [page, setPage] = useState(1)
	const [pageSize] = useState(10)

	const { data, error, loading } = useQuery(GetNotifications, {
		variables: {
			profileID: profileId,
			offset: (page - 1) * pageSize,
			limit: pageSize,
			date: newNotificationExpiry
		}
	})

	if (error) {
		console.error(error)
		return null
	}
	const seo = {
		title: 'Support Notifications Page',
		description: 'Receive important TDP notifications!'
	}
	return (
		<div className='col row'>
			<SEO
				title={seo.title}
				description={seo.description}
			/>
			<div className='space-y-10 desktop:gy-4 mobile:space-y-3'>
				<div className=''>
					<UserCover />
				</div>
				<div className=''>
					<NotificationStatus
						newNotifications={data?.newNotificationsCount?.aggregate?.count}
						totalNotifications={data?.totalNotificationsCount?.aggregate?.count}
						unreadNotifications={
							data?.unreadNotificationsCount?.aggregate?.count
						}
						newNotificationExpiry={newNotificationExpiry}
					/>
				</div>
				{loading ? (
					<DigilibLoad />
				) : (
					<>
						<div className='mobile:hidden'>
							<NotificationTable
								notificationList={data.notifications}
								profileId={profileId}
								setPage={setPage}
								pageSize={pageSize}
								pageCount={data?.totalNotificationsCount?.aggregate?.count}
							/>
						</div>
						<div className='desktop:hidden laptop:hidden'>
							<NotificationListMobile
								notificationList={data.notifications}
								profileId={profileId}
								setPage={setPage}
								pageSize={pageSize}
								pageCount={data?.totalNotificationsCount?.aggregate?.count}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	const profileId = context.req.cookies['profile']
	const notificationsLastXDays = new Date(
		Date.now() - 86400000 * 7
	).toISOString()

	return {
		props: {
			profileId: profileId ? profileId : null,
			newNotificationExpiry: notificationsLastXDays
		}
	}
}

export default Notifications
