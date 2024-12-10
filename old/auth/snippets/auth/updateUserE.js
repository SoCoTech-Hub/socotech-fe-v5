import api from "@/api/api"

const updateUserE = async ({
  parentId,
  profileId,
  firstName,
  lastName,
  mobileNr,
  // workNr,
  // idnumber,
  // title,
  email,
  userRelation,
}) => {
  const data = {
    profiles: { id: profileId },
    firstName,
    lastName,
    mobileNr,
    // workNr,
    // idnumber,
    // title,
    email,
    userRelation: { id: userRelation },
  }
  try {
    await (!parentId
      ? api.post("/parents", data)
      : api.put(`/parents/${parentId}`, data))
  } catch (err) {
    console.log(err)
    return err
  }
}

export default updateUserE
