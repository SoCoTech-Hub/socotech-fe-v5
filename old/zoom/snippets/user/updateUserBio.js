import api from "@/api/api"

const updateUserAbout = async ({
  profileId,
  firstName,
  lastName,
  dob,
  idNumber,
  gender,
}) => {
  if (typeof window === "undefined") {
    return
  }
  try {
    await api.put(`/profiles/${profileId}`, {
      firstName,
      lastName,
      dob,
      idNumber,
      gender,
    })
    return
  } catch (err) {
    return err
  }
}

export default updateUserAbout
