import { useEffect, useState } from 'react'
// import Link from "next/link"
import { useRouter } from 'next/router'
import Alert from '@/components/Alert'
import Btn from '@/components/Btn'
import MaskedSerial from '@/components/MaskedSerial'
import MaskedImei from '@/components/MaskedImei'
import AuthNavbar from '@/components/AuthNavbar'
import authCheck from '@/snippets/authCheck'
import updateUserD from '@/snippets/auth/updateUserD'
import getGQLRequest from '@/snippets/getGQLRequest'
import checkSerial from '@/snippets/auth/checkSerial'
import checkImei from '@/snippets/auth/checkImei'
import { parseCookies } from '@/snippets/parseCookies'
import { baseUrl } from '@/context/constants'
import Head from 'next/head'

const RegisterD = ({ userId, profile }) => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [serialnumber, setSerial] = useState(profile.serialNumber)
	const [imei, setImei] = useState(profile.imei)

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
		if (!serialnumber || !imei) {
			setErrorMessages('Some required fields are incomplete')
			setLoading(false)
			return
		}
		let serialSplit = serialnumber.split('_')[0]
		let imeiSplit = imei.split('_')[0]
		if (serialSplit.length < 12) {
			setErrorMessages('Please provide your full device serial number')
			setLoading(false)
			return
		}
		if (imeiSplit.length <= 16) {
			setErrorMessages('Please ensure your Sim IMEI number is correct')
			setLoading(false)
			return
		}
		const serialCheck = await checkSerial({
			serialnumber: serialSplit,
			userid: profile
		})
		if (serialCheck.data.length) {
			setErrorMessages('Device serial already in use')
			setLoading(false)
			return
		}
		const imeiCheck = await checkImei({
			userId: profile,
			imei: imeiSplit
		})
		if (imeiCheck.data.length) {
			setErrorMessages('Sim IMEI already in use')
			setLoading(false)
			return
		}

		setErrorMessages('')
		try {
			await updateUserD({
				profile: profile.id,
				serialNumber: serialSplit,
				imei: imeiSplit
			})
			router.push('/registere')			
		} catch (err) {
			setErrorMessages(err)
			setLoading(false)
			return
		}
	}

	return (
		<>
			<Head>
				<title>Register Device Info</title>
				<meta
					name='description'
					content='Register D Page'
				/>
			</Head>
			<div className=''>
				<div className='flex flex-wrap g-0'>
					<div className='fixed w-full'>
						<AuthNavbar />
					</div>
					<div className='w-full desktop:w-1/2 laptop:w-1/2 bg-appBg mobile:h-1/3 mobile:hidden desktop:block laptop:mt-10'>
						<div className='flex items-center w-full desktop:h-screen laptop:h-screen place-content-center'>
							<img
								src={`${baseUrl}/step4.png`}
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
									Step 4 of 5 - Device Info
								</div>
								<div className='w-2/4 mb-4 body-text text-themeColorSecondary'>
									Finish your registration by completing the{' '}
									<span className='font-bold'>Device Info</span> fields below.
									You'll be done in no time.
								</div>
								<form>
									<div className=''>
										<MaskedSerial
											required
											setter={setSerial}
											value={serialnumber}
										/>
										{/* //TODO: @Mario - Need copy write */}
										{/* <div className="float-right mb-2 -mt-3 text-xs leading-none text-gray-500 ">
                      Not sure where to find this information?
                      <span className="font-semibold cursor-pointer ms-1 text-themeColorMain">
                        <Link href="/">Click here</Link>
                      </span>
                    </div> */}
									</div>
									<div className='mt-3'>
										<MaskedImei
											required
											setter={setImei}
											value={imei}
										/>
										{/* //TODO: @Mario - Need copy write */}
										{/* <div className="float-right mb-2 -mt-3 text-xs leading-none text-gray-500">
                      Not sure where to find this information?
                      <span className="font-semibold cursor-pointer ms-1 text-themeColorMain">
                        <Link href="/">Click here</Link>
                      </span>
                    </div> */}
									</div>
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
	return {
		props: {
			userId: userId ? userId : null,
			profile: profile ? profile : null
		}
	}
}

export default RegisterD
