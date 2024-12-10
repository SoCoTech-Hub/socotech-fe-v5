import { useState, useEffect } from 'react'
import api from '@/api/api'
import { Logo, profileId } from '@/context/constants'
import getNotificationResponses from './gql/getNotificationResponses'
import addNotification from '@/components/PushNotification/addNotification'

export default function Notifications() {
	const [notifications, setNotifications] = useState([])
	const [received, setReceived] = useState([])

	useEffect(async () => {
		if (profileId) {
			let { notificationResponses } = await getNotificationResponses({
				profileId: profileId
			})
			setNotifications(notificationResponses)
		}
	}, [profileId])

	useEffect(async () => {
		if (notifications.length) {
			askNotificationPermission()
			//send the notification
			if (Notification.permission === 'granted') {
				notifications.forEach((notification) => {

					createNotification({
						title: notification.notification.title,
						body: notification.notification.body,
						id: notification.id
					})
					received.push(notification.id)
				})
				setReceived(received)
			}
		}
	}, [notifications])

	// ask for permission when the "Enable notifications" button is clicked
	function askNotificationPermission() {
		// function to actually ask the permissions
		function handlePermission(permission) {
			// Whatever the user answers, we make sure to store the information
			if (!('permission' in Notification)) {
				Notification.permission = permission
			}
		}

		// Let's check if the browser supports notifications
		if (!'Notification' in window) {
			console.log('This browser does not support notifications.')
		} else {
			if (checkNotificationPromise()) {
				Notification.requestPermission().then((permission) => {
					handlePermission(permission)
				})
			} else {
				Notification.requestPermission(function (permission) {
					handlePermission(permission)
				})
			}
		}
	}
	// Function to check whether browser supports the promise version of requestPermission()
	// Safari only supports the old callback-based version
	function checkNotificationPromise() {
		try {
			Notification.requestPermission().then()
		} catch (e) {
			return false
		}
		return true
	}

	function createNotification(props) {
		// Create and show the notification
		let img = Logo
		let body = props.body
		let title = props.title
		addNotification({
			title: title,
			// subtitle: 'This is a subtitle',
			message: body,
			theme: 'darkblue',
			native: true, // when using native, your OS will handle theming.
			icon: img,
			onClick: () => {
				window.location.href = process.env.NEXT_PUBLIC_MAIN_URL
			}
		})
		// we need to update this notification, so the notification won't be sent again
		sentNotification(props.id)
	}

	async function sentNotification(id) {
		await api.put(`/notification-responses/${id}`, {
			read: true,
			new: false
		})
	}

	return <></>
}
