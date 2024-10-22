import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import BtnBig from '@/components/BtnBig'
import InputField from '@/components/InputField'
import Alert from '@/components/Alert'
import checkEmail from '@/snippets/auth/checkEmail'
import forgotPassword from '@/snippets/auth/forgotPassword'
// import LogoOverlay from '@/components/LogoOverlay'
import { baseUrl } from '@/context/constants'

export default function reset() {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	const handleSubmit = async (event) => {
		setError('')
		setLoading(true)
		event.preventDefault()
		if (!email) {
			setError('Email not provided')
			setLoading(false)
			return
		}

		const emailCheck = await checkEmail({ email })

		if (!emailCheck) {
			setError('Email not found')
			setLoading(false)
			return
		}
		if (emailCheck.provider == 'google') {
			setError("You don't need a password, Login with Google")
			setLoading(false)
			return
		}
		if (emailCheck.blocked) {
			setError('Account has been blocked, please contact support')
			setLoading(false)
			return
		}
		if (!emailCheck.confirmed) {
			setError(
				"Account not confirmed, please check your email for 'Account confirmation'"
			)
			setLoading(false)
			return
		}

		try {
			const res = await forgotPassword(email)
			if (res.ok) {
				setSuccessMessage(`We have sent an email with a link to your email address. In order to reset your password, please click the link.
      If you do not receive an email, please check your spam folder.`)
			}
			setLoading(false)
		} catch (err) {
			setError('Reset password link could not be sent')
			setLoading(false)
			return
		}
	}

	const seo = {
		title: 'Topic - Reset Password',
		description:
			"You seem to have forgotten your password; let's change that for you.",
		image: 'https://lms.topic.co.za/auth/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<>
			<Head>
				<title>Forgot Password</title>
				<meta
					name='description'
					content="You seem to have forgotten your password; let's change that for you."
				/>
			</Head>
			<div
				className='flex flex-wrap g-0 h-fit'
				style={{ overflow: 'hidden' }}
			>
				<div className='w-full desktop:w-1/2 laptop:w-1/2 mobile:h-1/3'>
					<div className='flex items-center w-full desktop:h-screen laptop:h-screen place-content-center'>
						<img
							src={`${baseUrl}/brand-image.png`}
							alt='Login Image'
							className='mobile:hidden'
						/>
					</div>
				</div>
				<div className='w-full bg-compBg desktop:w-1/2 laptop:w-1/2 mobile:h-2/3'>
					<div className='flex items-center w-full h-screen place-content-center mobile:px-1'>
						<div className='my-10 desktop:w-3/5 mobile:w-10/12 desktop:my-0 laptop:w-3/5 mobile:my-5'>
							<div className='w-4/5 mb-4 text-2xl font-bold text-textColor'>
								Reset your
								<br /> Password
							</div>
							<div className='w-3/4 mt-4 mb-3 text-sm text-textColor'>
								To reset your password please provide the email address linked
								to your account
							</div>
							<form>
								<InputField
									icon='ti-email'
									placeholder='Your Email Address'
									onChange={(e) => setEmail(e.target.value)}
								/>
							</form>
							<div className=''>
								<div className='mb-1 '>
									<Alert
										error={error}
										success={successMessage}
									/>
									<BtnBig
										label={loading ? 'Loading' : 'Request password reset'}
										onClick={handleSubmit}
										color='bg-themeColorMain'
									/>
								</div>
								<h6 className='mt-3 text-xs text-themeColorMain'>
									<Link
										href='/'
										className='font-semibold ms-1 text-themeColorMain'
									>
										Go Back
									</Link>
								</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
