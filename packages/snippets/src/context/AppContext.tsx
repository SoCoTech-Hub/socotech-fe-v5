import { createContext, ReactNode, useContext, useState } from "react";

import type { Organization, Profile, User } from "../types";

interface AppContextProps {
  organization: Organization | null;
  setOrganization: (org: Organization | null) => void;
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider
      value={{
        organization,
        setOrganization,
        profile,
        setProfile,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
