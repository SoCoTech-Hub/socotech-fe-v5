import { runQuery } from "../../graphql";
import { GET_IS_AFFILIATE } from "../../graphql/affiliate/affiliate"

export const FetchIsAffiliate = async (profileId: string) => {
  return await runQuery<{
    id: string;
    profile: {
      isAffiliate: boolean;
    };
  }>(GET_IS_AFFILIATE, { profileId });
};
