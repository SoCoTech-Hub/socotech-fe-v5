import countUnreadMails from '@/snippets/gql/countUnreadMails'

const getMailCount = async ({ profileId }) => {
	if (profileId) {
		let result = await countUnreadMails({
			profileId
		})

		return result.inMails
	}

	return 0
}
export default getMailCount
