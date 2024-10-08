import api from "@/api/api"

const setNoteRead = async (read, noteID) => {
  if (typeof window === "undefined") {
    return
  }
  try {
    if (noteID) {
      await api.put(`/notes/${noteID}`, {
        read: read,
      })
    }
    return
  } catch (e) {
    return e
  }
}

export default setNoteRead
