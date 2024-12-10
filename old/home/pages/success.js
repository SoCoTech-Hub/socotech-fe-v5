import Head from 'next/head'
import { useRouter } from 'next/router'
import getDataRequest from '@/snippets/getDataRequest'

export default function Success({ transaction }) {
	const router = useRouter()

	const submit = async () => {
		if (transaction?.id) {
			router.push(`/paidreg?uniqueId=${transaction.mPaymentId}`)
		} else {
			router.push('/cancel')
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
			<img
				src='.\logo.png'
				alt='Logo'
				className='logo-overlay desktop:h-24 laptop:h-20 mobile:h-12'
			/>
			<div className='flex items-center w-full h-screen place-content-center'>
				<div className='flex flex-wrap justify-center desktop:w-1/2 mobile:w-3/4'>
					<div className='flex justify-center'>
						<img
							src='.\thankyou.png'
							alt='Thank You Image'
						/>
					</div>
					<div className='w-full mt-4 mb-3 text-4xl font-bold text-center text-themeColorSecondary'>
						Thank you for Subscribing!
					</div>
					<div className='w-full mt-4 mb-3 text-sm text-center text-themeColorSecondary'>
						A receipt is on it's way to your email account
					</div>
					<div className='mt-4 desktop:w-1/3 mobile:w-3/4'>
						<button
							onClick={submit}
							className='px-4 py-3 -mt-2 text-center text-textColor cursor-pointer auth-button bg-themeColorSecondary'
						>
							Click here to continue
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
export async function getServerSideProps(context) {
	const { uniqueId } = context.query
	const transaction = await getDataRequest(
		`/transactions?mPaymentId=${uniqueId}`,
		() => {}
	)
	let transactionEvent = []
	if (transaction.length) {
		transactionEvent = await getDataRequest(
			`/transaction-events?eventId=${transaction[0].id}`,
			() => {}
		)
	}

	return {
		props: {
			transaction: transactionEvent.length
				? transactionEvent[0].type == 'success'
					? transaction[0]
					: null
				: null
		}
	}
}
