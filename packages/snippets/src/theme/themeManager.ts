import { useEffect } from "react";

import { useAppContext } from "../context/AppContext";

export const useApplyTheme = () => {
  const { organization } = useAppContext();

  useEffect(() => {
    if (organization) {
      document.documentElement.style.setProperty(
        "--primary-color",
        organization.primaryColor,
      );
      document.documentElement.style.setProperty(
        "--secondary-color",
        organization.secondaryColor,
      );
      document.documentElement.style.setProperty(
        "--text-color",
        organization.text,
      );
    }
  }, [organization]);
};
