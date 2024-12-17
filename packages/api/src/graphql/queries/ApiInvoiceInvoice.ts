
export const GET_APIINVOICEINVOICE_QUERY = `
query GetApiInvoiceInvoice($limit: Int!) {
  apiinvoiceinvoice(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        body
        createdAt
        createdBy
        locale
        localizations
        publishedAt
        sender
        shipTo
        transaction
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiInvoiceInvoice {
  id: string;
  attributes: {
    body: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    sender: string;
    shipTo: string;
    transaction: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiInvoiceInvoiceResponse {
  apiinvoiceinvoice: {
    data: ApiInvoiceInvoice[];
  };
}
