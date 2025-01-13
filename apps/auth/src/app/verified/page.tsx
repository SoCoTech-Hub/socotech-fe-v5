import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { baseUrl } from "@acme/snippets/context/constants";
import resendConfirmation from "@acme/snippets/functions/auth/resendConfirmation";
import { Button } from "@acme/ui/button";
import { PopupAlert } from "@acme/ui/PopupAlert/index";

type VerifiedProps = {
  email: string | null;
};

const Verified: FC<VerifiedProps> = ({ email }) => {
  const router = useRouter();
  const rEmail = router.query?.email as string | undefined;
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    const resendEmail = async () => {
      const validEmail = rEmail || email;
      if (validEmail) {
        try {
          const res = await resendConfirmation({
            email: validEmail,
          });
          if (res.ok) {
            setSuccess(
              `Confirmation email has been sent successfully to ${validEmail}`,
            );
          } else if (res.data.message === "already.confirmed") {
            setError("This account has already been confirmed");
          }
        } catch (err) {
          setError("Something went wrong, please try again later.");
        }
        setDisabled(true);
      }
    };
    resendEmail();
  }, [rEmail, email]);

  useEffect(() => {
    if (!disabled) {
      const timer = setTimeout(() => {
        setDisabled(false);
        setSuccess("");
      }, 120000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [disabled]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validEmail = rEmail || email;
    if (validEmail) {
      try {
        await resendConfirmation({
          email: validEmail,
        });
        setSuccess("Confirmation email has been sent successfully.");
        setDisabled(true);
      } catch (err) {
        setError(
          "Confirmation email could not be sent, please contact support.",
        );
      }
    } else {
      setError("Confirmation email could not be sent, please contact support.");
    }
  };

  return (
    <>
      <Head>
        <title>Verified</title>
        <meta name="description" content="Verified Page" />
      </Head>
      <div className="h-screen overflow-auto">
        <div
          className="flex h-full items-center justify-center"
          style={{
            backgroundImage: `url(${baseUrl}/background1.png)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="laptop:w-3/4 mobile:my-5 desktop:my-10 bg-themeColorSecondary w-11/12 rounded-3xl p-3">
            <div className="grid justify-items-center">
              <div className="bg-themeColorSecondary items-center rounded-3xl px-4 py-8 text-center">
                <div className="laptop:text-4xl my-3 text-2xl font-bold text-white">
                  Thank you for registering!
                </div>
                <div className="laptop:text-xl my-2 text-lg font-bold text-white">
                  A verification email has been sent to your email account:
                  <div className="my-2 text-center underline">
                    {rEmail || email}
                  </div>
                </div>
                <div className="mb-3 w-full text-center text-xs text-white">
                  <div className="flex justify-center">
                    {rEmail || email
                      ? "If you have not received this email, click on the button below."
                      : "Something went wrong, please navigate back"}
                  </div>
                </div>

                <div className="w-full">
                  {rEmail || email ? (
                    <div className="mx-auto flex w-1/2 flex-col py-3">
                      {error === "This account has already been confirmed" ? (
                        <Link href="/">
                          <a className="bg-themeColorMain mt-2 cursor-pointer rounded-md px-2 py-3 text-center text-white">
                            Login
                          </a>
                        </Link>
                      ) : (
                        <Button
                          onClick={handleSubmit}
                          disabled={disabled}
                          className="bg-themeColorMain mt-2 cursor-pointer rounded-md px-2 py-3 text-center text-white"
                        >
                          Resend
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="mx-auto flex w-1/2 flex-col py-3">
                      <Button
                        onClick={() => router.back()}
                        className="bg-themeColorMain mt-2 cursor-pointer rounded-md px-2 py-3 text-center text-white"
                      >
                        Back
                      </Button>
                    </div>
                  )}
                  <PopupAlert
                    message={error ? error : success}
                    variant={error ? "destructive" : "success"}
                    visible={!!(error || success)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verified;
