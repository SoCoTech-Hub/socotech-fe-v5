import React from "react"
import Ticket from "@/components/Ticket"
import TicketReplyDisplay from "@/components/TicketReplyDisplay"
import TicketReplyForm from "@/components/TicketReplyForm"
import { parseCookies } from "@/snippets/parseCookies"
import getGQLRequest from "@/snippets/getGQLRequest"
import Head from "next/head"

const ticketdisplay = ({ ticket, id, profileId }) => {
	const seo = {
		title: `Topic - ${ticket?.title ? ticket.title : 'Untitled Ticket'}`,
		description: 'Detailed information about your ticket!',
		image: 'https://lms.topic.co.za/support/logo.png',
		url: 'https://topic.co.za'
	}
	return (
		<>
		<Head>
				<title>{seo.title}</title>
				<meta
					name='title'
					content={seo.title}
				/>
				<meta
					name='description'
					content={seo.description}
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content={seo.url}
				/>
				<meta
					property='og:title'
					content={seo.title}
				/>
				<meta
					property='og:description'
					content={seo.description}
				/>
				<meta
					property='og:image'
					content={seo.image}
				/>
				<meta
					property='twitter:card'
					content='summary_large_image'
				/>
				<meta
					property='twitter:url'
					content={seo.url}
				/>
				<meta
					property='twitter:title'
					content={seo.title}
				/>
				<meta
					property='twitter:description'
					content={seo.description}
				/>
				<meta
					property='twitter:image'
					content={seo.image}
				/>
			</Head>
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
    fields: `id,title,created_at,supportStatus{id,color,name},description,attachments{id,name,url,formats,mime}`,
  })
  return {
    props: {
      ticket: supportTicket,
      profileId: profileId,
      id: id,
    },
  }
}

export default ticketdisplay
