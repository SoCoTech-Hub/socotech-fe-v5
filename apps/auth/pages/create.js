import { useState, useEffect } from 'react'
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
import AWSVideoPlayer from '@/components/VideoPlayer2'
import VideoPlayer from '@/components/VideoPlayer'
import Modal from '@/components/Modal'
import getDataRequest from '@/snippets/getDataRequest'

const seo = {
	title: 'Topic - Create Page',
	description: 'Sign up for Topic and discover a new learning experience!',
	image: 'https://lms.topic.co.za/auth/logo.png',
	url: 'https://topic.co.za'
}

export default function ({ video }) {
	const router = useRouter()
	const [userInput, setUserInput] = useState({
		email: '',
		password: '',
		confirm: ''
	})
	const [check, setCheck] = useState(true)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(true)
	const [iframeSrc, setIframeSrc] = useState('')

	useEffect(() => {
		if (open && video?.url) {
			// Use a small delay before setting the iframe src to help with autoplay
			setTimeout(() => {
				setIframeSrc(`${video.url}&autoplay=1&mute=0`)
			}, 100) // Delay by 1 second
		}
	}, [open, video])

	const updateInput = (e, type) => {
		setUserInput({
			...userInput,
			[type]: e.target.value
		})
	}

	const register = async () => {
		setError('')
		setLoading(true)
		if (!userInput.email || !userInput.password || !userInput.confirm) {
			setError(`All fields are required`)
			setLoading(false)
			return
		}
		if (!check) {
			setError(`Terms and conditions are required`)
			setLoading(false)
			return
		}
		if (userInput.password.length < 8) {
			setError('Password needs to be 8 or more characters long')
			setLoading(false)
			return
		}

		if (userInput.password !== userInput.confirm) {
			setError(`Passwords don't Match`)
			setLoading(false)
			return
		}

		const validEmail = await validateEmail({ email: userInput.email })
		if (validEmail?.error) {
			setError('Email does not exist')
			setLoading(false)
			return
		}

		const { users } = await getGQLRequest({
			endpoint: 'users',
			fields: 'id',
			where: `email:"${userInput.email}"`
		})

		if (users.length > 0) {
			setError('Account already registered')
			setLoading(false)
			return
		}

		const res = await RegisterUser2({
			email: userInput.email,
			password: userInput.password,
			organization: { id: 1 }
		})

		if (!res.ok) {
			setError('Something went wrong, Please verify if your email is correct')
			setLoading(false)
			return
		}
		setLoading(false)
		return router.push('/verified')
	}

	return (
		<>
			<Modal
				open={open}
				setOpen={setOpen}
				children={
					<div className='flex align-middle items-center justify-center'>
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
			/>
			<SEO seo={seo} />
			<div className='flex justify-between gap-0 overflow-x-hidden'>
				<div className='desktop:w-full laptop:w-1/2'>
					<div className='relative flex items-center w-full desktop:h-screen laptop:h-screen'>
						<img
							src={`${baseUrl}/regAssit0.jpg`}
							alt='Background Image'
							className='absolute object-cover w-full h-full'
						/>
						<div className='absolute inset-0 flex items-center justify-center'>
							<img
								src={`${baseUrl}/regAssit1.png`}
								alt='Foreground Image'
								className='object-contain h-2/3'
							/>
						</div>
					</div>
				</div>
				<div className='w-full pt-16 ml-8 mobile:pt-4'>
					<LogoOverlay />
					<div className='mt-24 text-4xl text-textColor mobile:mt-8'>
						Create
						<br /> your account
					</div>
					<form autoComplete='on'>
						<div className='w-4/5 pt-2 '>
							<InputField
								id='email'
								icon='ti-email'
								placeholder='Your Email Address'
								type='email'
								onChange={(e) => updateInput(e, 'email')}
							/>
						</div>
						<div className='flex desktop:flex-row laptop:flex-row mobile:flex-col'>
							<div className='w-2/5 mobile:w-4/5'>
								<InputField
									id='password'
									icon='ti-lock'
									placeholder='Password'
									type='password'
									onChange={(e) => updateInput(e, 'password')}
								/>
							</div>
							<div className='mx-1'></div>
							<div className='w-2/5 mobile:w-4/5'>
								<InputField
									id='repeatPassword'
									icon='ti-lock'
									placeholder='Confirm Password'
									type='password'
									onChange={(e) => updateInput(e, 'confirm')}
								/>
							</div>
						</div>
						<div className='flex flex-row h-10 mt-3 text-left align-middle mobile:mb-4'>
							<Checkbox
								setter={setCheck}
								value={check}
							/>
							<div className='text-sm mt-0.5 text-textColor '>
								<span>I have read and agreed to the </span>
								<Link
									href='/tou'
									passHref
								>
									<a rel='noopener noreferrer'>
										<span className='ml-1 font-bold underline cursor-pointer text-textHeading'>
											Terms and Conditions
										</span>
									</a>
								</Link>
							</div>
						</div>
						<div className='flex gap-3 desktop:flex-row laptop:flex-row mobile:flex-col '>
							<Alert error={error} />
						</div>
						<div className='flex gap-3 desktop:flex-row laptop:flex-row mobile:flex-col '>
							<div className='w-2/5 mobile:w-5/6'>
								<BtnBig
									label={loading ? 'Loading' : 'Register'}
									disabled={loading}
									color='bg-themeColorMain'
									onClick={register}
								/>
							</div>
							<div className='w-2/5 mobile:w-5/6'>
								<BtnBig
									label='Register with Google'
									color='bg-themeColorMain'
									link={`${process.env.NEXT_PUBLIC_API_URL}/connect/google`}
								/>
							</div>
						</div>
						<div className='pt-4 text-sm text-textColor mobile:mb-5'>
							Already have an account?
							<span className='cursor-pointer text-themeColorMain'>
								<Link href='/'>Login</Link>
							</span>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps() {
	const video = await getDataRequest('/register-pop-ups', () => {})
	return {
		props: {
			video: video ? video[0] : video
		}
	}
}
