import Head from 'next/head'
import { useRouter } from 'next/router'
import getGQLRequest from '@/snippets/getGQLRequest'
import { baseUrl, mainUrl, orgName } from '@/context/constants'
import { CreateAllCookies } from '@/snippets/createCookies'
import sendSubscribeMail from '@/snippets/auth/sendSubscribeMail'

export default function Success({ transaction, url, profile }) {
	const router = useRouter()

	const submit = async () => {
		if (transaction?.id) {
			CreateAllCookies({ isPaying: true })
			await sendSubscribeMail({ orgName: orgName, profileId: profile })
			window.location.assign(`${mainUrl}${url}`)
		} else {
			router.push(`/cancel?returnTo=${url}`)
		}
	}

	return (
		<>
			<Head>
				<title>Redirect</title>
				<meta
					name='description'
					content='redirecting you'
				/>
			</Head>
			<div className='w-full'>
				<div className='justify-items-center'>
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
							<div className='desktop:my-10 laptop:my-10 mobile:my-5 desktop:w-1/2 laptop:w-1/2 mobile:w-11/12 mobile:p-3 desktop:p-0 laptop:p-0'>
								<div className='justify-items-center'>
									<div className='mobile:w-full desktop:w-1/2 laptop:w-1/2 mobile:mt-3 desktop:mt-0 laptop:mt-0'>
										{/* <img
									src={`${baseUrl}/confirm-img.png`}
									alt='Confirmation Image'
								/> */}
									</div>
									<div className='items-center desktop:px-20 laptop:px-20 desktop:py-8 laptop:py-8 mobile:p-4 bg-compBg rounded-3xl '>
										<div className='my-3 font-bold text-center desktop:text-4xl text-textColor laptop:text-4xl mobile:text-2xl'>
											Thank you for Subscribing!
										</div>
										<div className='my-4 font-bold text-center text-textColor desktop:text-2xl laptop:text-2xl mobile:text-xl'>
											A receipt is on it's way to your email account
										</div>
										<div className='flex justify-center'>
											<div className='w-1/3 py-3'>
												<button onClick={() => submit()}>
													<div className='p-3 text-center text-black rounded-lg cursor-pointer bg-themeColorMain'>
														Click here to continue
													</div>
												</button>
											</div>
										</div>
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
	const { uniqueId, returnTo } = context.query

	const { transactions } = await getGQLRequest({
		endpoint: 'transactions',
		fields: 'id',
		where: `mPaymentId:"${uniqueId}"`,
		sort: 'id:desc'
	})
	const { profiles } = await getGQLRequest({
		endpoint: 'profiles',
		fields: 'id',
		where: `uniqueId:"${uniqueId}"`,
		sort: 'id:desc'
	})

	let transactionEvent = []
	if (transactions) {
		const { transactionEvents } = await getGQLRequest({
			endpoint: 'transactionEvents',
			fields: 'id,type',
			where: `eventId:"${transactions[0].id}"`,
			sort: 'id:desc'
		})

		transactionEvent = transactionEvents[0]
	}

	return {
		props: {
			transaction: transactionEvent
				? transactionEvent.type == 'COMPLETE'
					? transactions[0]
					: null
				: null,
			url: returnTo,
			profile: profiles[0]
		}
	}
}
