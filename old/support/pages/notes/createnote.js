import React from 'react'
import UserCover from '@/components/UserCover'
import NewNote from '@/components/NewNote'
import getGQLRequest from '@/snippets/getGQLRequest'
import { parseCookies } from '@/snippets/parseCookies'
import { SEO } from '@/components/SeoHead'
const seo = {
	title: 'Create Note',
	description: 'Effortlessly create notes with Topic!'
}
const createnote = ({ subjects, profileId }) => {
	return (
		<div className='desktop:mb-4 laptop:mb-4 mobile:mb-10 col row'>
			<SEO
				title={seo.title}
				description={seo.description}
			/>
			<div className='space-y-10 desktop:gx-5 desktop:gy-4 mobile:space-y-3'>
				<UserCover />
				<NewNote
					subjects={subjects}
					profileId={profileId}
				/>
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
