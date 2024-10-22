import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Alert from '@/components/Alert'
import Btn from '@/components/Btn'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import InputField from '@/components/InputField'
import MaskedMobile from '@/components/MaskedMobile'
import authCheck from '@/snippets/authCheck'
import validateEmail from '@/snippets/auth/validateEmail'
import updateUserE from '@/snippets/auth/updateUserE'
import { parseCookies } from '@/snippets/parseCookies'
import getGQLRequest from '@/snippets/getGQLRequest'
import Head from 'next/head'
import { baseUrl } from '@/context/constants'
import AuthPage from '@/components/AuthPage'

const RegisterE = ({ userId, profile, userRelations }) => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [userRelation, setUserRelation] = useState(
		profile?.kins ? profile?.kins[0]?.userRelation?.id : null
	)
	const [fullName, setFullName] = useState(
		profile?.kins ? profile.kins[0]?.firstName : ''
	)
	// const [lastName, setLastName] = useState(
	// 	profile?.kins ? profile.kins[0]?.lastName : ''
	// )
	const [mobileNr, setMobileNr] = useState(
		profile?.kins ? profile.kins[0]?.mobileNr : ''
	)
	// const [workNr, setWorkNr] = useState(userProfile?.kins ? userProfile.kins[0]?.workNr : null);
	// const [idnumber, setIdnumber] = useState(userProfile?.kins ? userProfile.kins[0]?.idnumber : null);
	// const [title, setTitle] = useState(userProfile?.kins ? userProfile.kins[0]?.title : null);
	const [email, setEmail] = useState(
		profile?.kins ? profile.kins[0]?.email : ''
	)

	const [redirect, setRedirect] = useState('')
	const [errors, setErrorMessages] = useState('')
	useEffect(async () => {
		if (userId) {
			const routeTo = await authCheck({ userid: userId })

			if (routeTo.startsWith('..')) {
				setRedirect(`${routeTo}?firstLogin=true`)
			} else {
				setRedirect(routeTo)
			}
		} else {
			setRedirect('/')
		}
	}, [userId])

	useEffect(() => {
		if (redirect) {
			setLoading(false)
			router.push(redirect)
		}
	}, [redirect])

	const handleSubmit = async (event) => {
		event.preventDefault()
		setLoading(true)
		setErrorMessages('')
		if (!fullName || !mobileNr || !userRelation || !email) {
			setErrorMessages('Some required fields are incomplete')
			setLoading(false)
			return
		}
		if (mobileNr.includes('_')) {
			setErrorMessages(
				'Please provide your full parent or guardian cellphone number'
			)
			setLoading(false)
			return
		}
		if (!validateEmail({ email: email })) {
			setErrorMessages('You have entered an invalid email address')
			setLoading(false)
			return
		}
		try {
			await updateUserE({
				parentId: profile?.kins[0]?.id,
				profileId: profile.id,
				firstName: fullName,
				// lastName,
				mobileNr,
				// workNr,
				// idnumber,
				// title,
				email,
				userRelation
			})
		} catch (err) {
			setErrorMessages(err)
			setLoading(false)
		}
		setRedirect('../user')
	}
	return (
		<>
			<Head>
				<title>Register Parent/Guardian Info</title>
				<meta
					name='description'
					content='Register E Page'
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
							Parent(s)/Guardian/Siblings
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
								3
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
							Finish your registration by completing the fields below.
						</p>
						<form>
							<div className='mb-3'>
								<DefaultSelectNew
									options={userRelations}
									id='relationship'
									name='relationship'
									placeholder='Relationship (Required)'
									value={userRelation}
									valueSetter={setUserRelation}
									required
								/>
							</div>

							<div className='mb-3'>
								<InputField
									id='fullName'
									placeholder='Name and surname (Required)'
									onChange={(event) => setFullName(event.target.value)}
									value={fullName}
									autoComplete={false}
								/>
							</div>

							{/* 
							<div className='mb-3'>
							<InputField
										id='lastName'
										placeholder='Surname of parent or guardian (Required)'
										onChange={(event) => setLastName(event.target.value)}
										value={lastName}
										autoComplete={false}
									/> 
							</div>
									*/}
							<div className='mb-3'>
								<MaskedMobile
									required={true}
									setter={setMobileNr}
									value={mobileNr}
									placeholder='Cellphone Number of parent or guardian'
									autoComplete={false}
								/>
							</div>

							<div className='mb-3'>
								<InputField
									id='email'
									// icon="ti-email"
									placeholder='Email Address of parent of guardian (required)'
									type='email'
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									autoComplete={false}
								/>
							</div>
						</form>
						<div className=''>
							<div className=''>
								<Alert error={errors} />
								<Btn
									label={loading ? 'Loading...' : 'Next'}
									onClickFunction={handleSubmit}
									color='bg-themeColorSecondary'
								/>
							</div>
						</div>
					</div>
				}
				leftTitle={
					<span
						className='text-6xl font-bold text-white'
						style={{ marginTop: '72pt' }}
					>
						STEP 3
					</span>
				}
			/>
		</>
	)
}

export async function getServerSideProps(context) {
	const cookies = parseCookies(context.req)
	const userId = cookies.userid
	const profileId = cookies.profile
	const { profile } = await getGQLRequest({
		endpoint: `profile`,
		findOne: true,
		id: profileId,
		fields: `id,firstName,lastName,idNumber,uniqueId,dob,mobileNr,examNumber,serialNumber,imei,voucher{name},
    gender{id,name},profilePic{url},provinces{id,name,slug},schools{id,name,district {id,name}},grades{id,name},
    addresses{id,addressLine1,addressLine2,contactNr,town,province{id,name}},kins{id,firstName,lastName,mobileNr,email,userRelation{id, name}}`
	})
	const { userRelations } = await getGQLRequest({ endpoint: `userRelations` })

	return {
		props: {
			userId: userId ? userId : null,
			profile: profile ? profile : null,
			userRelations: userRelations
		}
	}
}

export default RegisterE
