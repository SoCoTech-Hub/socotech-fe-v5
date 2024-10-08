import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Btn from '@/components/Btn'
import Modal from '@/components/Modal'
import api from '@/api/api'
import { profileId, uniqueId } from '@/context/constants'
import getGQLRequest from '@/snippets/getGQLRequest'
import { parseCookies } from '@/snippets/parseCookies'
import Overlay from '@/components/Overlay'

const Report = ({ referrals, activeUsers, affiliateDetails, isAffiliate }) => {
	const router = useRouter()
	const inactiveUsers = referrals - activeUsers
	const referralLink = `${process.env.NEXT_PUBLIC_MAIN_URL}/register?ref=${uniqueId}`

	const [copySuccess, setCopySuccess] = useState(false)
	const [bankName, setBankName] = useState(affiliateDetails?.bank)
	const [branchCode, setBranchCode] = useState(affiliateDetails?.code)
	const [accountNumber, setAccountNumber] = useState(affiliateDetails?.number)
	const [accountType, setAccountType] = useState(affiliateDetails?.type)
	const [accountName, setAccountName] = useState(affiliateDetails?.name)
	const [isEditable, setEditMode] = useState(false)
	const [open, setOpen] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const copyToClipboard = async () => {
		navigator.clipboard.writeText(referralLink)
		setCopySuccess(true)
	}

	useEffect(() => {
		if (!isAffiliate) {
			// router.push('/affiliate/register')
		}
	}, [])

	useEffect(() => {
		let timer
		if (copySuccess) {
			timer = setTimeout(() => {
				setCopySuccess(false)
			}, 3000)
		}
		return () => {
			clearTimeout(timer)
		}
	}, [copySuccess])

	const saveDetails = async () => {
		if (!affiliateDetails?.id) {
			const res = await api.post(`/affiliate-details`, {
				name: accountName,
				number: accountNumber,
				code: branchCode,
				bank: bankName,
				type: accountType,
				affiliate: { id: profileId }
			})
		} else {
			const res = await api.put(`/affiliate-details/${affiliateDetails.id}`, {
				name: accountName,
				number: accountNumber,
				code: branchCode,
				bank: bankName,
				type: accountType
			})
		}
		setOpen(!open)
		setEditMode(!isEditable)
	}
	return (
		<>
			<div className='w-11/12 space-y-4 border-none rounded-lg shadow-sm bg-compBg card p-14 mobile:py-3 mobile:px-1 mobile:ml-5 desktop:ml-16 laptop:ml-6'>
				<h1 className='text-base font-bold px-0.5 mobile:px-0'>
					Affiliate Report
				</h1>
				<div className='flex flex-row space-x-2 mobile:space-x-0.5 px-0.5 mobile:px-0'>
					<p className='w-1/2 h-8 font-bold text-center text-green-800 border-none rounded-lg bg-compBg card'>
						Active Users: {activeUsers}
					</p>
					<p className='w-1/2 h-8 font-bold text-center text-red-800 bg-gray-300 border-none rounded-lg card'>
						Inactive Users: {inactiveUsers}
					</p>
				</div>
				<div className='space-y-5'>
					<div>
						<label
							htmlFor='first-name'
							className='block text-sm font-semibold leading-6 text-textColor'
						>
							Referral Link
						</label>
						<div className='mt-2.5'>
							<input
								value={referralLink}
								type='text'
								className='block w-full rounded-lg border-0 px-3.5 py-2 text-textColor shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-textColor focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
						<div className='py-2.5'>
							<button
								className='px-4 font-bold rounded-full text-textColor bg-themeColorMain text-md w-60'
								onClick={copyToClipboard}
							>
								{copySuccess
									? 'Link copied to clipboard!'
									: 'Click to copy link'}
							</button>
						</div>
					</div>
					<div className='flex flex-wrap pr-1'>
						<Btn
							label='Affiliate Details'
							color='bg-themeColorMain'
							textSize='text-md'
							textColor='text-textColor font-bold'
							onClickFunction={() => setIsOpen(!open)}
							width='w-48'
						/>
						<div
							className='items-center justify-center'
							style={{ whiteSpace: 'nowrap' }}
						>
							<Btn
								label='Transaction History'
								color='bg-themeColorSecondary'
								textSize='text-md'
								textColor='text-textColor font-bold'
								link='/affiliate/transaction'
								width='w-48'
							/>
						</div>
					</div>
				</div>
			</div>
			<div>
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
							<div className='p-8'>
								<h1 className='py-4 text-base font-bold'>
									Add or change your banking details below:
								</h1>
								<form className='space-y-4'>
									<div className='relative group'>
										<label>Bank Name: </label>
										<input
											className='w-full p-2 border-2 rounded-lg focus'
											placeholder='e.g. Capitec Bank'
											value={bankName}
											onChange={(e) => setBankName(e.target.value)}
											disabled={!isEditable}
										></input>
									</div>
									<div className='relative group'>
										<label>Branch Code: </label>
										<input
											className={`p-2 w-full border-2 rounded-lg focus ${
												isEditable ? 'bg-compBg' : 'bg-gray-100'
											}`}
											placeholder='e.g. 470010'
											value={branchCode}
											onChange={(e) => setBranchCode(e.target.value)}
											disabled={!isEditable}
										></input>
									</div>
									<div className='relative group'>
										<label>Account Number: </label>
										<input
											className={`p-2 w-full border-2 rounded-lg focus ${
												isEditable ? 'bg-compBg' : 'bg-gray-100'
											}`}
											placeholder='e.g. 0000000000'
											value={accountNumber}
											onChange={(e) => setAccountNumber(e.target.value)}
											disabled={!isEditable}
										></input>
									</div>
									<div className='relative group'>
										<label>Account Type: </label>
										<input
											className={`p-2 w-full border-2 rounded-lg focus ${
												isEditable ? 'bg-compBg' : 'bg-gray-100'
											}`}
											placeholder='e.g. Savings'
											value={accountType}
											onChange={(e) => setAccountType(e.target.value)}
											disabled={!isEditable}
										></input>
									</div>
									<div className='relative group'>
										<label>Account Name: </label>
										<input
											className={`p-2 w-full border-2 rounded-lg focus ${
												isEditable ? 'bg-compBg' : 'bg-gray-100'
											}`}
											placeholder='e.g. Example Account'
											value={accountName}
											onChange={(e) => setAccountName(e.target.value)}
											disabled={!isEditable}
										></input>
									</div>
								</form>
							</div>
							<div className='flex flex-row justify-center mb-6'>
								{isEditable ? (
									<Btn
										type='submit'
										label='Save'
										color='bg-themeColorMain'
										textSize='text-md'
										textColor='text-textColor font-bold'
										borderColor='border-themeColorMain'
										onClickFunction={() => saveDetails()}
									/>
								) : (
									<Btn
										label='Edit'
										color='bg-themeColorSecondary'
										textSize='text-md'
										textColor='text-textColor font-bold'
										borderColor='border-themeColorSecondary'
										onClickFunction={() => setEditMode(!isEditable)}
									/>
								)}
							</div>
						</>
					}
				/>
			</div>
		</>
	)
}

export default Report

export async function getServerSideProps({ req }) {
	const cookies = parseCookies(req)
	const userId = cookies.userid
	const date = new Date()
	const isoDate = date.toISOString()

	const activeUsers = await getGQLRequest({
		endpoint: 'usersConnection',
		fields: 'aggregate{count}',
		where: `profile:{referral:{user:{id:${userId}}},isPaying:true},blocked:false,expiryDate_gt:"${isoDate}"`
	})

	const referrals = await getGQLRequest({
		endpoint: 'usersConnection',
		fields: 'aggregate{count}',
		where: `profile:{referral:{user:{id:${userId}}}}`
	})
	const { affiliateDetails } = await getGQLRequest({
		endpoint: 'affiliateDetails',
		fields: 'id,name,number,code,bank,type',
		where: `affiliate:{user:{id:${userId}}}`
	})
	const { profile } = await getGQLRequest({
		endpoint: 'profile',
		findOne: true,
		id: cookies.profile,
		fields: 'isAffiliate'
	})

	return {
		props: {
			activeUsers: activeUsers
				? activeUsers.usersConnection.aggregate.count
				: 0,
			referrals: referrals ? referrals.usersConnection.aggregate.count : 0,
			affiliateDetails: affiliateDetails.length ? affiliateDetails[0] : null,
			isAffiliate: profile?.isAffiliate ? profile.isAffiliate : 0
		}
	}
}
