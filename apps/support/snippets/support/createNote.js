import api from "@/api/api"

const createNote = async ({
  name,
  note,
  read = false,
  lessonModuleId = null,
  subjectId = null,
  profileId,
}) => {
  if (typeof window === "undefined") {
    return
  }
  try {
    let response = null
    if (subjectId) {
      if (lessonModuleId) {
        response = await api.post("/notes", {
          name: name,
          note: note,
          read: read,
          lessonModule: { id: lessonModuleId },
          subject: { id: subjectId },
          profile: { id: profileId },
        })
      } else {
        response = await api.post("/notes", {
          name: name,
          note: note,
          read: read,
          subject: { id: subjectId },
          profile: { id: profileId },
        })
      }
    } else {
      if (lessonModuleId) {
        response = await api.post("/notes", {
          name: name,
          note: note,
          read: read,
          lessonModule: { id: lessonModuleId },
          profile: { id: profileId },
        })
      } else {
        response = await api.post("/notes", {
          name: name,
          note: note,
          read: read,
          profile: { id: profileId },
        })
      }
    }
    return response
  } catch (e) {
    return e
  }
}

export default createNote
