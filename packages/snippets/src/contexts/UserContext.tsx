"use client";

import React, { createContext, useContext } from "react";
import { useQuery } from "@apollo/client";

import type { PluginUsersPermissionsUser } from "@acme/api";

import { GetUserProfile } from "../graphql/user";

interface UserContextType {
  user: PluginUsersPermissionsUser | null;
  loading: boolean;
  error: unknown;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  error: null,
});

export const UserProvider: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, loading, error } = useQuery(GetUserProfile, {
    variables: { id: userId },
  });

  const user = data?.user || null;

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export const useThemeColors = () => {
  const { user } = useUser();
  const {
    appBg,
    appBgDark,
    componentBg,
    componentBgDark,
    icon1,
    icon1Dark,
    icon2,
    icon2Dark,
    logo,
    logoDark,
    primaryColor,
    primaryColorDark,
    secondaryColor,
    secondaryColorDark,
    text,
    textDark,
  } = user?.profile?.organization;
  return {
    appBg,
    appBgDark,
    componentBg,
    componentBgDark,
    icon1,
    icon1Dark,
    icon2,
    icon2Dark,
    logo,
    logoDark,
    primaryColor,
    primaryColorDark,
    secondaryColor,
    secondaryColorDark,
    text,
    textDark,
  };
};

export const useOrganization = () => {
  const { user } = useUser();
  return user?.organization ?? {};
};

// USE:
/*
import { useThemeColors } from '@acme/snippets/contexts/UserContext';

const Component: React.FC = () => {
  const { appBg, appBgDark } = useThemeColors();

  return <div style={{ backgroundColor: appBg }}>{...}</div>;
};
*/
