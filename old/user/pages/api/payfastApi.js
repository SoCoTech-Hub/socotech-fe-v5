import AddTimestamp from '@/snippets/payfast/addTimeStamp'
import generateSignature from '@/snippets/payfast/generateSignature'
import { create } from 'apisauce'

const pfHost = 'https://api.payfast.co.za'

const payfastApi = create({
	baseURL: pfHost
})

export default payfastApi

export const pauseSubscription = async (subscriptionId, org) => {
	try {
		const timestamp = AddTimestamp()

		const Header = {
			'merchant-id':
				process.env.NEXT_PUBLIC_TEST == 'true' ? '10025140' : org.merchantId,
			timestamp: timestamp,
			version: 'v1'
		}

		const signature = generateSignature(Header)

		const response = await fetch(
			`api/payfast-proxy?action=cancel&subscriptionId=${subscriptionId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					merchantId: Header['merchant-id'],
					timestamp: Header.timestamp,
					signature: signature,
					version: Header.version
				})
			}
		)

		if (response.ok) {
			return
		} else {
			throw new Error(response.statusText)
		}
	} catch (error) {
		return null
	}
}

export const unpauseSubscription = async (subscriptionId, org) => {
	try {
		const timestamp = AddTimestamp()

		const Header = {
			'merchant-id':
				process.env.NEXT_PUBLIC_TEST == 'true' ? '10025140' : org.merchantId,
			timestamp: timestamp,
			version: 'v1'
		}

		const signature = generateSignature(Header)

		const response = await fetch(
			`api/payfast-proxy?action=uncancel&subscriptionId=${subscriptionId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					merchantId: Header['merchant-id'],
					timestamp: Header.timestamp,
					signature: signature,
					version: Header.version
				})
			}
		)

		if (response.ok) {
			return
		} else {
			throw new Error(response.statusText)
		}
	} catch (error) {
		return null
	}
}
