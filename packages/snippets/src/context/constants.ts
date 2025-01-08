import {
  useAppBg,
  useAppBgDark,
  useComponentBg,
  useComponentBgDark,
  useDisplayName,
  useEmail,
  useFirstName,
  useGrades,
  useHasSiyavulaAccess,
  useIcon1,
  useIcon1Dark,
  useIcon2,
  useIcon2Dark,
  useIsDeveloper,
  useIsPaying,
  useLogo,
  useLogoDark,
  useOrganizationId,
  useOrganizationName,
  useOrgEmail,
  useOrgName,
  useOrgUrl,
  useOrgVat,
  usePrimaryColor,
  usePrimaryColorDark,
  useProfileBanner,
  useProfileId,
  useProfilePic,
  useProvinces,
  useRole,
  useSchools,
  useSecondaryColor,
  useSecondaryColorDark,
  useText,
  useTextDark,
  useUniqueId,
  useUserId,
} from "../utils";

// Primary Constants
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const baseName = process.env.NEXT_PUBLIC_BASE_NAME;
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const domain = process.env.NEXT_PUBLIC_DOMAIN;
export const env = process.env.ENV_MODE;
export const gqlUrl = process.env.NEXT_PUBLIC_GQL_URL;
export const gtag = process.env.NEXT_PUBLIC_GTAG_ID;
export const mainUrl = process.env.NEXT_PUBLIC_MAIN_URL;
export const testmode = process.env.NEXT_PUBLIC_TEST;
export const isPaying = useIsPaying();
export const orgId = useOrganizationId();
export const merchantId = useOrganizationId();
export const profileId = useProfileId();
export const userId = useUserId();

// Theme
export const AppBg = useAppBg();
export const AppBgDark = useAppBgDark();
export const ComponentBg = useComponentBg();
export const ComponentBgDark = useComponentBgDark();
export const Icon1 = useIcon1();
export const Icon1Dark = useIcon1Dark();
export const Icon2 = useIcon2();
export const Icon2Dark = useIcon2Dark();
export const Logo = useLogo();
export const LogoDark = useLogoDark();
export const PrimaryColor = usePrimaryColor();
export const PrimaryColorDark = usePrimaryColorDark();
export const SecondaryColor = useSecondaryColor();
export const SecondaryColorDark = useSecondaryColorDark();
export const Text = useText();
export const TextDark = useTextDark();

// Organization constants
export const OrgEmail = useOrgEmail();
export const OrgVat = useOrgVat();
export const OrgName = useOrgName(); // Company registered Name (example:Just Brands PTY Ltd)
export const OrgUrl = useOrgUrl();

// User Constants
export const Banner = useProfileBanner();
export const email = useEmail();
export const hasSiyavulaAccess = useHasSiyavulaAccess();
export const isDeveloper = useIsDeveloper();
export const orgName = useOrganizationName(); // Platform Name (example:TopicX)
export const organizationId = useOrganizationId();
export const ProfilePic = useProfilePic();
export const role = useRole();
export const uniqueId = useUniqueId();
export const userName = useDisplayName();
export const firstName = useFirstName();

// School Details
export const grades = useGrades();
export const provinces = useProvinces();
export const schools = useSchools();
