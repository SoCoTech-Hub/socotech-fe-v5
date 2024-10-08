import api from "@/api/api"

const createTicketComment = async ({
  comment,
  attachments = [],
  ticketId,
  authorId,
}) => {
  if (typeof window === "undefined") {
    return
  }
  try {
    const res = await api.post("/support-comments", {
      comment: comment,
      attachments: attachments,
      supportTicket: { id: ticketId },
      author: { id: authorId },
    })
    const ticket = await api.put(`/support-tickets/${ticketId}`, {
      open: true,
    })
    return res, ticket
  } catch (e) {
    console.warn(e)
  }
}

export default createTicketComment
