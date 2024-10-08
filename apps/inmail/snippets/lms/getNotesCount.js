import countNotes from "@/snippets/gql/countNotes"

const getNotesCount = async ({ profileId }) => {
  if (profileId) {
    let result = await countNotes({
      profileId,
    })
    return result.notes
  }

  return 0
}
export default getNotesCount
