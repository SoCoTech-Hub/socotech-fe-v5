import { useAppContext } from "../context/AppContext";

// User
export const useEmail = (): string | undefined => {
  const { user } = useAppContext();
  return user?.attributes.email;
};
export const useRole = (): string | undefined => {
  const { user } = useAppContext();
  return user?.attributes.role;
};
export const useUserId = (): string | undefined => {
  const { user } = useAppContext();
  return user?.id;
};

// Profile
export const useDisplayName = (): string | undefined => {
  const { profile } = useAppContext();
  return `${profile?.attributes.firstName} ${profile?.attributes.lastName}`;
};
export const useFirstName = (): string | undefined => {
  const { profile } = useAppContext();
  return profile?.attributes.firstName;
};
export const useGrades = (): string | undefined => {
  const { profile } = useAppContext();
  return profile?.attributes.grades;
};
export const useHasSiyavulaAccess = (): string | undefined => {
  const { profile } = useAppContext();
  return profile?.attributes.hasSiyavulaAccess;
};
export const useIsDeveloper = (): string | undefined => {
  const { profile } = useAppContext();
  return profile?.attributes.isDeveloper;
};
export const useIsPaying = (): string | undefined => {
  const { profile } = useAppContext();
  return profile?.attributes.isPaying;
};
export const useProfileBanner = (): string | undefined => {
  const { profile } = useAppContext();
  return profile?.attributes.banner;
};
export const useProfileId = (): string | undefined => {
  const { profile } = useAppContext();
  return profile?.id;
};
export const useProfilePic = (): string | undefined => {
  const { profile } = useAppContext();
  return profile?.attributes.profilePic;
};
export const useProvinces = (): string | undefined => {
  const { profile } = useAppContext();
  return profile?.attributes.provinces;
};
export const useSchools = (): string | undefined => {
  const { profile } = useAppContext();
  return profile?.attributes.schools;
};
export const useUniqueId = (): string | undefined => {
  const { profile } = useAppContext();
  return profile?.attributes.uniqueId;
};

// Organization
export const useAppBg = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.appBg;
};
export const useAppBgDark = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.appBgDark;
};
export const useComponentBg = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.componentBg;
};
export const useComponentBgDark = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.componentBgDark;
};
export const useIcon1 = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.icon1;
};
export const useIcon1Dark = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.icon1Dark;
};
export const useIcon2 = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.icon2;
};
export const useIcon2Dark = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.icon2Dark;
};
export const useLogo = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.logo;
};
export const useLogoDark = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.logoDark;
};
export const useOrganizationId = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.id;
};
export const useMerchantId = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.merchantId;
};
export const useOrganizationName = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.name;
};
export const usePrimaryColor = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.primaryColor;
};
export const usePrimaryColorDark = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.primaryColorDark;
};
export const useSecondaryColor = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.secondaryColor;
};
export const useSecondaryColorDark = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.secondaryColorDark;
};
export const useText = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.text;
};
export const useTextDark = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.textDark;
};
export const useOrgEmail = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.email;
};
export const useOrgVat = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.companyVatNr;
};
export const useOrgName = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.companyName;
};
export const useOrgUrl = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.attributes.url;
};
