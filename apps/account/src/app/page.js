import { useEffect, useState } from 'react'
import Alert from '@/components/Alert'
import BtnBig from '@/components/BtnBig'
import ProfileUserCover from '@/components/ProfileUserCover'
import getGQLRequest from '@/snippets/getGQLRequest'
import {
	Text,
	email,
	isPaying,
	mainUrl,
	organizationId,
	profileId
} from '@/context/constants'
import api from './api/api'
import Head from 'next/head'
import Link from 'next/link'
import forgotPassword from '@/snippets/auth/forgotPassword'
import { Switch } from '@headlessui/react'
import router from 'next/router'

const AccountSettings = () => {
	const { basePath } = router
	const [subscriptions, setSubscriptions] = useState(null)
	const [newsLetterActive, setNewsLetterActive] = useState(true)
	const [success, setSuccess] = useState('')
	const [smsActive, setSmsActive] = useState(true)
	const [successPwd, setSuccessPwd] = useState('')
	const [error, setError] = useState('')
	const [errorPwd, setErrorPwd] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(async () => {
		const { subscriptions } = await getGQLRequest({
			endpoint: 'subscriptions',
			fields: 'id,newsletterActive,smsActive',
			where: `profiles:{id:${profileId}},organization:{id:${organizationId}}`
		})
		if (subscriptions.length) {
			setSubscriptions(subscriptions[0])
			setNewsLetterActive(subscriptions[0].newsletterActive)
			setSmsActive(subscriptions[0].smsActive)
		}
	}, [])

	useEffect(() => {
		setTimeout(() => {
			setError('')
			setErrorPwd('')
			setSuccess('')
			setSuccessPwd('')
		}, 5000)
	}, [success, successPwd, error, errorPwd])

	const updateNewsletter = async ({ activeNewsLetter, activeSms }) => {
		setLoading(true)
		if (subscriptions?.id) {
			const { data, ok } = await api.put(`subscriptions/${subscriptions.id}`, {
				newsletterActive: activeNewsLetter,
				smsActive: activeSms
			})
			if (!ok) {
				setError('Something went wrong')
			} else {
				setSubscriptions(data)
			}
		} else {
			const { data, ok } = await api.post(`subscriptions`, {
				newsletterActive: activeNewsLetter,
				smsActive: activeSms,
				profiles: { id: profileId },
				organization: { id: organizationId }
			})

			if (!ok) {
				setError('Something went wrong')
			} else {
				setSubscriptions(data)
			}
		}
		setNewsLetterActive(activeNewsLetter)
		setSmsActive(activeSms)
		setSuccess('Subscription updated')
		setLoading(false)
		return
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		const res = await forgotPassword(email)

		if (res.ok) {
			setSuccessPwd('A Password Reset Link has been sent to your email')
		} else {
			setErrorPwd('Something went wrong')
		}
		return
	}
	const seo = {
		title: 'Topic - Billing Info',
		description: 'Discover and update your billing information!',
		image: 'https://lms.topic.co.za/user/logo.png',
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
			<div className='w-full mb-24 mt-1.5'>
				<div className='pt-3 pl-3 pr-3 mb-4 rounded-lg bg-compBg shadow-menu'>
					<ProfileUserCover edit='true' />
					<div className='pb-3 mt-4 ml-2 mr-2'>
						<hr className='bg-compBg' />
					</div>
				</div>
				<div className='space-y-4'>
					<div className='p-4 rounded-lg bg-compBg shadow-menu'>
						<div className='flex flex-row'>
							<div className={`text-themeColorMain text-lg`}>
								Password Update
							</div>
						</div>
						<div className='pt-2'>
							<div className='mb-2 text-sm text-textColor'>
								If you've forgotten your password or want to update it, you can
								reset it here.
							</div>
							<div className='w-1/2'>
								<div className='space-y-1'>
									<button
										className='p-2 text-center text-black rounded-lg shadow-md cursor-pointer bg-themeColorMain buttonHover'
										onClick={(e) => handleSubmit(e)}
									>
										{loading ? 'Loading' : 'Request Password Update'}
									</button>
									<Alert
										error={errorPwd}
										success={successPwd}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='p-4 rounded-lg bg-compBg shadow-menu'>
						<div className='flex flex-row'>
							<div className={`text-themeColorMain text-lg`}>
								Communication Preferences
							</div>
						</div>
						<div className='mt-2 text-sm text-textColor'>
							<div className='font-bold'>Newsletter Subscription</div>
							<div className=''>
								<span
									id='comments-description'
									className=''
								>
									Subscribe/Unsubscribe: Receive or stop receiving newsletters
									with updates and announcements.
								</span>
							</div>
							<div className='flex space-y-1'>
								<div className='items-center h-6 mt-3 mb-4'>
									<Switch
										checked={newsLetterActive}
										onChange={(e) =>
											updateNewsletter({
												activeNewsLetter: e,
												activeSms: smsActive
											})
										}
										className={`
											${newsLetterActive ? 'bg-themeColorMain' : 'bg-themeColorSecondary'}
											relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
										`}
									>
										<span className='sr-only'>Use setting</span>
										<span
											className={`
												${newsLetterActive ? 'translate-x-5' : 'translate-x-0'}
												pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-compBg shadow ring-0 transition duration-200 ease-in-out
											`}
										>
											<span
												className={`
												${
													newsLetterActive
														? 'opacity-100 duration-200 ease-in'
														: 'opacity-0 duration-100 ease-out'
												}
													flex h-full items-center justify-center transition-opacity
												`}
												aria-hidden='true'
											>
												<svg
													className='w-3 h-3 text-compBg'
													fill='currentColor'
													viewBox='0 0 12 12'
												>
													<path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
												</svg>
											</span>
										</span>
									</Switch>
								</div>
							</div>
						</div>
						<div className='text-sm text-textColor'>
							<div className='font-bold '>SMS Notifications</div>
							<div className=''>
								<span
									id='comments-description'
									className=''
								>
									{smsActive
										? 'Unsubscribe: Stop receiving'
										: 'Subscribe: Receive'}{' '}
									SMS notifications from Topic.
								</span>
							</div>
							<div className='flex space-y-1'>
								<div className='items-center h-6 mt-3'>
									<Switch
										checked={smsActive}
										onChange={(e) =>
											updateNewsletter({
												activeNewsLetter: newsLetterActive,
												activeSms: e
											})
										}
										className={`
											${smsActive ? 'bg-themeColorMain' : 'bg-themeColorSecondary'}
											relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
										`}
									>
										<span className='sr-only'>Use setting</span>
										<span
											className={`
												${smsActive ? 'translate-x-5' : 'translate-x-0'}
												pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-compBg shadow ring-0 transition duration-200 ease-in-out
											`}
										>
											<span
												className={`
												${
													smsActive
														? 'opacity-100 duration-200 ease-in'
														: 'opacity-0 duration-100 ease-out'
												}
													flex h-full items-center justify-center transition-opacity
												`}
												aria-hidden='true'
											>
												<svg
													className='w-3 h-3 text-compBg'
													fill='currentColor'
													viewBox='0 0 12 12'
												>
													<path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
												</svg>
											</span>
										</span>
									</Switch>
								</div>
							</div>
						</div>
						<div className='mt-2'>
							<Alert
								error={error}
								success={success}
							/>
						</div>
					</div>
					{isPaying == 1 && (
						<div className='p-4 rounded-lg bg-compBg shadow-menu'>
							<div className='flex flex-row'>
								<div className={`text-themeColorMain text-lg`}>
									Billing information
								</div>
							</div>
							<div className='mt-2'>
								<div className='mb-4 text-sm text-textColor'>
									Billing information button that takes you to your billing
									information.
								</div>
								<Link href='/billing'>
									<a className='p-2.5 rounded-md w-36 text-center bg-themeColorMain shadow-md cursor-pointer text-black my-4'>
										Billing information
									</a>
								</Link>
							</div>
						</div>
					)}
					<div className='p-4 rounded-lg bg-compBg shadow-menu'>
						<div className='flex flex-row'>
							<div className={`text-red-600 text-lg`}>Delete Account</div>
						</div>
						<div className='mt-2'>
							<div className='mb-4 text-sm text-textColor'>
								Warning: Deleting your account will permanently remove all your
								data, including progress and saved content. This action cannot
								be undone. You will have to re-register and start a new account
								on Topic.
							</div>
							<Link href='/unsubscribe'>
								<a className='p-2.5 rounded-md w-36 text-center bg-red-700 hover:bg-red-600 shadow-md cursor-pointer text-black font-bold'>
									Delete My Account
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AccountSettings
