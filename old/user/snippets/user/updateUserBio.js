import api from '@/api/api'
import { CreateAllCookies } from '../createCookies'

const updateUserAbout = async ({
	profileId,
	firstName,
	lastName,
	dob,
	idNumber,
	gender
}) => {
	if (typeof window === 'undefined') {
		return
	}
	try {
		await api.put(`/profiles/${profileId}`, {
			firstName,
			lastName,
			dob,
			idNumber,
			gender
		})
		CreateAllCookies({
			firstName: firstName,
			lastName: lastName,
			days: 14
		})

		return
	} catch (err) {
		return err
	}
}

export default updateUserAbout
