import { useEffect, useState } from 'react'
import {
	AboutGradeIcon,
	AboutLocationIcon,
	AboutSchoolIcon
} from '@/components/SvgIcons'
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
		if (profile?.schools) {
			await getGQLRequest({
				endpoint: `school`,
				id: profile.schools[0].id,
				stateSetter: setSchool,
				findOne: true,
				fields: `id,name,province{name},district{name}`
			})
		}
	}, [profile])

	return (
		<div>
			<div className='bg-compBg rounded-2xl shadow-menu'>
				{profile?.about ? (
					<>
						<div className='p-3'>
							<div className='text-lg font-bold text-textColor'>About</div>
							<div className='text-textColor'>{profile?.about}</div>
						</div>
						<div className='border-b-2 border-gray-200'></div>
					</>
				) : (
					<></>
				)}
				<div className='p-3'>
					{profile?.schools?.length ? (
						<>
							<div className=''>
								<InfoBox
									icon={<AboutSchoolIcon className='w-10' />}
									info={school?.name}
								/>
							</div>
							<div className='my-4'>
								<InfoBox
									icon={<AboutLocationIcon className='w-10' />}
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
								icon={<AboutGradeIcon className='w-10' />}
								info={`Grade ${profile?.grades[0]?.name}`}
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
