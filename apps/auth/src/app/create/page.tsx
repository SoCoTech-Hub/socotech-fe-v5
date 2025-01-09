import React, { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { baseUrl } from "@acme/snippets/context/constants";
import RegisterUser2 from "@acme/snippets/functions/auth/registerUser2"; //TODO:make snippet
import { FetchUserByEmail } from "@acme/snippets/functions/auth/user";
import validateEmail from "@acme/snippets/functions/auth/validateEmail"; //TODO:make snippet
import { Button } from "@acme/ui/button";
import { Checkbox } from "@acme/ui/Checkbox";
import { InputField } from "@acme/ui/InputField/index";
import { PopupAlert } from "@acme/ui/PopupAlert/index";

type RegisterProps = {};

const Register: FC<RegisterProps> = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [check, setCheck] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const register = async () => {
    setError("");
    setLoading(true);

    // Basic validation
    if (!email || !password || !confirm) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    if (!check) {
      setError("Terms and conditions are required");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("Password needs to be 8 or more characters long");
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setError(`Passwords don't match`);
      setLoading(false);
      return;
    }

    // Validate email
    const validEmail = await validateEmail({ email });
    if (validEmail?.error) {
      setError("Email does not exist");
      setLoading(false);
      return;
    }

    // Check if the account already exists
    const users = await FetchUserByEmail(email);
    if (users.length > 0) {
      setError("Account already registered");
      setLoading(false);
      return;
    }

    // Register user
    const res = await RegisterUser2({
      email,
      password,
      organization: { id: 1 },
    });

    if (!res.ok) {
      setError("Something went wrong. Please verify if your email is correct");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/verified");
  };

  return (
    <>
      <div className="flex justify-between gap-0 overflow-x-hidden">
        {/* Left section with image */}
        <div className="desktop:w-full laptop:w-1/2 desktop:h-screen laptop:h-screen relative flex items-center">
          <img
            src={`${baseUrl}/create-background.jpg`}
            alt="Background"
            className="absolute h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={`${baseUrl}/create-image.png`}
              alt="Foreground"
              className="h-2/3 object-contain"
            />
          </div>
        </div>
        {/* Right section with form */}
        <div className="mobile:pt-4 ml-8 w-full pt-16">
          {/* Logo overlay */}
          <img
            src={`${baseUrl}/logo.png`}
            alt="Logo"
            className="desktop:h-20 laptop:h-20 mobile:h-16"
          />
          <div className="text-textColor mobile:mt-8 mt-24 text-4xl">
            Create
            <br />
            your account
          </div>

          <form autoComplete="on">
            <div className="w-4/5 pt-2">
              <InputField
                label="Email"
                icon="ti-email"
                placeholder="Your Email Address"
                type="text"
                value={email}
                onChange={(value) => setEmail(value as string)}
              />
            </div>

            <div className="desktop:flex-row laptop:flex-row mobile:flex-col flex gap-1">
              <div className="mobile:w-4/5 w-2/5">
                <InputField
                  label="Password"
                  icon="ti-lock"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(value) => setPassword(value as string)}
                />
              </div>
              <div className="mobile:w-4/5 w-2/5">
                <InputField
                  label="Confirm"
                  icon="ti-lock"
                  placeholder="Confirm Password"
                  type="password"
                  value={confirm}
                  onChange={(value) => setConfirm(value as string)}
                />
              </div>
            </div>

            {/* Checkbox and Terms */}
            <div className="mobile:mb-4 mb-4 mt-3 flex items-center">
              <Checkbox
                checked={check}
                onCheckedChange={(value) => setCheck(value as boolean)}
              />
              <div className="text-textColor ml-2 text-sm">
                I have read and agreed to the
                <Link href="/tou" passHref>
                  <a className="text-textHeading ml-1 font-bold underline">
                    Terms and Conditions
                  </a>
                </Link>
              </div>
            </div>

            {/* Alert and Buttons */}
            {error && (
              <PopupAlert
                message={error}
                variant="destructive"
                visible={true}
              />
            )}
            <div className="desktop:gap-x-3 laptop:gap-x-3 mobile:gap-y-3 desktop:flex-row laptop:flex-row mobile:flex-col flex">
              <Button
                disabled={loading}
                className="mobile:w-60 w-48 bg-primary"
                onClick={register}
              >
                {loading ? "Loading" : "Register"}
              </Button>
              <Link href={`${process.env.NEXT_PUBLIC_API_URL}/connect/google`}>
                <Button
                  disabled={loading}
                  className="w-58 mobile:w-60 bg-primary"
                >
                  Register with Google
                </Button>
              </Link>
            </div>
            {/* Already have an account */}
            <div className="text-textColor my-3 flex flex-row items-center text-sm">
              Already have an account?
              <Link href="/">
                <a className="text-themeColorMain ml-1 font-semibold">Login</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
