import crypto from 'crypto'

const generateUniqueId = ({ organization, userid }) => {
	const date = Math.floor(new Date().getTime() / 1000.0)
	const inputString = `${organization.name}-${userid}-${date}`

	// Create an MD5 hash of the input data
	const md5Hash = crypto.createHash('md5').update(inputString).digest('hex')

	// Build the uniqueId using the hash
	const uniqueId = `${organization.name.slice(0, 1)}${md5Hash.slice(0, 8)}`

	return uniqueId.toUpperCase()
}

export default generateUniqueId
