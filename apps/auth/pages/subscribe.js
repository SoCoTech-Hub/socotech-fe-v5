import { useState } from 'react'
import Link from 'next/link'
import BtnBig from '@/components/BtnBig'
import InputField from '@/components/InputField'
import Alert from '@/components/Alert'
// import createTransaction from '@/snippets/payfast/createTransaction'
// import sendTransaction from '@/snippets/payfast/sendTransaction'

import { baseUrl, mainUrl, organizationId } from '@/context/constants'
import { SEO } from '@/components/SeoHead'
import getGQLRequest from '@/snippets/getGQLRequest'
import createTransaction from '@/snippets/payfast/createTransaction'
import sendTransaction from '@/snippets/payfast/sendTransaction'
import Checkbox from '@/components/Checkbox'

let formatter = new Intl.NumberFormat('en-ZA', {
	style: 'currency',
	currency: 'ZAR',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
})

const subscribe = ({ product, user, url }) => {
	const [company, setCompany] = useState('')
	const [vatnr, setVatNr] = useState('')
	const [email, setEmail] = useState('')
	const [additionalInformation, setAdditionalInformation] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [isChecked, setIsCheck] = useState(false)

	const subscribe = async () => {
		setLoading(true)
		setError('')

		const date = new Date()
		const cycles = 12 - date.getMonth()

		const lastName =
			user.profile.lastName || user.profile.firstName?.split(' ').pop()
		const data = {
			// Merchant details
			merchantId: product.organization?.merchantId,
			merchant_key: product.organization?.merchantKey,
			return_url: `${mainUrl}${baseUrl}/success?returnTo=${url}&uniqueId=${user.profile?.uniqueId}`,
			cancel_url: `${mainUrl}${baseUrl}/cancel?returnTo=${url}`,
			notify_url: `${mainUrl}${baseUrl}/api/payfast`,
			// Buyer details
			firstName: user.profile.firstName,
			lastName: lastName,
			email: email.length ? email : user.email,
			// cellnr: user.profile.mobileNr.replace(/[\s_]/g, ''),
			uniqueId: user.profile.uniqueId,
			mPaymentId: user.profile.uniqueId,
			amount: product.price, //subscription == 1 ? price : annualPrice,
			item: product.title,
			description: product.description,
			orgId: product.organization.id || organizationId,
			company: company,
			vatNr: vatnr,
			additionalInformation: additionalInformation,
			// password: password,
			//email_confirmation boolean, 1 char | OPTIONAL */}
			emailConfirmation: 1,
			// payment_method string, 3 char | OPTIONAL
			//     'eft' - EFT
			//     'cc' - Credit card
			//     'dc' - Debit card
			//     'mp' - Masterpass
			//     'mc' - Mobicred
			//     'sc' - SCode
			//     'ss' - SnapScan
			//     'zp' - Zapper
			//     'mt' - MoreTyme
			paymentMethod: 'cc',
			// subscription_type integer, 1 char | REQUIRED FOR SUBSCRIPTIONS
			subscriptionType: 1, //1 - sets type to a subscription, 2 - sets type to a tokenization payment
			// billing_date date (YYYY-MM-DD) | OPTIONAL
			billingDate: date.toISOString().split('T')[0],
			// recurring_amount decimal | OPTIONAL
			recurringAmount: product.price, //subscription == 1 ? price : annualPrice,
			// frequency integer, 1 char | REQUIRED FOR SUBSCRIPTIONS
			//  3 - Monthly
			//  4 - Quarterly
			//  5 - Biannually
			//  6 - Annual
			frequency: 3, //subscription == 1 ? 3 : 6,
			// cycles integer, 1 char | REQUIRED FOR SUBSCRIPTIONS
			cycles: cycles, //subscription == 1 ? cycles : 1,
			ref: user.profile.uniqueId || null
		}
		await createTransaction({
			data: data
		})
		await sendTransaction({ data, product })
		setLoading(false)
		return
	}
	const cancel = () => {
		return window.location.replace(`${mainUrl}${url}`)
	}
	const seo = {
		title: 'Subscribe',
		description: 'Subscribe to our premium content'
	}

	return (
		<>
			<SEO
				title={seo.title}
				description={seo.description}
			/>
			<div className='flex flex-wrap overflow-x-hidden g-0'>
				<div className='w-full desktop:w-1/2 laptop:w-1/2 mobile:h-1/3'>
					<div className='flex items-center w-full desktop:h-screen laptop:h-screen place-content-center'>
						<img
							src={product.image[0].url ?? `${mainUrl}/auth/image.jpg`}
							alt='Login Image'
							className='object-cover object-center h-full mobile:hidden'
						/>
					</div>
				</div>
				<div className='w-full bg-compBg desktop:w-1/2 laptop:w-1/2 mobile:h-2/3 text-textColor'>
					<div className='flex items-center w-full desktop:h-screen laptop:h-screen place-content-center mobile:mx-1 mobile:-mt-4'>
						<div className='my-10 desktop:w-3/5 mobile:w-10/12 desktop:my-0 laptop:w-3/5'>
							<div className='pt-3 '>
								<div className='py-4 text-4xl font-bold'>{product.title}</div>
								<div className='py-2 text-xl text-left align-left'>
									{formatter.format(product.price)}
									<span className='font-normal'> per month</span>
								</div>
								<div className='text-sm text-left align-left'>
									<div
										dangerouslySetInnerHTML={{
											__html: product.description
										}}
									/>
								</div>
							</div>

							<form autoComplete='on'>
								<div className='my-4'>Add Invoice Information (Optional)</div>
								<InputField
									id='Email'
									placeholder='Email'
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
								<InputField
									id='CompanyName'
									placeholder='Company'
									onChange={(e) => setCompany(e.target.value)}
									value={company}
								/>
								{company && (
									<InputField
										id='VATNumber'
										placeholder='VAT Number'
										onChange={(e) => setVatNr(e.target.value)}
										value={vatnr}
									/>
								)}
								<InputField
									id='AdditionalInfo'
									placeholder='Additional Information'
									onChange={(e) => setAdditionalInformation(e.target.value)}
									value={additionalInformation}
								/>

								<div className='flex flex-row h-10 text-left align-middle'>
									<div className='mt-0.5'>
										<Checkbox
											setter={setIsCheck}
											value={isChecked}
										/>
									</div>
									<div className='text-sm mt-0.5 '>
										<span className='font-bold text-textHeading '>Accept </span>
										<Link
											href='/tou'
											passHref
										>
											<a
												target='_blank'
												rel='noopener noreferrer'
											>
												<span className='font-bold cursor-pointer text-textHeading'>
													terms and conditions
												</span>
											</a>
										</Link>
										<span className='font-bold text-textHeading '>, </span>
										<Link
											href='/privacy'
											passHref
										>
											<a
												target='_blank'
												rel='noopener noreferrer'
											>
												<span className='font-bold cursor-pointer text-textHeading '>
													privacy policy
												</span>
											</a>
										</Link>
										<span className='font-bold text-textHeading '> and </span>
										<Link
											href='/payment'
											passHref
										>
											<a
												target='_blank'
												rel='noopener noreferrer'
											>
												<span className='font-bold cursor-pointer text-textHeading '>
													payment policy
												</span>
											</a>
										</Link>
									</div>
								</div>
								<div className='flex'>
									<div className=''>
										<span>
											<i className='text-textColor ti-lock'></i>
										</span>{' '}
										Transactions are encrypted and secured.
									</div>
								</div>

								<div className=''>
									<Alert error={error} />
									{isChecked ? (
										<BtnBig
											label={loading ? 'Loading...' : 'Subscribe'}
											onClick={subscribe}
											color='bg-themeColorMain'
											disabled={loading}
										/>
									) : (
										<></>
									)}
									<div className='py-1'>
										<BtnBig
											label={'Cancel'}
											color='bg-themeColorSecondary my-3'
											onClick={() => cancel()}
										/>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export async function getServerSideProps({ req }) {
	const { organizationId, userid } = req.cookies

	const url = req.__NEXT_INIT_QUERY?.from

	const { products } = await getGQLRequest({
		endpoint: 'products',
		fields:
			'price,description,title,image{url},organization{id,merchantId,merchantKey}',
		where: `organization:{id:${organizationId}}`
	})

	const { user } = await getGQLRequest({
		endpoint: 'user',
		findOne: true,
		id: userid,
		fields: 'email,profile{firstName,lastName,uniqueId}'
	})

	return {
		props: {
			product: products.length ? products[0] : null,
			user: user || null,
			url: url || ''
		}
	}
}

export default subscribe
