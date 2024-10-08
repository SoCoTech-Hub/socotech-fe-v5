import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AuthNavbar from '@/components/AuthNavbar'
import Btn from '@/components/Btn'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import InputField from '@/components/InputField'
import MaskedMobile from '@/components/MaskedMobile'
import authCheck from '@/snippets/authCheck'
import updateUserB from '@/snippets/auth/updateUserB'
import Alert from '@/components/Alert'
import { parseCookies } from '@/snippets/parseCookies'
import getGQLRequest from '@/snippets/getGQLRequest'
import Head from 'next/head'

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
			<div className=''>
				<div className='flex flex-wrap g-0'>
					<div className='fixed w-full'>
						<AuthNavbar />
					</div>
					<div className='w-full desktop:w-1/2 laptop:w-1/2 bg-RegisterB mobile:h-1/3 mobile:hidden desktop:block laptop:mt-10'>
						<div className='flex items-center w-full desktop:h-screen laptop:h-screen place-content-center'>
							<img
								src='.\step2.png'
								alt='Login Image'
								className='w-2/5'
							/>
						</div>
					</div>
					<div className='w-full desktop:w-1/2 laptop:w-1/2 mobile:h-2/3'>
						<div className='flex items-center w-full mt-10 mb-10 desktop:h-screen laptop:h-screen place-content-center'>
							<div className='pt-10 desktop:w-5/6 mobile:w-10/12 desktop:my-0'>
								<div className='w-4/5 mb-4 banner-main-text text-themeColorSecondary mobile:mt-2'>
									You're almost
									<br /> ready to get started!
								</div>
								<div className='mb-4 heading text-themeColorSecondary desktop:hidden mobile:block'>
									Step 2 of 5 - Contact Info
								</div>
								<div className='w-2/4 mb-4 body-text text-themeColorSecondary'>
									Finish your registration by completing the{' '}
									<span className='font-bold'>Contact Info</span> fields below.
									You'll be done in no time.
								</div>
								<form>
									<InputField
										id='addressLine1'
										placeholder='Address line 1: House number and street name (Required)'
										onChange={(event) => setAddressLine1(event.target.value)}
										value={addressLine1}
									/>
									<InputField
										id='addressLine2'
										placeholder='Address line 2: Suburb can come here'
										onChange={(event) => setAddressLine2(event.target.value)}
										value={addressLine2}
									/>
									<DefaultSelectNew
										options={provinces}
										id='province'
										name='province'
										placeholder='Province (Required)'
										value={province}
										valueSetter={setProvince}
										required
									/>
									<InputField
										id='town'
										placeholder='City or Town (Required)'
										onChange={(event) => setTown(event.target.value)}
										value={town}
									/>
									{/* <DefaultSelectNew
                    options={countries}
                    id="country"
                    name="country"
                    placeholder="Country (Required)"
                    value={country}
                    valueSetter={setCountry}
                    required
                  /> */}

									<MaskedMobile
										required={true}
										setter={setMobileNr}
										value={mobileNr}
										placeholder='Cellphone Number'
									/>
								</form>
								<div className='p-0 mt-4 text-left col-sm-12'>
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
