import publicapi from '@/api/publicapi'
import generateUniqueId from './generateUniqueId'
import CreateInMail from './createInMail'
import { CreateAllCookies } from '../createCookies'

const registerUser = async ({
	first_name,
	last_name,
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
			firstName: first_name,
			lastName: last_name,
			// voucher: { id: voucher.id },
			organization: { id: organization ? organization.id : 1 }
		})

		const res = await publicapi.post(`/auth/local/register`, {
			username: email.trim(),
			email: email.trim(),
			password: password,
			profile: { id: profile.data.id },
			blocked: false
		})
		if (!res.ok) {
			return res
		}
		const data = res.data

		const uniqueId = generateUniqueId({
			organization: profile.data.organization,
			userid: data.user.id
		})
		const org = profile.data.organization
		const profilePost = await publicapi.put(
			`/profiles/${data.user.profile.id}`,
			{
				uniqueId: uniqueId
			}
		)
		if (!profilePost.ok) {
			return profilePost
		}
		await CreateInMail({
			orgName: org.name,
			firstName: first_name,
			profileId: data.user.profile.id,
			orgId: 1
		})

		CreateAllCookies({ days: 14, email: data.user.email })
		return profilePost
	} catch (error) {
		return error.response || error
	}
}
export default registerUser
