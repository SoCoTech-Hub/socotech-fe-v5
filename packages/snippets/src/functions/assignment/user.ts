import { runQuery } from "../../graphql";
import { GET_USER_PROFILES_BY_GRADES } from "../../graphql/assignment/user";

export const FetchUserProfilesByGrades = async ({
  grades,
}: {
  grades: string;
}) => {
  return await runQuery<{
    id?: string;
    profile: {
      id?: string;
      firstName?: string;
      lastName?: string;
      uniqueId?: string;
    };
  }>(GET_USER_PROFILES_BY_GRADES, { grades });
};
