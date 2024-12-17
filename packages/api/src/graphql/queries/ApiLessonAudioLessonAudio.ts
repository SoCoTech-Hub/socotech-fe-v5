
export const GET_APILESSONAUDIOLESSONAUDIO_QUERY = `
query GetApiLessonAudioLessonAudio($limit: Int!) {
  apilessonaudiolessonaudio(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        audio
        audioLinks
        createdAt
        createdBy
        description
        duration
        lessons
        locale
        localizations
        name
        organization
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiLessonAudioLessonAudio {
  id: string;
  attributes: {
    audio: string;
    audioLinks: string;
    createdAt: string;
    createdBy: string;
    description: string;
    duration: string;
    lessons: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiLessonAudioLessonAudioResponse {
  apilessonaudiolessonaudio: {
    data: ApiLessonAudioLessonAudio[];
  };
}
