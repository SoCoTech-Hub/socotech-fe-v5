import React, { useState } from 'react'
import Link from 'next/link'
import Alert from '@/components/Alert'
import BtnBig from '@/components/BtnBig'
import InputField from '@/components/InputField'
import { useRouter } from 'next/router'
import resetPassword from '@/snippets/auth/resetPassword'
import Head from 'next/head'
import LogoOverlay from '@/components/LogoOverlay'
import { baseUrl } from '@/context/constants'

export default function register() {
	const router = useRouter()
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [errorMessages, setErrorMessages] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (event) => {
		setLoading(true)
		event.preventDefault()
		const code = router.query.code
		if (!code) {
			setErrorMessages(
				"Couldn't detect the link from which you came. Please click on the link again from the email sent to update your email account"
			)
			return
		}
		if (password !== repeatPassword) {
			setErrorMessages('Password Does Not Match')
			return
		}

		setErrorMessages('')
		try {
			await resetPassword({ code, password })
			setLoading(false)
		} catch (err) {
			setError(
				'The reset password link has expired, check your email for the last email from us'
			)
			setLoading(false)
			return
		}
		router.push('/')
	}

	return (
		<>
			<Head>
				<title>Reset Password</title>
				<meta
					name='description'
					content='Reset Password Page'
				/>
			</Head>
			<div
				className='flex flex-wrap g-0 h-fit'
				style={{ overflow: 'hidden' }}
			>
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
					<div className='flex items-center w-full h-screen place-content-center mobile:px-1'>
						<div className='my-10 desktop:w-3/5 mobile:w-10/12 desktop:my-0 laptop:w-3/5 mobile:my-5'>
							<div className='w-4/5 mb-4 text-2xl font-bold text-textColor'>
								Update your
								<br /> Password
							</div>
							<div className='w-3/4 mt-4 mb-3 text-sm text-textColor'>
								Please update your password with a secure password below.
							</div>
							<form onSubmit={handleSubmit}>
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
									placeholder='Repeat Password'
									type='password'
									onChange={(e) => setRepeatPassword(e.target.value)}
								/>
								<div className=''>
									<div className='mb-1 '>
										<Alert error={errorMessages} />
										<BtnBig
											label={loading ? 'Loading' : 'Update'}
											onClick={handleSubmit}
											color='bg-themeColorMain'
										/>
									</div>
									<h6 className='mt-3 text-sm text-textColor'>
										Already have an account? &nbsp;
										<Link
											href='/'
											className='pl-1 font-semibold ms-1 text-themeColorMain'
										>
											<span className='text-themeColorMain'>Login</span>
										</Link>
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
