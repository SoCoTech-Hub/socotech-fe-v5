import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { email } from "@acme/snippets/context/constants";
import resendConfirmation from "@acme/snippets/functions/auth/resendConfirmation";
import { Page } from "@acme/ui";

type ConfirmProps = {
  email: string | null;
};

const Confirm: FC<ConfirmProps> = () => {
  const router = useRouter();
  const rEmail = router.query?.email as string | undefined;
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    const resendEmail = async () => {
      if (rEmail || email) {
        const res = await resendConfirmation({
          email: rEmail ? rEmail : email,
        });
        if (res.ok) {
          setSuccess(
            `Confirmation email has been sent successfully to ${
              rEmail ? rEmail : email
            }`,
          );
        } else {
          if (res.data.message === "already.confirmed") {
            setError("This account has already been confirmed");
            router.push(`/`);
            return;
          }
        }
        setDisabled(true);
      }
    };
    resendEmail();
  }, [rEmail, email, router]);

  useEffect(() => {
    if (!disabled) {
      const timer = setTimeout(() => {
        setDisabled(false);
        setSuccess("");
      }, 120000);
      return () => clearTimeout(timer);
    }
    return;
  }, [disabled]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (rEmail || email) {
      try {
        await resendConfirmation({
          email: rEmail ? rEmail : email,
        });
        setSuccess("Confirmation email has been sent successfully.");
        setDisabled(true);
      } catch (err) {
        setError(
          "Confirmation email could not be sent, please contact support",
        );
      }
    } else {
      setError("Confirmation email could not be sent, please contact support");
    }
  };

  return (
    <>
      <Page
        header="Thank you for registering!"
        message={
          <>
            <div className="text-textColor desktop:text-2xl laptop:text-2xl mobile:text-xl my-4 text-center font-bold">
              A verification link has been sent to your email account{" "}
              {rEmail ? rEmail : email}
            </div>
            <div className="text-textColor mobile:text-xs mb-3 mt-3 w-full text-center">
              <div className="desktop:mx-4 laptop:mx-4 flex justify-center">
                This may take a few minutes. Once this email has been received,
                Please click on the link to verify your email and continue the
                registration process.
                <br className="mobile:hidden" /> If you used the wrong email
                please click on the Start Again button below.
                {!disabled ? (
                  <>
                    <br />
                    <br />
                    If you have not received this email please click on the
                    resend button below.
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        }
        error={error}
        success={success}
        buttons={[
          !disabled ? (
            <button
              onClick={handleSubmit}
              className="text-textColorSecondary bg-themeColorMain cursor-pointer rounded-lg px-8 py-3 text-center"
              key="resend"
            >
              Resend
            </button>
          ) : (
            <></>
          ),
          <Link
            scroll={false}
            href="/create"
            passHref
            key="start-again"
            className="text-textColorSecondary bg-themeColorSecondary cursor-pointer rounded-lg p-3 text-center"
          >
            Start Again
          </Link>,
        ]}
      />
    </>
  );
};

export default Confirm;
