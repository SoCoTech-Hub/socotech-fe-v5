import {
	grades,
	organizationId,
	profileId,
	provinces,
	schools
} from '@/context/constants'
import getGQLRequest from '@/snippets/getGQLRequest'

export const getEventItems = async ({ date, setSelectedDay, itemId = false }) => {
	const dateStart = date?new Date(date):new Date()
	dateStart.setHours(0, 0, 0, 0)
	const dateEnd = date?new Date(date):new Date()
	dateEnd.setHours(23, 59, 59, 999)

	let customWhere = itemId
	? ''
	: `${
			organizationId ? `organization: { id: ${organizationId} },` : ''
	  } start_gte: "${dateStart.toISOString().split('T')[0]}T00:00",end_lte:"${dateEnd.toISOString().split('T')[0]}T23:59",_or:[{},{ private: false },${
			profileId
				? `{ private: true, author: {id: ${profileId} } },{ private: true, student: {id: ${profileId} } },`
				: ''
	  } ${provinces ? `{province: {id: ${provinces} }},` : ''} ${
			grades ? `{grade: {id: ${grades} }}` : ''
	  } ${schools ? `,{school: {id: ${schools}}}` : ''}]`

	await getGQLRequest({
		endpoint: itemId ? 'event' : 'events',
		fields:
			'id, title, desciption, start, end, lesson{id,name}, url, color,location,image{url},private,editable,isLive, author{firstName,lastName,profilePic{url}},subject{name,color}',
		findOne: itemId ? true : false,
		id: itemId ? itemId : '',
		where: customWhere
			  ,stateSetter:setSelectedDay
	})
}
