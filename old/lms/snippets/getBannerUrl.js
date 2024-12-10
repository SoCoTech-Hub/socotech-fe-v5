import { Banner, baseUrl } from '@/context/constants'

const getBannerUrl = () => {
  return Banner != 'null' && Banner != '' && Banner != undefined
    ? Banner
    : `${baseUrl}/profile.jpg`
}
export default getBannerUrl
