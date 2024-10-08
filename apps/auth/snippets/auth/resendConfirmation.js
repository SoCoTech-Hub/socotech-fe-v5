import publicapi from '@/api/publicapi'

const resendConfirmation = async ({ email }) => {
	if (typeof window === 'undefined') {
		return
	}
	try {
		const data = await publicapi.post(`/auth/send-email-confirmation`, {
			email: email.trim()
		})
		return data
	} catch (err) {
		return err
	}
}

export default resendConfirmation
