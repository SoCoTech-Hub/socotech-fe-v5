import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import login from '@/snippets/auth/login'
import Alert from '@/components/Alert'
import BtnBig from '@/components/BtnBig'
import Checkbox from '@/components/Checkbox'
import InputField from '@/components/InputField'
import authCheck from '@/snippets/authCheck'
import Cookies from 'js-cookie'
import { parseCookies } from '@/snippets/parseCookies'
import { baseUrl, domain } from '@/context/constants'
import LogoOverlay from '@/components/LogoOverlay'
import checkEmail from '@/snippets/auth/checkEmail'
import { SEO } from '@/components/SeoHead'

const LoginPage = ({ token, userId, initialRememberMe, modDevice }) => {
	const router = useRouter()
	const [redirect, setRedirect] = useState('')
	const [rememberMe, setRememberMe] = useState(() =>
		JSON.parse(initialRememberMe)
	)
	const [data, updateData] = useState({ identifier: '', password: '' })
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	useEffect(() => {
		const autoLogin = async () => {
			if (token && userId) {
				const routeTo = await authCheck({ userid: userId })
				setRedirect(routeTo)
			}
		}
		autoLogin()
	}, [token, userId])

	useEffect(() => {
		if (redirect) {
			setLoading(false)
			router.push(redirect)
		}
	}, [redirect])

	useEffect(() => {
		Cookies.set('rememberMe', JSON.stringify(rememberMe), {
			domain: domain,
			secure: true,
			expires: 7
		})
	}, [rememberMe])

	const onChange = (event) => {
		updateData({ ...data, [event.target.name]: event.target.value })
	}

	const newGuid = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
			/[xy]/g,
			function (c) {
				const r = (Math.random() * 16) | 0
				const v = c === 'x' ? r : (r & 0x3) | 0x8
				return v.toString(16)
			}
		)
	}

	const submitLogin = async (e) => {
		e.preventDefault()
		setLoading(true)
		if (data.identifier && data.password) {
			setError(false)
			try {
				const mail = await checkEmail({ email: data.identifier })
				if (mail?.provider) {
					if (mail.provider === 'google') {
						window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/connect/google`
						return
					}
					if (mail.provider === 'local') {
						const res = await login({
							identifier: data.identifier,
							password: data.password,
							modDevice: modDevice,
							deviceId: newGuid(),
							rememberMe: rememberMe
						})

						if (res.error) {
							handleError(res)
							setLoading(false)
							return
						}
						const routeTo = await authCheck({ userid: res.data.user.id })
						console.log({ routeTo })
						router.prefetch(routeTo)
						setLoading(false)
						setRedirect(routeTo)
					}
				} else {
					setError('Account does not exist')
					setLoading(false)
				}
			} catch (err) {
				setError('Something went wrong')
				setLoading(false)
			}
		} else {
			setError('A Field is not completed')
			setLoading(false)
		}
	}

	const handleError = (res) => {
		const errorId = res.data[0]?.messages[0]?.id
		switch (errorId) {
			case 'Auth.form.error.confirmed':
				setError('Account not verified')
				break
			case 'Auth.form.error.blocked':
				setError('Account has been blocked')
				break
			case 'Auth.form.error.loggedIn':
				setError('This account is already in use, please contact Support')
				break
			default:
				setError('Username or password not matched')
		}
	}

	const seo = {
		title: 'Topic - Login',
		description: 'Log in to your account.'
	}

	return (
		<>
			<SEO
				title={seo.title}
				description={seo.description}
			/>

			<div className='relative flex flex-wrap h-screen g-0'>
				{/* Logo Overlay for Laptop and Desktop */}
				<div className='absolute top-0 left-0 p-4 laptop:p-6 desktop:p-8'>
					<LogoOverlay />
				</div>

				{/* Left Section with Image */}
				<div className='desktop:w-1/2 laptop:w-1/2 mobile:hidden'>
					<div className='flex desktop:h-screen laptop:h-screen place-content-center'>
						<img
							src={`${baseUrl}/brand-image.png`}
							alt='Login Image'
							className='object-cover w-full h-full'
						/>
					</div>
				</div>

				{/* Right Section with Form - Centered on Y-axis */}
				<div className='flex items-center justify-center h-screen mobile:w-full desktop:w-1/2 laptop:w-1/2'>
					<div className='w-full px-4 rounded-lg bg-compBg'>
						<div className='mb-4 text-4xl font-bold text-textHeading mobile:text-3xl'>
							Log in to
							<br /> your account
						</div>
						<InputField
							id='identifier'
							placeholder='Your Email Address'
							icon='ti-email'
							onChange={(event) => onChange(event)}
						/>
						<InputField
							id='password'
							type='password'
							icon='ti-lock'
							placeholder='Password'
							onChange={(event) => onChange(event)}
						/>
						<div className='flex flex-row justify-between my-3 text-left text-textHeading'>
							<Checkbox
								label='Remember me'
								setter={setRememberMe}
								value={rememberMe}
							/>
							<Link href='/reset'>
								<a className='float-right text-xs font-semibold text-textHeading login-forgot'>
									Forgot your password?
								</a>
							</Link>
						</div>

						{/* Alert and Buttons Section */}
						<div className='flex flex-col gap-y-2'>
							<Alert error={error} />

							{/* Buttons */}
							<div className='flex items-center mobile:flex-col laptop:flex-row desktop:flex-row gap-y-2 gap-x-4'>
								<BtnBig
									label={loading ? 'Loading... ' : 'Login'}
									color='bg-themeColorMain'
									onClick={submitLogin}
									width='w-60'
								/>
								<BtnBig
									label={loading ? 'Loading... ' : 'Login with Google'}
									color='bg-themeColorMain'
									link={`${process.env.NEXT_PUBLIC_API_URL}/connect/google`}
									width='w-60'
								/>
							</div>

							{/* Register Link */}
							<h6 className='mt-3 text-xs text-textHeading'>
								Don't have an account?
								<span className='ml-2 font-semibold text-themeColorMain'>
									<Link href='/create'>Register</Link>
								</span>
							</h6>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	const { userid, rememberMe, token } = parseCookies(context.req)
	const deviceDetail = context.req.headers['user-agent']
	const modDevice = `device:${deviceDetail}`

	return {
		props: {
			userId: userid || null,
			initialRememberMe: rememberMe || false,
			modDevice,
			token: token || null
		}
	}
}

export default LoginPage
