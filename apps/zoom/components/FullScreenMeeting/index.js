import React, { useState, useEffect } from 'react'
// import ZoomMtgEmbedded from '@zoomus/websdk/embedded'
import { ZoomMtg } from '@zoomus/websdk'
// import './style.css'

import zoomApi from '@/api/zoomApi'
import getGQLRequest from '@/snippets/getGQLRequest'
import { userName, email, uniqueId, userId } from '@/context/constants'
import Head from 'next/head'

const ZoomMeeting = ({ lessonId, meetingNumber, meetingPassword }) => {
	// const client = ZoomMtgEmbedded.createClient()

	const [meetingCanStart, setMeetingCanStart] = useState(false)
	const [zoomSetting, setZoomSetting] = useState(null)

	useEffect(() => {
		if (
			meetingNumber &&
			meetingPassword &&
			(lessonId || userId) &&
			typeof window !== 'undefined'
		) {
			setMeetingCanStart(true)
		}
	}, [meetingNumber, meetingPassword])

	useEffect(() => {
		if (meetingCanStart) {
			getSignature()
		}
	}, [meetingCanStart])

	const getLessonZoomSetting = async () => {
		if (lessonId) {
			const { lesson } = await getGQLRequest({
				endpoint: `lesson`,
				id: lessonId,
				findOne: true,
				fields: `zoom{key,secret,email}`
			})
			setZoomSetting(lesson.zoom || null)
			return lesson.zoom
		}
		return null
	}
	const getMeetingZoomSetting = async () => {
		if (meetingNumber && userId) {
			const { zoomMeetings } = await getGQLRequest({
				endpoint: `zoomMeetings`,
				fields: `zoom{key,secret,email}`,
				where: `meetingLink_contains:${meetingNumber},participants:{id:${userId}}`
			})

			setZoomSetting(zoomMeetings[0].zoom || null)
			return zoomMeetings[0].zoom
		}
		return null
	}

	const getSignature = async () => {
		try {
			let requestData = { meetingNumber, role: 0 }
			const zoomSettings = lessonId
				? await getLessonZoomSetting()
				: await getMeetingZoomSetting()

			if (!zoomSettings) return

			requestData = {
				...requestData,
				sdkKey: zoomSettings.key,
				sdkSecret: zoomSettings.secret
			}

			const response = await zoomApi.post('/', requestData)

			startMeeting({
				signature: response.data.signature,
				zoomSetting: zoomSettings
			})
		} catch (error) {
			console.log('--> getSignature() error')
			console.error(error)
		}
	}

	const startMeeting = async ({ signature, zoomSetting }) => {
		try {
			ZoomMtg.setZoomJSLib('https://source.zoom.us/2.10.1/lib', '/av')
			// loads WebAssembly assets
			ZoomMtg.preLoadWasm()
			ZoomMtg.prepareWebSDK()
			// loads language files, also passes any error messages to the ui
			ZoomMtg.i18n.load('en-US')
			ZoomMtg.i18n.reload('en-US')

			let meetingSDKElement = document.getElementById('zmmtg-root')

			// let meetingSDKChatElement = document.getElementById(
			// 	'meetingSDKChatElement'
			// )

			// client.init({
			// 	debug: true,
			// 	zoomAppRoot: meetingSDKElement,
			// 	language: 'en-US',
			// 	customize: {
			// 		meetingInfo: [
			// 			'topic',
			// 			'host',
			// 			'mn',
			// 			'pwd',
			// 			'telPwd',
			// 			'invite',
			// 			'participant',
			// 			'dc',
			// 			'enctype'
			// 		],
			// 		// toolbar: {
			// 		// 	buttons: [
			// 		// 		{
			// 		// 			text: 'Custom Button',
			// 		// 			className: 'CustomButton',
			// 		// 			onClick: () => {
			// 		// 				console.log('custom button')
			// 		// 			}
			// 		// 		}
			// 		// 	]
			// 		// }
			// 		// video: {
			// 		// popper: {
			// 		// 	disableDraggable: true
			// 		// },
			// 		// chat: {
			// 		// 	popper: {
			// 		// 		disableDraggable: true,
			// 		// 		anchorElement: meetingSDKChatElement,
			// 		// 		placement: 'top'
			// 		// 	}
			// 		// }
			// 		// }
			// 	},
			// 	leaveUrl: `${process.env.NEXT_PUBLIC_MAIN_URL}/lms/${lessonId}`,
			// 	isSupportAV: true,
			// 	success: () => {
			// 		client.join({
			// 			signature: signature,
			// 			sdkKey: sdkKey,
			// 			sdkSecret: sdkSecret,
			// 			meetingNumber: meetingNumber,
			// 			password: meetingPassword,
			// 			userName: `${userName} (${email}) [${uniqueId}]`,
			// 			userEmail: email,
			// 			tk: registrantToken,
			// 			zak: zakToken,
			// 			success: (success) => {
			// 				console.log(success)
			// 			},
			// 			error: (error) => {
			// 				console.error('join', error)
			// 			}
			// 		})
			// 	},
			// 	error: (error) => {
			// 		console.error('init', error)
			// 	}
			// })
			ZoomMtg.init({
				leaveUrl: lessonId
					? `${process.env.NEXT_PUBLIC_MAIN_URL}/lms/${lessonId}`
					: process.env.NEXT_PUBLIC_MAIN_URL,
				success: (success) => {
					ZoomMtg.join({
						sdkKey: zoomSetting.key,
						signature: signature,
						meetingNumber: meetingNumber,
						passWord: meetingPassword,
						userName: `${userName} (${email}) [${uniqueId}]`,
						userEmail: email,
						// zak: zakToken, // the host's ZAK token
						success: (success) => {
							console.log(success)
						},
						error: (error) => {
							console.log(error)
						}
					})
				},
				error: (error) => {
					console.log(error)
				}
			})
		} catch (error) {
			console.log('--> startMeeting() error')
			console.error(error)
		}
	}

	if (!zoomSetting) {
		return (
			<p align='center'>
				The {lessonId ? 'webinar' : 'meeting'} doesn't have a Host attached
			</p>
		)
	}

	return (
		<>
			<Head>
				<link
					type='text/css'
					rel='stylesheet'
					href='https://source.zoom.us/2.10.1/css/bootstrap.css'
				/>
				<link
					type='text/css'
					rel='stylesheet'
					href='https://source.zoom.us/2.10.1/css/react-select.css'
				/>
			</Head>
			{/* <div className='row'>
				<div className='column'>
					<div id='zmmtg-root'>
						
					</div>
				</div>
				<div className='column'>
					<div id='meetingSDKChatElement'></div>
				</div>
			</div> */}
		</>
	)
}

export default ZoomMeeting
