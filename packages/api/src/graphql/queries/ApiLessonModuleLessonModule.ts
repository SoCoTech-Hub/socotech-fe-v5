
export const GET_APILESSONMODULELESSONMODULE_QUERY = `
query GetApiLessonModuleLessonModule($limit: Int!) {
  apilessonmodulelessonmodule(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        attachment
        audioFiles
        content
        createdAt
        createdBy
        description
        downloadAttachment
        downloadAudio
        duration
        lessons
        locale
        localizations
        name
        price
        publishedAt
        updatedAt
        updatedBy
        videoLink
      }
    }
  }
}
`;

export interface ApiLessonModuleLessonModule {
  id: string;
  attributes: {
    attachment: string;
    audioFiles: string;
    content: string;
    createdAt: string;
    createdBy: string;
    description: string;
    downloadAttachment: string;
    downloadAudio: string;
    duration: string;
    lessons: string;
    locale: string;
    localizations: string;
    name: string;
    price: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
    videoLink: string;
  };
}

export interface GetApiLessonModuleLessonModuleResponse {
  apilessonmodulelessonmodule: {
    data: ApiLessonModuleLessonModule[];
  };
}
