import { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { baseUrl, mainUrl, orgName } from "@/context/constants";
import sendSubscribeMail from "@/snippets/auth/sendSubscribeMail";
import { CreateAllCookies } from "@/snippets/createCookies";
import getGQLRequest from "@/snippets/getGQLRequest";

interface SuccessProps {
  transaction: any;
  url: string;
  profile: any;
}

const Success: FC<SuccessProps> = ({ transaction, url, profile }) => {
  const router = useRouter();

  const submit = async () => {
    if (transaction?.id) {
      CreateAllCookies({ isPaying: true });
      await sendSubscribeMail({ orgName: orgName, profileId: profile });
      window.location.assign(`${mainUrl}${url}`);
    } else {
      router.push(`/cancel?returnTo=${url}`);
    }
  };

  return (
    <>
      <Head>
        <title>Redirect</title>
        <meta name="description" content="Redirecting you" />
      </Head>
      <div className="flex h-screen w-full items-center justify-center">
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            backgroundImage: `url(${baseUrl}/background1.png)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-compBg mobile:w-11/12 laptop:w-1/2 desktop:w-1/2 mobile:my-5 laptop:my-10 rounded-3xl p-4">
            <div className="text-center">
              <div className="text-textColor mobile:text-2xl laptop:text-4xl desktop:text-4xl my-3 text-2xl font-bold">
                Thank you for Subscribing!
              </div>
              <div className="text-textColor mobile:text-xl laptop:text-2xl desktop:text-2xl my-4 text-xl font-bold">
                A receipt is on its way to your email account.
              </div>
              <div className="flex justify-center">
                <div className="laptop:w-1/3 w-2/3 py-3">
                  <button onClick={() => submit()}>
                    <div className="bg-themeColorMain cursor-pointer rounded-lg p-3 text-center text-black">
                      Click here to continue
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { uniqueId, returnTo } = context.query;

  const { transactions } = await getGQLRequest({
    endpoint: "transactions",
    fields: "id",
    where: `mPaymentId:"${uniqueId}"`,
    sort: "id:desc",
  });
  const { profiles } = await getGQLRequest({
    endpoint: "profiles",
    fields: "id",
    where: `uniqueId:"${uniqueId}"`,
    sort: "id:desc",
  });

  let transactionEvent = [];
  if (transactions.length) {
    const { transactionEvents } = await getGQLRequest({
      endpoint: "transactionEvents",
      fields: "id,type",
      where: `eventId:"${transactions[0].id}"`,
      sort: "id:desc",
    });

    transactionEvent = transactionEvents[0];
  }

  return {
    props: {
      transaction: transactionEvent
        ? transactionEvent.type === "COMPLETE"
          ? transactions[0]
          : null
        : null,
      url: returnTo ? returnTo : "#",
      profile: profiles.length ? profiles[0] : null,
    },
  };
}

export default Success;
