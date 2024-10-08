const axios = require('axios')

const fetchTransactionDetail = async (paymentId, itemName) => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/transactions?mPaymentId=${paymentId}&item=${itemName}`
		)
		return response.status === 200 ? response.data.pop() : null
	} catch (error) {
		console.error('Error fetching transaction:', error)
		return null
	}
}
export default fetchTransactionDetail
