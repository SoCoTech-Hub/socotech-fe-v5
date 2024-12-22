import { useEffect } from "react";

import { useAppContext } from "../context/AppContext";

export const useApplyTheme = () => {
  const { organization } = useAppContext();

  useEffect(() => {
    if (organization) {
      setTheme({ primaryColor: organization.attributes.primaryColor });
      setTheme({ secondaryColor: organization.attributes.secondaryColor });
      setTheme({ text: organization.attributes.text });
      // Add more colors here and on API's side
    }
  }, [organization]);
};

export const setTheme = (theme: Partial<Record<string, string>>) => {
  Object.entries(theme).forEach(([key, value]) => {
    if (value) {
      document.documentElement.style.setProperty(`--${key}`, value);
    }
  });
};
