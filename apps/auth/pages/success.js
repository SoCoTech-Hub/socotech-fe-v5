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
					content='Redirecting you'
				/>
			</Head>
			<div className='flex items-center justify-center w-full h-screen'>
				<div
					className='flex items-center justify-center w-full h-full'
					style={{
						backgroundImage: `url(${baseUrl}/background1.png)`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center'
					}}
				>
					<div className='p-4 bg-compBg rounded-3xl mobile:w-11/12 laptop:w-1/2 desktop:w-1/2 mobile:my-5 laptop:my-10'>
						<div className='text-center'>
							<div className='my-3 text-2xl font-bold text-textColor mobile:text-2xl laptop:text-4xl desktop:text-4xl'>
								Thank you for Subscribing!
							</div>
							<div className='my-4 text-xl font-bold text-textColor mobile:text-xl laptop:text-2xl desktop:text-2xl'>
								A receipt is on its way to your email account.
							</div>
							<div className='flex justify-center'>
								<div className='w-2/3 py-3 laptop:w-1/3'>
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
	if (transactions.length) {
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
			url: returnTo ? returnTo : '#',
			profile: profiles.length ? profiles[0] : null
		}
	}
}
