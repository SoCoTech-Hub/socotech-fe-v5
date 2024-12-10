import getGQLRequest from '../getGQLRequest'

const fetchTransactionDetail = async (paymentId, itemName) => {
	try {
		const { transactions } = await getGQLRequest({
			endpoint: 'transactions',
			fields:
				'id,orgId,amount,firstName,lastName,email,mPaymentId,addressLine1,postalCode,company,vatNr,amount,item,description',
			where: `mPaymentId:"${paymentId}",item:"${itemName}"`
		})

		return transactions ? transactions[0] : null
	} catch (error) {
		console.error('Error fetching transaction:', error)
		return null
	}
}
export default fetchTransactionDetail
