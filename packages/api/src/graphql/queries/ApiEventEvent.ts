
export const GET_APIEVENTEVENT_QUERY = `
query GetApiEventEvent($limit: Int!) {
  apieventevent(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        author
        color
        createdAt
        createdBy
        desciption
        end
        grade
        image
        isLive
        lesson
        locale
        localizations
        location
        organization
        private
        province
        publishedAt
        school
        start
        student
        suburb
        teacher
        title
        updatedAt
        updatedBy
        url
      }
    }
  }
}
`;

export interface ApiEventEvent {
  id: string;
  attributes: {
    author: string;
    color: string;
    createdAt: string;
    createdBy: string;
    desciption: string;
    end: string;
    grade: string;
    image: string;
    isLive: string;
    lesson: string;
    locale: string;
    localizations: string;
    location: string;
    organization: string;
    private: string;
    province: string;
    publishedAt: string;
    school: string;
    start: string;
    student: string;
    suburb: string;
    teacher: string;
    title: string;
    updatedAt: string;
    updatedBy: string;
    url: string;
  };
}

export interface GetApiEventEventResponse {
  apieventevent: {
    data: ApiEventEvent[];
  };
}
