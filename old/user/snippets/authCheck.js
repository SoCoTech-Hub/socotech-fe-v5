// import { checkRegisterCompletion } from '@/snippets/user/checkRegisterCompletion'
// import getDataRequest from '@/snippets/getDataRequest'
import getGQLRequest from './getGQLRequest'

async function authCheck({ userid = '' }) {
	if (userid) {
		const { user } = await getGQLRequest({
			endpoint: 'user',
			findOne: true,
			id: userid,
			fields: 'role{name}'
		})
		// const data = await getDataRequest(`/users/${userid}`, () => { })
		// const profiledata = await getDataRequest(
		// 	`/profiles/${data?.profile?.id}`,
		// 	() => { }
		// )

		if (user.role.name !== 'Student') {
			return '../user/userdashboard'
		} else {
			return '../user'
		}
		// const redirectTo = checkRegisterCompletion({ profile: profiledata })

		// if (redirectTo == '/update' && data.role.name === 'Student') {
		// 	return redirectTo
		// }
		// if (redirectTo.startsWith('..')) {
		// 	return redirectTo
		// }
	} else {
		return `/`
	}
}
export default authCheck
