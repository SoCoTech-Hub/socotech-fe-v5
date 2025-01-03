import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { authUrl, baseUrl } from "@/context/constants";
import checkEmail from "@/snippets/auth/checkEmail";
import validateEmail from "@/snippets/auth/validateEmail";
import getDataRequest from "@/snippets/getDataRequest";
import registerUser from "@/snippets/registerUser";

import { fetchAffiliateReferrer } from "@acme/snippets/functions/affiliate/affiliate";
import { Alert } from "@acme/ui/alert";
import { Button } from "@acme/ui/button";
import { Checkbox } from "@acme/ui/Checkbox";
import InputField from "@acme/ui/InputField";

interface RegisterProps {
  uniqueId: string | null;
}

const Register: React.FC<RegisterProps> = ({ uniqueId }) => {
  const router = useRouter();
  const [transaction, setTransaction] = useState<any[]>([]);
  const [refferal, setRefferal] = useState<any | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [check, setCheck] = useState<boolean | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!uniqueId) {
        router.push(`${baseUrl}cancel`);
      } else {
        const res = await getDataRequest(`transactions?mPaymentId=${uniqueId}`);
        if (res) {
          setTransaction(res[0]);
          if (res[0]?.ref) {
            const { affiliates } = await fetchAffiliateReferrer(res[0].ref);
            if (affiliates?.length) {
              setRefferal(affiliates[0]);
            }
          }
        }
      }
    };

    fetchData();
  }, [uniqueId, router]);

  const handleSubmit = async (event: FormEvent) => {
    setLoading(true);
    setError("");
    event.preventDefault();

    const res = await getDataRequest(`/profiles?uniqueId=${uniqueId}`);
    if (res?.length) {
      setError(
        `You already have an account created, please use the provided login link below, or use the confirmation link in your email.`,
      );
      setLoading(false);
      const user = await getDataRequest(`/users?profile=${res[0].id}`);
      router.push(`${authUrl}/confirm?email=${user[0]?.email}`);
      return;
    }

    if (!firstName || !lastName || !email || !password || !repeatPassword) {
      setError("Please ensure all fields are completed");
      setLoading(false);
      return;
    }

    if (!check) {
      setError("Terms and conditions are required");
      setLoading(false);
      return;
    }

    if (!validateEmail({ email })) {
      setError("You have entered an invalid email address");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password needs to be 8 or more characters long");
      setLoading(false);
      return;
    }

    if (password !== repeatPassword) {
      setError("Password Does Not Match");
      setLoading(false);
      return;
    }

    const emailCheck = await checkEmail({ email });
    if (emailCheck.data.length) {
      setError("Email already in use");
      setLoading(false);
      return;
    }

    try {
      const res = await registerUser({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        uniqueId: uniqueId || "",
        organizationId: transaction?.orgId,
        refId: refferal?.id,
      });
      if (!res.ok) {
        setError(
          "Something went wrong, Please verify if your email is correct",
        );
        setLoading(false);
        return;
      }
      setLoading(false);
      router.push(`${authUrl}/confirm`);
    } catch (err) {
      setError("Confirmation email could not be sent");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Student Registration</title>
        <meta name="description" content="Student Registration" />
      </Head>
      <img
        src={`${baseUrl}logo.png`}
        alt="Logo"
        className="logo-overlay desktop:h-24 laptop:h-20 mobile:h-12"
      />
      <div className="g-0 flex flex-wrap">
        <div className="desktop:w-1/2 bg-appBg mobile:h-1/3 w-full">
          <div className="desktop:h-screen flex w-full place-content-center items-center">
            <img
              src={`${baseUrl}authimg.png`}
              alt="Image"
              className="desktop:py-0 w-5/6 py-10"
            />
          </div>
        </div>
        <div className="desktop:w-1/2 mobile:h-2/3 w-full">
          <div className="desktop:h-screen flex w-full place-content-center items-center">
            <div className="desktop:w-2/5 mobile:w-10/12 desktop:my-0 laptop:w-2/5 my-10">
              <div className="text-textColor mb-4 w-4/5 text-4xl font-bold">
                Create your
                <br />
                learner account
              </div>
              <form onSubmit={handleSubmit} autoComplete="off">
                <input autoComplete="off" name="hidden" type="text" />
                <InputField
                  id="StudentName"
                  icon="ti-user"
                  placeholder="Learner Name"
                  onChange={(e) => setFirstName(e)}
                />
                <InputField
                  id="StudentSurname"
                  icon="ti-user"
                  placeholder="Learner Surname"
                  onChange={(e) => setLastName(e)}
                />
                <InputField
                  id="StudentEmail"
                  icon="ti-email"
                  placeholder="Learner Email Address"
                  type="email"
                  onChange={(e) => setEmail(e)}
                />
                <InputField
                  id="StudentPassword"
                  icon="ti-lock"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e)}
                />
                <InputField
                  id="StudentRepeatPassword"
                  icon="ti-lock"
                  placeholder="Repeat Password"
                  type="password"
                  onChange={(e) => setRepeatPassword(e)}
                />

                <div className="my-3 flex flex-row text-left">
                  <Checkbox label="Accept" setter={setCheck} />
                  <div className="mt-1 text-xs">
                    &nbsp;
                    <Link href="/tou" passHref>
                      <span className="pointer-cursor cursor-pointer font-bold hover:text-blue-400">
                        Terms and Conditions
                      </span>
                    </Link>
                  </div>
                </div>

                <div>
                  <div className="mb-1">
                    <Alert error={error} />
                    <Button
                      label={loading ? "Loading..." : "Register"}
                      onClick={handleSubmit}
                      color="bg-themeColorSecondary"
                    />
                  </div>
                  <h6 className="text-textColor mt-3 text-xs">
                    Already have an account?
                    <span className="text-themeColorMain ms-1 cursor-pointer font-semibold">
                      <Link href={authUrl}>Login</Link>
                    </span>
                  </h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<RegisterProps> = async (
  context,
) => {
  const { uniqueId } = context.query;
  return {
    props: {
      uniqueId: uniqueId ? uniqueId.toString() : null,
    },
  };
};

export default Register;
