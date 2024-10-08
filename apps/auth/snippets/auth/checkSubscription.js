import publicapi from '@/api/publicapi'
import getGQLRequest from '../getGQLRequest'

const checkSubscription = async (profileData) => {
	if (typeof window === 'undefined') {
		return
	}

	if (profileData) {
		const date = new Date()
		if (profileData?.isPayingDate) {
			const payDate = new Date(profileData.isPayingDate)
			if (payDate < date) {
				const { transactions } = await getGQLRequest({
					endpoint: 'transactions',
					fields: 'id',
					where: `mPaymentId:"${profileData.uniqueId}"`
				})
				if (!transactions) {
					// User is probably an admin
					return profileData.isPaying ? true : false
				}

				const { transactionEvents } = await getGQLRequest({
					endpoint: 'transactionEvents',
					fields: 'created_at,type',
					where: `eventId:${transactions[0].id}`
				})

				// Function to handle updating profile
				const handleUpdateProfile = async (lastTransaction) => {
					lastTransaction.setMonth(lastTransaction.getMonth() + 1)
					const isPaying = lastTransaction > date
					await publicapi.put(`/profiles/${profileData.id}`, {
						isPaying,
						isPayingDate: lastTransaction.toISOString()
					})
					return isPaying
				}

				// Find a 'Complete' transaction from the current month
				const currentMonthTransactions = transactionEvents.filter((event) => {
					const eventDate = new Date(event.created_at)
					return (
						event.type === 'COMPLETE' &&
						eventDate.getFullYear() === date.getFullYear() &&
						eventDate.getMonth() === date.getMonth()
					)
				})

				if (currentMonthTransactions.length > 0) {
					const lastTransaction = new Date(
						currentMonthTransactions[0].created_at
					)
					return await handleUpdateProfile(lastTransaction)
				}

				// Get the previous month
				const previousMonth = new Date()
				previousMonth.setMonth(previousMonth.getMonth() - 1)

				// Find a 'Complete' transaction from the past month
				const previousMonthTransactions = transactionEvents.filter((event) => {
					const eventDate = new Date(event.created_at)
					return (
						event.type === 'COMPLETE' &&
						eventDate.getFullYear() === previousMonth.getFullYear() &&
						eventDate.getMonth() === previousMonth.getMonth()
					)
				})

				if (previousMonthTransactions.length > 0) {
					const lastTransaction = new Date(
						previousMonthTransactions[0].created_at
					)
					return await handleUpdateProfile(lastTransaction)
				}

				// No valid transaction, mark as not paying
				await publicapi.put(`/profiles/${profileData.id}`, {
					isPaying: false
				})
				return false
			} else {
				// Pay date is still valid
				return profileData.isPaying ? true : false
			}
		} else {
			// No paying date set, check if the user is marked as paying
			return profileData.isPaying ? true : false
		}
	}
	return false
}

export default checkSubscription
