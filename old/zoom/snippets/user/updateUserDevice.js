import api from "@/api/api"

const updateUserDevice = async ({ profileId, serialNumber, imei }) => {
  if (typeof window === "undefined") {
    return
  }
  try {
    await api.put(`/profiles/${profileId}`, {
      serialNumber,
      imei,
    })
    return
  } catch (err) {
    return err
  }
}

export default updateUserDevice
