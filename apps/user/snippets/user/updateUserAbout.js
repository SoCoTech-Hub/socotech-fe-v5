import api from "@/api/api"

const updateUserAbout = async ({ profileId, about }) => {
  if (typeof window === "undefined") {
    return
  }
  try {
    await api.put(`/profiles/${profileId}`, {
      about: about,
    })
    return
  } catch (err) {
    return err
  }
}

export default updateUserAbout
