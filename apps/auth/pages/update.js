import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { gql } from '@apollo/client'
import { baseUrl } from '@/context/constants'
import Alert from '@/components/Alert'
import Btn from '@/components/Btn'
import Checkbox from '@/components/Checkbox'
import InputField from '@/components/InputField'
import LogoOverlay from '@/components/LogoOverlay'
import { InfoIcon } from '@/components/SvgIcons/InfoIcon'
import MaskedMobile from '@/components/MaskedMobile'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import Overlay from '@/components/Overlay'
import getGQLRequest from '@/snippets/getGQLRequest'
import updateUserDetails from '@/snippets/auth/updateUserDetails'
import client from '@/api/apolloClient'
import DatePickField from '@/components/DatePickField'

export default function Update({ profile, grades, locations, genders }) {
	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)
	const [check, setCheck] = useState(false)
	const [userInput, setUserInput] = useState({
		dob: '',
		firstName: '',
		lastName: '',
		mobileNr: ''
	})
	const [grade, setGrade] = useState('')
	const [gender, setGender] = useState('')
	const [location, setLocation] = useState('')
	const [region, setRegion] = useState('')
	const [regions, setRegions] = useState([])
	const [school, setSchool] = useState('')
	const [schools, setSchools] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		if (!profile?.id) {
			router.push('/')
		}
	}, [])

	useEffect(() => {
		if (profile) {
			const validNameCharacters = /^[A-Za-z-' ]+$/
			setUserInput({
				dob: profile.dob,
				firstName: validNameCharacters.test(profile.firstName)
					? profile.firstName
					: '',
				lastName: profile.lastName,
				mobileNr: profile.mobileNr
			})
			setGender(profile?.gender?.id)
			setGrade(profile?.grades.length > 0 ? profile.grades[0].id : '')
			setLocation(profile?.provinces.length > 0 ? profile.provinces[0].id : '')
			setSchool(profile?.schools.length > 0 ? profile.schools[0].id : '')
			setRegion(
				profile?.schools.length > 0 ? profile.schools[0].district?.id : ''
			)
		}
	}, [])

	useEffect(async () => {
		if (location) {
			await getGQLRequest({
				endpoint: 'districts',
				where: `province:{id:${location}}`,
				stateSetter: setRegions
			})
		}
	}, [location])
	useEffect(async () => {
		if (region) {
			await getGQLRequest({
				endpoint: 'schools',
				where: `district:{id:${region}}`,
				stateSetter: setSchools
			})
		}
	}, [region])

	function isUnder18(dob) {
		const today = new Date()
		const birthDate = new Date(dob)
		let age = today.getFullYear() - birthDate.getFullYear()
		const m = today.getMonth() - birthDate.getMonth()

		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--
		}

		return age < 18
	}
	function isUnderAge(dob) {
		const today = new Date()
		const birthDate = new Date(dob)
		let age = today.getFullYear() - birthDate.getFullYear()
		const m = today.getMonth() - birthDate.getMonth()

		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--
		}

		return age < 15
	}

	const updateInput = (value, type) => {
		setUserInput({
			...userInput,
			[type]: value
		})
	}

	const updateUser = async () => {
		setError('')
		setLoading(true)
		if (
			!userInput.dob?.length ||
			!userInput.firstName?.length ||
			!userInput.lastName?.length ||
			!userInput.mobileNr?.length
		) {
			setError('All fields are required')
			router.reload()
			setLoading(false)
			return
		}
		if (isUnderAge(userInput.dob)) {
			setError('You are under age for our content')
			setLoading(false)
			return
		}
		if (!check && isUnder18(userInput.dob)) {
			setError('Permissions from your Parents/Guardian is required')
			setLoading(false)
			return
		}
		if (userInput.mobileNr.includes('_')) {
			setErrorMessages('Please provide your full cellphone number')
			setLoading(false)
			return
		}
		const { error: errorMsg } = await updateUserDetails({
			profileID: profile.id,
			userInput: userInput,
			grade: grade,
			location: location,
			school: school,
			gender: gender
		})
		if (errorMsg) {
			setError(errorMsg)
			setLoading(false)
			return
		}
		setLoading(false)
		router.push('../user/userdashboard')
		return
	}

	return (
		<div className='flex justify-between overflow-x-hidden min-h-svh g-0'>
			<div className='flex desktop:w-1/2 laptop:w-1/2'>
				<div className='relative flex items-center justify-center w-full desktop:h-screen laptop:h-screen'>
					<img
						src={`${baseUrl}/createDetails.jpg`}
						alt='Background Login Image'
						className='absolute object-cover w-full h-full'
					/>
					<div className='absolute inset-0 flex items-center justify-center'>
						<img
							src={`${baseUrl}/createDetails.png`}
							alt='Login Image'
							className='object-contain h-screen'
						/>
					</div>
				</div>
			</div>

			<div className='w-1/2 pt-6 mx-10 mobile:mx-4 desktop:pt-16 mobile:w-full'>
				<LogoOverlay />
				<div className='flex flex-row justify-between pt-4 desktop:pt-6'>
					<div className='justify-start text-3xl mobile:text-xl text-textColor'>
						<div className='flex flex-row '>
							<div>Account Details</div>
							<div>
								<InfoIcon
									onClick={() => setIsOpen(!isOpen)}
									className='w-6 h-6 mx-2 cursor-pointer'
								/>
							</div>
						</div>
					</div>
					<div className='flex flex-row justify-start text-textColor'>
						<Overlay
							isOpen={isOpen}
							onClose={() => setIsOpen(false)}
							title='Account Details'
							content={
								<>
									<p className='text-lg text-left text-black'>
										Account details are vital as they serve to identify,
										authenticate, and secure user accounts. They enable accurate
										tracking of transactions, facilitate communication, and
										support personalized experiences.
									</p>
									<p className='mt-4 text-lg text-left text-black'>
										Compliance with legal regulations, recovery processes, and
										preventing identity theft are additional reasons why
										maintaining up-to-date and secure account details is crucial
										for a safe and reliable online environment.
									</p>
								</>
							}
						/>
					</div>
				</div>
				<form
					autoComplete='on'
					className='flex mobile:flex-col desktop:flex-row laptop:flex-row'
				>
					<div className='w-1/2 mr-3 desktop:flex laptop:flex desktop:flex-col laptop:flex-col mobile:w-full'>
						<DatePickField
							id='dob'
							placeholder='Date of Birth'
							onChange={(e) => updateInput(e.target.value, 'dob')}
							value={userInput.dob}
							required={true}
						/>
						<InputField
							id='firstName'
							placeholder='First Name'
							type='text'
							value={userInput.firstName}
							onChange={(e) => updateInput(e.target.value, 'firstName')}
						/>
						<InputField
							id='surname'
							placeholder='Your Surname'
							type='text'
							value={userInput.lastName}
							onChange={(e) => updateInput(e.target.value, 'lastName')}
						/>
						<MaskedMobile
							onChange={(e) => updateInput(e.target.value, 'mobileNr')}
							value={userInput.mobileNr}
							placeholder='Cellphone Number'
						/>
						<DefaultSelectNew
							id='gender'
							name='Gender'
							options={genders}
							valueSetter={setGender}
							value={gender}
							placeholder='Gender'
						/>
					</div>
					<div className='desktop:flex laptop:flex desktop:flex-col laptop:flex-col w-1/2 desktop:mt-1 laptop:mt-1 mobile:-mt-1.5 mobile:w-full'>
						<DefaultSelectNew
							id='grade'
							name='Grade'
							options={grades}
							valueSetter={setGrade}
							value={grade}
							placeholder='Grade'
						/>
						<DefaultSelectNew
							id='location'
							name='Location'
							options={locations}
							valueSetter={setLocation}
							value={location}
							placeholder='Location'
						/>
						<DefaultSelectNew
							id='schoolRegion'
							name='School Region'
							options={regions}
							valueSetter={setRegion}
							value={region}
							placeholder='School Region'
						/>
						<DefaultSelectNew
							id='school'
							name='School'
							options={schools}
							valueSetter={setSchool}
							value={school}
							placeholder='School'
						/>{' '}
					</div>
				</form>
				{isUnder18(userInput.dob) && (
					<div className='flex flex-row h-10 mt-3 text-left align-middle'>
						<Checkbox
							value={check}
							setter={setCheck}
						/>
						<div className='text-sm mt-0.5 text-textColor '>
							<span>I have permission from my</span>
							<Link
								href='/'
								passHref
							>
								<a
									// target='_blank'
									rel='noopener noreferrer'
								>
									<span className='ml-1 font-bold underline cursor-pointer text-textHeading'>
										Parents/ Guardian
									</span>
								</a>
							</Link>
						</div>
					</div>
				)}
				<div className=''>
					<Alert error={error} />
					<div
						className={`${
							isUnder18(userInput.dob) ? '' : 'mt-3 mobile:mt-4'
						} mobile:justify-center mobile:flex mobile:mb-4`}
					>
						<Btn
							onClickFunction={updateUser}
							color='bg-themeColorMain'
							label={loading ? 'Loading...' : 'Completed'}
							className='mobile:px-8'
							disabled={loading}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
export async function getServerSideProps(context) {
	const { userid, profile: profileId } = context.req.cookies

	if (profileId) {
		const { data } = await client.query({
			query: gql`query GetUpdateRequest {profile(id: ${profileId}) {id,dob,gender {id,name},mobileNr,firstName,lastName,grades {id,name},provinces {id,name},schools {id,name,district {id,name}}},genders{id,name},grades{id,name},provinces{id,name}}`,
			fetchPolicy: 'network-only'
		})
		const { profile, genders, grades, provinces } = data

		return {
			props: {
				userId: userid ? userid : null,
				profile: profile ? profile : null,
				genders: genders,
				grades: grades ? grades : null,
				locations: provinces ? provinces : null
			}
		}
	} else {
		return {
			props: {
				profile: null,
				genders: [{ id: 0, name: '' }],
				grades: [{ id: 0, name: '' }],
				locations: [{ id: 0, name: '' }]
			}
		}
	}
}
