import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
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

const Index = ({
	token,
	userId,
	initialRememberMe,
	modDevice
	// , deviceId
}) => {
	const router = useRouter()
	const [redirect, setRedirect] = useState('')
	const [rememberMe, setRememberMe] = useState(() =>
		JSON.parse(initialRememberMe)
	)

	const [data, updateData] = useState({ identifier: '', password: '' })
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	useEffect(async () => {
		if (token) {
			if (userId) {
				// if (deviceId) {
				// const date = new Date()
				// const data = await getDataRequest(`/users/${userId}`, () => {})
				// if (data.expiryDate <= date) {
				// setError('Access to this account has expired')
				// 	return
				// }

				const routeTo = await authCheck({
					userid: userId
				})
				setRedirect(routeTo)
				// }
			}
		}
	}, [userId, token])

	useEffect(() => {
		if (redirect) {
			setLoading(false)
			router.push(redirect)
		}
	}, [redirect])

	useEffect(() => {
		Cookies.remove('rememberMe', {
			domain: domain,
			secure: true
		})
		Cookies.set('rememberMe', JSON.stringify(rememberMe), {
			domain: domain,
			secure: true,
			expires: 7
		})
	}, [rememberMe])

	function onChange(event) {
		updateData({ ...data, [event.target.name]: event.target.value })
	}
	const newGuid = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
			/[xy]/g,
			function (c) {
				var r = (Math.random() * 16) | 0,
					v = c == 'x' ? r : (r & 0x3) | 0x8
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
							const errorId = res.data[0]?.messages[0]?.id
							switch (errorId) {
								case 'Auth.form.error.confirmed':
									setError('Account not verified')
									break
								case 'Auth.form.error.blocked':
									setError('Account has been blocked')
									break
								case 'Auth.form.error.loggedIn':
									setError(
										'This account is already in use, please contact Support'
									)
									break
								default:
									setError('Username or password not matched')
							}
							setLoading(false)
							return
						}
						const routeTo = await authCheck({ userid: res.data.user.id })
						router.prefetch(routeTo)
						setLoading(false)
						setRedirect(routeTo)
					}
				}
			} catch (err) {
				setError('Something went wrong')
				setLoading(false)
				return
			}
		} else {
			setError('A Field is not completed')
			setLoading(false)
			return
		}
	}

	const seo = {
		title: 'Topic - Login',
		description: 'Log in to your account.',
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

			<div className='flex flex-wrap g-0'>
				<div className='w-full desktop:w-1/2 laptop:w-1/2 bg-login mobile:h-1/3'>
					<div className='flex w-full items-right desktop:h-screen laptop:h-screen place-content-center mobile:hidden'>
						<img
							src={`${baseUrl}/topic-login.png`}
							alt='Login Image'
							className='object-cover w-full'
						/>
					</div>
				</div>
				<div className='w-full desktop:pl-36 desktop:pt-16 laptop:pl-24 laptop:pt-16 desktop:w-1/2 laptop:w-1/2 desktop:h-screen laptop:h-screen mobile:pl-14 mobile:pt-12 desktop:p-10 laptop:p-10'>
					<LogoOverlay />

					<div className='w-full bg-compBg mobile:h-2/3'>
						<div className='items-center my-10 desktop:w-4/5 mobile:w-10/12 desktop:my-0 laptop:w-4/5 place-content-center'>
							<div className='w-4/5 mb-4 text-4xl font-bold text-textHeading mobile:text-3xl'>
								Log in to
								<br /> your account
							</div>
							<form>
								<InputField
									className='bg-compBg'
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
									<Link
										href='/reset'
										className='float-right text-xs font-semibold text-textHeading login-forgot'
									>
										Forgot your password?
									</Link>
								</div>
							</form>
							<div className='p-0 text-left col-sm-12'>
								<div className=''>
									<Alert error={error} />
									<BtnBig
										label={loading ? 'Loading... ' : 'Login'}
										color='bg-themeColorMain'
										onClick={submitLogin}
									/>
									<BtnBig
										label={loading ? 'Loading... ' : 'Login with Google'}
										color='bg-themeColorMain my-3'
										link={`${process.env.NEXT_PUBLIC_API_URL}/connect/google`}
									/>
								</div>
								<h6 className='mt-3 text-xs text-textHeading'>
									Don't have an account?
									<span className='font-semibold ms-1 text-themeColorMain'>
										<Link href='/create'>Register</Link>
									</span>
								</h6>
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
	const {
		userid,
		rememberMe,
		token
		// , deviceId
	} = cookies
	const deviceDetail = context.req.headers['user-agent']
	const modDevice = `device:${deviceDetail}`

	return {
		props: {
			userId: userid ? userid : null,
			initialRememberMe: rememberMe ? rememberMe : false,
			modDevice: modDevice,
			token: token ? token : null
			// deviceId: deviceId ? deviceId : null
		}
	}
}

export default Index
