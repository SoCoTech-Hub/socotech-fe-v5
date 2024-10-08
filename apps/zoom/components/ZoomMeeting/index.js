import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Btn from '@/components/Btn'

const ZoomMeeting = () => {
	const router = useRouter()
	const { meetingLink, lessonId } = router.query
	const [meetingNumber, setMeetingNumber] = useState(null)
	const [meetingPassword, setMeetingPassword] = useState(null)

	useEffect(() => {
		if (meetingLink) {
			const url = new URL(meetingLink)
			setMeetingNumber(url.pathname.replace(/[^0-9.]+/, ''))
			setMeetingPassword(url.searchParams.get('pwd'))
		}
	}, [meetingLink])

	if (!meetingLink) {
		return <p align='center'>Please, provide a valid meeting link!</p>
	}

	return (
		<div>
			{lessonId ? (
				<Btn
					label='Join Webinar'
					link={`/webinar/${lessonId}/${meetingNumber}/${meetingPassword}`}
					onClickFunction={() => {}}
					color='bg-themeColorMain'
				/>
			) : (
				<Btn
					label='Join Meeting'
					link={`/meeting/${meetingNumber}/${meetingPassword}`}
					onClickFunction={() => {}}
					color='bg-themeColorMain'
				/>
			)}
		</div>
	)
}

export default ZoomMeeting
