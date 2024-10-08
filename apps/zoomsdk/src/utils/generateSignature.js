const KJUR = require('jsrsasign')

module.exports = (req) => {
	const iat = Math.round(new Date().getTime() / 1000) - 30
	const exp = iat + 60 * 60 * 2

	const { meetingNumber, sdkKey, sdkSecret, role } = req.body

	const oHeader = { alg: 'HS256', typ: 'JWT' }

	const oPayload = {
		sdkKey: sdkKey,
		mn: meetingNumber,
		role: role,
		iat: iat,
		exp: exp,
		appKey: sdkKey,
		tokenExp: iat + 60 * 60 * 2
	}

	const sHeader = JSON.stringify(oHeader)
	const sPayload = JSON.stringify(oPayload)
	const signature = KJUR.jws.JWS.sign(oHeader.alg, sHeader, sPayload, sdkSecret)
	
	return signature
}
