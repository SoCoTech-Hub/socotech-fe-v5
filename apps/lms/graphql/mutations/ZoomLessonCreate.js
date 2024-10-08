import { gql } from "@apollo/client"

const ZoomLessonCreate = gql`
mutation ZoomLessonCreate(
  $id: ID!
  $lessonID: ID!
  $active: Boolean
) {
  createZoomLesson(
    input: {
      data: {
        profile: $id
        lesson: $lessonID
        active: $active
      }
    }
  ) {
    zoomLesson {
      id
      profile {
        id
      }
      lesson {
        id
      }
      active
    }
  }
}
`
export default ZoomLessonCreate