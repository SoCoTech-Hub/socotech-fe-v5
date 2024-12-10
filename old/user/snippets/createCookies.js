import Cookies from 'js-cookie'
import { domain } from '@/context/constants'

const Attributes = (days) => {
	var neededAttributes = {
		domain: domain,
		secure: true
	}
	var newAttributes = {
		domain: domain,
		secure: true,
		expires: days ? days : 7
	}
	return { newAttributes, neededAttributes }
}

export const CreateAllCookies = ({
	days,
	rememberMe,
	jwt,
	appBg,
	appBgDark,
	componentBg,
	componentBgDark,
	icon1,
	icon1Dark,
	icon2,
	icon2Dark,
	logo,
	logoDark,
	primaryColor,
	primaryColorDark,
	secondaryColor,
	secondaryColorDark,
	text,
	textDark,
	firstName,
	lastName,
	modDevice,
	deviceId,
	email,
	grades,
	provinces,
	schools,
	subjects,
	hasSiyavulaAccess,
	isPaying,
	isDeveloper,
	organizationId,
	organizationName,
	profileId,
	profilePicUrl,
	profileBannerUrl,
	uniqueId,
	userId,
	roleName //Rights role name
}) => {
	CreateRememberMeCookie({ days, rememberMe })
	CreateIsPayingCookie({ days, isPaying, rememberMe })
	if (email) {
		CreateEmailCookie({ days, email, rememberMe })
	}
	if (grades) {
		CreateGradesCookie({ days, grades, rememberMe })
	}
	if (provinces) {
		CreateProvincesCookie({ days, provinces, rememberMe })
	}
	if (schools) {
		CreateSchoolsCookie({ days, schools, rememberMe })
	}
	if (subjects) {
		CreateSubjectsCookie({ days, subjects, rememberMe })
	}
	if (modDevice) {
		CreateDeviceCookie({ days, modDevice, rememberMe })
	}
	if (deviceId) {
		CreateDeviceIdCookie({ days, deviceId, rememberMe })
	}
	if (appBg) {
		CreateAppBgCookie({ days, appBg, rememberMe })
	}
	if (appBgDark) {
		CreateAppBgDarkCookie({ days, appBgDark, rememberMe })
	}
	if (componentBg) {
		CreateComponentBgCookie({ days, componentBg, rememberMe })
	}
	if (componentBgDark) {
		CreateComponentBgDarkCookie({ days, componentBgDark, rememberMe })
	}
	if (icon1) {
		CreateIcon1Cookie({ days, icon1, rememberMe })
	}
	if (icon1Dark) {
		CreateIcon1DarkCookie({ days, icon1Dark, rememberMe })
	}
	if (icon2) {
		CreateIcon2Cookie({ days, icon2, rememberMe })
	}
	if (icon2Dark) {
		CreateIcon2DarkCookie({ days, icon2Dark, rememberMe })
	}
	if (logo) {
		CreateLogoCookie({ days, logo, rememberMe })
	}
	if (logoDark) {
		CreateLogoDarkCookie({ days, logoDark, rememberMe })
	}
	if (primaryColor) {
		CreatePrimaryColorCookie({ days, primaryColor, rememberMe })
	}
	if (primaryColorDark) {
		CreatePrimaryColorDarkCookie({ days, primaryColorDark, rememberMe })
	}
	if (secondaryColor) {
		CreateSecondaryColorCookie({ days, secondaryColor, rememberMe })
	}
	if (secondaryColorDark) {
		CreateSecondaryColorDarkCookie({ days, secondaryColorDark, rememberMe })
	}
	if (text) {
		CreateTextCookie({ days, text, rememberMe })
	}
	if (textDark) {
		CreateTextDarkCookie({ days, textDark, rememberMe })
	}
	if (firstName) {
		CreateDisplayNameCookie({ days, firstName, lastName, rememberMe })
	}
	if (hasSiyavulaAccess) {
		CreateHasSiyavulaAccessCookie({ days, hasSiyavulaAccess, rememberMe })
	}
	if (isDeveloper) {
		CreateIsDeveloperCookie({ days, isDeveloper, rememberMe })
	}
	if (organizationId) {
		CreateOrganizationIdCookie({ days, organizationId, rememberMe })
	}
	if (organizationName) {
		CreateOrganizationNameCookie({ days, organizationName, rememberMe })
	}
	if (profileId) {
		CreateProfileCookie({ days, profileId, rememberMe })
	}
	if (profilePicUrl) {
		CreateProfilePicCookie({ days, profilePicUrl, rememberMe })
	}
	if (profileBannerUrl) {
		CreateBannerCookie({ days, profileBannerUrl, rememberMe })
	}
	if (roleName) {
		CreateRoleCookie({ days, roleName, rememberMe })
	}
	if (jwt) {
		CreateTokenCookie({ days, jwt, rememberMe })
	}
	if (uniqueId) {
		CreateUniqueIdCookie({ days, uniqueId, rememberMe })
	}
	if (userId) {
		CreateUserIdCookie({ days, userId, rememberMe })
	}
	CreateThemeCookie({ days, rememberMe })
}

export const CreateEmailCookie = ({ days, email, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('email', attrib.neededAttributes)
	Cookies.set('email', email, attrib.newAttributes)
}
export const CreateRememberMeCookie = ({ days, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('rememberMe', attrib.neededAttributes)
	Cookies.set(
		'rememberMe',
		JSON.parse(rememberMe ? rememberMe : false),
		attrib.newAttributes
	)
}
export const CreateAppBgCookie = ({ days, appBg, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('AppBg', attrib.neededAttributes)
	Cookies.set('AppBg', appBg, attrib.newAttributes)
}
export const CreateAppBgDarkCookie = ({ days, appBgDark, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('AppBgDark', attrib.neededAttributes)
	Cookies.set('AppBgDark', appBgDark, attrib.newAttributes)
}
export const CreateComponentBgCookie = ({ days, componentBg, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('ComponentBg', attrib.neededAttributes)
	Cookies.set('ComponentBg', componentBg, attrib.newAttributes)
}
export const CreateComponentBgDarkCookie = ({
	days,
	componentBgDark,
	rememberMe
}) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('ComponentBgDark', attrib.neededAttributes)
	Cookies.set('ComponentBgDark', componentBgDark, attrib.newAttributes)
}
export const CreateGradesCookie = ({ days, grades, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('Grades', attrib.neededAttributes)
	Cookies.set(
		'Grades',
		grades.map((grade) => grade.id).flat(),
		attrib.newAttributes
	)
}
export const CreateIcon1Cookie = ({ days, icon1, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('Icon1', attrib.neededAttributes)
	Cookies.set('Icon1', icon1, attrib.newAttributes)
}
export const CreateIcon1DarkCookie = ({ days, icon1Dark, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('Icon1Dark', attrib.neededAttributes)
	Cookies.set('Icon1Dark', icon1Dark, attrib.newAttributes)
}
export const CreateIcon2Cookie = ({ days, icon2, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('Icon2', attrib.neededAttributes)
	Cookies.set('Icon2', icon2, attrib.newAttributes)
}
export const CreateIcon2DarkCookie = ({ days, icon2Dark, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('Icon2Dark', attrib.neededAttributes)
	Cookies.set('Icon2Dark', icon2Dark, attrib.newAttributes)
}
export const CreateLogoCookie = ({ days, logo, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('Logo', attrib.neededAttributes)
	Cookies.set('Logo', logo, attrib.newAttributes)
}
export const CreateLogoDarkCookie = ({ days, logoDark, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('LogoDark', attrib.neededAttributes)
	Cookies.set('LogoDark', logoDark, attrib.newAttributes)
}
export const CreatePrimaryColorCookie = ({
	days,
	primaryColor,
	rememberMe
}) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('PrimaryColor', attrib.neededAttributes)
	Cookies.set('PrimaryColor', primaryColor, attrib.newAttributes)
}
export const CreatePrimaryColorDarkCookie = ({
	days,
	primaryColorDark,
	rememberMe
}) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('PrimaryColorDark', attrib.neededAttributes)
	Cookies.set('PrimaryColorDark', primaryColorDark, attrib.newAttributes)
}
export const CreateSecondaryColorCookie = ({
	days,
	secondaryColor,
	rememberMe
}) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('SecondaryColor', attrib.neededAttributes)
	Cookies.set('SecondaryColor', secondaryColor, attrib.newAttributes)
}
export const CreateSecondaryColorDarkCookie = ({
	days,
	secondaryColorDark,
	rememberMe
}) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('SecondaryColorDark', attrib.neededAttributes)
	Cookies.set('SecondaryColorDark', secondaryColorDark, attrib.newAttributes)
}
export const CreateProvincesCookie = ({ days, provinces, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('Provinces', attrib.neededAttributes)
	Cookies.set(
		'Provinces',
		provinces.map((province) => province.id).flat(),
		attrib.newAttributes
	)
}
export const CreateSchoolsCookie = ({ days, schools, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('Schools', attrib.neededAttributes)
	Cookies.set(
		'Schools',
		schools.map((school) => school.id).flat(),
		attrib.newAttributes
	)
}
export const CreateSubjectsCookie = ({ days, subjects, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('Subjects', attrib.neededAttributes)
	Cookies.set(
		'Subjects',
		subjects.map((subject) => subject.id).flat(),
		attrib.newAttributes
	)
}
export const CreateTextCookie = ({ days, text, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('Text', attrib.neededAttributes)
	Cookies.set('Text', text, attrib.newAttributes)
}
export const CreateTextDarkCookie = ({ days, textDark, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('TextDark', attrib.neededAttributes)
	Cookies.set('TextDark', textDark, attrib.newAttributes)
}
export const CreateDeviceCookie = ({ days, modDevice, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('device', attrib.neededAttributes)
	Cookies.set('device', modDevice ? modDevice : 0, attrib.newAttributes)
}
export const CreateDeviceIdCookie = ({ days, deviceId, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('deviceId', attrib.neededAttributes)
	Cookies.set('deviceId', deviceId, attrib.newAttributes)
}
export const CreateDisplayNameCookie = ({
	days,
	firstName,
	lastName,
	rememberMe
}) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('displayName', attrib.neededAttributes)
	Cookies.set(
		'displayName',
		`${firstName} ${lastName ? lastName : ''}`,
		attrib.newAttributes
	)
}
export const CreateHasSiyavulaAccessCookie = ({
	days,
	hasSiyavulaAccess,
	rememberMe
}) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('hasSiyavulaAccess', attrib.neededAttributes)
	Cookies.set('hasSiyavulaAccess', hasSiyavulaAccess, attrib.newAttributes)
}
export const CreateIsPayingCookie = ({ days, isPaying, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('isPaying', attrib.neededAttributes)
	Cookies.set('isPaying', isPaying ? isPaying : 0, attrib.newAttributes)
}
export const CreateIsDeveloperCookie = ({ days, isDeveloper, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('isDeveloper', attrib.neededAttributes)
	Cookies.set('isDeveloper', isDeveloper, attrib.newAttributes)
}
export const CreateOrganizationIdCookie = ({
	days,
	organizationId,
	rememberMe
}) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('organizationId', attrib.neededAttributes)
	Cookies.set('organizationId', organizationId, attrib.newAttributes)
}
export const CreateOrganizationNameCookie = ({
	days,
	organizationName,
	rememberMe
}) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('OrganizationName', attrib.neededAttributes)
	Cookies.set('OrganizationName', organizationName, attrib.newAttributes)
}
export const CreateProfileCookie = ({ days, profileId, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('profile', attrib.neededAttributes)
	Cookies.set('profile', profileId, attrib.newAttributes)
}
export const CreateProfilePicCookie = ({ days, profilePicUrl, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('profilePic', attrib.neededAttributes)
	Cookies.set(
		'profilePic',
		profilePicUrl != null ? profilePicUrl : '',
		attrib.newAttributes
	)
}
export const CreateBannerCookie = ({ days, profileBannerUrl, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('banner', attrib.neededAttributes)
	Cookies.set(
		'banner',
		profileBannerUrl ? profileBannerUrl : '',
		attrib.newAttributes
	)
}
export const CreateRoleCookie = ({ days, roleName, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('role', attrib.neededAttributes)
	Cookies.set('role', roleName, attrib.newAttributes)
}
export const CreateThemeCookie = ({ days, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('theme', attrib.neededAttributes)
	Cookies.set('theme', 1, attrib.newAttributes)
}
export const CreateTokenCookie = ({ days, jwt, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('token', attrib.neededAttributes)
	Cookies.set('token', jwt, attrib.newAttributes)
}
export const CreateUniqueIdCookie = ({ days, uniqueId, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('uniqueId', attrib.neededAttributes)
	Cookies.set('uniqueId', uniqueId, attrib.newAttributes)
}
export const CreateUserIdCookie = ({ days, userId, rememberMe }) => {
	const attrib = Attributes(rememberMe ? days : 1)
	Cookies.remove('userid', attrib.neededAttributes)
	Cookies.set('userid', userId, attrib.newAttributes)
}
