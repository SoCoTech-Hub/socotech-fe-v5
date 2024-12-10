import api from "@/api/api"

const updateUserA = async ({ profile, dob, mobileNr, gender }) => {
  if (typeof window === "undefined") {
    return
  }
  try {
    await api.put(`/profiles/${profile}`, {
      dob,
      // idNumber: id,
      mobileNr,
      // mobileNr: mobileNr,
      gender,
    })
    return
  } catch (err) {
    return err
  }
}

export default updateUserA
