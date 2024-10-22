import publicapi from '@/api/publicapi'
import { CreateAllCookies } from '../createCookies'
import checkSubscription from './checkSubscription'

export default async function login({
	identifier,
	password,
	modDevice,
	deviceId,
	rememberMe
}) {
	try {
		const { data, ok, error } = await publicapi.post(`/auth/local/`, {
			identifier,
			password
		})

		if (!ok) {
			return { data, ok, error }
		}

		modDevice =
			modDevice + `, width: ${window.innerWidth}, height: ${window.innerHeight}`
		await publicapi.put(`/users/${data.user.id}`, {
			deviceId: deviceId,
			deleted: data.user.deleted ? false : false,
			onBreak: data.user.onBreak ? false : false
		})
		const profilePost = await publicapi.get(`/profiles/${data.user.profile.id}`)
		const isPaying = await checkSubscription(profilePost.data)
		const profile = profilePost.data
		const organization = profile?.organization

		CreateAllCookies({
			days: 14,
			rememberMe: rememberMe,
			jwt: data.jwt,
			appBg: organization?.appBg,
			componentBg: organization?.componentBg,
			icon1: organization?.icon1,
			icon2: organization?.icon2,
			logo: organization?.logo?.url,
			primaryColor: organization?.primaryColor,
			secondaryColor: organization?.secondaryColor,
			text: organization?.text,
			firstName: profile?.firstName,
			lastName: profile?.lastName,
			modDevice: modDevice,
			deviceId: deviceId,
			email: data.user?.email,
			grades: profile?.grades,
			provinces: profile?.provinces,
			schools: profile?.schools,
			subjects: profile?.subjects,
			hasSiyavulaAccess: profile?.hasSiyavulaAccess,
			isPaying: isPaying,
			isDeveloper: profile?.isDeveloper,
			organizationId: organization?.id,
			organizationName: organization?.name,
			profileId: profile?.id,
			profilePicUrl: profile?.profilePic?.url,
			profileBannerUrl: profile?.banner?.url,
			uniqueId: profile?.uniqueId,
			userId: data.user?.id,
			roleName: data.user?.role.name
		})

		return { data, ok, error }
	} catch (error) {
		return 'error: ' + error
	}
}
