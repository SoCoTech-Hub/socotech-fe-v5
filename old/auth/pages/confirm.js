import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Page } from '@/components/Page'
import { SEO } from '@/components/SeoHead'
import resendConfirmation from '@/snippets/auth/resendConfirmation'
import { parseCookies } from '@/snippets/parseCookies'

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
			<SEO
				title='Confirm'
				description='Confirm Page'
			/>
			<Page
				header='Thank you for registering!'
				message={
					<>
						<div className='my-4 font-bold text-center text-textColor desktop:text-2xl laptop:text-2xl mobile:text-xl'>
							A verification link has been sent to your email account{' '}
							{rEmail ? rEmail : email}
						</div>
						<div className='w-full mt-3 mb-3 text-center text-textColor mobile:text-xs'>
							<div className='flex justify-center desktop:mx-4 laptop:mx-4'>
								This may take a few minutes. Once this email has been received,
								Please click on the link to verify your email and continue the
								registration process.
								<br className='mobile:hidden' /> If you used the wrong email
								please click on the Start Again button below.
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
					</>
				}
				error={error}
				success={success}
				buttons={[
					!disabled ? (
						<button
							onClick={handleSubmit}
							className='px-8 py-3 text-center rounded-lg cursor-pointer text-textColorSecondary bg-themeColorMain'
						>
							Resend
						</button>
					) : (
						<></>
					),
					<Link
						href='/create'
						passHref
					>
						<div className='p-3 text-center rounded-lg cursor-pointer text-textColorSecondary bg-themeColorSecondary'>
							Start Again
						</div>
					</Link>
				]}
			/>
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
