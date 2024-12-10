import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Alert from '@/components/Alert'
import BtnBig from '@/components/BtnBig'
import InputField from '@/components/InputField'
import Checkbox from '@/components/Checkbox'
import registerUser from '@/snippets/registerUser'
import checkEmail from '@/snippets/auth/checkEmail'
import validateEmail from '@/snippets/auth/validateEmail'
import { authUrl, baseUrl } from '@/context/constants'
import getDataRequest from '@/snippets/getDataRequest'
import getGQLRequest from '@/snippets/getGQLRequest'

export default function register({ uniqueId }) {
	const router = useRouter()
	const [transaction, setTransaction] = useState([])
	const [refferal, setRefferal] = useState([])
	const [first_name, setFirstName] = useState('')
	const [last_name, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [check, setCheck] = useState(null)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(async () => {
		if (!uniqueId) {
			router.push(`${baseUrl}cancel`)
		} else {
			const res = await getDataRequest(`transactions?mPaymentId=${uniqueId}`)
			if (res) {
				setTransaction(res[0])
				if (res[0].ref) {
					const { affiliates } = await getGQLRequest({
						endpoint: 'affiliates',
						where: `profile:{uniqueId:${res[0].ref}}`,
						fields: 'id'
					})
					if (affiliates.length) {
						setRefferal(affiliates[0])
					}
				}
			}
		}
	}, [uniqueId])

	const handleSubmit = async (event) => {
		setLoading(true)
		setError('')
		event.preventDefault()
		const res = await getDataRequest(`/profiles?uniqueId=${uniqueId}`, () => {})
		if (res.length) {
			setError(
				`You already have an account created, please use the provided login link below, or use the confirmation link in your email.`
			)
			setLoading(false)
			const user = await getDataRequest(`/users?profile=${res[0].id}`, () => {})
			router.push(`${authUrl}/confirm?email=${user[0].email}`)
			return
		}
		if (
			password.length == 0 ||
			email.length == 0 ||
			first_name.length == 0 ||
			last_name.length == 0
		) {
			setError('Please ensure all fields are completed')
			setLoading(false)
			return
		}
		if (!check) {
			setError('Terms and conditions are required')
			setLoading(false)
			return
		}

		if (!validateEmail({ email: email })) {
			setError('You have entered an invalid email address')
			setLoading(false)
			return
		}

		if (password.length < 8) {
			setError('Password needs to be 8 or more characters long')
			setLoading(false)
			return
		}

		if (password !== repeatPassword) {
			setError('Password Does Not Match')
			setLoading(false)
			return
		}
		const emailCheck = await checkEmail({ email })
		if (emailCheck.data.length) {
			setError('Email already in use')
			setLoading(false)
			return
		}
		try {
			const res = await registerUser({
				first_name: first_name,
				last_name: last_name,
				email: email,
				password: password,
				uniqueId: uniqueId,
				organizationId: transaction.orgId,
				refId: refferal.id
			})
			if (!res.ok) {
				setError('Something went wrong, Please verify if your email is correct')
				setLoading(false)
				return
			}
			setLoading(false)
			return router.push(`${authUrl}/confirm`)
		} catch (err) {
			setError('Confirmation email could not be sent')
			setLoading(false)
			return
		}
	}

	return (
		<>
			<Head>
				<title>Student Registration</title>
				<meta
					name='description'
					content='Student Registration'
				/>
			</Head>
			<img
				src={`${baseUrl}logo.png`}
				alt='Logo'
				className='logo-overlay desktop:h-24 laptop:h-20 mobile:h-12'
			/>
			<div className='flex flex-wrap g-0'>
				<div className='w-full desktop:w-1/2 bg-appBg mobile:h-1/3'>
					<div className='flex items-center w-full desktop:h-screen place-content-center'>
						<img
							src={`${baseUrl}authimg.png`}
							alt='Image'
							className='w-5/6 py-10 desktop:py-0'
						/>
					</div>
				</div>
				<div className='w-full desktop:w-1/2 mobile:h-2/3'>
					<div className='flex items-center w-full desktop:h-screen place-content-center'>
						<div className='my-10 desktop:w-2/5 mobile:w-10/12 desktop:my-0 laptop:w-2/5'>
							<div className='w-4/5 mb-4 text-4xl font-bold text-textColor'>
								Create your
								<br />
								learner account
							</div>
							<form
								onSubmit={handleSubmit}
								autoComplete='false'
							>
								<input
									autoComplete='false'
									name='hidden'
									type='text'
								/>
								<InputField
									id='StudentName'
									icon='ti-user'
									placeholder='Learner Name'
									onChange={(e) => setFirstName(e)}
								/>
								<InputField
									id='StudentSurname'
									icon='ti-user'
									placeholder='Learner Surname'
									onChange={(e) => setLastName(e)}
								/>
								<InputField
									id='StudentEmail'
									icon='ti-email'
									placeholder='Learner Email Address'
									type='email'
									onChange={(e) => setEmail(e)}
								/>
								<InputField
									id='StudentPassword'
									icon='ti-lock'
									placeholder='Password'
									type='password'
									onChange={(e) => setPassword(e)}
								/>
								<InputField
									id='StudentRepeatPassword'
									icon='ti-lock'
									placeholder='Repeat Password'
									type='password'
									onChange={(e) => setRepeatPassword(e)}
								/>
								{/* <InputField
                  icon="ti-key"
                  placeholder="Voucher"
                  onChange={(e) => setVoucher(e.target.value)}
                /> */}

								<div className='flex flex-row my-3 text-left'>
									<Checkbox
										label='Accept'
										setter={setCheck}
									/>
									<div className='mt-1 text-xs'>
										&nbsp;
										<Link
											href='/tou'
											passHref
										>
											<span className='font-bold cursor-pointer pointer-cursor hover:text-blue-400'>
												Terms and Conditions
											</span>
										</Link>
									</div>
								</div>

								<div className=''>
									<div className='mb-1 '>
										<Alert error={error} />
										<BtnBig
											label={loading ? 'Loading...' : 'Register'}
											onClick={handleSubmit}
											color='bg-themeColorSecondary'
										/>
									</div>
									<h6 className='mt-3 text-xs text-textColor'>
										Already have an account?
										<span className='font-semibold cursor-pointer ms-1 text-themeColorMain'>
											<Link href={authUrl}>Login</Link>
										</span>
									</h6>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export async function getServerSideProps(context) {
	const { uniqueId } = context.query
	return {
		props: {
			uniqueId: uniqueId ? uniqueId : null
		}
	}
}
