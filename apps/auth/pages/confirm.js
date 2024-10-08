import { useEffect, useState } from 'react'
import Link from 'next/link'
//import styles from "@/styles/Index.module.css"
import Alert from '@/components/Alert'
import resendConfirmation from '@/snippets/auth/resendConfirmation'
import { parseCookies } from '@/snippets/parseCookies'
import { baseUrl } from '@/context/constants'
import Head from 'next/head'
import LogoOverlay from '@/components/LogoOverlay'
import { useRouter } from 'next/router'

export default function confirm({ email }) {
	const router = useRouter()
	const rEmail = router.query?.email
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [disabled, setDisabled] = useState(true)

	useEffect(async () => {
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
					router.push(`/`)
					return
				}
			}
			setDisabled(true)
		}
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
				<title>Confirm</title>
				<meta
					name='description'
					content='Confirm Page'
				/>
			</Head>
			<div className='overflow-scroll desktop:h-screen laptop:h-screen no-scrolly mobile:h-screen'>
				{/* <div className='mobile:mb-10'><LogoOverlay /></div> */}
				<div
					className='flex items-center justify-center'
					style={{
						backgroundImage: `url(${baseUrl}/confirm-img.png)`,
						height: '100%',
						width: '100%',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center'
					}}
				>
					<div className='desktop:my-10 laptop:my-10 mobile:my-5 desktop:w-3/4 laptop:w-3/4 mobile:w-11/12 mobile:p-3 desktop:p-0 laptop:p-0'>
						<div className='grid justify-items-center'>
							<div className='mobile:w-full desktop:w-1/2 laptop:w-1/2 mobile:mt-3 desktop:mt-0 laptop:mt-0'>
								{/* <img
									src={`${baseUrl}/confirm-img.png`}
									alt='Confirmation Image'
								/> */}
							</div>
							<div className='items-center desktop:px-20 laptop:px-20 desktop:py-8 laptop:py-8 mobile:p-4 bg-compBg rounded-3xl '>
								<div className='my-3 font-bold text-center desktop:text-4xl text-textColor laptop:text-4xl mobile:text-2xl'>
									Thank you for registering!
								</div>
								<div className='my-4 font-bold text-center text-textColor desktop:text-2xl laptop:text-2xl mobile:text-xl'>
									A verification link has been sent to your email account{' '}
									{rEmail ? rEmail : email}
								</div>
								<div className='w-full mt-3 mb-3 text-center text-textColor mobile:text-xs'>
									<div className='flex justify-center desktop:mx-4 laptop:mx-4'>
										Please click on the link that has been send to your email
										account
										<br className='mobile:hidden' /> to verify your email and
										continue the registration process. Rememeber to check your
										Spam folder if the email doesn't appear in your Inbox.
										{!disabled ? (
											<>
												<br />
												<br />
												If you have not received this email please click on the
												resend button below.
											</>
										) : (
											<></>
										)}
									</div>
								</div>
								<div className='flex justify-center px-2 mt-4 mobile:w-full'>
									<Alert
										error={error}
										success={success}
									/>
								</div>
								{disabled ? (
									<></>
								) : (
									<div className='flex justify-center px-2 mt-4'>
										<button
											onClick={handleSubmit}
											className='py-3 -mt-2 text-center text-black rounded-lg cursor-pointer bg-themeColorMain'
										>
											Resend
										</button>
									</div>
								)}
								<div className='flex justify-center'>
									<div className='w-1/2 py-3'>
										<Link
											href='/create'
											passHref
										>
											<div className='p-3 text-center text-black rounded-lg cursor-pointer bg-themeColorMain'>
												Start Again
											</div>
										</Link>
									</div>
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
