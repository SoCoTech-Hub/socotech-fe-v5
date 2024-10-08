import api from '@/api/api'
import { CreateAllCookies } from '../createCookies'

const updateUserSchool = async ({
	profileId,
	schoolProvince,
	schoolObj,
	grade
}) => {
	if (typeof window === 'undefined') {
		return
	}
	try {
		const res = await api.put(`/profiles/${profileId}`, {
			schools: [
				{
					id: schoolObj?.id ? schoolObj.id : schoolObj
				}
			],
			provinces: [
				{ id: schoolProvince?.id ? schoolProvince.id : schoolProvince }
			],
			grades: [{ id: grade?.id ? grade.id : grade }]
		})
		CreateAllCookies({
			grades: grade?.id ? grade.id : grade,
			provinces: schoolProvince?.id ? schoolProvince.id : schoolProvince,
			schools: schoolObj?.id ? schoolObj.id : schoolObj,
			days: 14
		})
		return
	} catch (err) {
		return err
	}
}

export default updateUserSchool
