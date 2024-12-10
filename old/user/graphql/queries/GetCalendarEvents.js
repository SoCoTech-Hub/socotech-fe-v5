import { gql } from '@apollo/client';

const GetCalendarEvents = gql`
  query GetCalendarEvents(
    $organizationID: ID!
    $currentDate: String!
    $profileId: ID!
  ) {
    events(
      sort: "start:asc"
      where: {
        organization: { id: $organizationID }
        start_gt: $currentDate
        _or: [{ private: false }, { private: true, author: { id: $profileId } }]
      }
    ) {
      id
      title
      start
      end
      image {
        url
      }
      desciption
      lesson {
        id
      }
    }
  }
`;
export default GetCalendarEvents;
