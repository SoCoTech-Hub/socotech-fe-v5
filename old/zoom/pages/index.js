import React from "react"
import Head from "next/head"
import dynamic from "next/dynamic"

const ZoomMeeting = dynamic(() => import("@/components/ZoomMeeting"), {
  ssr: false,
  loading: () => <p align="center">Loading Zoom Meeting...</p>,
})

const Home = () => {
	const seo = {
		title: 'Topic - Zoom Meeting',
		description: 'Zoom Meeting - Index!',
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
			<ZoomMeeting />
		</div>
	)
}

export default Home
