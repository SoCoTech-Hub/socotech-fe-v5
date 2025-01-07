import React, { FC, useEffect } from "react";
import Link from "next/link";
import logoutMain from "@/snippets/logoutMain";
import { baseUrl } from "@acme/snippets/context/constants";

import { Page } from "../../../packages/ui/src/PageLayout";
import { SEO } from "../../../packages/ui/src/SeoHead";

const ForcedOut: FC = () => {
  useEffect(() => {
    logoutMain();
  }, []);

  return (
    <>
      <SEO title="Logout" description="Logout Page" />
      <Page
        header="Your account is active on another device or internet browser."
        message={
          <>
            You have been logged out.
            <br />
            To log back in on this device, click on the button below.
            <div className="mt-4">
              You can reset your password for security reasons if you feel this
              is needed.
            </div>
          </>
        }
        buttons={[
          <Link href="/" passHref key="log-in">
            <a className="text-textColor bg-themeColorMain hover:text-textColorSecondary cursor-pointer rounded-md px-6 py-3 text-center">
              Log In
            </a>
          </Link>,
        ]}
        background={`${baseUrl}/background2.png`}
      />
    </>
  );
};

export default ForcedOut;
