import Cookies from 'js-cookie'
import uploadImage from './uploadImage'
import api from '@/api/api'
import { domain } from '@/context/constants'

const uploadProfilePic = async ({ profileId, profilePic }) => {
  if (typeof window === 'undefined') {
    return
  }
  try {
    const imageUpload = await uploadImage(profilePic)
    if (imageUpload.ok) {
      const response = await api.put(`/profiles/${profileId}`, {
        profilePic: imageUpload.data[0].id,
      })

      Cookies.remove('profilePic', {
        domain: domain,
        secure: true,
      })
      Cookies.set(
        'profilePic',
        `${
          response.data.profilePic
            ? response.data.profilePic?.formats?.thumbnail
              ? response.data.profilePic.formats.thumbnail.url
              : response.data.profilePic.url
            : ''
        }`,
        {
          domain: domain,
          secure: true,
        }
      )
    }

    return
  } catch (err) {
    return err
  }
}
export default uploadProfilePic
