import React from 'react'
import Head from 'next/head'
import UserCover from '@/components/UserCover'
import NewNote from '@/components/NewNote'
import { parseCookies } from '@/snippets/parseCookies'
import getGQLRequest from '@/snippets/getGQLRequest'
const seo = {
	title: 'Topic - Note Display',
	description: 'Optimize your notes with Topic!',
	image: 'https://lms.topic.co.za/support/logo.png',
	url: 'https://topic.co.za'
}
const notesdisplay = ({ subjects, note, profileId }) => (
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
				{note ? (
					<NewNote
						subjects={subjects}
						profileId={profileId}
						note={note}
						edit={true}
					/>
				) : (
					<NewNote
						subjects={subjects}
						profileId={profileId}
						edit={true}
					/>
				)}
			</div>
		</div>
	</div>
)

export async function getServerSideProps(context) {
	const { id } = context.query
	const cookies = parseCookies(context.req)
	const profileId = cookies.profile
	const { subjects } = await getGQLRequest({
		endpoint: `subjects`,
		fields: `id,name`
	})
	const { notes } = await getGQLRequest({
		endpoint: `notes`,
		where: `id:${id},profile:{id:${profileId}}`,
		fields: `id,name,subject{id,name},read,note,created_at`
	})

	return {
		props: {
			subjects: subjects,
			note: notes ? notes[0] : [],
			profileId: profileId ? profileId : null
		}
	}
}

export default notesdisplay
