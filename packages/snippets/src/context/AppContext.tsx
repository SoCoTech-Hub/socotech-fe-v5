"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

import type { Organization, Profile, User } from "../types";

interface AppContextProps {
  organization?: Organization | null;
  setOrganization?: (org: Organization | null) => void;
  profile?: Profile | null;
  setProfile?: (profile: Profile | null) => void;
  user?: User | null;
  setUser?: (user: User | null) => void;
  isDark: boolean;
  setIsDark: (theme: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  console.log("AppProvider initialized");
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isDark, setIsDark] = useState<AppContextProps["isDark"]>(false);

  return (
    <AppContext.Provider
      value={{
        organization,
        setOrganization,
        profile,
        setProfile,
        user,
        setUser,
        isDark,
        setIsDark,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export function useAppContext() {
  try {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
  } catch (error) {
    console.log(error);
    return { organization: null, profile: null, user: null, isDark: false };
  }
}
