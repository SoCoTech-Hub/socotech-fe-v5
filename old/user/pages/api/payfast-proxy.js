import { create } from 'apisauce'

const payfastApi = create({
	baseURL: 'https://api.payfast.co.za'
})

export default async function handler(req, res) {
	const { subscriptionId, action } = req.query // e.g., pause/unpause
	const { timestamp, signature, merchantId, version } = req.body // Parse body

	const endpoint = `/subscriptions/${subscriptionId}/${action}`
	const response = await payfastApi.put(
		`${endpoint}${process.env.NEXT_PUBLIC_TEST ? '?testing=true' : ''}`,
		{},
		{
			headers: {
				'merchant-id': merchantId,
				signature,
				version,
				timestamp
			}
		}
	)

	if (response.ok) {
		return res.status(200).json(response.data)
	} else {
		return res.status(response.status).json({ error: response.problem })
	}
}
