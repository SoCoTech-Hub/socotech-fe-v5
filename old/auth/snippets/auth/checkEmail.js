import getGQLRequest from '../getGQLRequest'

const checkEmail = async ({ email }) => {
	if (typeof window === 'undefined') {
		return
	}

	const { users } = await getGQLRequest({
		endpoint: 'users',
		fields: 'provider',
		where: `email:"${email}"`
	})
	return users ? users[0] : null
}

export default checkEmail
