const axios = require('axios')

export const fetchUserDetail = async (uniqueId) => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/profiles?uniqueId=${uniqueId}`
		)
		return response.status === 200 ? response.data[0] : null
	} catch (error) {
		console.error('Error fetching user detail:', error)
		return null
	}
}
