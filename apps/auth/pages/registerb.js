import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Btn from '@/components/Btn'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import InputField from '@/components/InputField'
import authCheck from '@/snippets/authCheck'
import updateUserB from '@/snippets/auth/updateUserB'
import Alert from '@/components/Alert'
import { parseCookies } from '@/snippets/parseCookies'
import getGQLRequest from '@/snippets/getGQLRequest'
import Head from 'next/head'
import { baseUrl } from '@/context/constants'
import AuthPage from '@/components/AuthPage'

const RegisterB = ({ userId, profile, provinces }) => {
	const router = useRouter()
	const [redirect, setRedirect] = useState('')
	const [loading, setLoading] = useState(false)

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

	const [errors, setErrorMessages] = useState('')

	const [addressLine1, setAddressLine1] = useState(
		profile?.addresses ? profile?.addresses[0]?.addressLine1 : ''
	)
	const [addressLine2, setAddressLine2] = useState(
		profile?.addresses ? profile?.addresses[0]?.addressLine2 : ''
	)
	const [town, setTown] = useState(
		profile?.addresses ? profile?.addresses[0]?.town : ''
	)
	// const [postal_code, setPostalCode] = useState(userProfile?.addresses ? userProfile?.addresses[0]?.postalCode : "")
	// const [country, setCountry] = useState(userProfile?.addresses ? userProfile?.addresses[0]?.country : null)
	const [province, setProvince] = useState(
		profile?.addresses ? profile?.addresses[0]?.province?.id : null
	)
	const [mobileNr, setMobileNr] = useState(
		profile?.addresses ? profile?.addresses[0]?.contactNr : ''
	)

	const handleSubmit = async (event) => {
		event.preventDefault()
		setLoading(true)
		if (!addressLine1 || !town || !province || !mobileNr) {
			setErrorMessages('Some required fields are incomplete')
			setLoading(false)
			return
		}
		if (mobileNr.includes('_')) {
			setErrorMessages('Please provide your full cellphone number')
			setLoading(false)
			return
		}

		setErrorMessages('')
		try {
			await updateUserB({
				profileId: profile.id,
				addressId: profile?.addresses ? profile?.addresses[0]?.id : '',
				addressLine1,
				addressLine2,
				town,
				province,
				mobileNr
			})
			router.push('/registerc')
		} catch (err) {
			setErrorMessages(err)
			return
		}
	}

	return (
		<>
			<Head>
				<title>Register Contact Info</title>
				<meta
					name='description'
					content='Register B Page'
				/>
			</Head>
			<AuthPage
				hasNavbar
				bgImage={`${baseUrl}/background2-h.png`}
				content={
					<div
						className='w-full p-8 overflow-x-hidden h-screen'
						style={{ marginTop: '72px' }}
					>
						<h1 className='justify-start text-4xl mb-1 font-bold leading-1'>
							Contact Information
						</h1>
						<div className='text-xl flex flex-row items-center'>
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
								2
							</span>{' '}
							<span className='mr-1.5'>of</span>
							<span
								className='font-semibold bg-themeColorMain text-white'
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
								5
							</span>
						</div>
						<p className='my-2'>
							Finish your registration by completing the fields below. You'll be
							done in no time.
						</p>
						<form>
							<div className='mb-3'>
								<InputField
									id='addressLine1'
									placeholder='Address line 1: House number and street name (Required)'
									onChange={(event) => setAddressLine1(event.target.value)}
									value={addressLine1}
								/>
							</div>
							<div className='mb-3'>
								<InputField
									id='addressLine2'
									placeholder='Address line 2: Suburb can come here'
									onChange={(event) => setAddressLine2(event.target.value)}
									value={addressLine2}
								/>
							</div>
							<div className='mb-3'>
								<DefaultSelectNew
									options={provinces}
									id='province'
									name='province'
									placeholder='Province (Required)'
									value={province}
									valueSetter={setProvince}
									required
								/>
							</div>
							<div className='mb-3'>
								<InputField
									id='town'
									placeholder='City or Town (Required)'
									onChange={(event) => setTown(event.target.value)}
									value={town}
								/>
							</div>
							{/* <DefaultSelectNew
                    options={countries}
                    id="country"
                    name="country"
                    placeholder="Country (Required)"
                    value={country}
                    valueSetter={setCountry}
                    required
                  /> */}

							{/* <MaskedMobile
										required={true}
										setter={setMobileNr}
										value={mobileNr}
										placeholder='Cellphone Number'
									/> */}
						</form>
						<div className='p-0 mt-4 text-left col-sm-12'>
							<div className=''>
								<Alert error={errors} />
								<Btn
									label={loading ? 'Loading...' : 'Next'}
									onClickFunction={handleSubmit}
									color='bg-themeColorMain'
									textColor='text-white'
								/>
							</div>
						</div>
					</div>
				}
				leftTitle={
					<span
						className='text-white font-bold text-6xl'
						style={{ marginTop: '72pt' }}
					>
						STEP 2
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
    addresses{id,addressLine1,addressLine2,contactNr,town,province{id,name}},kins{id,firstName,lastName,mobileNr,userRelation{id, name}}`
	})
	const { provinces } = await getGQLRequest({ endpoint: `provinces` })

	return {
		props: {
			userId: userId ? userId : null,
			profile: profile ? profile : null,
			provinces: provinces ? provinces : null
		}
	}
}

export default RegisterB
