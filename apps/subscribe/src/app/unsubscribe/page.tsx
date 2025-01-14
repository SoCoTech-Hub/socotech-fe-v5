import React, { useState } from "react";

import { api } from "@acme/snippets/api/api";
import { baseUrl, profileId, userId } from "@acme/snippets/context/constants";
import deleteAccount from "@acme/snippets/functions/auth/deleteAccount";
import logout from "@acme/snippets/functions/logout";
import { InputField } from "@acme/ui";

interface RadioOption {
  value: string;
  description: string;
}

const Unsubscribe: React.FC = () => {
  const [reason, setReason] = useState<string>("");
  const [option, setOption] = useState<string>("");

  async function handleSubmit(): Promise<void> {
    if (option === "break") {
      await api.PUT(`/users/${userId}`, {
        deleted: true,
        onBreak: true,
      });
      if (reason) {
        await api.PUT(`/profiles/${profileId}`, {
          about: reason,
        });
      }
      logout();
      return;
    }

    try {
      await deleteAccount({
        reason,
        option,
        list: radioList,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const radioList: RadioOption[] = [
    {
      value: "subjects",
      description: "I no longer need help with my subjects.",
    },
    {
      value: "school",
      description: "I'm no longer in school.",
    },
    {
      value: "helpful",
      description: "The content isn't helpful.",
    },
    {
      value: "break",
      description: "I need a break. I’ll be back.",
    },
  ];

  return (
    <>
      <div
        className="no-scrolly flex h-screen flex-col items-center justify-center overflow-scroll rounded-md"
        style={{
          backgroundImage: `url(${baseUrl}/bursariesComingSoon.jpg)`,
          height: "100vh",
          width: "100%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-compBg h-auto w-5/6 rounded-md shadow-lg">
          <div className="desktop:p-8 laptop:p-8 mobile:p-4">
            <h2 className="text-themeColorMain mb-3 text-2xl font-bold">
              We’re sad to see you go…
            </h2>
            <span className="text-textColor">
              If you have a moment, please let us know why you are deleting your
              account.
            </span>
            <div className="my-2">
              {radioList.map((item) => (
                <div
                  key={`radio-${item.value}`}
                  className="flex flex-row items-center"
                >
                  <input
                    name="unsubscribeReason"
                    type="radio"
                    value={item.value}
                    className="bg-compBg text-themeColorMain focus:ring-themeColorMain ring-inset-none hover:border-themeColorMain mb-1 h-4 w-4 cursor-pointer border-gray-400 focus:ring-offset-black"
                    checked={item.value === option}
                    onChange={(e) => setOption(e.target.value)}
                  />
                  <label
                    htmlFor={item.value}
                    className="desktop:text-sm laptop:text-sm mobile:text-xs text-textColor mb-1 ml-3 leading-6"
                  >
                    {item.description}
                  </label>
                </div>
              ))}
            </div>

            <span className="text-md text-textColor font-semibold">
              Reason for goodbye (optional)
            </span>
            <div className="my-2">
              <InputField
                label="Reason"
                placeholder="Start typing here..."
                value={reason}
                type="text"
                onChange={(value) => setReason(value as string)}
              />
            </div>

            <div className="flex flex-row">
              <button
                type="submit"
                className="unsubscribe-button w-36 cursor-pointer justify-start rounded-md bg-red-700 p-2.5 text-center font-bold text-black shadow-md hover:bg-red-600"
                onClick={() => handleSubmit()}
              >
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unsubscribe;
