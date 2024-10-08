const axios = require('axios')
const crypto = require('crypto')
const dns = require('dns')

export const lookupIpAddresses = async (domain) => {
	return new Promise((resolve, reject) => {
		dns.lookup(domain, { all: true }, (err, addresses) => {
			if (err) return reject(err)
			resolve(addresses.map((addr) => addr.address))
		})
	})
}

let cachedIps = null
const getPayFastIps = async () => {
	if (!cachedIps) {
		const validHosts = [
			'www.payfast.co.za',
			'sandbox.payfast.co.za',
			'w1w.payfast.co.za',
			'w2w.payfast.co.za'
		]
		try {
			cachedIps = (await Promise.all(validHosts.map(lookupIpAddresses))).flat()
			setTimeout(() => {
				cachedIps = null
			}, 600000) // cache for 10 minutes
		} catch (err) {
			console.error('Error fetching PayFast IPs:', err)
			return []
		}
	}
	return cachedIps
}

export const validatePfIp = async (req) => {
	const clientIp =
		req.headers['x-forwarded-for'] || req.connection.remoteAddress
	const validIps = await getPayFastIps()
	return new Set(validIps).has(clientIp)
}

export const validatePfPaymentData = (cartTotal, data) => {
	return (
		Math.abs(parseFloat(cartTotal) - parseFloat(data['amount_gross'])) <= 0.01
	)
}

export const validatePfServerConfirmation = async (host, paramString) => {
	try {
		const response = await axios.post(
			`https://${host}/eng/query/validate`,
			paramString
		)
		return response.data === 'VALID'
	} catch (error) {
		console.error('Error validating server confirmation:', error)
		return false
	}
}

export const validatePfSignature = (data, paramString) => {
	const pfPassphrase =
		process.env.NEXT_PUBLIC_TEST === 'true' ? null : 'VzVT6yHrGSRmfEWZj2m9'
	const finalString = pfPassphrase
		? `${paramString}&passphrase=${encodeURIComponent(
				pfPassphrase.trim()
		  ).replace(/%20/g, '+')}`
		: paramString
	const signature = crypto.createHash('md5').update(finalString).digest('hex')
	return data['signature'] === signature
}

export const buildPfParamString = (data) => {
	return Object.keys(data)
		.filter((key) => key !== 'signature')
		.map(
			(key) =>
				`${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, '+')}`
		)
		.join('&')
}
