import { gql } from '@apollo/client'

const GetUserNotificationNavBar = gql`
	query GetUserNotificationNavBar(
		$profileID: ID!
		# $notificationDate: String!
		$currentDate: String!
		$calendarEndDate: String!
	) {
		notificationResponsesConnection(
			where: {
				profile: { id: $profileID }
				read: false
				# created_at_gt: $notificationDate
			}
		) {
			aggregate {
				count
			}
		}

		eventResponsesConnection(
			where: {
				profile: { id: $profileID }
				read: false
				startDate_gt: $currentDate
				endDate_lt: $calendarEndDate
			}
		) {
			aggregate {
				count
			}
		}
	}
`
export default GetUserNotificationNavBar
