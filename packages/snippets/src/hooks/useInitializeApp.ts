import { useEffect } from "react";

import { api } from "@acme/api/api";

import { useAppContext } from "../context/AppContext";

export const useInitializeApp = () => {
  const { setUser, setOrganization } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: user } = await api.GET("/users/me");
        const { data: organization } = await api.GET(
          `/organizations/${user.profile.organization.id}`,
        );

        setUser(user);
        setOrganization(organization);
      } catch (error) {
        console.error("Error initializing app context:", error);
      }
    };

    fetchData();
  }, [setUser, setOrganization]);
};
