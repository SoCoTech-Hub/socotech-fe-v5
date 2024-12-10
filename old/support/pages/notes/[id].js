import React from 'react'
import UserCover from '@/components/UserCover'
import NewNote from '@/components/NewNote'
import { parseCookies } from '@/snippets/parseCookies'
import getGQLRequest from '@/snippets/getGQLRequest'
import { SEO } from '@/components/SeoHead'
const seo = {
	title: 'Note Display',
	description: 'Optimize your notes with Topic!'
}
const notesdisplay = ({ subjects, note, profileId }) => (
	<div className='desktop:mb-4 laptop:mb-4 mobile:mb-10 col row'>
		<SEO
			title={seo.title}
			description={seo.description}
		/>
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
