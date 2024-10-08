import cancel from '@/snippets/email/cancel'
import invoice from '@/snippets/email/invoice'
import userNotFoundEmail from '@/snippets/email/userNotFoundEmail'
import fetchOrganization from '@/snippets/payfast/fetchOrganization'
import fetchTransactionDetail from '@/snippets/payfast/fetchTransactionDetail'
import fetchTransactionEventDetail from '@/snippets/payfast/fetchTransactionEventDetail'
import { fetchUserDetail } from '@/snippets/payfast/fetchUserDetail'
import {
	buildPfParamString,
	validatePfIp,
	validatePfPaymentData,
	validatePfServerConfirmation,
	validatePfSignature
} from '@/snippets/payfast/validations'

const axios = require('axios')

const HTTP_STATUS = {
	BAD_REQUEST: 400,
	INTERNAL_SERVER_ERROR: 500,
	OK: 200
}

export default async function register(req, res) {
	const { body } = req
	// const {  method, url, headers } = req

	// // Prepare the data to be logged
	// const logData = {
	// 	method,
	// 	url,
	// 	headers,
	// 	body
	// }
	// await fetch('http://localhost:3000/auth/api/logRequest', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify(logData) // Send only the serializable data
	// })
	const zeroPad = (num, places) => String(num).padStart(places, '0')
	const pfHost =
		process.env.NEXT_PUBLIC_TEST === 'true'
			? 'sandbox.payfast.co.za'
			: 'www.payfast.co.za'

	const pfData = { ...body }

	const transactionDetail = await fetchTransactionDetail(
		pfData.m_payment_id,
		pfData.item_name
	)
	if (!transactionDetail) {
		return res
			.status(HTTP_STATUS.BAD_REQUEST)
			.json({ error: 'Transaction not found' })
	}
	const organization = await fetchOrganization(transactionDetail?.orgId || 1)
	if (!organization) {
		return res
			.status(HTTP_STATUS.BAD_REQUEST)
			.json({ error: 'Organization not found' })
	}

	const pfParamString = buildPfParamString(pfData)
	const isValidSignature = validatePfSignature(pfData, pfParamString)
	const isValidIp = await validatePfIp(req)
	const isValidPaymentData = validatePfPaymentData(
		transactionDetail?.amount,
		pfData
	)
	const isValidServerConfirmation = await validatePfServerConfirmation(
		pfHost,
		pfParamString
	)

	if (
		!isValidSignature ||
		!isValidIp ||
		!isValidPaymentData ||
		!isValidServerConfirmation
	) {
		return res
			.status(HTTP_STATUS.BAD_REQUEST)
			.json({ error: 'Validation failed' })
	}

	const date = new Date()
	let formatter = new Intl.NumberFormat('en-ZA', {
		style: 'currency',
		currency: 'ZAR',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})
	let userDetail = []
	if (body.payment_status === 'COMPLETE') {
		userDetail = await fetchUserDetail(pfData.m_payment_id)
		if (!userDetail) {
			// If user detail is not found, send an email notification and update the transaction
			const userNotFound = userNotFoundEmail({
				firstName: transactionDetail.firstName,
				organizationName: organization.name,
				organizationPrimaryColor: organization.primaryColor
			})

			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/email`, {
				to: transactionDetail.email,
				from: 'no-reply@socotech.co.za',
				subject: `${organization.name} Subscription Issue`,
				html: userNotFound
			})
		} else {
			const nextPayDate = new Date()
			nextPayDate.setMonth(nextPayDate.getMonth() + 1)
			await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/profiles/${userDetail.id}`,
				{
					isPaying: true,
					isPayingDate: nextPayDate.toISOString()
				}
			)
		}

		await axios.put(
			`${process.env.NEXT_PUBLIC_API_URL}/transactions/${transactionDetail.id}`,
			{
				notes: userDetail ? '' : 'User Detail Not Found',
				signature: body.token
			}
		)
		const transactionEventDetail = await fetchTransactionEventDetail(
			transactionDetail.id,
			body.pf_payment_id
		)
		let transactionEvent = []
		if (transactionEventDetail?.id) {
			transactionEvent = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/transaction-events/${transactionEventDetail.id}`,
				{
					eventId: `${transactionDetail.id}`,
					type: body.payment_status,
					billingDate: body.billing_date,
					amountGross: body.amount_gross,
					amountFee: body.amount_fee,
					amountNet: body.amount_net,
					paymentId: body.pf_payment_id,
					testmode: process.env.NEXT_PUBLIC_TEST
				}
			)
		} else {
			transactionEvent = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/transaction-events`,
				{
					eventId: `${transactionDetail.id}`,
					type: body.payment_status,
					billingDate: body.billing_date,
					amountGross: body.amount_gross,
					amountFee: body.amount_fee,
					amountNet: body.amount_net,
					paymentId: body.pf_payment_id,
					testmode: process.env.NEXT_PUBLIC_TEST
				}
			)

			const Body = invoice({
				organizationName: organization.name,
				organizationPrimaryColor: organization.primaryColor,
				organizationSecondaryColor: organization.secondaryColor,
				organizationLogoDarkUrl: organization.logoDark.url,
				firstName: transactionDetail.firstName,
				lastName: transactionDetail.lastName,
				addressLine1: transactionDetail.addressLine1,
				postalCode: transactionDetail.postalCode,
				email: transactionDetail.email,
				company: transactionDetail.company,
				vatNr: transactionDetail.vatNr,
				date: date,
				mPaymentId: transactionDetail.mPaymentId,
				id: transactionEvent.data.id,
				amount: transactionDetail.amount,
				item: transactionDetail.item,
				description: transactionDetail.description,
				formatter: formatter,
				zeroPad: zeroPad
			})

			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/invoices`, {
				sender: 'no-reply@socotech.co.za',
				shipTo: transactionDetail.email,
				body: Body,
				transaction: { id: transactionEvent.data.id },
				billingDate: body.billing_date
			})
		}
	} else {
		// Cancelled subscription
		const transactionEvent = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/transaction-events`,
			{
				eventId: `${transactionDetail.id}`,
				type: body.payment_status,
				billingDate: body.billing_date,
				amountGross: body.amount_gross,
				amountFee: body.amount_fee,
				amountNet: body.amount_net,
				paymentId: body.pf_payment_id,
				testmode: process.env.NEXT_PUBLIC_TEST
			}
		)

		const canceledBody = cancel({
			organizationName: organization.name,
			organizationPrimaryColor: organization.primaryColor,
			organizationSecondaryColor: organization.secondaryColor,
			organizationLogoDarkUrl: organization.logoDark.url,
			firstName: transactionDetail.firstName,
			lastName: transactionDetail.lastName,
			addressLine1: transactionDetail.addressLine1,
			postalCode: transactionDetail.postalCode,
			email: transactionDetail.email,
			company: transactionDetail.company,
			vatNr: transactionDetail.vatNr,
			date: date,
			mPaymentId: transactionDetail.mPaymentId,
			id: transactionEvent.data.id
		})

		await axios.put(
			`${process.env.NEXT_PUBLIC_API_URL}/transactions/${transactionDetail.id}`,
			{
				notes: `Payment Status: ${body.payment_status}`,
				signature: body.token
			}
		)

		await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/invoices`, {
			sender: 'no-reply@socotech.co.za',
			shipTo: transactionDetail.email,
			body: canceledBody,
			transaction: { id: transactionEvent.data.id },
			billingDate: body.billing_date
		})
	}

	return res.status(HTTP_STATUS.OK).json({})
}
