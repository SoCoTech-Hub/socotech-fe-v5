import generateSignature from './generateSignature'

const sendTransaction = async ({ data, product }) => {
	//prevent function from being ran on the server
	if (typeof window === 'undefined') {
		return
	}

	const pfHost =
		process.env.NEXT_PUBLIC_TEST == 'true'
			? 'sandbox.payfast.co.za'
			: 'www.payfast.co.za'

	const merchantKey =
		process.env.NEXT_PUBLIC_TEST == 'true'
			? 'ylhbufohka1pz'
			: data?.merchant_key
			? data.merchant_key
			: product.organization?.merchantKey

	const merchantId =
		process.env.NEXT_PUBLIC_TEST == 'true'
			? '10028601'
			: data?.merchantId
			? data.merchantId
			: product.organization?.merchantId

	const sendData = {
		merchant_id: merchantId,
		merchant_key: merchantKey,
		return_url: data.return_url,
		cancel_url: data.cancel_url,
		notify_url: data.notify_url,
		name_first: data?.firstName.trim(),
		name_last: data?.lastName.trim(),
		email_address: data?.email.trim(),
		// cell_number: data?.cellnr.trim(),
		m_payment_id: data?.mPaymentId,
		amount: data?.amount,
		item_name: data?.item,
		email_confirmation: data?.emailConfirmation,
		confirmation_address: 'francois@topic.co.za',
		payment_method: data?.paymentMethod,
		subscription_type: data?.subscriptionType,
		billing_date: data?.billingDate,
		recurring_amount: data?.recurringAmount,
		frequency: data?.frequency,
		cycles: data?.cycles
	}
	sendData['signature'] = generateSignature(sendData)

	var formdata = new FormData()
	formdata.append('merchant_id', sendData?.merchant_id)
	formdata.append('merchant_key', sendData?.merchant_key)
	formdata.append('return_url', sendData?.return_url)
	formdata.append('cancel_url', sendData?.cancel_url)
	formdata.append('notify_url', sendData?.notify_url)
	formdata.append('name_first', sendData?.name_first)
	formdata.append('name_last', sendData?.name_last)
	formdata.append('email_address', sendData?.email_address)
	// formdata.append('cell_number', sendData?.cell_number)
	formdata.append('m_payment_id', sendData?.m_payment_id)
	formdata.append('amount', sendData?.amount)
	formdata.append('item_name', data?.item)
	formdata.append('email_confirmation', sendData?.email_confirmation)
	formdata.append('confirmation_address', sendData.confirmation_address)
	formdata.append('payment_method', data?.paymentMethod)
	formdata.append('subscription_type', data?.subscriptionType)
	formdata.append('billing_date', data?.billingDate)
	formdata.append('recurring_amount', data?.recurringAmount)
	formdata.append('frequency', data?.frequency)
	formdata.append('cycles', data?.cycles)
	formdata.append('signature', sendData?.signature)

	const mydata = [...formdata.entries()]
		.map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
		.join('&')
	const url = `https://${pfHost}/eng/process?${mydata}`

	window.location.href = url
}

export default sendTransaction
