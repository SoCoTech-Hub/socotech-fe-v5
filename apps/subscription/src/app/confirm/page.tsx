import { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import resendConfirmation from "@/snippets/auth/resendConfirmation";
import { parseCookies } from "@/snippets/parseCookies";

//TODO:fix imports.
import { Page } from "@acme/ui/PageLayout/index";
import { SEO } from "@acme/ui/SeoHead/index";

type ConfirmProps = {
  email: string | null;
};

const Confirm: FC<ConfirmProps> = ({ email }) => {
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
      <SEO title="Confirm" description="Confirm Page" />
      <Page
        header="Thank you for registering!"
        message={
          <>
            <div className="my-4 font-bold text-center text-textColor desktop:text-2xl laptop:text-2xl mobile:text-xl">
              A verification link has been sent to your email account{" "}
              {rEmail ? rEmail : email}
            </div>
            <div className="w-full mt-3 mb-3 text-center text-textColor mobile:text-xs">
              <div className="flex justify-center desktop:mx-4 laptop:mx-4">
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
              className="px-8 py-3 text-center rounded-lg cursor-pointer text-textColorSecondary bg-themeColorMain"
              key="resend"
            >
              Resend
            </button>
          ) : (
            <></>
          ),
          <Link href="/create" passHref key="start-again">
            <div className="p-3 text-center rounded-lg cursor-pointer text-textColorSecondary bg-themeColorSecondary">
              Start Again
            </div>
          </Link>,
        ]}
      />
    </>
  );
};

export default Confirm;