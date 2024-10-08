export default function splitEmail(email) {
	const atIndex = email.indexOf('@')

	if (atIndex !== -1) {
		const username = email.slice(0, atIndex)
		const domain = email.slice(atIndex + 1)
		return { username, domain }
	}

	return { username:null, domain:null }
}
