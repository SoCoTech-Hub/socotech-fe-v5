import Btn from '@/components/Btn'
import getGQLRequest from '@/snippets/getGQLRequest'
import { parseCookies } from '@/snippets/parseCookies'
import { useRouter } from 'next/router'

const Transaction = ({ affiliateTransactions }) => {
	const router = useRouter()
	return (
		<>
			<div className='p-4 m-auto text-center rounded-lg card border-none shadow-sm'>
				<div className='flex justify-between'><h1 className='m-2 text-xl font-bold '>Affiliate Transactions</h1>
					<div><Btn
						label='Back'
						color='bg-themeColorMain'
						onClickFunction={() => router.back()}
						width='w-32'
					/>
						</div>
					</div>
				<table className='w-fit m-4'>
					<thead>
						<tr>
							<th className='px-2 py-1 border border-gray-400'>Pay date </th>
							<th className='sm:hidden px-2 py-1 border border-gray-400'>
								Account number
							</th>
							<th className='px-2 py-1 border border-gray-400'>Amount paid</th>
							<th className='px-2 py-1 border border-gray-400'>Status </th>
						</tr>
					</thead>
					<tbody>
						{affiliateTransactions ? (
							affiliateTransactions.map((transaction) => (
								<tr key={transaction.id}>
									<td className='px-4 py-2 border border-gray-400'>
										{transaction?.paidDate}
									</td>
									<td className='sm:hidden px-4 py-2 border border-gray-400'>
										{transaction?.accountNumber?.replace(
											/^(.{1}).*(.{4})$/,
											'$1****$2'
										)}
									</td>
									<td className='px-4 py-2 border border-gray-400'>
										{transaction?.paid}
									</td>
									<td
										className='px-4 py-2 border border-gray-400'
										style={{ color: transaction.affiliateStatus.color }}
									>
										{transaction.affiliateStatus.name}
									</td>
								</tr>
							))
						) : (
							<>No Transactions to display</>
						)}
					</tbody>
				</table>
			</div>
			<div className='flex flex-row pt-3'>
				<Btn
					label='Back'
					color='bg-themeColorMain'
					onClickFunction={() => router.back()}
					width='w-32'
				/>
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	const cookies = parseCookies(context.req)
	const profileId = parseInt(cookies.profile)

	const { affiliateTransactions } = await getGQLRequest({
		endpoint: 'affiliateTransactions',
		fields:
			'id, paidDate, accountNumber, paid, balance, affiliateStatus{name, color}',
		where: `affiliate: {profile: {id: ${profileId}}} `
	})

	return {
		props: {
			affiliateTransactions: affiliateTransactions
		}
	}
}

export default Transaction
