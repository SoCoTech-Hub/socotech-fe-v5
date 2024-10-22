import React from 'react'
import Ticket from '@/components/Ticket'
import TicketReplyDisplay from '@/components/TicketReplyDisplay'
import TicketReplyForm from '@/components/TicketReplyForm'
import { parseCookies } from '@/snippets/parseCookies'
import getGQLRequest from '@/snippets/getGQLRequest'
import { SEO } from '@/components/SeoHead'

const ticketdisplay = ({ ticket, id, profileId }) => {
	const seo = {
		title: ticket?.title ? ticket.title : 'Untitled Ticket',
		description: 'Detailed information about your ticket!'
	}
	return (
		<>
			<SEO
				title={seo.title}
				description={seo.description}
			/>
			<div className='desktop:mb-4 laptop:mb-4 mobile:mb-10 col row'>
				<div className='space-y-10 desktop:gx-5 desktop:gy-4 mobile:space-y-3'>
					<Ticket ticket={ticket} />
					<div>
						<TicketReplyDisplay id={id} />
						<div className='mt-4 '>
							<TicketReplyForm
								ticketId={ticket.id}
								profileId={profileId}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	const { id } = context.query
	const cookies = parseCookies(context.req)
	const profileId = parseInt(cookies.profile)
	const { supportTicket } = await getGQLRequest({
		endpoint: `supportTicket`,
		findOne: true,
		id: id,
		fields: `id,title,created_at,supportStatus{id,color,name},description,attachments{id,name,url,formats,mime}`
	})
	return {
		props: {
			ticket: supportTicket,
			profileId: profileId,
			id: id
		}
	}
}

export default ticketdisplay
