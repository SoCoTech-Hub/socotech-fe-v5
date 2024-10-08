import { ProfilePic } from '@/context/constants'

const ProfilePicUrl = () => {
  return ProfilePic != 'null' && ProfilePic != '' && ProfilePic != undefined
    ? ProfilePic
    : ''
}
export default ProfilePicUrl
