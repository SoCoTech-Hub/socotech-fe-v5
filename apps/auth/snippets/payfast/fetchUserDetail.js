import getGQLRequest from '../getGQLRequest'

export const fetchUserDetail = async (uniqueId) => {
	try {
		const { profiles } = await getGQLRequest({
			endpoint: 'profiles',
			fields: 'id',
			where: `uniqueId:"${uniqueId}"`
		})

		return profiles ? profiles[0] : null
	} catch (error) {
		console.error('Error fetching user detail:', error)
		return null
	}
}
