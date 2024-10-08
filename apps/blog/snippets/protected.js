import { useEffect } from 'react'
import Cookies from 'js-cookie'
import getDataRequest from '@/snippets/getDataRequest'
import logout from '@/snippets/multipleDevicesLogout'
import authCheck from '@/snippets/authCheck'

import {
	domain,
	mainUrl,
	organizationId,
	profileId,
	theme,
	uniqueId,
	userId,
	deviceId
} from '@/context/constants'

const Protected = ({ device, children }) => {
	const currentDate = new Date()

	useEffect(async () => {
		if (organizationId && userId) {
			const routeTo = await authCheck({ userid: userId })
			if (routeTo == '/update') {
				window.location.href = `${mainUrl}/auth${routeTo}`
			}
			const user = await getDataRequest(`/users/${userId}`, () => {})

			if (!theme) {
				const neededAttributes = {
					domain: domain,
					secure: true
				}
				const newAttributes = {
					domain: domain,
					secure: true,
					expires: 1
				}
				device =
					device +
					`\nwidth: ${window.innerWidth}\nheight: ${window.innerHeight}`
				Cookies.remove('device', neededAttributes)
				Cookies.set('device', device ? device : 0, newAttributes)

				const organization = await getDataRequest(
					`/organizations/${organizationId}`,
					() => {}
				)
				const profile = await getDataRequest(`/profiles/${profileId}`, () => {})
				const transaction = await getDataRequest(
					`/transactions?uniqueId=${uniqueId}`,
					() => {}
				)
				Cookies.remove('isPaying', neededAttributes)
				Cookies.set(
					'isPaying',
					transaction.length ? transaction[0].id : 0,
					newAttributes
				)
				Cookies.remove('isDeveloper', neededAttributes)
				Cookies.set('isDeveloper', profile?.isDeveloper)
				Cookies.remove('SupportDepartments', neededAttributes)
				Cookies.set(
					'SupportDepartments',
					profile?.supportDepartments
						?.map((department) => department.id)
						.flat(),
					{
						domain: domain,
						secure: true
					}
				)
				Cookies.remove('Subjects', neededAttributes)
				Cookies.set(
					'Subjects',
					profile?.subjects?.map((subject) => subject.id).flat(),
					{
						domain: domain,
						secure: true
					}
				)
				Cookies.remove('Grades', neededAttributes)
				Cookies.set(
					'Grades',
					profile?.grades?.map((grade) => grade.id).flat(),
					{
						domain: domain,
						secure: true
					}
				)
				Cookies.remove('Schools', neededAttributes)
				Cookies.set(
					'Schools',
					profile?.schools?.map((school) => school.id).flat(),
					{
						domain: domain,
						secure: true
					}
				)
				Cookies.remove('Subjects', neededAttributes)
				Cookies.set(
					'Subjects',
					profile?.subjects?.map((subject) => subject.id).flat(),
					{
						domain: domain,
						secure: true
					}
				)
				Cookies.remove('Provinces', neededAttributes)
				Cookies.set(
					'Provinces',
					profile?.provinces?.map((province) => province.id).flat(),
					{
						domain: domain,
						secure: true
					}
				)
				Cookies.remove('role', neededAttributes)
				Cookies.set('role', user?.role?.name, neededAttributes)

				//theme color setup
				Cookies.remove('PrimaryColor', neededAttributes)
				Cookies.set('PrimaryColor', organization?.primaryColor, newAttributes)
				Cookies.remove('PrimaryColorDark', neededAttributes)
				Cookies.set(
					'PrimaryColorDark',
					organization?.primaryColorDark,
					newAttributes
				)
				Cookies.remove('SecondaryColor', neededAttributes)
				Cookies.set(
					'SecondaryColor',
					organization?.secondaryColor,
					newAttributes
				)
				Cookies.remove('SecondaryColorDark', neededAttributes)
				Cookies.set(
					'SecondaryColorDark',
					organization?.secondaryColorDark,
					newAttributes
				)
				Cookies.remove('AppBg', neededAttributes)
				Cookies.set('AppBg', organization?.appBg, newAttributes)
				Cookies.remove('AppBgDark', neededAttributes)
				Cookies.set('AppBgDark', organization?.appBgDark, newAttributes)
				Cookies.remove('ComponentBg', neededAttributes)
				Cookies.set('ComponentBg', organization?.componentBg, newAttributes)
				Cookies.remove('ComponentBgDark', neededAttributes)
				Cookies.set(
					'ComponentBgDark',
					organization?.componentBgDark,
					newAttributes
				)
				Cookies.remove('Text', neededAttributes)
				Cookies.set('Text', organization?.text, newAttributes)
				Cookies.remove('TextDark', neededAttributes)
				Cookies.set('TextDark', organization?.textDark, newAttributes)
				Cookies.remove('Icon1', neededAttributes)
				Cookies.set('Icon1', organization?.icon1, newAttributes)
				Cookies.remove('Icon1Dark', neededAttributes)
				Cookies.set('Icon1Dark', organization?.icon1Dark, newAttributes)
				Cookies.remove('Icon2', neededAttributes)
				Cookies.set('Icon2', organization?.icon2, newAttributes)
				Cookies.remove('Icon2Dark', neededAttributes)
				Cookies.set('Icon2Dark', organization?.icon2Dark, newAttributes)
				Cookies.remove('Logo', neededAttributes)
				Cookies.set('Logo', organization?.logo?.url, newAttributes)
				Cookies.remove('LogoDark', neededAttributes)
				Cookies.set('LogoDark', organization?.logoDark?.url, newAttributes)
				Cookies.remove('theme', neededAttributes)
				Cookies.set('theme', 1, neededAttributes)
			}

			let pageCheck = []

			const force = await getDataRequest(
				`/forces?organization=${organizationId}&start_lt=${currentDate.toISOString()}&end_gt=${currentDate.toISOString()}`,
				() => {}
			)

			if (force.length) {
				pageCheck = await getDataRequest(
					`/page-tracks?url=${force[0].link}&user=${userId}&_limit=1`,
					() => {}
				)
				if (!pageCheck.length) {
					window.location.href = `${mainUrl}${force[0].link}`
				}
			}
			// if (deviceId) {
			//   if (user?.deviceId !== deviceId) {
			//     logout()
			//   }
			// } else {
			//   Object.keys(Cookies.get()).forEach(function (cookieName) {
			//     var neededAttributes = {
			//       domain: domain,
			//       secure: true,
			//     }
			//     Cookies.remove(cookieName, neededAttributes)
			//   })
			// }
		} else {
			window.location.href = `${mainUrl}/auth`
		}
	}, [userId, organizationId])

	if (userId) {
		return <>{children}</>
	} else {
		return <></>
	}
}
export default Protected
