import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Alert from '@/components/Alert'
import Btn from '@/components/Btn'
import DatePickField from '@/components/DatePickField'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import MaskedMobile from '@/components/MaskedMobile'
import authCheck from '@/snippets/authCheck'
import updateUserA from '@/snippets/auth/updateUserA'
import { baseUrl } from '@/context/constants'
import getGQLRequest from '@/snippets/getGQLRequest'
import AuthPage from '@/components/AuthPage'
// import InputField from '@/components/InputField'

const RegisterA = ({ userId, profile, genders, profileId }) => {
	const router = useRouter()
	const [redirect, setRedirect] = useState('')
	const [loading, setLoading] = useState(false)
	const [errors, setErrorMessages] = useState('')
	// const [idnumber, setIdnumber] = useState(
	//   profile?.idNumber ? profile.idNumber : ''
	// )
	const [dob, setDob] = useState(profile?.dob ? profile.dob : '')
	const [gender, setGender] = useState(
		profile?.gender ? profile.gender?.id : null
	)
	const [mobileNr, setMobileNr] = useState(
		profile?.mobileNr ? profile?.mobileNr : ''
	)

	useEffect(async () => {
		if (userId && profileId) {
			const routeTo = await authCheck({ userid: userId })

			if (routeTo.startsWith('..')) {
				setRedirect(`${routeTo}?firstLogin=true`)
			} else {
				setRedirect(routeTo)
			}
		} else {
			setRedirect('/')
		}
	}, [userId, profileId])

	useEffect(() => {
		if (redirect) {
			setLoading(false)
			router.push(redirect)
		}
	}, [redirect])

	const handleSubmit = async (event) => {
		event.preventDefault()
		setLoading(true)
		if (
			!dob ||
			// !idnumber ||
			!mobileNr ||
			!gender
		) {
			setErrorMessages('Some required fields are incomplete')
			setLoading(false)
			return
		}
		const currentDate = new Date()
		const submitDate = new Date(dob)
		const age = currentDate.getFullYear() - submitDate.getFullYear()
		if (age <= 13) {
			// 13 Year age limit
			setErrorMessages('Please provide your correct date of birth')
			setLoading(false)
			return
		}

		if (mobileNr.includes('_')) {
			setErrorMessages('Please provide your full cellphone number')
			setLoading(false)
			return
		}

		// if (idnumber.length < 6) {
		//   setErrorMessages('Please provide your full identity / passport number')
		//   setLoading(false)
		//   return
		// }

		setErrorMessages('')
		try {
			// let id = idnumber
			// if (idnumber.includes('_')) {
			//   id = idnumber.replaceAll('_', '')
			// }
			await updateUserA({
				profile: profile.id,
				dob: dob,
				mobileNr,
				gender
			})
			router.prefetch('/registerc')
			setRedirect('/registerc')
		} catch (err) {
			setErrorMessages(err)
			setLoading(false)
			return
		}
	}

	return (
		<>
			<Head>
				<title>Register Biological Info</title>
				<meta
					name='description'
					content='Register A Page'
				/>
			</Head>
			<AuthPage
				hasNavbar
				bgImage={`${baseUrl}/background2-h.png`}
				content={
					<div
						className='w-full h-screen p-8 overflow-x-hidden'
						style={{ marginTop: '72px' }}
					>
						<h1 className='justify-start mb-1 text-4xl font-bold leading-1'>
							General Information
						</h1>
						<div className='flex flex-row items-center text-xl'>
							<span className='mr-1.5'>Step</span>
							<span
								className='bg-themeColorMain text-white font-semibold mr-1.5'
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									textAlign: 'center',
									height: '1.5rem',
									maxHeight: '1.5rem',
									width: '1.5rem',
									maxWidth: '1.5rem',
									borderRadius: '50%'
								}}
							>
								1
							</span>{' '}
							<span className='mr-1.5'>of</span>
							<span
								className='font-semibold text-white bg-themeColorMain'
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									textAlign: 'center',
									height: '1.5rem',
									maxHeight: '1.5rem',
									width: '1.5rem',
									maxWidth: '1.5rem',
									borderRadius: '50%'
								}}
							>
								3
							</span>
						</div>
						<p className='my-2'>
							Finish your registration by completing the fields below. You'll be
							done in no time.
						</p>
						<form>
							<div className='mb-3'>
								{/* <InputField
									id='dob'
									placeholder='Date of birth (Required)'
									type='date'
									onChange={(event) =>
										Date.parse(event.target.value) >= 1577836800000
											? ''
											: setDob(event.target.value)
									}
								/> */}
								<DatePickField
									placeholder='Date of birth (Required)'
									onChange={(event) =>
										Date.parse(event.target.value) >= 1577836800000
											? ''
											: setDob(event.target.value)
									}
									value={dob}
								/>
							</div>
							<div className='mb-3'>
								<MaskedMobile
									required={true}
									setter={setMobileNr}
									value={mobileNr}
									placeholder='Cellphone Number'
								/>
							</div>
							<div className='mb-3'>
								<DefaultSelectNew
									options={genders}
									id='gender'
									name='gender'
									placeholder='Gender (Required)'
									valueSetter={setGender}
									value={gender}
									required
								/>
							</div>
						</form>
						<div className=''>
							<Alert error={errors} />
							<Btn
								label={loading ? 'Loading...' : 'Next'}
								onClickFunction={handleSubmit}
								color='bg-themeColorSecondary'
							/>
						</div>
					</div>
				}
				leftTitle={
					<span
						className='text-6xl font-bold text-white'
						style={{ marginTop: '72pt' }}
					>
						STEP 1
					</span>
				}
			/>
		</>
	)
}
export async function getServerSideProps(context) {
	const { userid, profile: profileId } = context.req.cookies
	if (profileId) {
		const { profile } = await getGQLRequest({
			endpoint: 'profile',
			fields: ' id,dob,gender{id},mobileNr',
			findOne: true,
			id: profileId
		})

		const { genders } = await getGQLRequest({
			endpoint: 'genders'
		})

		return {
			props: {
				userId: userid ? userid : null,
				profileId: profileId,
				profile: profile ? profile : null,
				genders: genders
			}
		}
	} else {
		return {
			props: {
				profileId: profileId ? profileId : null
			}
		}
	}
}

export default RegisterA
