import { checkRegisterCompletion } from '@/snippets/user/checkRegisterCompletion'
import getDataRequest from '@/snippets/getDataRequest'
import getGQLRequest from './getGQLRequest'

async function authCheck({ userid = '' }) {
	if (userid) {
		const { user } = await getGQLRequest({
			endpoint: 'user',
			findOne: true,
			id: userid,
			fields: 'profile{id},role{name}'
		})

		const profiledata = await getDataRequest(
			`/profiles/${user?.profile?.id}`,
			() => {}
		)

		if (user?.role?.name !== 'Student') {
			return '../user/userdashboard'
		}
		const redirectTo = checkRegisterCompletion({ profile: profiledata })

		if (redirectTo == '/update' && user.role.name === 'Student') {
			return redirectTo
		}
		if (redirectTo.startsWith('..')) {
			return redirectTo
		}
	} else {
		return `/`
	}
}
export default authCheck
