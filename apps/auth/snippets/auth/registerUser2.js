import publicapi from '@/api/publicapi'
import generateUniqueId from './generateUniqueId'
import { CreateAllCookies } from '../createCookies'

const RegisterUser2 = async ({
	email,
	password,
	// voucher,
	organization
}) => {
	//prevent function from being ran on the server
	if (typeof window === 'undefined') {
		return
	}

	try {
		const profile = await publicapi.post(`/profiles`, {
			// voucher: { id: voucher.id },
			organization: { id: organization ? organization.id : 1 }
		})

		const { ok, data, error } = await publicapi.post(`/auth/local/register`, {
			username: email.trim(),
			email: email.trim(),
			password: password,
			profile: { id: profile.data.id },
			blocked: false
		})
		if (!ok) {
			return error
		}

		const uniqueId = generateUniqueId({
			organization: profile.data.organization,
			userid: data.user.id
		})

		const profilePost = await publicapi.put(`/profiles/${data.user.profile.id}`, {
			uniqueId: uniqueId
		})
		if (!profilePost.ok) {
			return profilePost
		}

		CreateAllCookies({ days: 14, email: email })
		return profilePost
	} catch (error) {
		return error.response || error
	}
}
export default RegisterUser2
