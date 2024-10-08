import api from '@/api/api'
import { CreateAllCookies } from '../createCookies'

const updateUserDetails = async ({
	profileID,
	userInput,
	grade,
	school,
	location,
	gender
}) => {
	if (typeof window === 'undefined') {
		return
	}
	try {
		const { data, ok, error } = await api.put(`/profiles/${profileID}`, {
			dob: userInput.dob,
			firstName: userInput.firstName,
			lastName: userInput.lastName,
			mobileNr: userInput.mobileNr,
			gender: gender ? { id: gender } : null,
			grades: grade ? { id: grade } : null,
			provinces: location ? { id: location } : null,
			schools: school ? { id: school } : null
		})
		if (!ok) {
			return { error }
		}

		CreateAllCookies({
			days: 31,
			days,
			firstName: data.firstName,
			lastName: data.lastName,
			grades: data.grades,
			provinces: data.provinces,
			schools: data.schools,
			subjects: data.subjects,
			profilePicUrl: data.profilePic.url,
			profileBannerUrl: data.banner.url,
			uniqueId: data.uniqueId
		})
		return
	} catch (err) {
		return err
	}
}

export default updateUserDetails
