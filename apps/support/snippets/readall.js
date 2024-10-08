import api from '@/api/api'
import GetNotifications from 'graphql/queries/GetNotifications'


const ReadAllUpdate =async ({ notificationList }) => {
	if (notificationList.length>1) {
		notificationList.map(async (notification) => {
			if (notification.read == false) {
				await api.put(`/notification-responses/${notification.id}`, {
					read: true
				})
			}
		})
	} else {
		if (notificationList.read == false) {
				await api.put(`/notification-responses/${notificationList.id}`, {
					read: true
				})
			}
	}
	
	GetNotifications
	return
}

export default ReadAllUpdate
