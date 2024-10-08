import { profileId } from '@/context/constants'
import { useQuery } from '@apollo/client'
import GetSupportTicketsCount from 'graphql/queries/GetSupportTicketsCount'
import React from 'react'
import DigilibLoad from '@/components/DigilibLoad'
import TicketBox from './TicketBox'

const index = () => {
	const { data, error, loading } = useQuery(GetSupportTicketsCount, {
		variables: {
			id: profileId
		}
	})

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
		<div className='grid gap-2 desktop:grid-cols-3 laptop:grid-cols-3 mobile:grid-cols-3 place-items-stretch'>
			<div
				className='rounded-lg col'
				style={{
					backgroundImage:
						'linear-gradient(60deg, rgb(250, 218, 51), rgb(80, 140, 232))'
				}}
			>
				<TicketBox
					title='New Tickets'
					value={data?.newTickets?.aggregate?.count}
				/>
			</div>
			<div
				className='rounded-lg col'
				style={{
					backgroundImage:
						'linear-gradient(60deg, rgb(245, 207, 210), rgb(211, 240, 121))'
				}}
			>
				<TicketBox
					title='Solved Tickets'
					value={data?.solvedTickets?.aggregate?.count}
				/>
			</div>
			<div
				className='rounded-lg col'
				style={{
					backgroundImage:
						'linear-gradient(60deg, rgb(80, 140, 232), rgb(233, 86, 64))'
				}}
			>
				<TicketBox
					title='Pending Tickets'
					value={data?.pendingTickets?.aggregate?.count}
				/>
			</div>
		</div>
	)
}

export default index
