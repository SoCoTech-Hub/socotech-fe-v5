import getGQLRequest from '../getGQLRequest'

const fetchTransactionEventDetail = async (eventId, paymentId) => {
	try {
		const { transactionEvents } = await getGQLRequest({
			endpoint: 'transactionEvents',
			fields: 'id',
			where: `eventId:${eventId},paymentId:${paymentId}`
		})
		return transactionEvents
			? transactionEvents[transactionEvents.length - 1]
			: null
	} catch (error) {
		console.error('Error fetching transaction:', error)
		return null
	}
}
export default fetchTransactionEventDetail
