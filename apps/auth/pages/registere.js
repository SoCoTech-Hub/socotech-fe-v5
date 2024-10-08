import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Alert from '@/components/Alert'
import AuthNavbar from '@/components/AuthNavbar'
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
import CssStepper from '@/components/CssStepper'
import { baseUrl } from '@/context/constants'

const RegisterE = ({ userId, profile, userRelations }) => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [userRelation, setUserRelation] = useState(
		profile?.kins ? profile?.kins[0]?.userRelation?.id : null
	)
	const [firstName, setFirstName] = useState(
		profile?.kins ? profile.kins[0]?.firstName : null
	)
	const [lastName, setLastName] = useState(
		profile?.kins ? profile.kins[0]?.lastName : null
	)
	const [mobileNr, setMobileNr] = useState(
		profile?.kins ? profile.kins[0]?.mobileNr : null
	)
	// const [workNr, setWorkNr] = useState(userProfile?.kins ? userProfile.kins[0]?.workNr : null);
	// const [idnumber, setIdnumber] = useState(userProfile?.kins ? userProfile.kins[0]?.idnumber : null);
	// const [title, setTitle] = useState(userProfile?.kins ? userProfile.kins[0]?.title : null);
	const [email, setEmail] = useState(
		profile?.kins ? profile.kins[0]?.email : null
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
		if (!firstName || !lastName || !mobileNr || !userRelation || !email) {
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
				firstName,
				lastName,
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
			<div className=''>
				<div className='fixed w-full'>
					<AuthNavbar />
				</div>

				<div className='flex flex-wrap g-0'>
					<div className='w-1/2 mt-10 mobile:w-full bg-registerE desktop:block'>
						<div className='flex items-center w-full'>
							<img
								src={`${baseUrl}/reg-step-3.jpg`}
								alt='Registration Step 3'
								className='object-scale-down'
							/>
						</div>
					</div>
					<div className='w-full bg-compBg desktop:w-1/2 laptop:w-1/2 mobile:h-2/3 mobile:mb-4'>
						<div className='flex items-center desktop:mx-4 laptop:mx-4 mobile:mx-1 desktop:h-screen laptop:h-screen place-content-center'>
							<div className='w-5/6 mobile:w-10/12 desktop:my-0 desktop:pt-10 laptop:pt-10 mobile:pt-5'>
								<div className='mb-4 text-4xl desktop:mt-10 laptop:mt-10 mobile:mt-5 text-textColor mobile:block'>
									Next of Kin
									<br />
									Information
								</div>

								<div className='w-auto mb-4 text-textColor'>
									Finish your registration by completing the fields below. Final
									Step.
								</div>

								<form>
									<DefaultSelectNew
										options={userRelations}
										id='relationship'
										name='relationship'
										placeholder='Relationship (Required)'
										value={userRelation}
										valueSetter={setUserRelation}
										required
									/>
									<InputField
										id='firstName'
										placeholder='Name of parent or guardian (Required)'
										onChange={(event) => setFirstName(event.target.value)}
										value={firstName}
										autoComplete='off'
									/>
									<InputField
										id='lastName'
										placeholder='Surname of parent or guardian (Required)'
										onChange={(event) => setLastName(event.target.value)}
										value={lastName}
										autoComplete='off'
									/>
									<MaskedMobile
										required={true}
										setter={setMobileNr}
										value={mobileNr}
										placeholder='Cellphone Number of parent or guardian'
									/>
									<InputField
										id='email'
										// icon="ti-email"
										placeholder='Email Address of parent of guardian (required)'
										type='email'
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										autoComplete='off'
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
