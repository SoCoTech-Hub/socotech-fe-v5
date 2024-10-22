import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Alert from '@/components/Alert'
import Btn from '@/components/Btn'
import MaskedSerial from '@/components/MaskedSerial'
import MaskedImei from '@/components/MaskedImei'
import authCheck from '@/snippets/authCheck'
import updateUserD from '@/snippets/auth/updateUserD'
import getGQLRequest from '@/snippets/getGQLRequest'
import checkSerial from '@/snippets/auth/checkSerial'
import checkImei from '@/snippets/auth/checkImei'
import { parseCookies } from '@/snippets/parseCookies'
import { baseUrl } from '@/context/constants'
import Head from 'next/head'
import AuthPage from '@/components/AuthPage'

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
			setErrorMessages('Please provide your full tablet serial number')
			setLoading(false)
			return
		}
		if (imeiSplit.length < 16) {
			setErrorMessages('Please ensure your sim card number is correct')
			setLoading(false)
			return
		}
		const serialCheck = await checkSerial({
			serialnumber: serialSplit,
			userid: profile
		})
		if (serialCheck.data.length) {
			setErrorMessages('Tablet serial number already in use')
			setLoading(false)
			return
		}
		const imeiCheck = await checkImei({
			userId: profile,
			imei: imeiSplit
		})
		if (imeiCheck.data.length) {
			setErrorMessages('Sim card number already in use')
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
			<AuthPage
				hasNavbar
				bgImage={`${baseUrl}/background2-h.png`}
				content={
					<div
						className='w-full p-8 overflow-x-hidden h-screen'
						style={{ marginTop: '72px' }}
					>
						<h1 className='justify-start text-4xl mb-1 font-bold leading-1'>
							Register Device Information
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
								4
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
							Finish your registration by completing the fields below.
						</p>
						<form>
							<div className='mb-3'>
								<MaskedSerial
									required
									setter={setSerial}
									value={serialnumber}
								/>
							</div>
							<div className='mb-3'>
								<MaskedImei
									required
									setter={setImei}
									value={imei}
								/>
							</div>
						</form>
						<div className=''>
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
						STEP 4
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
	return {
		props: {
			userId: userId ? userId : null,
			profile: profile ? profile : null
		}
	}
}

export default RegisterD
