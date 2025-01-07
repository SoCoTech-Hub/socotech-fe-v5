import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import checkEmail from "@acme/snippets/auth/checkEmail";
import login from "@acme/snippets/auth/login";
import authCheck from "@acme/snippets/authCheck";
import { baseUrl, domain } from "@acme/snippets/context/constants";
import { Button } from "@acme/ui/button";
import { Checkbox } from "@acme/ui/Checkbox";
import InputField from "@acme/ui/InputField/index";
import LogoOverlay from "@acme/ui/LogoOverlay/index";
import { PopupAlert } from "@acme/ui/PopupAlert/index";
import { SEO } from "@acme/ui/SeoHead/index";

interface LoginPageProps {
  token: string | null;
  userId: string | null;
  initialRememberMe: boolean;
  modDevice: string;
}

const LoginPage: React.FC<LoginPageProps> = ({
  token,
  userId,
  initialRememberMe,
  modDevice,
}) => {
  const router = useRouter();
  const [redirect, setRedirect] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(() =>
    JSON.parse(String(initialRememberMe)),
  );
  const [data, updateData] = useState<{ identifier: string; password: string }>(
    { identifier: "", password: "" },
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | boolean>(false);

  useEffect(() => {
    const autoLogin = async () => {
      if (token && userId) {
        const routeTo = await authCheck({ userid: userId });
        setRedirect(routeTo);
      }
    };
    autoLogin();
  }, [token, userId]);

  useEffect(() => {
    if (redirect) {
      setLoading(false);
      router.push(redirect);
    }
  }, [redirect, router]);

  useEffect(() => {
    Cookies.set("rememberMe", JSON.stringify(rememberMe), {
      domain: domain,
      secure: true,
      expires: 7,
    });
  }, [rememberMe]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ ...data, [event.target.name]: event.target.value });
  };

  const newGuid = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  };

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (data.identifier && data.password) {
      setError(false);
      try {
        const mail = await checkEmail({ email: data.identifier });
        if (mail?.provider) {
          if (mail.provider === "google") {
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/connect/google`;
            return;
          }
          if (mail.provider === "local") {
            const res = await login({
              identifier: data.identifier,
              password: data.password,
              modDevice: modDevice,
              deviceId: newGuid(),
              rememberMe: rememberMe,
            });

            if (res.error) {
              handleError(res);
              setLoading(false);
              return;
            }
            const routeTo = await authCheck({ userid: res.data.user.id });
            router.prefetch(routeTo);
            setLoading(false);
            setRedirect(routeTo);
          }
        } else {
          setError("Account does not exist");
          setLoading(false);
        }
      } catch (err) {
        setError("Something went wrong");
        setLoading(false);
      }
    } else {
      setError("A Field is not completed");
      setLoading(false);
    }
  };

  const handleError = (res: any) => {
    const errorId = res.data[0]?.messages[0]?.id;
    switch (errorId) {
      case "Auth.form.error.confirmed":
        setError("Account not verified");
        break;
      case "Auth.form.error.blocked":
        setError("Account has been blocked");
        break;
      case "Auth.form.error.loggedIn":
        setError("This account is already in use, please contact Support");
        break;
      default:
        setError("Username or password not matched");
    }
  };

  const seo = {
    title: "Topic - Login",
    description: "Log in to your account.",
  };

  return (
    <>
      <SEO title={seo.title} description={seo.description} />

      <div className="g-0 relative flex h-screen flex-wrap">
        {/* Logo Overlay for Laptop and Desktop */}
        <div className="laptop:p-6 desktop:p-8 absolute left-0 top-0 p-4">
          <LogoOverlay />
        </div>

        {/* Left Section with Image */}
        <div className="desktop:w-1/2 laptop:w-1/2 mobile:hidden">
          <div className="desktop:h-screen laptop:h-screen flex place-content-center">
            <img
              src={`${baseUrl}/brand-image.png`}
              alt="Login Image"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Right Section with Form - Centered on Y-axis */}
        <div className="mobile:w-full desktop:w-1/2 laptop:w-1/2 flex h-screen items-center justify-center">
          <div className="bg-compBg w-full rounded-lg px-4">
            <div className="text-textHeading mobile:text-3xl mb-4 text-4xl font-bold">
              Log in to
              <br /> your account
            </div>
            <InputField
              id="identifier"
              placeholder="Your Email Address"
              icon="ti-email"
              onChange={onChange}
              value={data.identifier}
            />
            <InputField
              id="password"
              type="password"
              icon="ti-lock"
              placeholder="Password"
              onChange={onChange}
              value={data.password}
            />
            <div className="text-textHeading my-3 flex flex-row justify-between text-left">
              <Checkbox
                label="Remember me"
                setter={setRememberMe}
                checked={rememberMe}
              />
              <Link href="/reset">
                <a className="text-textHeading login-forgot float-right text-xs font-semibold">
                  Forgot your password?
                </a>
              </Link>
            </div>

            {/* Alert and Buttons Section */}
            <div className="flex flex-col gap-y-2">
              <Alert error={error} />

              {/* Buttons */}
              <div className="mobile:flex-col laptop:flex-row desktop:flex-row flex items-center gap-x-4 gap-y-2">
                <Button
                  title={loading ? "Loading... " : "Login"}
                  color="bg-themeColorMain"
                  onClick={submitLogin}
                  width="w-60"
                />
                <Button
                  title={loading ? "Loading... " : "Login with Google"}
                  color="bg-themeColorMain"
                  link={`${process.env.NEXT_PUBLIC_API_URL}/connect/google`}
                  width="w-60"
                />
              </div>

              {/* Register Link */}
              <h6 className="text-textHeading mt-3 text-xs">
                Don't have an account?
                <span className="text-themeColorMain ml-2 font-semibold">
                  <Link href="/create">Register</Link>
                </span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
