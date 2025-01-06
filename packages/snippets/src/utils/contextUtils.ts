import { useAppContext } from "../context/AppContext";

export const useUserId = (): string | undefined => {
  const { user } = useAppContext();
  return user?.id;
};

export const useProfileId = (): string | undefined => {
  const { profile } = useAppContext();
  return profile?.id;
};

export const useOrgId = (): string | undefined => {
  const { organization } = useAppContext();
  return organization?.id;
};
