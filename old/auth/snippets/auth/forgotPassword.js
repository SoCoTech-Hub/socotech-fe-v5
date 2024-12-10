import publicapi from '@/api/publicapi'

const forgotPassword = (email) => {
	//prevent function from being ran on the server
	if (typeof window === 'undefined') {
		return
	}

	return new Promise((resolve, reject) => {
		publicapi
			.post(`/auth/forgot-password`, { email: email.trim() })
			.then((res) => {
				resolve(res)
			})
			.catch((error) => {
				reject('error: ' + error)
			})
	})
}

export default forgotPassword
