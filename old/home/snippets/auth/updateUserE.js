import Cookies from 'js-cookie'
import api from '@/api/api'
import { domain } from '@/context/constants'

const updateUserE = async ({
  parentId,
  profileId,
  firstName,
  lastName,
  mobileNr,
  // workNr,
  // idnumber,
  // title,
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
    userRelation: { id: userRelation },
  }
  try {
    await (!parentId
      ? api.post('/parents', data)
      : api.put(`/parents/${parentId}`, data))
    Cookies.remove('register_E_completed', {
      domain: domain,
      secure: true,
    })
    Cookies.set('register_E_completed', 1, {
      domain: domain,
      secure: true,
    })
  } catch (err) {
    console.log(err)
    return err
  }
}

export default updateUserE
