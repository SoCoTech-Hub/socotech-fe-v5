import React from 'react'
import Head from 'next/head'
import UserCover from '@/components/UserCover'
import NewNote from '@/components/NewNote'
import getGQLRequest from '@/snippets/getGQLRequest'
import { parseCookies } from '@/snippets/parseCookies'
const seo = {
	title: 'Topic - Create Note',
	description: 'Effortlessly create notes with Topic!',
	image: 'https://lms.topic.co.za/support/logo.png',
	url: 'https://topic.co.za'
}
const createnote = ({ subjects, profileId }) => {
	return (
		<div className='desktop:mb-4 laptop:mb-4 mobile:mb-10 col row'>
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
			<div className='space-y-10 desktop:gx-5 desktop:gy-4 mobile:space-y-3'>
				<div>
					<UserCover />
				</div>
				<div>
					<NewNote
						subjects={subjects}
						profileId={profileId}
					/>
				</div>
			</div>
		</div>
	)
}
export async function getServerSideProps(context) {
	const cookies = parseCookies(context.req)
	const profileId = cookies.profile
	const { subjects } = await getGQLRequest({
		endpoint: `subjects`,
		fields: `id,name`
	})

	return {
		props: {
			subjects: subjects,
			profileId: profileId
		}
	}
}

export default createnote
