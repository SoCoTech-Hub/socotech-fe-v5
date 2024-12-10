import Cookies from 'js-cookie'
import { mainUrl, userId } from '@/context/constants'
import api from '@/api/api'
import splitEmail from '@/snippets/splitEmail'
import getGQLRequest from '@/snippets/getGQLRequest'

export default async function deleteAccount({ reason, option, list }) {
	if (userId) {
		try {
			const { user } = await getGQLRequest({
				endpoint: 'user',
				fields: 'email,profile{id,uniqueId, kins{id}}',
				findOne: true,
				id: userId
			})

			if (!user) {
				return { success: false, error: 'User not found' }
			}

			const { domain } = splitEmail(user.email)

			const item = list.find((i) => i.value == option)

			// Sanitize user data
			const Kin = {
				firstName: user.profile.uniqueId,
				lastName: user.profile.uniqueId,
				userRelation: null,
				mobileNr: user.profile.uniqueId,
				email: `${user.profile.uniqueId}@${domain}`
			}
			const Profile = {
				firstName: user.profile.uniqueId,
				lastName: user.profile.uniqueId,
				mobileNr: user.profile.uniqueId,
				banner: null,
				profilePic: null,
				about: `${item.description}:${reason}`,
				dob: null
			}
			const User = {
				email: `${user.profile.uniqueId}@${domain}`,
				username: user.profile.uniqueId,
				blocked: true,
				confirmed: false,
				expiryDate: new Date(),
				loggedIn: false,
				deleted: true
			}

			const resKin = user.profile.kins.length
				? await api.put(`parents/${user.profile.kins[0].id}`, Kin)
				: { ok: true }
			if (!resKin.ok) {
				return { success: false, message: resKin.data.error.message }
			}
			const resProfile = await api.put(`profiles/${user.profile.id}`, Profile)
			if (!resProfile.ok) {
				return { success: false, message: resProfile.data.error.message }
			}
			const resUser = await api.put(`users/${userId}`, User)

			if (!resUser.ok) {
				return { success: false, message: resUser.data.error.message }
			} else {
				Object.keys(Cookies.get()).forEach(function (cookieName) {
					var neededAttributes = {
						domain: domain,
						secure: true
					}
					Cookies.remove(cookieName, neededAttributes)
				})

				window.localStorage.clear()
				window.localStorage.setItem('logout', Date.now())
				//redirect to the logout page
				window.location.href = `${mainUrl}/auth/logout`
				return
			}
		} catch (error) {
			return { success: false, message: error }
		}
	} else {
		return { success: false, message: 'Something went wrong' }
	}
}
