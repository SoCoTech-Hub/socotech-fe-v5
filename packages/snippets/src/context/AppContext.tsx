import { createContext, ReactNode, useContext, useState } from "react";





interface Organization {
  id: string;
  name: string;
  //TODO: Add all fields defined in your types
}

interface User {
  id: string;
  email: string;
  profile: {
    id?: string;
    firstName?: string;
    lastName?: string;
    organization: Organization;
  };
  //TODO: Add any other necessary fields
}

interface AppContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  organization: Organization | null;
  setOrganization: (org: Organization | null) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);

  return (
    <AppContext.Provider
      value={{ user, setUser, organization, setOrganization }}
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