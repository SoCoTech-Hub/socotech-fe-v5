import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Alert from '@/components/Alert'
import AuthNavbar from '@/components/AuthNavbar'
import Btn from '@/components/Btn'
import DatePickField from '@/components/DatePickField'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import MaskedMobile from '@/components/MaskedMobile'
import CssStepper from '@/components/CssStepper'
import authCheck from '@/snippets/authCheck'
import updateUserA from '@/snippets/auth/updateUserA'
import { baseUrl } from '@/context/constants'
import getGQLRequest from '@/snippets/getGQLRequest'

const RegisterA = ({ userId, profile, genders,profileId }) => {
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
	}, [userId,profileId])

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
		if (Date.parse(dob) >= 1577836800000) {
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
			router.push('/registerc')			
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
			<div className=''>
				<div className='fixed w-full'>
					<AuthNavbar />
				</div>
				<div className='flex flex-wrap g-0'>
					<div className='w-1/2 mt-10 mobile:w-full bg-registerA desktop:block mobile:mt-12'>
						<div className='flex items-center w-full'>
							<img
								src={`${baseUrl}/reg-step-1.jpg`}
								alt='Registration Step 1'
								className='object-scale-down'
							/>
						</div>
					</div>
					<div className='w-full bg-compBg desktop:w-1/2 laptop:w-1/2 mobile:h-2/3 mobile:mb-4'>
						<div className='flex items-center desktop:mx-4 laptop:mx-4 mobile:mx-1 desktop:h-screen laptop:h-screen place-content-center'>
							<div className='w-5/6 pt-10 mobile:w-10/12 desktop:my-0 mobile:pt-5'>
								<div className='mt-10 mb-4 text-4xl text-textColor mobile:block mobile:mt-5 mobile:mb-2 mobile:text-3xl'>
									General <br />
									Information
								</div>
								<div className='w-auto mb-4 text-textColor mobile:text-sm'>
									Finish your registration by completing the{' '}
									<span className='font-bold'>Biological Info</span> fields
									below. You'll be done in no time.
								</div>
								<form>
									<DatePickField
										placeholder='Date of birth (Required)'
										onChange={(event) =>
											Date.parse(event.target.value) >= 1577836800000
												? ''
												: setDob(event.target.value)
										}
										value={dob}
									/>
									<MaskedMobile
										required={true}
										setter={setMobileNr}
										value={mobileNr}
										placeholder='Cellphone Number'
									/>
									<DefaultSelectNew
										options={genders}
										id='gender'
										name='gender'
										placeholder='Gender (Required)'
										valueSetter={setGender}
										value={gender}
										required
									/>
								</form>
								<div className='p-0 mt-4 text-left col-sm-12'>
									<div className=''>
										<Alert error={errors} />
										<Btn
											label={loading ? 'Loading...' : 'Next'}
											onClickFunction={handleSubmit}
											color='bg-themeColorMain text-black w-full'
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export async function getServerSideProps(context) {
	const { userid, profile: profileId } = context.req.cookies
if(profileId){
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
			profileId:  profileId,
			profile: profile ? profile : null,
			genders: genders
		}
	}}else{
		return {
			props: {
				profileId:  profileId,
			}
		}
	}
}

export default RegisterA
