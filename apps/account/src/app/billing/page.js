import { useEffect, useState } from 'react'
import Alert from '@/components/Alert'
import BtnBig from '@/components/BtnBig'
import ProfileUserCover from '@/components/ProfileUserCover'
import InputField from '@/components/InputField'
import Btn from '@/components/Btn'
import getGQLRequest from '@/snippets/getGQLRequest'
import { organizationId, profileId, uniqueId } from '@/context/constants'
import api from './api/api'
import Head from 'next/head'
import Overlay from '@/components/Overlay'
import { pauseSubscription, unpauseSubscription } from './api/payfastApi'
import getReadableDate from '@/snippets/user/getReadableDate'

const billing = () => {
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')
	const [open, setOpen] = useState(false)
	const [transactions, setTransactions] = useState(null)
	const [company, setCompany] = useState('')
	const [vatNr, setVatNr] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [addressLine1, setAddressLine1] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [additionalInformation, setAdditionalInformation] = useState('')
	const [cellNr, setCellNr] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [profile, setProfile] = useState()
	const [org, setOrg] = useState({})

	useEffect(async () => {
		if (uniqueId && organizationId) {
			await getGQLRequest({
				endpoint: 'transactions',
				stateSetter: setTransactions,
				fields:
					'id,company,vatNr,firstName,lastName,email,addressLine1,postalCode,cellnr,additionalInformation,signature',
				where: `mPaymentId:"${uniqueId}"`
			})
			await getGQLRequest({
				endpoint: 'profile',
				stateSetter: setProfile,
				findOne: true,
				id: profileId,
				fields: 'id,cancelDate,isPaying,isPayingDate'
			})
			await getGQLRequest({
				endpoint: 'organization',
				stateSetter: setOrg,
				findOne: true,
				id: organizationId,
				fields: 'merchantId'
			})
		}
	}, [uniqueId])

	useEffect(() => {
		if (transactions?.length) {
			setCompany(transactions ? transactions[0]?.company : '')
			setVatNr(transactions ? transactions[0]?.vatNr : '')
			setFirstName(transactions ? transactions[0]?.firstName : '')
			setLastName(transactions ? transactions[0]?.lastName : '')
			setEmail(transactions ? transactions[0]?.email : '')
			setAddressLine1(transactions ? transactions[0]?.addressLine1 : '')
			setPostalCode(transactions ? transactions[0]?.postalCode : '')
			setAdditionalInformation(
				transactions ? transactions[0]?.additionalInformation : ''
			)
			setCellNr(transactions ? transactions[0]?.cellnr : '')
		}
	}, [transactions])

	const cancelSub = async () => {
		const date = new Date()
		if (transactions[0].signature) {
			await pauseSubscription(transactions[0].signature, org)
		}
		await api.put(`/profiles/${profileId}`, {
			cancelDate: date.toISOString().split('T')[0]
		})
		setIsOpen(false)
		setProfile({ ...profile, cancelDate: date.toISOString().split('T')[0] })
	}

	const unCancelSub = async () => {
		if (transactions[0].signature) {
			await unpauseSubscription(transactions[0].signature, org)
		}
		await api.put(`/profiles/${profileId}`, {
			cancelDate: null
		})
		setIsOpen(false)
		setProfile({ ...profile, cancelDate: '' })
	}

	const save = async () => {
		setSuccess('')
		setError('')
		if (transactions.length) {
			const res = await api.put(`transactions/${transactions[0].id}`, {
				company: company,
				vatNr: vatNr,
				firstName: firstName,
				lastName: lastName,
				email: email,
				addressLine1: addressLine1,
				postalCode: postalCode,
				cellNr: cellNr,
				additionalInformation: additionalInformation
			})
			if (!res.ok) {
				setError('Something went wrong')
			}
		} else {
			const res = await api.post(`transactions`, {
				company: company,
				vatNr: vatNr,
				firstName: firstName,
				lastName: lastName,
				email: email,
				addressLine1: addressLine1,
				postalCode: postalCode,
				cellNr: cellNr,
				additionalInformation: additionalInformation
			})
			if (!res.ok) {
				setError('Something went wrong')
			}
		}
		setSuccess('Billing Information Updated')
		return
	}
	const seo = {
		title: 'Topic - Billing Info',
		description: 'Discover and update your billing information!',
		image: 'https://lms.topic.co.za/user/logo.png',
		url: 'https://topic.co.za'
	}
	const isPayingDate = getReadableDate(profile?.isPayingDate)

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
			<div className='w-full'>
				<div className='pt-3 pl-3 pr-3 mb-4 rounded-lg bg-compBg shadow-menu'>
					<ProfileUserCover edit='true' />
					<div className='pb-3 mt-4 ml-2 mr-2'>
						<hr className='bg-compBg' />
					</div>
				</div>
				<div className='flex my-4 gap-x-4'>
					<BtnBig
						link='invoice'
						label='Generate Invoice'
						color='bg-themeColorMain'
						textColor='black'
					/>
					<BtnBig
						onClickFunction={() => setIsOpen(!open)}
						label={`${
							profile?.cancelDate ? ' Uncancel' : ' Cancel'
						} Subscription`}
						color='bg-themeColorSecondary'
						textColor='black'
					/>
				</div>
				<Overlay
					bgColor='compBg'
					open={open}
					isOpen={isOpen}
					setOpen={setIsOpen}
					width={'3/4'}
					height={58}
					onClose={() => setIsOpen(false)}
					content={
						<>
							<div className='p-4 mb-4 leading-tight text-center rounded-lg text-textColor heading bg-themeColorMain'>
								ARE YOU SURE YOU WISH TO
								{profile?.cancelDate ? ' UNCANCEL' : ' CANCEL'} YOUR
								SUBSCRIPTION?
							</div>
							<div className='flex items-center justify-center'>
								<img
									src='/user/CancelSub.png'
									alt=''
								/>
							</div>
							<div className='mt-2 mb-4 text-xl text-center text-textColor'>
								Your account will be
								{profile?.cancelDate
									? ` uncanceled and your next payment will be on ${isPayingDate}.`
									: ` canceled and you will no longer have access to premium content after ${isPayingDate}`}
							</div>
							<div className='flex justify-center gap-3'>
								<div className=''>
									<Btn
										onClickFunction={
											profile?.cancelDate ? unCancelSub : cancelSub
										}
										label='Yes'
										color={
											profile?.cancelDate ? 'bg-themeColorMain' : 'bg-red-500'
										}
									/>
								</div>
								<div className=''>
									<Btn
										onClickFunction={() => setOpen(!open)}
										label='No'
										color={
											profile?.cancelDate
												? 'bg-themeColorSecondary'
												: 'bg-themeColorMain'
										}
									/>
								</div>
							</div>
						</>
					}
				/>
				<div className='space-y-5'>
					<div className='p-4 rounded-lg bg-compBg shadow-menu '>
						<div className='flex flex-row '>
							<div className='my-3 ml-4 text-lg font-bold text-textColor'>
								Personal Information
							</div>
						</div>
						<div className='pt-3'>
							<div className=''>
								<InputField
									placeholder='Your First name'
									id='firstName'
									value={firstName}
									onChange={() => setFirstName()}
								/>
								<InputField
									placeholder='Your Last name'
									id='lastName'
									value={lastName}
									onChange={() => setLastName()}
								/>
							</div>
							<div className=''>
								<InputField
									placeholder='Your email address'
									id='email'
									value={email}
									onChange={() => setEmail()}
								/>
							</div>
							<div className=''>
								<InputField
									placeholder='Your cell number'
									id='cellNr'
									value={cellNr}
									onChange={() => setCellNr()}
								/>
							</div>
							<div className=''>
								<InputField
									placeholder='Address'
									id='addressLine1'
									value={addressLine1}
									onChange={() => setAddressLine1()}
								/>
							</div>
							<div className=''>
								<InputField
									placeholder='Postal Code'
									id='postalCode'
									value={postalCode}
									onChange={() => setPostalCode()}
								/>
							</div>
						</div>
					</div>
					<div className='p-4 rounded-lg bg-compBg shadow-menu '>
						<div className='flex flex-row '>
							<div className='my-3 ml-4 text-lg font-bold text-textColor '>
								Invoice Information
							</div>
						</div>
						<div className='pt-3'>
							<div className=''>
								<InputField
									id='company'
									placeholder='Company'
									value={company}
									onChange={() => setCompany()}
								/>
							</div>
							<div className=''>
								<InputField
									id='vatNr'
									placeholder='VAT number'
									value={vatNr}
									onChange={() => setVatNr()}
								/>
							</div>
							<div className=''>
								<InputField
									id='addressLine1'
									placeholder='Billing address'
									value={addressLine1}
									onChange={() => setAddressLine1()}
								/>
							</div>
							<div className=''>
								<InputField
									id='additionalInformation'
									placeholder='Additional Information'
									value={additionalInformation}
									onChange={() => setAdditionalInformation()}
								/>
							</div>
						</div>
						<div className='flex flex-row justify-start w-full pt-4'>
							<Alert
								success={success}
								error={error}
							/>
							<Btn
								label='Save'
								color='bg-themeColorMain'
								width='36'
								padding='px-3 py-2'
								onClickFunction={save}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default billing
