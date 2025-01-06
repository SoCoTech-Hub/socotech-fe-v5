import { runQuery } from "../../graphql";
import { GET_SUBSCRIPTIONS } from "../../graphql/account/subscription";
import { UPDATE_SUBSCRIPTIONS } from "../../graphql/account/subscription";

export const FetchSubscription = async (profileId: string) => {
  return await runQuery<{
    subscriptions: {
      id: string;
      newsletterActive: boolean;
      smsActive: boolean;
    };
  }>(GET_SUBSCRIPTIONS, { profileId });
};

export const UpdateSubscription = async (profileId: string) => {
  return await runQuery<{
    subscriptions: {
      id: string;
      newsletterActive: boolean;
      smsActive: boolean;
    };
  }>(GET_SUBSCRIPTIONS, { profileId });
};
