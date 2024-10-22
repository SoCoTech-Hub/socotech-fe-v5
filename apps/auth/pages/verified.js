import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import resendConfirmation from '@/snippets/auth/resendConfirmation'
import { parseCookies } from '@/snippets/parseCookies'
import { baseUrl } from '@/context/constants'
import Alert from '@/components/Alert'

export default function Verified({ email }) {
	const router = useRouter()
	const rEmail = router.query?.email
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [disabled, setDisabled] = useState(true)

	useEffect(() => {
		const resendEmail = async () => {
			if (rEmail || email) {
				const res = await resendConfirmation({
					email: rEmail ? rEmail : email
				})
				if (res.ok) {
					setSuccess(
						`Confirmation email has been sent successfully to ${
							rEmail ? rEmail : email
						}`
					)
				} else {
					if (res.data.message == 'already.confirmed') {
						setError('This account has already been confirmed')
						return
					}
				}
				setDisabled(true)
			}
		}
		resendEmail()
	}, [rEmail, email])

	useEffect(() => {
		if (!disabled) {
			setTimeout(function () {
				setDisabled(false)
				setSuccess('')
			}, 120000)
		}
	}, [disabled])

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (rEmail || email) {
			try {
				await resendConfirmation({
					email: rEmail ? rEmail : email
				})
				setSuccess('Confirmation email has been sent successfully.')
				setDisabled(true)
				return
			} catch (err) {
				setError('Confirmation email could not be sent, please contact support')
			}
		} else {
			setError('Confirmation email could not be sent, please contact support')
		}
	}

	return (
		<>
			<Head>
				<title>Verified</title>
				<meta
					name='description'
					content='Verified Page'
				/>
			</Head>
			<div className='h-screen overflow-auto'>
				<div
					className='flex items-center justify-center h-full'
					style={{
						backgroundImage: `url(${baseUrl}/background1.png)`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center'
					}}
				>
					<div className='w-11/12 p-3 laptop:w-3/4 mobile:my-5 desktop:my-10 bg-themeColorSecondary rounded-3xl'>
						<div className='grid justify-items-center'>
							<div className='items-center px-4 py-8 text-center bg-themeColorSecondary rounded-3xl'>
								<div className='my-3 text-2xl font-bold text-white laptop:text-4xl'>
									Thank you for registering!
								</div>
								<div className='my-2 text-lg font-bold text-white laptop:text-xl'>
									A verification email has been sent to your email account:
									<div className='my-2 text-center underline'>
										{rEmail ? rEmail : email}
									</div>
								</div>
								<div className='w-full mb-3 text-xs text-center text-white'>
									<div className='flex justify-center'>
										{rEmail || email
											? 'If you have not received this email, click on the button below.'
											: 'Something went wrong, please navigate back'}
									</div>
								</div>

								<div className='w-full'>
									{rEmail || email ? (
										<div className='flex flex-col w-1/2 py-3 mx-auto'>
											{error === 'This account has already been confirmed' ? (
												<Link
													href='/'
													passHref
												>
													<a className='px-2 py-3 mt-2 text-center text-white rounded-md cursor-pointer bg-themeColorMain'>
														Login
													</a>
												</Link>
											) : (
												<button
													onClick={handleSubmit}
													disabled={disabled}
													className='px-2 py-3 mt-2 text-center text-white rounded-md cursor-pointer bg-themeColorMain'
												>
													Resend
												</button>
											)}
										</div>
									) : (
										<div className='flex flex-col w-1/2 py-3 mx-auto'>
											<button
												onClick={() => router.back()}
												className='px-2 py-3 mt-2 text-center text-white rounded-md cursor-pointer bg-themeColorMain'
											>
												Back
											</button>
										</div>
									)}
									<Alert
										error={error}
										success={success}
									/>
								</div>
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
	const email = cookies.email
	return {
		props: {
			email: email ? email : null
		}
	}
}
