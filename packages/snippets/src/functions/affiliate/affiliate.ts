import { runQuery } from "../../graphql";
import {
  GET_AFFILIATE_REFERRER,
  GET_IS_AFFILIATE,
} from "../../graphql/affiliate/affiliate";

export const FetchIsAffiliate = async (profileId: string) => {
  return await runQuery<{
    id: string;
    profile: {
      isAffiliate: boolean;
    };
  }>(GET_IS_AFFILIATE, { profileId });
};

export const FetchAffiliateReferrer = async (uniqueId: string) => {
  return await runQuery<{
    id: string;
  }>(GET_AFFILIATE_REFERRER, { uniqueId });
};
