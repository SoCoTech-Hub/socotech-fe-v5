import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { api } from "@acme/snippets/api/api";
import { baseUrl } from "@acme/snippets/context/constants";
import { CreateAllCookies } from "@acme/snippets/cookies/createAllCookies";
import authCheck from "@acme/snippets/functions/auth/authCheck";
import { FetchUserDetail } from "@acme/snippets/functions/auth/user";
import generateUniqueId from "@acme/snippets/functions/generateUniqueId";
import CreateInMail from "@acme/snippets/functions/inmail/createInMail";
import { Button, Page } from "@acme/ui";

interface LoginProps {
  userId: string;
  error?: string;
  user?: any;
  profile?: any;
  organization?: any;
  modDevice?: string;
  jwt?: string;
}

const Login: React.FC<LoginProps> = ({
  userId,
  error,
  user,
  profile,
  organization,
  modDevice,
  jwt,
}) => {
  const router = useRouter();
  const [redirect, setRedirect] = useState<string>("");

  useEffect(() => {
    const initializeLogin = async () => {
      CreateAllCookies({
        days: 28,
        rememberMe: true,
        jwt: jwt,
        organizationId: organization?.id || 1,
        organizationName: organization?.name,
        appBg: organization?.appBg,
        componentBg: organization?.componentBg,
        icon1: organization?.icon1,
        icon2: organization?.icon1,
        logo: organization?.logo?.url,
        primaryColor: organization?.primaryColor,
        secondaryColor: organization?.secondaryColor,
        text: organization?.text,
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        modDevice: modDevice,
        email: user?.email,
        grades: profile?.grades,
        provinces: profile?.provinces,
        schools: profile?.schools,
        subjects: profile?.subjects,
        isPaying: profile?.isPaying || false,
        isDeveloper: profile?.isDeveloper,
        profileId: profile?.id,
        profilePicUrl: profile?.profilePic?.url,
        profileBannerUrl: profile?.banner
          ? profile.banner?.url
          : organization?.banner
            ? organization?.banner?.url
            : "",
        uniqueId: profile?.uniqueId,
        userId: user?.id,
        roleName: user?.role?.name,
      });

      const routeTo = await authCheck({ userid: userId });
      setRedirect(routeTo);
    };

    initializeLogin();
  }, [userId, jwt, modDevice, organization, profile, user]);

  useEffect(() => {
    if (redirect) {
      setTimeout(() => router.push(redirect), 3000);
    }
  }, [redirect, router]);

  return (
    <>
      <Page
        header={error ? "Something Went Wrong" : "You are ready to start!"}
        message={
          error ? (
            "You are being redirected! Try Again"
          ) : (
            <div className="desktop:mx-4 laptop:mx-4 flex justify-center">
              If you aren't redirected yet,
              <br className="mobile:hidden" /> please click on the Continue
              button to continue.
            </div>
          )
        }
        buttons={[
          <Link href={error ? "/login" : "/update"}>
            <Button key="btn-continue" className="w-60 bg-primary">
              {error ? "Retry" : "Continue"}
            </Button>
          </Link>,
        ]}
        error={error}
        background={`${baseUrl}/background2.png`}
      />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { access_token, id_token } = context.query;
  const deviceDetail = context.req.headers["user-agent"];
  const modDevice = `device:${deviceDetail}`;

  if (id_token && access_token) {
    try {
      const res = await api.GET(
        `/auth/google/callback?id_token=${id_token}&access_token=${access_token}`,
      );

      let profileData: any = null;
      let userData: any = null;

      if (res.data?.user?.profile) {
        userData = res.data.user;
        profileData = res.data.user.profile;
      } else {
        const organization = await api.GET(`/organizations/1`);

        const uniqueId = generateUniqueId({
          organization: organization.data,
          userid: res.data.user.id,
        });

        profileData = await api.POST(`/profiles`, {
          firstName: res.data.user.username,
          organization: { id: organization.data.id },
          uniqueId: uniqueId,
        });

        userData = await api.PUT(`/users/${res.data.user.id}`, {
          profile: { id: profileData.data.id },
        });

        await CreateInMail({
          orgName: organization.data.name,
          orgId: organization.data.id,
          firstName: profileData.data.firstName,
          profileId: profileData.data.id,
        });
      }

      const user = await FetchUserDetail(res.data.user.id);
      const { profile } = user; //TODO:fix section
      const { organization } = profile;

      return {
        props: {
          userId: res.data.user.id,
          user: user,
          profile: profile,
          organization: organization,
          modDevice: modDevice,
          jwt: res.data.jwt,
        },
      };
    } catch (error) {
      return {
        props: {
          userId: "",
          error: "Something went wrong, please try again",
        },
      };
    }
  } else {
    return {
      props: {
        userId: "",
        error: "Something went wrong, please try again",
      },
    };
  }
}

export default Login;
