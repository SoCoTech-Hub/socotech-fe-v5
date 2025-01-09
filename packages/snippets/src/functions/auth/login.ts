import { api } from "../../api/api";
import { CreateAllCookies } from "../../cookies/createAllCookies";
import checkSubscription from "../subscription/checkSubscription";

interface LoginParams {
  identifier: string;
  password: string;
  modDevice: string;
  deviceId: string;
  rememberMe: boolean;
}

interface LoginResponse {
  data: any; // Replace `any` with specific types if available
  ok: boolean;
  error?: string;
}

export default async function login({
  identifier,
  password,
  modDevice,
  deviceId,
  rememberMe,
}: LoginParams): Promise<LoginResponse | string> {
  try {
    const { data } = await api.POST("/auth/local/", {
      identifier,
      password,
    });
    modDevice += `, width: ${window.innerWidth}, height: ${window.innerHeight}`;

    await api.PUT(`/users/${data.user.id}`, {
      deviceId,
      deleted: false,
      onBreak: false,
    });

    const profilePost = await api.GET(`/profiles/${data.user.profile.id}`);
    const profile = profilePost.data;

    const isPaying = await checkSubscription(profile);
    const organization = profile?.organization;

    CreateAllCookies({
      days: 14,
      rememberMe,
      jwt: data.jwt,
      appBg: organization?.appBg,
      componentBg: organization?.componentBg,
      icon1: organization?.icon1,
      icon2: organization?.icon2,
      logo: organization?.logo?.url,
      primaryColor: organization?.primaryColor,
      secondaryColor: organization?.secondaryColor,
      text: organization?.text,
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      modDevice,
      deviceId,
      email: data.user?.email,
      grades: profile?.grades,
      provinces: profile?.provinces,
      schools: profile?.schools,
      subjects: profile?.subjects,
      hasSiyavulaAccess: profile?.hasSiyavulaAccess,
      isPaying,
      isDeveloper: profile?.isDeveloper,
      organizationId: organization?.id,
      organizationName: organization?.name,
      profileId: profile?.id,
      profilePicUrl: profile?.profilePic?.url,
      profileBannerUrl: profile?.banner?.url,
      uniqueId: profile?.uniqueId,
      userId: data.user?.id,
      roleName: data.user?.role.name,
    });

    return data;
  } catch (error: any) {
    console.error("An error occurred during login:", error);
    return `error: ${error.message || error}`;
  }
}
