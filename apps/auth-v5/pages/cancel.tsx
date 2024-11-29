import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import { baseUrl, mainUrl, orgName } from "@/context/constants";

import { Page } from "../../../packages/ui/src/PageLayout";

type CancelProps = {
  url: string;
};

const Cancel: FC<CancelProps> = ({ url }) => (
  <>
    <Head>
      <title>Redirect</title>
      <meta name="description" content="redirecting you" />
    </Head>
    <Page
      header="Payment Failed"
      message="Something went wrong..."
      buttons={[
        <Link href={`/subscribe?from=${url}`} passHref key="try-again">
          <div className="text-textColor bg-themeColorMain cursor-pointer rounded-lg px-8 py-3 text-center">
            Try Again
          </div>
        </Link>,
        <a href={`${mainUrl}${url}`} key="return">
          <div className="text-textColorSecondary bg-themeColorSecondary cursor-pointer rounded-lg p-3 text-center">
            Return to {`${orgName}`}
          </div>
        </a>,
      ]}
    />
  </>
);

export default Cancel;
