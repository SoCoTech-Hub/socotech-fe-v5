const axios = require('axios')

const fetchOrganization = async (orgId) => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/organizations?id=${orgId}`
		)
		return response.status === 200 ? response.data[0] : null
	} catch (error) {
		console.error('Error fetching organization:', error)
		return null
	}
}
export default fetchOrganization
