import NotificationBox from './NotificationBox'

const index = ({
	newNotifications = '--',
	totalNotifications = '--',
	unreadNotifications = '--'
}) => {
	return (
		<div className='grid gap-2 desktop:grid-cols-3 laptop:grid-cols-3 mobile:grid-cols-3 place-items-stretch'>
			<div
				className='col rounded-lg bg-themeColorMain'
				// style={{
				// 	backgroundImage:
				// 		'linear-gradient(60deg, rgb(250, 218, 51), rgb(80, 140, 232))'
				// }}
			>
				<NotificationBox
					title='New Notifications'
					theme='new-notifications'
					value={newNotifications}
				/>
			</div>
			<div
				className='col rounded-lg bg-themeColorMain'
				// style={{
				// 	backgroundImage:
				// 		'linear-gradient(60deg, rgb(245, 207, 210), rgb(211, 240, 121))'
				// }}
			>
				<NotificationBox
					title='Total Notifications'
					theme='total-notifications'
					value={totalNotifications}
				/>
			</div>
			<div
				className='col rounded-lg bg-themeColorMain'
				// style={{
				// 	backgroundImage:
				// 		'linear-gradient(60deg, rgb(80, 140, 232), rgb(233, 86, 64))'
				// }}
			>
				<NotificationBox
					title='Unread Notifications'
					theme='unread-notifications'
					value={unreadNotifications}
				/>
			</div>
		</div>
	)
}

export default index
