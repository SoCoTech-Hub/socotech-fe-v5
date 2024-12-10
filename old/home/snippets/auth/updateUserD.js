import Cookies from 'js-cookie'
import api from '@/api/api'
import { domain } from '@/context/constants'

const updateUserD = async ({ profile, serialNumber, imei }) => {
  if (typeof window === 'undefined') {
    return
  }
  try {
    await api.put(`/profiles/${profile}`, {
      serialNumber,
      imei,
    })

    Cookies.remove('register_D_completed', {
      domain: domain,
      secure: true,
    })
    Cookies.set('register_D_completed', 1, {
      domain: domain,
      secure: true,
    })
    return
  } catch (err) {
    return err
  }
}

export default updateUserD
