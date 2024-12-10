import getGQLRequest from '../getGQLRequest'

const fetchOrganization = async (orgId) => {
	try {
		const { organization } = await getGQLRequest({
			endpoint: 'organization',
			findOne: true,
			id: orgId,
			fields: 'name,primaryColor,secondaryColor,logoDark{url}'
		})

		return organization
	} catch (error) {
		console.error('Error fetching organization:', error)
		return null
	}
}
export default fetchOrganization
