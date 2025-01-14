// import React from 'react'
// import dynamic from 'next/dynamic'
// import { useRouter } from 'next/router'
// import TimeTracks from '@acme/snippets/functions/zoom/timeTracks'

// const FullScreenMeeting = dynamic(
// 	() => import('@acme/ui/Zoom/FullScreenMeeting'),
// 	{ ssr: false, loading: () => <p align='center'>Loading Zoom Webinar...</p> }
// )

// const Meeting = () => {
// 	const router = useRouter()
// 	const { lessonId, meetingNumber, meetingPassword, participantID } =
// 		router.query
// 	return (
// 		<div className='col row'>
// 			<TimeTracks
// 				lesson={lessonId}
// 				participantID={participantID}
// 			/>
// 			<FullScreenMeeting
// 				lessonId={lessonId}
// 				meetingNumber={meetingNumber}
// 				meetingPassword={meetingPassword}
// 			/>
// 		</div>
// 	)
// }

// export default Meeting
// import React from 'react'
// import dynamic from 'next/dynamic'
// import { useRouter } from 'next/router'
// import TimeTracks from '@/snippets/timeTracks'

// const FullScreenMeeting = dynamic(
// 	() => import('@/components/FullScreenMeeting'),
// 	{ ssr: false, loading: () => <p align='center'>Loading Zoom Meeting...</p> }
// )

// const Meeting = () => {
// 	const router = useRouter()
// 	const { meetingNumber, meetingPassword, participantID } = router.query

// 	return (
// 		<div className='col row'>
// 			<TimeTracks
// 				meetingId={meetingNumber}
// 				participantID={participantID}
// 			/>
// 			<FullScreenMeeting
// 				meetingNumber={meetingNumber}
// 				meetingPassword={meetingPassword}
// 			/>
// 		</div>
// 	)
// }

// export default Meeting

import React from "react";

import { MeetingView } from "@acme/ui";

export default function MeetingPage({
  params,
}: {
  params: { meetingNumber: string; meetingPassword: string };
}) {
  return (
    <div className="container mx-auto p-4">
      <MeetingView
        meetingId={params.meetingNumber}
        password={params.meetingPassword}
      />
    </div>
  );
}
