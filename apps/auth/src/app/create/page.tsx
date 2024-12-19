import { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { baseUrl } from "@acme/snippet/context/constants";
import RegisterUser2 from "@acme/snippets/functions/auth/registerUser2";
import validateEmail from "@acme/snippets/functions/auth/validateEmail";
import getGQLRequest from "@acme/snippets/getGQLRequest";
import { Alert } from "@acme/ui/alert";
import { Button } from "@acme/ui/button";
import { Checkbox } from "@acme/ui/Checkbox";
import { InputField } from "@acme/ui/InputField";

type RegisterProps = {};

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
      <div className="flex justify-between gap-0 overflow-x-hidden">
        {/* Left section with image */}
        <div className="relative flex items-center desktop:w-full laptop:w-1/2 desktop:h-screen laptop:h-screen">
          <img
            src={`${baseUrl}/create-background.jpg`}
            alt="Background"
            className="absolute object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={`${baseUrl}/create-image.png`}
              alt="Foreground"
              className="object-contain h-2/3"
            />
          </div>
        </div>
        {/* Right section with form */}
        <div className="w-full pt-16 ml-8 mobile:pt-4">
          {/*logo overlay*/}
          <img
            src={`${baseUrl}/logo.png`}
            alt="Logo"
            className="desktop:h-20 laptop:h-20 mobile:h-16"
          />
          <div className="mt-24 text-4xl text-textColor mobile:mt-8">
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

            <div className="flex gap-1 desktop:flex-row laptop:flex-row mobile:flex-col">
              <div className="w-2/5 mobile:w-4/5">
                <InputField
                  id="password"
                  name="password"
                  icon="ti-lock"
                  placeholder="Password"
                  type="password"
                  onChange={updateInput}
                />
              </div>
              <div className="w-2/5 mobile:w-4/5">
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
            <div className="flex items-center mt-3 mb-4 mobile:mb-4">
              <Checkbox setter={setCheck} value={check} />
              <div className="ml-2 text-sm text-textColor">
                I have read and agreed to the
                <Link href="/tou" passHref>
                  <a className="ml-1 font-bold underline text-textHeading">
                    Terms and Conditions
                  </a>
                </Link>
              </div>
            </div>

            {/* Alert and Buttons */}
            {error && <Alert error={error} />}
            <div className="flex desktop:gap-x-3 laptop:gap-x-3 mobile:gap-y-3 desktop:flex-row laptop:flex-row mobile:flex-col">
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
            <div className="flex flex-row items-center my-3 text-sm text-textColor">
              Already have an account?
              <Link href="/">
                <a className="ml-1 font-semibold text-themeColorMain">Login</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
