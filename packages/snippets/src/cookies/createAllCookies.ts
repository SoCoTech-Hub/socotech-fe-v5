import { CreateCookie } from "./crudCookie";

interface CreateAllCookiesParams {
  days?: number; // Used to determine expiration time
  rememberMe?: boolean;
  jwt?: string;
  appBg?: string;
  componentBg?: string;
  icon1?: string;
  icon2?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  text?: string;
  firstName?: string;
  lastName?: string;
  modDevice?: string;
  deviceId?: string;
  email?: string;
  grades?: { id: string }[];
  provinces?: { id: string }[];
  schools?: { id: string }[];
  subjects?: { id: string }[];
  hasSiyavulaAccess?: boolean;
  isPaying?: boolean;
  isDeveloper?: boolean;
  organizationId?: string;
  organizationName?: string;
  profileId?: string;
  profilePicUrl?: string;
  profileBannerUrl?: string;
  uniqueId?: string;
  userId?: string;
  roleName?: string;
}

export function CreateAllCookies(params: CreateAllCookiesParams): void {
  const {
    days,
    rememberMe,
    jwt,
    appBg,
    componentBg,
    icon1,
    icon2,
    logo,
    primaryColor,
    secondaryColor,
    text,
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
    roleName,
  } = params;

  // Calculate expiration time (e.g., "7d" or "1d" if not remembering)
  const expiration = rememberMe ? `${days ?? 7}d` : "1d";

  const cookiesToCreate = [
    { key: "jwt", value: jwt },
    { key: "appBg", value: appBg },
    { key: "componentBg", value: componentBg },
    { key: "icon1", value: icon1 },
    { key: "icon2", value: icon2 },
    { key: "logo", value: logo },
    { key: "primaryColor", value: primaryColor },
    { key: "secondaryColor", value: secondaryColor },
    { key: "text", value: text },
    { key: "device", value: modDevice },
    { key: "deviceId", value: deviceId },
    { key: "email", value: email },
    { key: "grades", value: grades?.map((grade) => grade.id).join(",") },
    {
      key: "provinces",
      value: provinces?.map((province) => province.id).join(","),
    },
    { key: "schools", value: schools?.map((school) => school.id).join(",") },
    {
      key: "subjects",
      value: subjects?.map((subject) => subject.id).join(","),
    },
    { key: "hasSiyavulaAccess", value: hasSiyavulaAccess?.toString() },
    { key: "isPaying", value: isPaying ? "1" : "0" },
    { key: "isDeveloper", value: isDeveloper?.toString() },
    { key: "organizationId", value: organizationId },
    { key: "organizationName", value: organizationName },
    { key: "profile", value: profileId },
    { key: "profilePic", value: profilePicUrl ?? "" },
    { key: "banner", value: profileBannerUrl ?? "" },
    { key: "role", value: roleName },
    { key: "uniqueId", value: uniqueId },
    { key: "userid", value: userId },
    { key: "displayName", value: `${firstName} ${lastName || ""}`.trim() },
    { key: "theme", value: "1" },
    { key: "rememberMe", value: rememberMe ? rememberMe.toString() : "0" },
  ];

  // Create cookies
  cookiesToCreate.forEach(({ key, value }) => {
    if (value !== undefined) {
      CreateCookie({ key, value, time: expiration });
    }
  });
}
