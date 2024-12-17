
export const GET_APISTEPSTEP_QUERY = `
query GetApiStepStep($limit: Int!) {
  apistepstep(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        lesson
        locale
        localizations
        publishedAt
        steps
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiStepStep {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    lesson: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    steps: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiStepStepResponse {
  apistepstep: {
    data: ApiStepStep[];
  };
}
