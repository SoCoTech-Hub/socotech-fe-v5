// TODO: this needs to rather be fetched from api since we have the types from strapi stored on @acme/api
export interface Organization {
  id: string;
  name: string;
  appBg: string;
  appBgDark: string;
  componentBg: string;
  componentBgDark: string;
  icon1: string;
  icon1Dark: string;
  icon2: string;
  icon2Dark: string;
  logo?: { url: string };
  logoDark?: { url: string };
  primaryColor: string;
  primaryColorDark: string;
  secondaryColor: string;
  secondaryColorDark: string;
  text: string;
  textDark: string;
}

export interface User {
  id: string;
  email: string;
  profile: {
    id: string;
    firstName?: string;
    lastName?: string;
    profilePic?: { url?: string };
    banner?: { url?: string };
    role: { id: string };
    uniqueId?: string;
    deviceId?: string;
    provinces?: { id: string; name: string }[];
    schools?: { id: string; name: string }[];
    grades?: { id: string; name: string }[];
    organization: Organization;
    isDeveloper?: boolean;
    isPaying?: boolean;
    hasSiyavulaAccess?: boolean;
  };
}
