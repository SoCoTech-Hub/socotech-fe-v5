import Cookies from 'js-cookie'
import api from '@/api/api'
import { domain } from '@/context/constants'

const updateUserA = async ({ profile, dob, idnumber, gender }) => {
  if (typeof window === 'undefined') {
    return
  }
  try {
    await api.put(`/profiles/${profile}`, {
      dob,
      idNumber: idnumber,
      gender,
    })
    Cookies.remove('register_A_completed', {
      domain: domain,
      secure: true,
    })
    Cookies.set('register_A_completed', 1, {
      domain: domain,
      secure: true,
    })
    return
  } catch (err) {
    return err
  }
}

export default updateUserA
