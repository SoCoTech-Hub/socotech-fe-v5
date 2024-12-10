import { FC, useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { baseUrl } from "@/context/constants";
import RegisterUser2 from "@/snippets/auth/registerUser2";
import validateEmail from "@/snippets/auth/validateEmail";
import getGQLRequest from "@/snippets/getGQLRequest";

import { Alert } from "../../../packages/ui/src/alert";
import { Button } from "../../../packages/ui/src/button";
import { Checkbox } from "../../../packages/ui/src/Checkbox";
import { InputField } from "../../../packages/ui/src/InputField";
import { SEO } from "../../../packages/ui/src/SeoHead";

type RegisterProps = {};

const seo = {
  title: "Topic - Create Page",
  description: "Sign up for Topic and discover a new learning experience!",
};

const Register: FC<RegisterProps> = () => {
  const router = useRouter();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  const [check, setCheck] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const register = async () => {
    setError("");
    setLoading(true);
    const { email, password, confirm } = userInput;

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
    const { users } = await getGQLRequest({
      endpoint: "users",
      fields: "id",
      where: `email:"${email}"`,
    });
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
      <SEO seo={seo} />
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
          {/*logo overlay*/}
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
                id="email"
                name="email"
                icon="ti-email"
                placeholder="Your Email Address"
                type="text"
                onChange={updateInput}
              />
            </div>

            <div className="desktop:flex-row laptop:flex-row mobile:flex-col flex gap-1">
              <div className="mobile:w-4/5 w-2/5">
                <InputField
                  id="password"
                  name="password"
                  icon="ti-lock"
                  placeholder="Password"
                  type="password"
                  onChange={updateInput}
                />
              </div>
              <div className="mobile:w-4/5 w-2/5">
                <InputField
                  id="confirm"
                  name="confirm"
                  icon="ti-lock"
                  placeholder="Confirm Password"
                  type="password"
                  onChange={updateInput}
                />
              </div>
            </div>

            {/* Checkbox and Terms */}
            <div className="mobile:mb-4 mb-4 mt-3 flex items-center">
              <Checkbox setter={setCheck} value={check} />
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
            {error && <Alert error={error} />}
            <div className="desktop:gap-x-3 laptop:gap-x-3 mobile:gap-y-3 desktop:flex-row laptop:flex-row mobile:flex-col flex">
              <Button
                title={loading ? "Loading" : "Register"}
                disabled={loading}
                color="bg-themeColorMain"
                onClick={register}
                width="w-48 mobile:w-60"
              />
              <Button
                disabled={loading}
                title="Register with Google"
                color="bg-themeColorMain"
                link={`${process.env.NEXT_PUBLIC_API_URL}/connect/google`}
                width="w-58 mobile:w-60"
              />
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
