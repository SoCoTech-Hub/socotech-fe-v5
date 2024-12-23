import { runQuery } from "../../graphql";
import { GET_SUBSCRIPTIONS } from "../../graphql/account/subscription";

export const FetchSubscription = async (profileId: string) => {
  return await runQuery<{
    subscriptions: {
      id: string;
      newsletterActive: boolean;
      smsActive: boolean;
    };
  }>(GET_SUBSCRIPTIONS, { profileId });
};
