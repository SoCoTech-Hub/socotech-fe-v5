import { gql } from "@apollo/client"

const GetLessonModuleNote = gql`
query GetLessonModuleNote($lessonID: ID!, $profileID: ID!) {
  notes(
    where: { lessonModule: { id: $lessonID }, profile: { id: $profileID } }
  ) {
    id
    note
  }
}
`
export default GetLessonModuleNote