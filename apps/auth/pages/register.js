import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Alert from '@/components/Alert'
import BtnBig from '@/components/BtnBig'
import InputField from '@/components/InputField'
import Checkbox from '@/components/Checkbox'
import authCheck from '@/snippets/authCheck'
import userid from '@/snippets/getUserid'
import registerUser from '@/snippets/auth/registerUser'
import checkEmail from '@/snippets/auth/checkEmail'
import validateEmail from '@/snippets/auth/validateEmail'
import { baseUrl } from '@/context/constants'
import LogoOverlay from '@/components/LogoOverlay'
import AWSVideoPlayer from '@/components/VideoPlayer2'
import VideoPlayer from '@/components/VideoPlayer'
import getDataRequest from '@/snippets/getDataRequest'
import Modal from '@/components/Modal'

export default function register({ video }) {
	const router = useRouter()
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	// const [voucher, setVoucher] = useState('')
	const [check, setCheck] = useState(null)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(true)

	useEffect(() => {
		if (userid) {
			authCheck({ userid })
		}
	}, [userid])

	const handleSubmit = async (event) => {
		setLoading(true)
		event.preventDefault()
		if (
			password.length == 0 ||
			email.length == 0 ||
			firstName.length == 0 ||
			lastName.length == 0
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

		const res = await validateEmail({ email: email })
		if (res?.error) {
			setError(res.error)
			setLoading(false)
			return
		}

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
		try {
			const res = await registerUser({
				first_name: firstName,
				last_name: lastName,
				email: email,
				password: password,
				// voucher: voucherCheck,
				// organization: voucherCheck?.organizations[0]
				organization: { id: 1 }
			})

			if (!res.ok) {
				setError('Something went wrong, Please verify if your email is correct')
				setLoading(false)
				return
			}
			setLoading(false)
			return router.push('/verified')
		} catch (err) {
			setError('Confirmation email could not be sent')
			setLoading(false)
			return
		}
	}

	const seo = {
		title: 'Topic - Register Page',
		description: 'Sign up for Topic and discover a new learning experience!',
		image: 'https://lms.topic.co.za/auth/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<>
			<Head>
				<title>{seo.title}</title>
				<meta
					name='title'
					content={seo.title}
				/>
				<meta
					name='description'
					content={seo.description}
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content={seo.url}
				/>
				<meta
					property='og:title'
					content={seo.title}
				/>
				<meta
					property='og:description'
					content={seo.description}
				/>
				<meta
					property='og:image'
					content={seo.image}
				/>

				<meta
					property='twitter:card'
					content='summary_large_image'
				/>
				<meta
					property='twitter:url'
					content={seo.url}
				/>
				<meta
					property='twitter:title'
					content={seo.title}
				/>
				<meta
					property='twitter:description'
					content={seo.description}
				/>
				<meta
					property='twitter:image'
					content={seo.image}
				/>
			</Head>
			<Modal
				open={open}
				setOpen={setOpen}
				children={
					<div className='flex align-middle items-center justify-center'>
						{video?.url ? (
							video.url.startsWith(process.env.NEXT_PUBLIC_CLOUDFRONT) ? (
								<AWSVideoPlayer src={video.url} />
							) : (
								<iframe
									style={{ height: '60vh', width: '200vh' }}
									src={video.url}
									// className='min-h-96 w-full'
									// autoplay={true}
								>
									{/* <source src={video.url} type='video/*' />  */}
								</iframe>
							)
						) : (
							<></>
						)}
					</div>
				}
			/>

			<div className='flex flex-wrap overflow-x-hidden g-0'>
				<div className='w-full desktop:w-1/2 laptop:w-1/2 mobile:h-1/3'>
					<div className='flex items-center w-full desktop:h-screen laptop:h-screen place-content-center'>
						<img
							src={`${baseUrl}/auth-img.png`}
							alt='Login Image'
							className='mobile:hidden'
						/>
					</div>
				</div>
				<div className='w-full bg-compBg desktop:w-1/2 laptop:w-1/2 mobile:h-2/3'>
					<div className='flex items-center w-full desktop:h-screen laptop:h-screen place-content-center mobile:mx-1 mobile:-mt-4'>
						<div className='my-10 desktop:w-3/5 mobile:w-10/12 desktop:my-0 laptop:w-3/5'>
							<div className='w-4/5 pt-16 text-3xl font-bold mobile:pt-2 text-textHeading'>
								<LogoOverlay />
								<div className='pt-4'>
									Create
									<br /> your account
								</div>
							</div>
							<form
								// onSubmit={handleSubmit}
								autoComplete='on'
							>
								{/* <input
									autoComplete='false'
									name='hidden'
									type='text'
								/> */}
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

								<div className='flex flex-row h-10 text-left align-middle'>
									<Checkbox setter={setCheck} />
									<div className='text-sm mt-0.5 '>
										<Link
											href='/tou'
											passHref
										>
											<a
												target='_blank'
												rel='noopener noreferrer'
											>
												<span className='font-bold cursor-pointer text-textHeading'>
													Accept terms and conditions
												</span>
											</a>
										</Link>
										<span className='font-bold text-textHeading '> and </span>
										<Link
											href='/privacy'
											passHref
										>
											<a
												target='_blank'
												rel='noopener noreferrer'
											>
												<span className='font-bold cursor-pointer text-textHeading '>
													privacy policy
												</span>
											</a>
										</Link>
									</div>
								</div>

								<div className=''>
									<Alert error={error} />
									<BtnBig
										label={loading ? 'Loading...' : 'Register'}
										onClick={handleSubmit}
										color='bg-themeColorMain'
										disabled={loading}
									/>
									<div className='py-1'>
										<BtnBig
											label={loading ? 'Loading... ' : 'Register with Google'}
											color='bg-themeColorMain my-3'
											link={`${process.env.NEXT_PUBLIC_API_URL}/connect/google`}
										/>

										<div className='text-sm text-textColor'>
											Already have an account?
											<span className='font-semibold cursor-pointer ms-1 text-themeColorMain'>
												<Link href='/'>Login</Link>
											</span>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps() {
	const video = await getDataRequest('/register-pop-ups', () => {})
	console.log({ video })
	return {
		props: {
			video: video ? video[0] : video
		}
	}
}
