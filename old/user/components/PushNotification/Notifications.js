import React from 'react'
import Storage from './Storage'
import './Notification.module.css'
import PushNotification from './PushNotification'

// type Position =
// 	| 'top-left'
// 	| 'top-middle'
// 	| 'top-right'
// 	| 'bottom-left'
// 	| 'bottom-middle'
// 	| 'bottom-right'

// interface Props {
// 	position?: Position;
// }

// interface State {
// 	value: Array<Not>;
// }

/**
 * Notification injector, which renders
 * the push notifications rendered
 * by the addNotifcation({}) function.
 *
 * @param {string} position - Must pass as prop. Sets the position of the push notification.
 * position can me 'top-left', 'top-middle', 'top-right', 'bottom-left', 'bottom-middle', 'bottom-right'.
 * Example <Notifications position='top-middle' />
 *
 */
class Notifications extends React.Component {
	state = {
		value: [],
	}

	componentDidMount() {
		Storage.addListener((v) => this.setState({ value: v }))
	}

	render() {
		const { position } = this.props
		const classN = `rpn-notification-holder ${
			position || 'top-middle'
		} supertest`
		return (
			<div className={classN}>
				{this.state.value.map((note, i) => {
					return (
						<PushNotification
							key={i}
							closeNotification={Storage.popAndPush}
							onClick={note.onClick}
							id={note.id}
							theme={note.theme}
							title={note.title}
							subtitle={note.subtitle}
							closeButton={note.closeButton}
							message={note.message}
							styling={note.styling}
						/>
					)
				})}
			</div>
		)
	}
}

export default Notifications
