import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import TimeTracks from '@/snippets/timeTracks'

const FullScreenMeeting = dynamic(
	() => import('@/components/FullScreenMeeting'),
	{ ssr: false, loading: () => <p align='center'>Loading Zoom Meeting...</p> }
)

const Meeting = () => {
	const router = useRouter()
	const { meetingNumber, meetingPassword, participantID } = router.query
const seo = {
	title: `Topic - Zoom Meeting - ${meetingNumber}`,
	description: `Zoom Meeting - ${meetingNumber}`,
	image: 'https://lms.topic.co.za/zoom/logo.png',
	url: 'https://topic.co.za'
}
	return (
		<div className='col row'>
			<Head>
				<title>{seo.title}</title>
				<meta
					name='title'
					content={seo.title}
				/>
				<meta
					name='description'
					content={seo.description}
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content={seo.url}
				/>
				<meta
					property='og:title'
					content={seo.title}
				/>
				<meta
					property='og:description'
					content={seo.description}
				/>
				<meta
					property='og:image'
					content={seo.image}
				/>
				<meta
					property='twitter:card'
					content='summary_large_image'
				/>
				<meta
					property='twitter:url'
					content={seo.url}
				/>
				<meta
					property='twitter:title'
					content={seo.title}
				/>
				<meta
					property='twitter:description'
					content={seo.description}
				/>
				<meta
					property='twitter:image'
					content={seo.image}
				/>
			</Head>
			<TimeTracks
				meetingId={meetingNumber}
				participantID={participantID}
			/>
			<FullScreenMeeting
				meetingNumber={meetingNumber}
				meetingPassword={meetingPassword}
			/>
		</div>
	)
}

export default Meeting
