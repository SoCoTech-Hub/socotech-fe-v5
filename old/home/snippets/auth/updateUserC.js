import api from "@/api/api"

const updateUserC = async ({
  profileId,
  schools,
  grades,
  provinces,
  uniqueId,
}) => {
  if (typeof window === "undefined") {
    return
  }

  try {
    await api.put(`/profiles/${profileId}`, {
      schools,
      grades,
      provinces,
      uniqueId,
    })

    return
  } catch (err) {
    return err
  }
}

export default updateUserC
