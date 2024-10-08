import { useState } from 'react'
import Link from 'next/link'
import AuthNavbar from '@/components/AuthNavbar'
import BtnBig from '@/components/BtnBig'
import InputField from '@/components/InputField'
import Alert from '@/components/Alert'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import getDataRequest from '@/snippets/getDataRequest'
import checkEmail from '@/snippets/auth/checkEmail'
import validateEmail from '@/snippets/auth/validateEmail'
import createTransaction from '@/snippets/payfast/createTransaction'
import sendTransaction from '@/snippets/payfast/sendTransaction'
import Head from 'next/head'
import { mainUrl } from '@/context/constants'

let formatter = new Intl.NumberFormat('en-ZA', {
	style: 'currency',
	currency: 'ZAR',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
})

const register = ({
	price,
	// annualPrice,
	product,
	provinces,
	query
}) => {
	const date = new Date()
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [email, setEmail] = useState('')
	const [cellnr, setCellNr] = useState('')
	// const [password, setPassword] = useState('')
	const [company, setCompany] = useState('')
	const [vatnr, setVatNr] = useState('')
	const [billingAddress, setBillingAddress] = useState('')
	const [billingProvince, setBillingProvince] = useState(0)
	const [billingPostalCode, setBillingPostalCode] = useState('')
	const [additionalInformation, setAdditionalInformation] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [subscription, setSubscription] = useState(null)

	const subscribe = async () => {
		setLoading(true)
		setError('')
		if (!email || !cellnr || !name || !surname) {
			setError('Please ensure all fields are completed')
			setLoading(false)
			return
		}

		// if (password.length < 8) {
		//   setError('Password needs to be 8 or more characters long')
		//   setLoading(false)
		//   return
		// }
		if (!validateEmail({ email: email })) {
			setError('You have entered an invalid email address')
			setLoading(false)
			return
		}
		const emailCheck = await checkEmail({ email })
		if (emailCheck.data.length) {
			setError('Email already in use')
			setLoading(false)
			return
		}
		const date = new Date()
		const cycles = 12 - date.getMonth()

		const data = {
			// Merchant details
			merchantId: product.organization?.merchantId,
			merchant_key: product.organization?.merchantKey,
			return_url: `${process.env.NEXT_PUBLIC_MAIN_URL}/success`,
			cancel_url: `${process.env.NEXT_PUBLIC_MAIN_URL}/cancel`,
			notify_url: `${process.env.NEXT_PUBLIC_AUTH_URL}/api/payfast`,
			// Buyer details
			firstName: name,
			lastName: surname,
			email: email,
			cellnr: cellnr,
			amount: price, //subscription == 1 ? price : annualPrice,
			item: product.title,
			description: product.description,
			orgId: product.organization,
			addressLine1: billingAddress,
			provinceId: billingProvince,
			postalCode: billingPostalCode,
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
			recurringAmount: price, //subscription == 1 ? price : annualPrice,
			// frequency integer, 1 char | REQUIRED FOR SUBSCRIPTIONS
			//  3 - Monthly
			//  4 - Quarterly
			//  5 - Biannually
			//  6 - Annual
			frequency: 3, //subscription == 1 ? 3 : 6,
			// cycles integer, 1 char | REQUIRED FOR SUBSCRIPTIONS
			cycles: cycles, //subscription == 1 ? cycles : 1,
			ref: query.ref || null
		}

		const transaction = await createTransaction({
			data: data
		})
		data['mPaymentId'] = transaction.data.mPaymentId

		await sendTransaction({ data, product })

		setLoading(false)
		return
	}
	const cancel = () => {
		setSubscription(null)
	}

	return (
		<>
			<Head>
				<title>Sign up and payment details</title>
				<meta
					name='description'
					content='text'
					key='title'
				/>
			</Head>
			<div className='flex flex-wrap g-0 place-content-center'>
				<div className='w-full'>
					<AuthNavbar />
				</div>
				<div className='w-full appFullHeight mobile:overflow-scroll no-scrolly'>
					<div className='flex flex-wrap g-0 '>
						<div className='w-full desktop:overflow-scroll desktop:w-1/2 laptop:w-1/2 bg-appBg no-scrolly appFullHeight '>
							<div className='flex flex-wrap justify-center w-full bg-appBg'>
								<div className='w-full desktop:w-3/6 laptop:w-5/6 mobile:px-6 '>
									<div className='pt-3 '>
										<div className='text-4xl font-bold text-textColor'>
											All inclusive license
										</div>
										<div className='text-xl text-left text-textColor align-left'>
											{formatter.format(price)}
											<span className='font-normal'>per month</span>
										</div>
									</div>
									<div className='mt-1 text-md'>
										The person who is responsible for the payment of the
										subscription's details should be added below.
									</div>
									<form>
										<InputField
											id='FirstName'
											icon='ti-user'
											placeholder='Your First Name (Required)'
											onChange={setName}
											value={name}
											required={true}
										/>
										<InputField
											id='LastName'
											icon='ti-user'
											placeholder='Your Last Name (Required)'
											onChange={setSurname}
											value={surname}
											required={true}
										/>
										<InputField
											id='Email'
											icon='ti-email'
											placeholder='Your Email Address (Required)'
											type='email'
											onChange={setEmail}
											value={email}
											required={true}
										/>
										<InputField
											id='MobileNumber'
											icon='ti-mobile'
											placeholder='Your Cell Nr (Required)'
											type='text'
											onChange={setCellNr}
											value={cellnr}
											required={true}
										/>
										<div className='border-2 border-gray-400 border-opacity-50 border-solid rounded-lg'>
											<DefaultSelectNew
												id='province'
												name='province'
												placeholder='Province (Required)'
												options={provinces}
												value={billingProvince}
												valueSetter={setBillingProvince}
											/>
										</div>
										{/* <InputField
                      icon='ti-lock'
                      placeholder='Password (Required)'
                      type='password'
                      onChange={setPassword}
                      value={password}
                      required={true}
                    /> */}
										<div className='w-full pt-3 pb-3'>
											Please ensure all fields are completed before subscribing
											<Alert error={error} />
										</div>
										<div className='flex justify-center my-3'>
											<BtnBig
												label={loading ? 'Loading...' : 'Subscribe'}
												color='bg-themeColorSecondary'
												width='w-4/5'
												onClick={subscribe}
											/>
										</div>
										<div className='h-4'></div>
										<div className=''>
											<div className='flex'>
												<div className=''>
													<span>
														<i className='text-textColor ti-lock'></i>
													</span>{' '}
													Transactions are encrypted and secured.
													{/* <span>
                            &nbsp; Total {formatter.format(price)} billed
                            monthly
                            {subscription == 1
                          ? `Total ${formatter.format(price)} billed monthly`
                          : subscription == 2
                            ? `Total ${formatter.format(
                              annualPrice
                            )} billed annually`
                          : `Please select a billing schedule option`}
                            &nbsp;
                          </span> */}
												</div>
											</div>
											<div className='flex items-center pt-2 font-bold align-middle'>
												<div className=''>Credit or Debit card</div>
												<div className='ml-1'>
													<img
														src='/cardPayment.png'
														alt='Payment'
														className='h-7'
													/>
												</div>
											</div>
										</div>
									</form>

									{/* <form>
                    <div className='flex justify-start w-full py-2 text-left align-left'>
                      <div className=''>Add Invoice Information (Optional)</div>
                    </div>
                    <InputField
                      id='CompanyName'
                      placeholder='Company'
                      onChange={setCompany}
                      value={company}
                    />
                    <InputField
                      id='VATNumber'
                      placeholder='VAT Number'
                      onChange={setVatNr}
                      value={vatnr}
                    />

                    <InputField
                      id='AdditionalInfo'
                      placeholder='Additional Information'
                      onChange={setAdditionalInformation}
                      value={additionalInformation}
                    />
                  </form> */}
								</div>
							</div>
						</div>
						<div className='w-full desktop:overflow-scroll desktop:w-1/2 laptop:w-1/2 no-scrolly '>
							<div className='banner-img mobile:hidden'>
								<img
									src={`${mainUrl}/auth/auth-img.jpg`}
									alt=''
									className='appFullHeight'
								/>
							</div>
							{/* <div className='py-3 text-4xl font-bold text-black '>
                    Your Plan
                  </div> */}
							{/* <DefaultSelectNew
                    options={[
                      { id: 1, name: 'Billed Monthly' },
                      { id: 2, name: 'Billed Annually' },
                    ]}
                    placeholder='Choose your billing schedule'
                    value={subscription}
                    valueSetter={setSubscription}
                  /> */}
							{/* <div className='flex items-center justify-between align-middle'>
                    <div className='text-4xl text-black'>
                      {formatter.format(price)}/
                      <span className='text-3xl'>Month</span>
                    </div>

                    <div className='text-xs'>
                      <div onClick={cancel} className='cursor-pointer'>
                        Cancel
                      </div>
                    </div>
                  </div>
                  <div className=''>
                    {formatter.format(price)} billed monthly */}
							{/* {subscription == 1
                      ? `${formatter.format(price)} billed monthly`
                       : subscription == 2
                       ? `${formatter.format(annualPrice)} billed annually`
                      : `Please select a billing schedule option`} */}
							{/* </div>
                  <div className='py-3'>
                    <hr />
                  </div>
                  <div className=''>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product?.description,
                      }}
                    ></div>
                  </div>
                  <div className='py-3'>
                    <hr />
                  </div>
                  <div className='flex'>
                    <div className=''>
                      <span>
                        <i className='text-black ti-lock'></i>
                      </span>{' '}
                      Transactions are encrypted and secured.
                      <span>
                        &nbsp; Total {formatter.format(price)} billed monthly */}
							{/* {subscription == 1
                          ? `Total ${formatter.format(price)} billed monthly`
                          : subscription == 2
                            ? `Total ${formatter.format(
                              annualPrice
                            )} billed annually`
                          : `Please select a billing schedule option`} */}
							{/* &nbsp;
                      </span>
                    </div>
                  </div> */}
							{/* {subscription ? ( */}
							<>
								{/* <DefaultSelectNew
                        options={sync}
                        placeholder="Choose your card brand"
                        value={paymentBrand}
                        valueSetter={setPaymentBrand}
                        isSearchField
                      /> */}
								{/* <div className='flex items-center pt-2 font-bold align-middle'>
                      <div className=''>Credit or Debit card</div>
                      <div className='ml-1'>
                        <img
                          src='/cardPayment.png'
                          alt='Payment'
                          className='h-7'
                        />
                      </div>
                    </div>
                    <div className=''> */}
								{/*<form action=''>
												 <InputField
                          placeholder='Billing Address'
                          onChange={setBillingAddress}
                          value={billingAddress}
                        /> 
												<DefaultSelectNew
													options={provinces}
													placeholder='Province'
													value={billingProvince}
													valueSetter={setBillingProvince}
												/>
												 <InputField
                          placeholder='Postal Code'
                          onChange={setBillingPostalCode}
                          value={billingPostalCode}
                        /> 
												<div className='w-full pb-3 text-center'>
													Please ensure all fields are completed before
													subscribing
													<Alert error={error} />
												</div>
												<div className='flex justify-center my-3'>
													<BtnBig
														label={loading ? 'Loading...' : 'Subscribe'}
														color='bg-themeColorSecondary'
														width='w-4/5'
														onClick={subscribe}
													/>
												</div>
											</form>*/}
								{/* </div> */}
							</>
							{/*  ) : (  <></>
                   )} */}
						</div>
						{subscription ? (
							<div className='w-full pb-3 text-center'>
								By registering, you agree to the&nbsp;
								<span className='font-bold'>
									<Link
										href='/tou'
										passHref
									>
										Terms of Use
									</Link>
								</span>
								&nbsp; and&nbsp;
								<span className='font-bold'>
									<Link
										href='/pp'
										passHref
									>
										Privacy Policy
									</Link>
								</span>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
export async function getServerSideProps({ query }) {
	const product = await getDataRequest(
		`/products?shopCategories_in=1`,
		() => {}
	)
	const provinces = await getDataRequest(`/provinces`, () => {})
	return {
		props: {
			product: product.length ? product[0] : null,
			// annualPrice: product ? Math.round(product[0].price * 12) : 0,
			price: product.length ? product[0].price : 0,
			provinces: provinces ? provinces : [],
			query: query || null
		}
	}
}

export default register
