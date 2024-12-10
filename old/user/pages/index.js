import { useEffect, useState } from 'react'
import WelcomeMessage from '@/components/WelcomeMessage'
import ProfileSelector from '@/components/ProfileSelector'
import getGQLRequest from '@/snippets/getGQLRequest'
import ProfileUserSelector from '@/components/ProfileUserSelector'
import { profileId, userName } from '@/context/constants'
import { SEO } from '@/components/SeoHead'

const Home = () => {
	const [value, setValue] = useState(0)
	const [profile, setProfile] = useState(0)

	useEffect(async () => {
		if (profileId) {
			await getGQLRequest({
				endpoint: `profile`,
				stateSetter: setProfile,
				findOne: true,
				id: profileId,
				fields: `id,firstName,lastName,idNumber,dob,mobileNr,imei,serialNumber,grades{id},schools{id,name,district{id,name},province{id,name}},gender{id},addresses{id,addressLine1,addressLine2,town,province{id,name}},kins{id,firstName,lastName,mobileNr,userRelation{id,name}}`
			})
		}
	}, [profileId])

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}
	const seo = {
		title: 'Topic - User Home Page',
		description: 'View and update your personalized User Home Page!',
		image: 'https://lms.topic.co.za/user/logo.png',
		url: 'https://topic.co.za'
	}
	return (
		<div className='col row'>
			<SEO
				title={seo.title}
				description={seo.description}
				image={seo.image}
				url={seo.url}
			/>
			<div className='mobile:gy-0 mobile:space-y-0'>
				<div className='mobile:hidden'>
					<WelcomeMessage userName={userName} />
				</div>

				<div className=''>
					<ProfileUserSelector
						value={value}
						handleChange={handleChange}
					/>
				</div>

				<div className=''>
					<ProfileSelector
						user={profile}
						value={value}
					/>
				</div>
			</div>
		</div>
	)
}

export default Home
