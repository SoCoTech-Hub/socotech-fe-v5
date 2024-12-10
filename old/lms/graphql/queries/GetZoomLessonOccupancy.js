import { gql } from "@apollo/client"

const GetZoomLessonOccupancy = gql`
query GetZoomLessonOccupancy($id: ID! $profileID: ID!) {
  lessonCurrent: zoomLessonsConnection(where: { lesson: { id: $id } active: true }) {
    aggregate {
      count
    }
  }
  lessonUser: zoomLessons(where: { lesson: { id: $id } profile: { id: $profileID} }) {
    id
    active
  }
  lessonTotal: lessons(where: { id: $id }) {
    capacity
  }
}
`
export default GetZoomLessonOccupancy