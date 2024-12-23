import { runQuery } from "../../graphql";
import { GET_PROFILE_SCHOOLS } from "../../graphql/article/profile";

export const FetchProfileSchools = async (profileId: string) => {
  return await runQuery<{
    id: string;
    schools: {
      id: string;
    }[];
  }>(GET_PROFILE_SCHOOLS, { profileId });
};
