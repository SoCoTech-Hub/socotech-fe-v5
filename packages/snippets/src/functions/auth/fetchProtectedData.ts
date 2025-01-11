import { runQuery } from "../../graphql";
import { GET_PROTECTED_DATA } from "../../graphql/auth/getProtectedData";

export const FetchProtectedData = async ({
  uniqueId,
  userId,
}: {
  uniqueId: string;
  userId: string;
}) => {
  const currentDate = new Date();
  return await runQuery<{
    user: {
      id: string;
      role: {
        name: string;
      };
      profile: {
        id: string;
        isDeveloper: boolean;
        supportDepartments: {
          id: string;
        };
        subjects: {
          id: string;
        };
        grades: {
          id: string;
        };
        schools: {
          id: string;
        };
        provinces: {
          id: string;
        };
        organization: {
          id: string;
          primaryColor: string;
          primaryColorDark: string;
          secondaryColor: string;
          secondaryColorDark: string;
          appBg: string;
          appBgDark: string;
          componentBg: string;
          componentBgDark: string;
          text: string;
          textDark: string;
          icon1: string;
          icon1Dark: string;
          icon2: string;
          icon2Dark: string;
          logo: {
            url: string;
          };
          logoDark: {
            url: string;
          };
        };
      };
    };
    transactions: {
      id: string;
    }[];
  }>(GET_PROTECTED_DATA, { currentDate, uniqueId, userId });
};
