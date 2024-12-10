import { gql } from "@apollo/client"

const LessonCapcityUpdate = gql`
mutation LessonCapcityUpdate(
  $id: ID!
  $capcity: Int
) {
  updateLesson(
    input: {
      where: { id: $id }
      data: {
        capacity: $capacity
      }
    }
  ) {
    lesson {
      id
      capacity
    }
  }
}
`
export default LessonCapcityUpdate