import api from '@/api/api'

const updateUserB = async ({
  profileId,
  addressId,
  province,
  country = 1,
  addressLine1,
  addressLine2,
  town,
  postalCode = '0000',
  mobileNr,
}) => {
  if (typeof window === 'undefined') {
    return
  }
  try {
    if (addressId) {
      await api.put(`/addresses/${addressId}`, {
        province,
        country,
        addressLine1,
        addressLine2,
        town,
        postalCode,
        contactNr: mobileNr,
        profile: { id: profileId },
      })
      await api.put(`/profiles/${profileId}`, {
        mobileNr: mobileNr,
      })
    } else {
      await api.post(`/addresses/`, {
        province,
        country,
        addressLine1,
        addressLine2,
        town,
        postalCode,
        contactNr: mobileNr,
        profile: { id: profileId },
      })
      await api.put(`/profiles/${profileId}`, {
        mobileNr: mobileNr,
      })
    }
  } catch (err) {
    return err
  }
}

export default updateUserB
