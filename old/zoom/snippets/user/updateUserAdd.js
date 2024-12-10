import api from "@/api/api"

const updateUserAdd = async ({
  profileId,
  addressId,
  addressLine1,
  addressLine2,
  addProvince,
  town,
  contactNr,
}) => {
  if (typeof window === "undefined") {
    return
  }
  try {
    await api.put(`/addresses/${addressId}`, {
      addressLine1,
      addressLine2,
      addProvince,
      town,
      contactNr,
      profile: { id: profileId, mobileNr: contactNr },
    })
    await api.put(`/profiles/${profileId}`, {
      mobileNr: contactNr,
    })
    return
  } catch (err) {
    return err
  }
}

export default updateUserAdd
