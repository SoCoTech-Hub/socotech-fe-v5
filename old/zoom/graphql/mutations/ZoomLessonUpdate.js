import { gql } from "@apollo/client"

const ZoomLessonUpdate = gql`
mutation ZoomLessonUpdate(
  $id: ID!
  $active: Boolean
) {
  updateZoomLesson(
    input: {
      where: { id: $id }
      data: {
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
export default ZoomLessonUpdate