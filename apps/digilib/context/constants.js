import Cookies from 'js-cookie'

export const gtag = process.env.NEXT_PUBLIC_GTAG_ID
export const domain = process.env.NEXT_PUBLIC_DOMAIN
export const apiUrl = process.env.NEXT_PUBLIC_API_URL
export const gqlUrl = process.env.NEXT_PUBLIC_GQL_URL
export const mainUrl = process.env.NEXT_PUBLIC_MAIN_URL
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const baseName = process.env.NEXT_PUBLIC_BASE_NAME
export const env = process.env.ENV_MODE
export const cloudinaryVideoUrl = process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_URL
//Cookie theme
export const AppBg = Cookies.get('AppBg')
export const AppBgDark = Cookies.get('AppBgDark')
export const ComponentBg = Cookies.get('ComponentBg')
export const ComponentBgDark = Cookies.get('ComponentBgDark')
export const ComponentBgHover = ComponentBgDark
export const ComponentBgDarkHover = ComponentBg
export const Icon1 = Cookies.get('Icon1')
export const Icon1Dark = Cookies.get('Icon1Dark')
export const Icon2 = Cookies.get('Icon2')
export const Icon2Dark = Cookies.get('Icon2Dark')
export const Logo = Cookies.get('Logo')
export const LogoDark = Cookies.get('LogoDark')
export const PrimaryColor = Cookies.get('PrimaryColor')
export const PrimaryColorDark = Cookies.get('PrimaryColorDark')
export const SecondaryColor = Cookies.get('SecondaryColor')
export const SecondaryColorDark = Cookies.get('SecondaryColorDark')
export const Text = Cookies.get('Text')
export const TextDark = Cookies.get('TextDark')
export const TextHover = PrimaryColor
export const TextDarkHover = Text

//Cookie Constants
export const email = Cookies.get('email')
export const organizationId = Cookies.get('organizationId')
export const orgName = Cookies.get('OrganizationName')
export const profileId = Cookies.get('profile')
export const ProfilePic = Cookies.get('profilePic')
export const Banner = Cookies.get('banner')
export const hasSiyavulaAccess = Cookies.get('hasSiyavulaAccess')
export const rememberMe = Cookies.get('rememberMe')
export const theme = Cookies.get('theme')
export const device = Cookies.get('device')
export const userName = Cookies.get('displayName')
export const uniqueId = Cookies.get('uniqueId')
export const userId = Cookies.get('userid')
export const role = Cookies.get('role')
export const isDeveloper = Cookies.get('isDeveloper')

//school Details
export const provinces = Cookies.get('Provinces')
export const schools = Cookies.get('Schools')
export const grades = Cookies.get('Grades')
//paid customer
export const isPaying = parseInt(Cookies.get('isPaying'))
export const deviceId = Cookies.get('deviceId')
