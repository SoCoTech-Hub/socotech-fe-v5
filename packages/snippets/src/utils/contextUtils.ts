import { useAppContext } from "../context/AppContext";

// User
export const useEmail = (): string => {
  console.log("useEmail");
  try {
    const { user } = useAppContext();
    return user?.attributes.email || "";
  } catch (error) {
    console.log(error);
    return "";
  }
};
export const useRole = (): string => {
  console.log("useRole");
  try {
    const { user } = useAppContext();
    return user?.attributes.role || "";
  } catch (error) {
    console.log(error);
    return "";
  }
};
export const useUserId = (): string => {
  try {
    const { user } = useAppContext();
    return user?.id || "";
  } catch (error) {
    console.log(error);
    return "";
  }
};

// Profile
export const useDisplayName = (): string => {
  const { profile } = useAppContext();
  return `${profile?.attributes.firstName || "Incognito"} ${profile?.attributes.lastName || ""}`;
};
export const useFirstName = (): string => {
  const { profile } = useAppContext();
  return profile?.attributes.firstName || "";
};
export const useLastName = (): string => {
  const { profile } = useAppContext();
  return profile?.attributes.lastName || "";
};
export const useGrades = (): string => {
  const { profile } = useAppContext();
  return profile?.attributes.grades || "";
};
export const useHasSiyavulaAccess = (): string => {
  const { profile } = useAppContext();
  return profile?.attributes.hasSiyavulaAccess || "";
};
export const useIsDeveloper = (): string => {
  const { profile } = useAppContext();
  return profile?.attributes.isDeveloper || "";
};
export const useIsPaying = (): string => {
  const { profile } = useAppContext();
  return profile?.attributes.isPaying || "";
};
export const useProfileBanner = (): string => {
  const { profile } = useAppContext();
  return profile?.attributes.banner?.url || "";
};
export const useProfileId = (): string => {
  const { profile } = useAppContext();
  return profile?.id || "";
};
export const useProfilePic = (): string => {
  const { profile } = useAppContext();
  return profile?.attributes.profilePic?.url || "";
};
export const useProvinces = (): string => {
  const { profile } = useAppContext();
  return profile?.attributes.provinces || "";
};
export const useSchools = (): string => {
  const { profile } = useAppContext();
  return profile?.attributes.schools || "";
};
export const useUniqueId = (): string => {
  const { profile } = useAppContext();
  return profile?.attributes.uniqueId || "";
};

// Organization
export const useAppBg = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.appBg || "";
};
export const useAppBgDark = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.appBgDark || "";
};
export const useComponentBg = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.componentBg || "";
};
export const useComponentBgDark = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.componentBgDark || "";
};
export const useIcon1 = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.icon1 || "";
};
export const useIcon1Dark = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.icon1Dark || "";
};
export const useIcon2 = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.icon2 || "";
};
export const useIcon2Dark = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.icon2Dark || "";
};
export const useLogo = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.logo || "";
};
export const useLogoDark = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.logoDark || "";
};
export const useOrganizationId = (): string => {
  const { organization } = useAppContext();
  return organization?.id || "";
};
export const useMerchantId = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.merchantId || "";
};
export const useOrganizationName = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.name || "";
};
export const usePrimaryColor = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.primaryColor || "";
};
export const usePrimaryColorDark = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.primaryColorDark || "";
};
export const useSecondaryColor = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.secondaryColor || "";
};
export const useSecondaryColorDark = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.secondaryColorDark || "";
};
export const useText = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.text || "";
};
export const useTextDark = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.textDark || "";
};
export const useOrgEmail = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.email || "";
};
export const useOrgVat = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.companyVatNr || "";
};
export const useOrgName = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.companyName || "";
};
export const useOrgUrl = (): string => {
  const { organization } = useAppContext();
  return organization?.attributes.url || "";
};
