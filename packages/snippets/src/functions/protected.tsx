import { useEffect } from "react";
import Cookies from "js-cookie";

import {
  domain,
  mainUrl,
  organizationId,
  uniqueId,
  userId,
} from "../context/constants";
import authCheck from "./auth/authCheck";
import { FetchProtectedData } from "./auth/fetchProtectedData";

interface ProtectedProps {
  device: string;
  children: React.ReactNode;
}

const Protected = ({ device, children }: ProtectedProps) => {
  const cookieOptions = { domain, secure: true, expires: 1 };

  useEffect(() => {
    const initializeUserSession = async () => {
      if (!organizationId || !userId) {
        window.location.href = `${mainUrl}/auth`;
        return;
      }

      // Check for redirect based on user state
      const redirectUrl = await authCheck({ userid: userId });
      if (redirectUrl === "/update") {
        window.location.href = `${mainUrl}/auth${redirectUrl}`;
        return;
      }

      // Fetch protected data in a single GraphQL request
      const protectedData = await FetchProtectedData({
        userId,
        uniqueId,
      });

      if (protectedData) {
        const { user, transactions } = protectedData;
        const { profile } = user;
        const { organization } = profile;
        // // Redirect if a forced page is required
        // if (forces.length) {
        //   const force = forces[0];
        //   const pageTrackExists = await api.GET(
        //     `/page-tracks?url=${force.link}&user=${userId}&_limit=1`,
        //   );
        //   if (!pageTrackExists) {
        //     window.location.href = `${mainUrl}${force.link}`;
        //     return;
        //   }
        // }

        // Set session-related cookies
        setSessionCookies(device, user, profile, transactions, organization);
      }
    };

    const setSessionCookies = (
      device: string,
      user: any,
      profile: any,
      transactions: any[],
      organization: any,
    ) => {
      const sanitizedDevice = `${device}\nwidth: ${window.innerWidth}\nheight: ${window.innerHeight}`;
      Cookies.set("device", sanitizedDevice || "0", cookieOptions);

      // Set profile-related cookies
      Cookies.set(
        "isPaying",
        transactions.length ? transactions[0].id : "0",
        cookieOptions,
      );
      Cookies.set("isDeveloper", String(profile?.isDeveloper || false));
      setArrayCookies("SupportDepartments", profile?.supportDepartments, "id");
      setArrayCookies("Subjects", profile?.subjects, "id");
      setArrayCookies("Grades", profile?.grades, "id");
      setArrayCookies("Schools", profile?.schools, "id");
      setArrayCookies("Provinces", profile?.provinces, "id");

      // Set user role cookie
      Cookies.set("role", user?.role?.name || "", cookieOptions);

      // Set organization theme cookies
      const themeFields = [
        "PrimaryColor",
        "PrimaryColorDark",
        "SecondaryColor",
        "SecondaryColorDark",
        "AppBg",
        "AppBgDark",
        "ComponentBg",
        "ComponentBgDark",
        "Text",
        "TextDark",
        "Icon1",
        "Icon1Dark",
        "Icon2",
        "Icon2Dark",
        "Logo",
        "LogoDark",
      ];

      themeFields.forEach((field) => {
        const value = organization?.[field.toLowerCase()] || "";
        Cookies.set(field, value, cookieOptions);
      });

      Cookies.set("theme", "1", cookieOptions);
    };

    const setArrayCookies = (name: string, array: any[], key: string) => {
      const values = array?.map((item) => item[key]) || [];
      Cookies.set(name, JSON.stringify(values), cookieOptions);
    };

    initializeUserSession();
  }, [userId, organizationId]);

  return userId ? <>{children}</> : null;
};

export default Protected;
