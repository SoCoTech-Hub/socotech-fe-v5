import { useState, useEffect } from 'react'
import api from '@/api/api'
import { profileId } from '@/context/constants'
import getNotificationResponses from './gql/getNotificationResponses'

export default function OneSignalNotifications() {
	const [notifications, setNotifications] = useState([])
	const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] =
		useState(false)

	const serviceWorkerPath = () => {
		return process.env.NEXT_PUBLIC_BASE_URL.slice(1)
	}

	useEffect(() => {
		window.OneSignal = window.OneSignal || []
		OneSignal.push(async function () {
			OneSignal.SERVICE_WORKER_PARAM = {
				scope: `/${serviceWorkerPath()}/onesignal/`
			}
			OneSignal.SERVICE_WORKER_PATH = `${serviceWorkerPath()}/onesignal/OneSignalSDKWorker.js`
			OneSignal.SERVICE_WORKER_UPDATER_PATH = `${serviceWorkerPath()}/onesignal/OneSignalSDKWorker.js`
			OneSignal.init({
				appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
				safari_web_id: `web.onesignal.auto.${process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_ID}`,
				notifyButton: {
					enable: true
				},
				allowLocalhostAsSecureOrigin:
					process.env.NEXT_PUBLIC_DOMAIN.includes('localhost')
			})

			const pushNotificationsEnabled =
				await OneSignal.isPushNotificationsEnabled()
			setIsPushNotificationsEnabled(pushNotificationsEnabled)
		})

		return () => {
			window.OneSignal = undefined
		}
	}, [])

	useEffect(async () => {
		if (profileId && isPushNotificationsEnabled) {
			let { notificationResponses } = await getNotificationResponses({
				profileId: profileId
			})
			setNotifications(notificationResponses)
			// Debug and tests only
			// setNotifications([
			// 	{ id: 123, notification: { title: 'Notification 123', body: 'Body 123' } },
			// 	{ id: 456, notification: { title: 'Notification 456', body: 'Body 456' } }
			// ])
		}
	}, [profileId, isPushNotificationsEnabled])

	useEffect(async () => {
		if (notifications.length) {
			notifications.forEach(async (notification) => {
				await OneSignal.sendSelfNotification(
					notification.notification.title,
					notification.notification.body
				)
				await sentNotification(notification.id)
			})
		}
	}, [notifications])

	async function sentNotification(id) {
		await api.put(`/notification-responses/${id}`, {
			read: true,
			new: false
		})
	}

	return <></>
}
