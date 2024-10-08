import api from "@/api/api"

const updateUserD = async ({ profile, serialNumber, imei }) => {
  if (typeof window === "undefined") {
    return
  }
  try {
    await api.put(`/profiles/${profile}`, {
      serialNumber,
      imei,
    })

    return
  } catch (err) {
    return err
  }
}

export default updateUserD
