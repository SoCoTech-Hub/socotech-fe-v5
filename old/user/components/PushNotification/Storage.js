const defaultDuration = 3000
// export type Color = 'light' | 'darkblue' | 'red' | undefined;
// type voidFunc = () => void;
// export type eventFunc = (e: any) => void;
// export type onClickType = voidFunc | eventFunc | undefined;
// export type Options = {
//     title: string,
//     subtitle?: string,
//     message?: string,
//     onClick?: onClickType,
//     theme?: Color,
//     duration?: number,
//     backgroundTop?: string,
//     backgroundBottom?: string,
//     colorTop?: string,
//     colorBottom?: string,
//     closeButton?: JSX.Element | string,
//     native?: boolean,
//     icon?: string,
//     vibrate?: number | number[],
//     silent?: boolean
// }
// export type Styling = {
//     backgroundTop?: string,
//     backgroundBottom?: string,
//     colorTop?: string,
//     colorBottom?: string
// }
// export interface PushNotificationObject {
//     title: string;
//     subtitle?: string;
//     message?: string;
//     theme?: Color;
//     styling?: Styling;
//     closeButton?: JSX.Element | string;
//     onClick?: onClickType;
// }

export class PushNotification {
	title
	subtitle
	message
	theme
	id
	styling
	closeButton
	onClick
	constructor(op) {
		this.title = op.title
		this.subtitle = op.subtitle
		this.message = op.message
		this.theme = op.theme
		this.id = Math.random()
		this.styling = op.styling
		this.closeButton = op.closeButton
		this.onClick = op.onClick
	}
}

class Storage {
	Storage = []
	Listener = () => this.Storage

	popAndPush = (NotificationId) => {
		let i = 0
		while (i < this.Storage.length) {
			if (this.Storage[i].id === NotificationId) {
				this.Storage.splice(i, 1)
			} else {
				++i
			}
		}
		this.Listener(this.Storage)
	}

	setTimer = (NotificationId, duration) => {
		setTimeout(() => this.popAndPush(NotificationId), duration)
	}

	addListener = (listener) => {
		this.Listener = listener
	}

	addNativeNotification = async (options) => {
		const {
			title,
			subtitle,
			message,
			duration,
			icon,
			vibrate,
			silent,
			onClick,
		} = options
		if (
			Notification.permission === 'default' ||
			Notification.permission === 'denied'
		) {
			await Notification.requestPermission()
		}
		if (Notification.permission === 'granted') {
			const not = new Notification(title, {
				body: message,
				data: subtitle,
				icon,
				vibrate,
				silent,
			})
			not.onclick = onClick || null
			setTimeout(not.close.bind(not), duration || defaultDuration)
		}
	}

	addWebNotification = (options) => {
		const {
			title,
			subtitle,
			message,
			theme,
			duration,
			backgroundBottom,
			backgroundTop,
			colorBottom,
			colorTop,
			closeButton,
			onClick,
		} = options
		const styling = {
			backgroundTop,
			backgroundBottom,
			colorTop,
			colorBottom,
		}
		const newNotification = new PushNotification({
			title,
			subtitle,
			message,
			theme,
			styling,
			closeButton,
			onClick,
		})
		this.Storage.push(newNotification)
		this.setTimer(newNotification.id, duration || defaultDuration)
		this.Listener(this.Storage)
	}

	addNotification = async (options) => {
		const { native } = options
		if (native) {
			return this.addNativeNotification(options)
		}
		return this.addWebNotification(options)
	}
}

export default new Storage()
