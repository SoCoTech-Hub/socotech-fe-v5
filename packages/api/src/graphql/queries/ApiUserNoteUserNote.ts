
export const GET_APIUSERNOTEUSERNOTE_QUERY = `
query GetApiUserNoteUserNote($limit: Int!) {
  apiusernoteusernote(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        lessonModule
        locale
        localizations
        name
        note
        profile
        publishedAt
        read
        show
        subject
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiUserNoteUserNote {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    lessonModule: string;
    locale: string;
    localizations: string;
    name: string;
    note: string;
    profile: string;
    publishedAt: string;
    read: string;
    show: string;
    subject: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiUserNoteUserNoteResponse {
  apiusernoteusernote: {
    data: ApiUserNoteUserNote[];
  };
}
