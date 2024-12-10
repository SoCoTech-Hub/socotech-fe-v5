import { useEffect, useState } from 'react'
import InfoBox from './InfoBox'
import getGQLRequest from '@/snippets/getGQLRequest'
import { profileId } from '@/context/constants'

const index = () => {
	const [profile, setProfile] = useState([])
	const [school, setSchool] = useState([])

	useEffect(async () => {
		if (profileId) {
			await getGQLRequest({
				endpoint: `profile`,
				id: profileId,
				stateSetter: setProfile,
				findOne: true,
				fields: `id,schools{id},about,grades{name}`
			})
		}
	}, [profileId])

	useEffect(async () => {
		if (profile?.schools?.length) {
			await getGQLRequest({
				endpoint: `school`,
				id: profile.schools[0]?.id,
				stateSetter: setSchool,
				findOne: true,
				fields: `id,name,province{name},district{name}`
			})
		}
	}, [profile])

	return (
		<div>
			<div className='rounded-lg shadow-menu bg-compBg mobile:flex'>
				{profile?.about ? (
					<>
						<div className='desktop:p-3 laptop:p-3 mobile:p-2.5 mobile:w-2/3'>
							<div className='mb-2 text-textColor'>About</div>
							<div className='text-textColor text-xs'>{profile?.about}</div>
						</div>
						<div className='border-b-2 mobile:my-3 mobile:border-gray-500 mobile:border-r-2 border-gray-200'></div>
					</>
				) : (
					<></>
				)}
				<div className='desktop:p-3 laptop:p-3 mobile:p-4'>
					{profile?.schools?.length ? (
						<>
							<div className=''>
								<InfoBox
									icon={'/user/user_school.svg'}
									info={school?.name}
								/>
							</div>
							<div className='my-4'>
								<InfoBox
									icon={'/user/user_place.svg'}
									info={`${school?.province?.name}, ${
										school?.district?.name ? school?.district.name : ''
									}`}
								/>
							</div>
						</>
					) : (
						<></>
					)}
					{profile?.grades ? (
						<div className=''>
							<InfoBox
								icon={'/user/user_grade.svg'}
								info={`Grade ${profile?.grades
									.map((grade) => grade.name)
									.flat()}`}
							/>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	)
}

export default index
