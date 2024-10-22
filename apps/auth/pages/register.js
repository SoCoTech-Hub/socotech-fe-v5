import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { baseUrl } from '@/context/constants'
import Alert from '@/components/Alert'
import BtnBig from '@/components/BtnBig'
import InputField from '@/components/InputField'
import Checkbox from '@/components/Checkbox'
import LogoOverlay from '@/components/LogoOverlay'
import getDataRequest from '@/snippets/getDataRequest'
import { SEO } from '@/components/SeoHead'
import authCheck from '@/snippets/authCheck'
import userid from '@/snippets/getUserid'
import registerUser from '@/snippets/auth/registerUser'
import checkEmail from '@/snippets/auth/checkEmail'
import validateEmail from '@/snippets/auth/validateEmail'
import TwoColPage from '@/components/TwoColPage'
// import AWSVideoPlayer from '@/components/VideoPlayer2'
// import VideoPlayer from '@/components/VideoPlayer'
// import Modal from '@/components/Modal'

export default function register() {
	// { video }
	const router = useRouter()
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [check, setCheck] = useState(false)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	// const [voucher, setVoucher] = useState('')

	useEffect(() => {
		if (userid) {
			authCheck({ userid })
		}
	}, [userid])

	const handleSubmit = async () => {
		setLoading(true)
		setError('')
		// Basic validation checks
		if (!firstName || !lastName || !email || !password) {
			setError('Please ensure all fields are completed')
			setLoading(false)
			return
		}
		if (!check) {
			setError('Terms and conditions are required')
			setLoading(false)
			return
		}
		if (password.length < 8) {
			setError('Password needs to be 8 or more characters long')
			setLoading(false)
			return
		}
		if (password !== repeatPassword) {
			setError('Password does not match')
			setLoading(false)
			return
		}

		try {
			// Validate email
			const emailValidation = await validateEmail({ email })
			if (emailValidation?.error) {
				setError(emailValidation.error)
				setLoading(false)
				return
			}

			// Check if email already exists
			const emailCheck = await checkEmail({ email })
			if (emailCheck.data.length) {
				setError('Email already in use')
				setLoading(false)
				return
			}

			// let voucherCheck = await checkVoucher({ voucher })
			// if (!voucherCheck.id) {
			//   setError('Voucher not valid')
			//   setLoading(false)
			//   return
			// }

			// Register user
			const res = await registerUser({
				first_name: firstName,
				last_name: lastName,
				email: email,
				password: password,
				organization: { id: 1 }
				// voucher: voucherCheck,
				// organization: voucherCheck?.organizations[0]
			})

			if (!res.ok) {
				setError('Something went wrong, please verify your email address')
				setLoading(false)
				return
			}

			// On successful registration, redirect to verified page
			setLoading(false)
			router.push('/verified')
		} catch (err) {
			setError('Confirmation email could not be sent')
			setLoading(false)
		}
	}

	const seo = {
		title: 'Topic - Register Page',
		description: 'Sign up for Topic and discover a new learning experience!'
	}

	return (
		<>
			<SEO
				title={seo.title}
				description={seo.description}
			/>
			{/* <Modal
				open={open}
				setOpen={setOpen}
				children={
					<div className='flex items-center justify-center align-middle'>
						{video?.url ? (
							video.url.startsWith(process.env.NEXT_PUBLIC_CLOUDFRONT) ? (
								<AWSVideoPlayer src={video.url} />
							) : (
								<iframe
									style={{ height: '60vh', width: '200vh' }}
									src={video.url}
								>
								</iframe>
							)
						) : (
							<></>
						)}
					</div>
				}
			/> */}
			<TwoColPage
				col1Image={`${baseUrl}/brand-image.png`}
				header={
					<>
						Create
						<br /> your account
					</>
				}
				col2={
					<form
						autoComplete='on'
						onSubmit={handleSubmit}
					>
						<InputField
							id='firstname'
							icon='ti-user'
							placeholder='Your First Name'
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<InputField
							id='surname'
							icon='ti-user'
							placeholder='Your Surname'
							onChange={(e) => setLastName(e.target.value)}
						/>
						<InputField
							id='email'
							icon='ti-email'
							placeholder='Your Email Address'
							type='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
						<InputField
							id='password'
							icon='ti-lock'
							placeholder='Password'
							type='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
						<InputField
							id='repeatPassword'
							icon='ti-lock'
							placeholder='Confirm Password'
							type='password'
							onChange={(e) => setRepeatPassword(e.target.value)}
						/>
						{/* <InputField
									icon='ti-key'
									placeholder='Voucher'
									onChange={(e) => setVoucher(e.target.value)}
								/> */}

						{/* Terms and Conditions */}
						<div className='flex items-center mt-3 mb-4 mobile:mb-4'>
							<Checkbox
								setter={setCheck}
								value={check}
							/>
							<div className='ml-2 text-sm text-textColor'>
								I have read and agreed to the
								<Link
									href='/tou'
									passHref
								>
									<a className='ml-1 font-bold underline text-textHeading'>
										Terms and Conditions
									</a>
								</Link>
							</div>
						</div>

						{/* Alert and Buttons */}
						<div>
							{error && <Alert error={error} />}
							<div className='flex mobile:gap-y-3 laptop:gap-x-3 desktop:gap-x-3 desktop:flex-row laptop:flex-row mobile:flex-col'>
								<BtnBig
									label={loading ? 'Loading' : 'Register'}
									disabled={loading || !check}
									onClick={() => register()}
									width={`w-48 mobile:w-full ${
										check
											? 'bg-themeColorMain'
											: 'cursor-not-allowed bg-gray-100'
									}`}
								/>
								<BtnBig
									label='Register with Google'
									color='bg-themeColorMain'
									link={`${process.env.NEXT_PUBLIC_API_URL}/connect/google`}
									width='w-58 mobile:w-full'
								/>
							</div>

							{/* Already have an account */}
							<div className='flex flex-row items-center my-3 text-sm text-textColor'>
								Already have an account?
								<Link href='/'>
									<a className='ml-1 font-semibold text-themeColorMain'>
										Login
									</a>
								</Link>
							</div>
						</div>
					</form>
				}
			/>
		</>
	)
}

// export async function getServerSideProps() {
// 	const video = await getDataRequest('/register-pop-ups', () => {})
// 	return {
// 		props: {
// 			video: video ? video[0] : video
// 		}
// 	}
// }
