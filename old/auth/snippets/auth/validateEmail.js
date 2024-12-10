import formData from 'form-data'
import Mailgun from 'mailgun.js'

const privateApiKey = process.env.NEXT_PUBLIC_MAIL_KEY

const validateEmail = async ({ email }) => {
	const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
	if (emailRegExp.test(email)) {
		if (privateApiKey) {
			try {
				const mailgun = new Mailgun(formData)

				const client = mailgun.client({
					username: 'api',
					key: privateApiKey
				})

				const validationRes = await client.validate.get(email)

				if (validationRes.result === 'deliverable') {
					return true
				} else {
					return { error: validationRes.reason }
				}
			} catch (error) {
				console.error(error.message, ':', error.details)
			}
		}
		return true
	}
	return { error: 'You have entered an invalid email address' }
}

export default validateEmail
