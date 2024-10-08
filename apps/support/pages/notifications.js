import { useState } from 'react'
import Head from 'next/head'
import UserCover from '@/components/UserCover'
import NotificationStatus from '@/components/NotificationStatus'
import NotificationTable from '@/components/NotificationTable'
import DigilibLoad from '@/components/DigilibLoad'
import NotificationListMobile from '@/components/NotificationListMobile'
import { useQuery } from '@apollo/client'
import GetNotifications from 'graphql/queries/GetNotifications'

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
	title: 'Topic - Support Notifications Page',
	description: 'Receive important Topic notifications!',
	image: 'https://lms.topic.co.za/support/logo.png',
	url: 'https://topic.co.za'
}
	return (
		<div className='col row'>
			<Head>
				<title>{seo.title}</title>
				<meta
					name='title'
					content={seo.title}
				/>
				<meta
					name='description'
					content={seo.description}
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content={seo.url}
				/>
				<meta
					property='og:title'
					content={seo.title}
				/>
				<meta
					property='og:description'
					content={seo.description}
				/>
				<meta
					property='og:image'
					content={seo.image}
				/>
				<meta
					property='twitter:card'
					content='summary_large_image'
				/>
				<meta
					property='twitter:url'
					content={seo.url}
				/>
				<meta
					property='twitter:title'
					content={seo.title}
				/>
				<meta
					property='twitter:description'
					content={seo.description}
				/>
				<meta
					property='twitter:image'
					content={seo.image}
				/>
			</Head>
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
