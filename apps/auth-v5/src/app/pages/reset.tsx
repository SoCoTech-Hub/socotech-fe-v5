import React, { FC, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { baseUrl } from "@/context/constants";
import checkEmail from "@/snippets/auth/checkEmail";
import forgotPassword from "@/snippets/auth/forgotPassword";

import { Alert } from "../../../packages/ui/src/alert";
import { Button } from "../../../packages/ui/src/button";
import { InputField } from "../../../packages/ui/src/InputField";

const Reset: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setLoading(true);
    event.preventDefault();
    if (!email) {
      setError("Email not provided");
      setLoading(false);
      return;
    }

    const emailCheck = await checkEmail({ email });

    if (!emailCheck) {
      setError("Email not found");
      setLoading(false);
      return;
    }
    if (emailCheck.provider === "google") {
      setError("You don't need a password, Login with Google");
      setLoading(false);
      return;
    }
    if (emailCheck.blocked) {
      setError("Account has been blocked, please contact support");
      setLoading(false);
      return;
    }
    if (!emailCheck.confirmed) {
      setError(
        "Account not confirmed, please check your email for 'Account confirmation'",
      );
      setLoading(false);
      return;
    }

    try {
      const res = await forgotPassword(email);
      if (res.ok) {
        setSuccessMessage(
          `We have sent an email with a link to your email address. In order to reset your password, please click the link. If you do not receive an email, please check your spam folder.`,
        );
      }
      setLoading(false);
    } catch (err) {
      setError("Reset password link could not be sent");
      setLoading(false);
    }
  };

  const seo = {
    title: "Topic - Reset Password",
    description:
      "You seem to have forgotten your password; let's change that for you.",
    image: "https://lms.topic.co.za/auth/logo.png",
    url: "https://topic.co.za",
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta
          name="description"
          content="You seem to have forgotten your password; let's change that for you."
        />
      </Head>
      <div className="g-0 flex h-fit flex-wrap" style={{ overflow: "hidden" }}>
        <div className="desktop:w-1/2 laptop:w-1/2 mobile:h-1/3 w-full">
          <div className="desktop:h-screen laptop:h-screen flex w-full place-content-center items-center">
            <img
              src={`${baseUrl}/brand-image.png`}
              alt="Login Image"
              className="mobile:hidden"
            />
          </div>
        </div>
        <div className="bg-compBg desktop:w-1/2 laptop:w-1/2 mobile:h-2/3 w-full">
          <div className="mobile:px-1 flex h-screen w-full place-content-center items-center">
            <div className="desktop:w-3/5 mobile:w-10/12 desktop:my-0 laptop:w-3/5 mobile:my-5 my-10">
              <div className="text-textColor mb-4 w-4/5 text-2xl font-bold">
                Reset your
                <br /> Password
              </div>
              <div className="text-textColor mb-3 mt-4 w-3/4 text-sm">
                To reset your password please provide the email address linked
                to your account
              </div>
              <form onSubmit={handleSubmit}>
                <InputField
                  icon="ti-email"
                  placeholder="Your Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="mb-1">
                  <Alert error={error} success={successMessage} />
                  <Button
                    label={loading ? "Loading" : "Request password reset"}
                    onClick={handleSubmit}
                    color="bg-themeColorMain"
                  />
                </div>
                <h6 className="text-themeColorMain mt-3 text-xs">
                  <Link
                    href="/"
                    className="text-themeColorMain ms-1 font-semibold"
                  >
                    Go Back
                  </Link>
                </h6>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
