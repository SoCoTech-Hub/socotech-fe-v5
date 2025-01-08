import { runQuery } from "../../graphql"
import { GET_PROFILE_ID } from "../../graphql/payfast/profile"

export const FetchUserProfileId = async (uniqueId: string) => {
  const { profiles } = await runQuery<{
    profiles: {
      id: string;
    }[];
  }>(GET_PROFILE_ID, { uniqueId });
  return profiles ? profiles[0] : profiles;
};
