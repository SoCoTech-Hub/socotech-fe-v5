import publicapi from '@/api/publicapi'
import getGQLRequest from '../getGQLRequest'

const createTransaction = async ({ data }) => {
	//prevent function from being ran on the server
	if (typeof window === 'undefined') {
		return
	}
	// check if transaction exists
	const { transactions } = await getGQLRequest({
		endpoint: 'transactions',
		fields: 'id',
		where: `orgId:${data?.orgId},mPaymentId:"${data?.uniqueId}",item:"${data?.item}"`
	})

	if (transactions.length) {
		const transactionItem = transactions[0]

		try {
			const transaction = await publicapi.put(
				`/transactions/${transactionItem.id}`,
				{
					firstName: data?.firstName,
					lastName: data?.lastName,
					email: data?.email,
					// cellnr: data?.cellnr,
					amount: data?.amount,
					item: data?.item,
					description: data?.description,
					emailConfirmation: data?.emailConfirmation,
					confirmationAddress: data?.email,
					paymentMethod: data?.paymentMethod,
					subscriptionType: data?.subscriptionType,
					billingDate: data?.billingDate,
					recurringAmount: data?.recurringAmount,
					frequency: data?.frequency,
					cycles: data?.cycles,
					mPaymentId: data?.uniqueId,
					company: data.company,
					vatNr: data?.vatNr,
					addressLine1: data?.addressLine1,
					provinceId: data?.provinceId,
					postalCode: data?.postalCode,
					additionalInformation: data?.additionalInformation,
					password: data?.password,
					orgId: data?.orgId
				}
			)
			return transaction
		} catch (error) {
			console.info(error)
			return
		}
	} else {
		try {
			const transaction = await publicapi.post(`/transactions`, {
				firstName: data?.firstName,
				lastName: data?.lastName,
				email: data?.email,
				// cellnr: data?.cellnr,
				amount: data?.amount,
				item: data?.item,
				description: data?.description,
				emailConfirmation: data?.emailConfirmation,
				confirmationAddress: data?.email,
				paymentMethod: data?.paymentMethod,
				subscriptionType: data?.subscriptionType,
				billingDate: data?.billingDate,
				recurringAmount: data?.recurringAmount,
				frequency: data?.frequency,
				cycles: data?.cycles,
				mPaymentId: data?.uniqueId,
				company: data.company,
				vatNr: data?.vatNr,
				addressLine1: data?.addressLine1,
				provinceId: data?.provinceId,
				postalCode: data?.postalCode,
				additionalInformation: data?.additionalInformation,
				password: data?.password,
				orgId: data?.orgId
			})
			return transaction
		} catch (error) {
			console.info(error)
			return
		}
	}
}

export default createTransaction
