import { useEffect } from 'react'
import { useRouter } from 'next/router'
import userid from '@/snippets/getUserid'
import getDataRequest from '@/snippets/getDataRequest'
import api from '@/api/api'
import { useMutation } from '@apollo/client'
import ZoomLessonUpdate from 'graphql/mutations/ZoomLessonUpdate'
let timeSpent = 0

const TimeTracks = ({ lesson, participantID, meetingId }) => {
	const router = useRouter()
	let startTime = new Date()

	const [updateParticpant] = useMutation(ZoomLessonUpdate)

	useEffect(async () => {
		const interval = setInterval(() => {
			addTimeToLessonResponse()
		}, 60000)
		return () => clearInterval(interval)
	}, [])

	useEffect(async () => {
		let response = []
		if (userid) {
			if (lesson) {
				response = await getDataRequest(
					`/time-tracks?lesson=${lesson}&user=${userid}`,
					() => {}
				)
			} else {
				response = await getDataRequest(
					`/time-tracks?meetingId=${meetingId}&user=${userid}`,
					() => {}
				)
			}
			if (!response.length) {
				let requestData = {
					user: { id: userid },
					lesson: { id: lesson ? lesson : null },
					timeSpent: 0,
					quiz: null,
					survey: null,
					knowledgeBase: null,
					isComplete: true
				}
				await api.post('/time-tracks', requestData)
			} else {
				timeSpent = response[0].timeSpent
			}
		}
	}, [lesson])

	useEffect(() => {
		router.events.on('routeChangeStart', () => {
			addTimeToLessonResponse(), zoomParticipantLogout()
		})
		return () => {
			router.events.off('routeChangeStart', () => {
				addTimeToLessonResponse(), zoomParticipantLogout()
			})
		}
	}, [])
	useEffect(() => {
		if (process.browser) {
			window.addEventListener('beforeunload', () => {
				addTimeToLessonResponse(), zoomParticipantLogout()
			})
		}
		return () => {
			window.removeEventListener('beforeunload', () => {
				addTimeToLessonResponse(), zoomParticipantLogout()
			})
		}
	}, [process.browser])

	const addTimeToLessonResponse = async () => {
		const endTime = new Date()
		const elapsedTime = (endTime - startTime) / 1000 / 60 + timeSpent

		const response = await getDataRequest(
			`/time-tracks?lesson=${lesson}&user=${userid}`,
			() => {}
		)

		if (response.length) {
			await api.put(`/time-tracks/${response[0].id}`, {
				timeSpent: elapsedTime
			})
		}
	}

	const zoomParticipantLogout = () => {
		if (participantID) {
			updateParticpant({
				variables: {
					id: participantID,
					active: false
				}
			})
		}
	}

	return <></>
}

export default TimeTracks
