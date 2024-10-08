import api from '@/api/api'
import { domain } from '@/context/constants'
import Cookies from 'js-cookie'
import uploadImage from './uploadImage'

const uploadBanner = async ({ profileId, banner }) => {
  if (typeof window === 'undefined') {
    return
  }
  try {
    const imageUpload = await uploadImage(banner)
    const response = await api.put(`/profiles/${profileId}`, {
      banner: imageUpload.data[0].id,
    })
    Cookies.remove('banner', {
      expires: 180,
      domain: domain,
      secure: true,
    })
    Cookies.set('banner', response.data.banner.url, {
      expires: 180,
      domain: domain,
      secure: true,
    })
    return
  } catch (err) {
    console.log(err)
  }
}
export default uploadBanner
