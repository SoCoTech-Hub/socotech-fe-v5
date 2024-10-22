import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Alert from '@/components/Alert'
import BtnBig from '@/components/BtnBig'
import Checkbox from '@/components/Checkbox'
import InputField from '@/components/InputField'
import LogoOverlay from '@/components/LogoOverlay'
import { SEO } from '@/components/SeoHead'
import { baseUrl } from '@/context/constants'
import getGQLRequest from '@/snippets/getGQLRequest'
import validateEmail from '@/snippets/auth/validateEmail'
import RegisterUser2 from '@/snippets/auth/registerUser2'
import getDataRequest from '@/snippets/getDataRequest'
// import AWSVideoPlayer from '@/components/VideoPlayer2'
// import VideoPlayer from '@/components/VideoPlayer'
// import Modal from '@/components/Modal'

const seo = {
	title: 'Topic - Create Page',
	description: 'Sign up for Topic and discover a new learning experience!'
}

export default function Register(
	{
		/* video */
	}
) {
	const router = useRouter()
	const [userInput, setUserInput] = useState({
		email: '',
		password: '',
		confirm: ''
	})
	const [check, setCheck] = useState(true)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	// const [open, setOpen] = useState(true)
	// const [iframeSrc, setIframeSrc] = useState('')

	// useEffect(() => {
	// 	if (open && video?.url) {
	// 		// Use a small delay before setting the iframe src to help with autoplay
	// 		setTimeout(() => {
	// 			setIframeSrc(`${video.url}&autoplay=1&mute=0`)
	// 		}, 100) // Delay by 1 second
	// 	}
	// }, [open, video])

	const updateInput = (e) => {
		const { name, value } = e.target
		setUserInput((prevInput) => ({
			...prevInput,
			[name]: value
		}))
	}

	const register = async () => {
		setError('')
		setLoading(true)
		const { email, password, confirm } = userInput

		// Basic validation
		if (!email || !password || !confirm) {
			setError('All fields are required')
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
		if (password !== confirm) {
			setError(`Passwords don't match`)
			setLoading(false)
			return
		}

		// Validate email
		const validEmail = await validateEmail({ email })
		if (validEmail?.error) {
			setError('Email does not exist')
			setLoading(false)
			return
		}

		// Check if the account already exists
		const { users } = await getGQLRequest({
			endpoint: 'users',
			fields: 'id',
			where: `email:"${email}"`
		})
		if (users.length > 0) {
			setError('Account already registered')
			setLoading(false)
			return
		}

		// Register user
		const res = await RegisterUser2({
			email,
			password,
			organization: { id: 1 }
		})

		if (!res.ok) {
			setError('Something went wrong. Please verify if your email is correct')
			setLoading(false)
			return
		}

		setLoading(false)
		router.push('/verified')
	}

	return (
		<>
			{/* <Modal
				open={open}
				setOpen={setOpen}
				children={
					<div className='flex items-center justify-center align-middle'>
						{iframeSrc ? (
							<iframe
								id='video-iframe'
								src={iframeSrc}
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%',
									border: 0
								}}
								allow='autoplay; encrypted-media'
								allowFullScreen
								title='YouTube video'
							/>
						) : (
							<></>
						)}
					</div>
				}
			/> */}
			<SEO seo={seo} />
			<div className='flex justify-between gap-0 overflow-x-hidden'>
				{/* Left section with image */}
				<div className='relative flex items-center desktop:w-full laptop:w-1/2 desktop:h-screen laptop:h-screen'>
					<img
						src={`${baseUrl}/create-background.jpg`}
						alt='Background'
						className='absolute object-cover w-full h-full'
					/>
					<div className='absolute inset-0 flex items-center justify-center'>
						<img
							src={`${baseUrl}/create-image.png`}
							alt='Foreground'
							className='object-contain h-2/3'
						/>
					</div>
				</div>
				{/* Right section with form */}
				<div className='w-full pt-16 ml-8 mobile:pt-4'>
					<LogoOverlay />
					<div className='mt-24 text-4xl text-textColor mobile:mt-8'>
						Create
						<br />
						your account
					</div>

					<form autoComplete='on'>
						<div className='w-4/5 pt-2'>
							<InputField
								id='email'
								name='email'
								icon='ti-email'
								placeholder='Your Email Address'
								type='email'
								onChange={updateInput}
							/>
						</div>

						<div className='flex gap-1 desktop:flex-row laptop:flex-row mobile:flex-col'>
							<div className='w-2/5 mobile:w-4/5'>
								<InputField
									id='password'
									name='password'
									icon='ti-lock'
									placeholder='Password'
									type='password'
									onChange={updateInput}
								/>
							</div>
							<div className='w-2/5 mobile:w-4/5'>
								<InputField
									id='confirm'
									name='confirm'
									icon='ti-lock'
									placeholder='Confirm Password'
									type='password'
									onChange={updateInput}
								/>
							</div>
						</div>

						{/* Checkbox and Terms */}
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
						{error && <Alert error={error} />}
						<div className='flex desktop:gap-x-3 laptop:gap-x-3 mobile:gap-y-3 desktop:flex-row laptop:flex-row mobile:flex-col'>
							<BtnBig
								label={loading ? 'Loading' : 'Register'}
								disabled={loading}
								color='bg-themeColorMain'
								onClick={register}
								width='w-48 mobile:w-60'
							/>
							<BtnBig
								disabled={loading}
								label='Register with Google'
								color='bg-themeColorMain'
								link={`${process.env.NEXT_PUBLIC_API_URL}/connect/google`}
								width='w-58 mobile:w-60'
							/>
						</div>
						{/* Already have an account */}
						<div className='flex flex-row items-center my-3 text-sm text-textColor'>
							Already have an account?
							<Link href='/'>
								<a className='ml-1 font-semibold text-themeColorMain'>Login</a>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps() {
	// const video = await getDataRequest('/register-pop-ups', () => {})
	return {
		props: {
			// video: video ? video[0] : video
		}
	}
}
