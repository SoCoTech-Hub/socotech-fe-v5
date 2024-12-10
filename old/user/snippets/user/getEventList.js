import {
	grades,
	organizationId,
	profileId,
	provinces,
	schools
} from '@/context/constants'
import getGQLRequest from '@/snippets/getGQLRequest'

export const getEventList = async ({ setEventList, currentDate, month }) => {
	const firstDayOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	)
	const lastDayOfMonth = month
		? new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
		: new Date(
				currentDate.getFullYear(),
				currentDate.getMonth(),
				currentDate.getDate() + 6
		  )

	const { events } = await getGQLRequest({
		endpoint: 'events',
		fields: 'id, start, end, title, private',
		where: `${
			organizationId ? `organization: { id: ${organizationId} },` : ''
		} _and:[{start_gte: "${firstDayOfMonth.toISOString()}"},{end_lte:"${lastDayOfMonth.toISOString()}"}], _or: [{ private: false },${
			profileId
				? `{ private: true, author: {id: ${profileId} } },{ private: true, student: {id: ${profileId} } },`
				: ''
		} ${provinces ? `{province: {id: ${provinces} }},` : ''} ${
			grades ? `{grade: {id: ${grades} }}` : ''
		} ${schools ? `,{school: {id: ${schools}}}` : ''}]`
	})

	setEventList(events)
}
