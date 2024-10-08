import Cookies from 'js-cookie'
import uploadImage from './uploadImage'
import api from '@/api/api'
import { domain } from '@/context/constants'

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
      domain: domain,
      secure: true,
    })
    Cookies.set('banner', response.data.banner.url, {
      domain: domain,
      secure: true,
    })
    return
  } catch (err) {
    console.error('banner', err)
  }
}
export default uploadBanner
