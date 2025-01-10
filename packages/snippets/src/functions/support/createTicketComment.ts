import { api } from "../../api/api";
import { profileId } from "../../context/constants";

interface CreateTicketCommentParams {
  comment: string;
  attachments?: any[];
  ticketId: string;
}

export default async function createTicketComment({
  comment,
  attachments = [],
  ticketId,
}: CreateTicketCommentParams): Promise<
  { commentResponse: any; ticketResponse: any } | undefined
> {
  if (typeof window === "undefined") {
    return;
  }

  try {
    // Create the comment
    const commentResponse = await api.POST("/support-comments", {
      comment,
      attachments,
      supportTicket: { id: ticketId },
      author: { id: profileId },
    });

    // Update the ticket status to open
    const ticketResponse = await api.PUT(`/support-tickets/${ticketId}`, {
      open: true,
    });

    return { commentResponse, ticketResponse };
  } catch (error: any) {
    console.error("Error creating ticket comment or updating ticket:", error);
  }

  return undefined;
}
