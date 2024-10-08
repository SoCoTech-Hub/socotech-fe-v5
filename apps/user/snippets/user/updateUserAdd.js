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
    if (addressId) {
      await api.put(`/addresses/${addressId}`, {
        addressLine1,
        addressLine2,
        province: { id: addProvince },
        town,
        contactNr,
        profile: { id: profileId, mobileNr: contactNr },
      })
      await api.put(`/profiles/${profileId}`, {
        mobileNr: contactNr,
      })
    } else {
      await api
        .post(`/addresses`, {
          addressLine1,
          addressLine2,
          province: { id: addProvince },
          town,
          contactNr,
          profile: { id: profileId, mobileNr: contactNr },
        })
        .then(async (res) => {
          await api.put(`/profiles/${profileId}`, {
            mobileNr: contactNr,
            addresses: res.data.addresses,
          })
        })
    }

    return
  } catch (err) {
    return err
  }
}

export default updateUserAdd
