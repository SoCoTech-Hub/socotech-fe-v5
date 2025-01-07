import React, { useEffect } from "react";
import Link from "next/link";
import logoutMain from "@/snippets/logoutMain";

import { Button } from "@acme/ui/button";

import { Page } from "../../../packages/ui/src/PageLayout";
import { SEO } from "../../../packages/ui/src/SeoHead";

const Logout: React.FC = () => {
  useEffect(() => {
    logoutMain();
  }, []);

  return (
    <>
      <SEO title="Topic: Logout" description="Logout Page" />
      <Page
        header={"We're sad to see you go."}
        message={
          <div className="flex flex-col gap-y-4 text-center">
            <div className="desktop:text-2xl laptop:text-2xl mobile:text-xl font-bold">
              You have successfully been logged out.
            </div>
            <div className="mobile:text-md text-lg">
              Please log in by clicking the button below.
            </div>
          </div>
        }
        buttons={[
          <Link href={"/"}>
            <Button key="login-button" className="w-60 bg-primary">
              Log in
            </Button>
          </Link>,
        ]}
      />
    </>
  );
};

export default Logout;
