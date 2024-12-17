
export const GET_APISUPPORTTICKETSUPPORTTICKET_QUERY = `
query GetApiSupportTicketSupportTicket($limit: Int!) {
  apisupportticketsupportticket(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        assignedTo
        attachments
        comments
        createdAt
        createdBy
        description
        device
        grade
        locale
        localizations
        name
        open
        organization
        province
        publishedAt
        supportDepartment
        supportStatus
        supportTopic
        timeSpent
        updatedAt
        updatedBy
        url
      }
    }
  }
}
`;

export interface ApiSupportTicketSupportTicket {
  id: string;
  attributes: {
    assignedTo: string;
    attachments: string;
    comments: string;
    createdAt: string;
    createdBy: string;
    description: string;
    device: string;
    grade: string;
    locale: string;
    localizations: string;
    name: string;
    open: string;
    organization: string;
    province: string;
    publishedAt: string;
    supportDepartment: string;
    supportStatus: string;
    supportTopic: string;
    timeSpent: string;
    updatedAt: string;
    updatedBy: string;
    url: string;
  };
}

export interface GetApiSupportTicketSupportTicketResponse {
  apisupportticketsupportticket: {
    data: ApiSupportTicketSupportTicket[];
  };
}
