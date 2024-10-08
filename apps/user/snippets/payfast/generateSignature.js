const crypto = require('crypto')

const generateSignature = (data) => {
	const passPhrase =
		process.env.NEXT_PUBLIC_TEST == 'true'
			? '1234567891212'
			: 'VzVT6yHrGSRmfEWZj2m9'

	// Add the passPhrase to the data object
	if (passPhrase !== null) {
		data.passphrase = passPhrase.trim()
	}

	// Arrange the array by key alphabetically for API calls
	let ordered_data = {}
	Object.keys(data)
		.sort()
		.forEach((key) => {
			ordered_data[key] = data[key]
		})
	data = ordered_data

	// Create the get string
	let getString = ''
	for (let key in data) {
		getString +=
			key + '=' + encodeURIComponent(data[key]).replace(/%20/g, '+') + '&'
	}

	// Remove the last '&'
	getString = getString.substring(0, getString.length - 1)
	// if (passPhrase !== null) {
	// 	getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(
	// 		/%20/g,
	// 		'+'
	// 	)}`
	// }

	// Hash the data and create the signature
	return crypto.createHash('md5').update(getString).digest('hex')
}
export default generateSignature
