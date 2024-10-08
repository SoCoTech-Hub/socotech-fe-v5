import api from "@/api/api"

const updateUserKin = async ({
  profileId,
  parent,
  parentFirstName,
  parentLastName,
  userRelation,
  parentMobileNr,
}) => {
  if (typeof window === "undefined") {
    return
  }
  const data = {
    firstName: parentFirstName,
    lastName: parentLastName,
    userRelation,
    mobileNr: parentMobileNr,
    profiles: [{ id: profileId }],
  }
  try {
    if (parent) {
      await api.put(`/parents/${parent}`, data)
    } else {
      await api.post(`/parents`, data)
    }

    return
  } catch (err) {
    return err
  }
}

export default updateUserKin
