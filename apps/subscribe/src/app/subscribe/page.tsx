import React, { FC, useState } from "react";
import Link from "next/link";

import {
  baseUrl,
  mainUrl,
  organizationId,
} from "@acme/snippets/context/constants";
import sendTransaction from "@acme/snippets/functions/account/Transaction"; 
import createTransaction from "@acme/snippets/functions/account/Transaction";

import { Button } from "@acme/ui/button";
import { Checkbox } from "@acme/ui/Checkbox";
import { InputField } from "@acme/ui/InputField/index";
import { PopupAlert } from "@acme/ui/PopupAlert/index";

interface SubscribeProps {
  product: any;
  user: any;
  url: string;
}

let formatter = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const Subscribe: FC<SubscribeProps> = ({ product, user, url }) => {
  const [company, setCompany] = useState("");
  const [vatnr, setVatNr] = useState("");
  const [email, setEmail] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsCheck] = useState(false);

  const subscribe = async () => {
    setLoading(true);
    setError("");

    const date = new Date();
    const cycles = 12 - date.getMonth();

    const lastName =
      user.profile.lastName || user.profile.firstName?.split(" ").pop();
    const data = {
      merchantId: product.organization?.merchantId,
      merchant_key: product.organization?.merchantKey,
      return_url: `${mainUrl}${baseUrl}/success?returnTo=${url}&uniqueId=${user.profile?.uniqueId}`,
      cancel_url: `${mainUrl}${baseUrl}/cancel?returnTo=${url}`,
      notify_url: `${mainUrl}${baseUrl}/api/payfast`,
      firstName: user.profile.firstName,
      lastName: lastName,
      email: email.length ? email : user.email,
      uniqueId: user.profile.uniqueId,
      mPaymentId: user.profile.uniqueId,
      amount: product.price,
      item: product.title,
      description: product.description,
      orgId: product.organization.id || organizationId,
      company: company,
      vatNr: vatnr,
      additionalInformation: additionalInformation,
      emailConfirmation: 1,
      paymentMethod: "cc",
      subscriptionType: 1,
      billingDate: date.toISOString().split("T")[0],
      recurringAmount: product.price,
      frequency: 3,
      cycles: cycles,
      ref: user.profile.uniqueId || null,
    };
    await createTransaction({
      data: data,
    });
    await sendTransaction({ data, product });
    setLoading(false);
  };

  const cancel = () => {
    window.location.replace(`${mainUrl}${url}`);
  };

  return (
    <>
      <div className="g-0 flex flex-wrap overflow-x-hidden">
        <div className="desktop:w-1/2 laptop:w-1/2 mobile:h-1/3 w-full">
          <div className="desktop:h-screen laptop:h-screen flex w-full place-content-center items-center">
            <img
              src={product.image[0].url ?? `${mainUrl}/auth/image.jpg`}
              alt="Login Image"
              className="mobile:hidden h-full object-cover object-center"
            />
          </div>
        </div>
        <div className="bg-compBg desktop:w-1/2 laptop:w-1/2 mobile:h-2/3 text-textColor w-full">
          <div className="desktop:h-screen laptop:h-screen mobile:mx-1 mobile:-mt-4 flex w-full place-content-center items-center">
            <div className="desktop:w-3/5 mobile:w-10/12 desktop:my-0 laptop:w-3/5 my-10">
              <div className="pt-3">
                <div className="py-4 text-4xl font-bold">{product.title}</div>
                <div className="align-left py-2 text-left text-xl">
                  {formatter.format(product.price)}
                  <span className="font-normal"> per month</span>
                </div>
                <div className="align-left text-left text-sm">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  />
                </div>
              </div>

              <form autoComplete="on">
                <div className="my-4">Add Invoice Information (Optional)</div>
                <InputField
                  label="Email"
                  placeholder="Email"
                  value={email}
                  type="text"
                  onChange={(value) => setEmail(value as string)}
                />

                <InputField
                  label="Company Name"
                  placeholder="Company"
                  value={company}
                  type="text"
                  onChange={(value) => setCompany(value as string)}
                />

                {company && (
                  <InputField
                    label="VAT Number"
                    placeholder="VAT Number"
                    value={vatnr}
                    type="text"
                    onChange={(value) => setVatNr(value as string)}
                  />
                )}

                <InputField
                  label="Additional Info"
                  placeholder="Additional Information"
                  value={additionalInformation}
                  type="text"
                  onChange={(value) =>
                    setAdditionalInformation(value as string)
                  }
                />

                <div className="flex h-10 flex-row text-left align-middle">
                  <div className="mt-0.5">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(value) => setIsCheck(value as boolean)}
                    />
                  </div>
                  <div className="mt-0.5 text-sm">
                    <span className="text-textHeading font-bold">Accept </span>
                    <Link href="/tou" passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <span className="text-textHeading cursor-pointer font-bold">
                          terms and conditions
                        </span>
                      </a>
                    </Link>
                    <span className="text-textHeading font-bold">, </span>
                    <Link href="/privacy" passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <span className="text-textHeading cursor-pointer font-bold">
                          privacy policy
                        </span>
                      </a>
                    </Link>
                    <span className="text-textHeading font-bold"> and </span>
                    <Link href="/payment" passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <span className="text-textHeading cursor-pointer font-bold">
                          payment policy
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="flex">
                  <div className="">
                    <span>
                      <i className="text-textColor ti-lock"></i>
                    </span>{" "}
                    Transactions are encrypted and secured.
                  </div>
                </div>

                <div className="">
                  <PopupAlert
                    message={error}
                    variant={"destructive"}
                    visible={error ? true : false}
                  />
                  {isChecked ? (
                    <Button
                      onClick={subscribe}
                      className="bg-primary"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Subscribe"}
                    </Button>
                  ) : (
                    <></>
                  )}
                  <div className="py-1">
                    <Button
                      className="my-3 bg-secondary"
                      onClick={() => cancel()}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
