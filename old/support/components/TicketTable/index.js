import { profileId } from '@/context/constants'
import { useQuery } from '@apollo/client'
import GetSupportTicketsTable from 'graphql/queries/GetSupportTicketsTable'
import Link from 'next/link'
import DigilibLoad from '@/components/DigilibLoad'
import { useState, useMemo } from 'react'
import Pagination from '@/components/Pagination'

const index = () => {
	let pageSize = 10
	const [currentPage, setCurrentPage] = useState(1)

	const { data, error, loading } = useQuery(GetSupportTicketsTable, {
		variables: {
			id: profileId
		}
	})
	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize
		const lastPageIndex = firstPageIndex + pageSize
		return data?.supportTickets?.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, data])
	if (loading) {
		return (
			<>
				<DigilibLoad loading={loading} />
			</>
		)
	}

	if (error) {
		console.error(error)
		return null
	}

	return (
		<div className='rounded-lg bg-compBg shadow-menu   mobile:overflow-scroll mobile:w-full'>
			<div className='pt-4 pb-3 pl-8 text-left text-textColor'>
				Recent Tickets
			</div>
			<div className='ml-8 mr-8'>
				<hr className='bg-compBg' />
			</div>
			<div className=''>
				{currentTableData?.length ? (
					<>
						<table className='w-full table-auto '>
							<thead>
								<tr>
									<th className='py-4 pl-8 text-textColor '>Ticket ID</th>
									<th className='px-8 py-4 text-textColor '>Ticket Title</th>
									<th className='py-4 text-textColor '>Tag</th>
									<th className='py-4 text-textColor '>Agent</th>
									<th className='py-4 text-textColor '>Status</th>
								</tr>
							</thead>
							<tbody>
								{currentTableData?.map((ticket) => (
									<Link
										href={`/${ticket.id}`}
										passHref
										key={ticket.id}
									>
										<tr className='cursor-pointer'>
											<td className='px-8 py-4 font-extrabold text-textColor'>
												#{ticket?.id}
											</td>
											<td className='px-8 py-4 text-textColor'>
												{ticket?.title}
											</td>
											<td className='py-4 text-textColor'>
												{ticket?.supportTopic?.name}
											</td>
											<td className='py-4 text-textColor'>
												{ticket?.assignedTo
													? `${ticket?.assignedTo?.firstName} ${ticket?.assignedTo?.lastName}`
													: `Unassigned`}
											</td>
											<td
												className={`py-4 text-sm font-extrabold text-textColor ${ticket?.supportStatus?.color}`}
											>
												{ticket?.supportStatus?.name}
											</td>
										</tr>
									</Link>
								))}
							</tbody>
						</table>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Pagination
								className='pagination-bar'
								currentPage={currentPage}
								totalCount={
									data?.supportTickets ? data?.supportTickets.length : 0
								}
								pageSize={pageSize}
								onPageChange={(page) => setCurrentPage(page)}
							/>
						</div>
					</>
				) : (
					<div className='w-full py-4 text-center text-textColor'>
						No Tickets Created
					</div>
				)}
			</div>
		</div>
	)
}

export default index
