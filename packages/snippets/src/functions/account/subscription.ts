import { runQuery } from "../../graphql";
import { GET_SUBSCRIPTIONS } from "../../graphql/account/subscription";
import { useProfileId } from "../../utils";
import { api } from "../.@acme/snippets/api/api";

interface Subscription {
  id: string;
  profile: { id: string };
  newsletterActive: boolean;
  smsActive: boolean;
}

export const FetchSubscription = async () => {
  const profileId = useProfileId();
  return await runQuery<{
    subscriptions: Subscription[];
  }>(GET_SUBSCRIPTIONS, { profileId });
};

export const UpsertSubscription = async ({
  newsletterActive,
  smsActive,
}: {
  newsletterActive: boolean;
  smsActive: boolean;
}): Promise<Subscription | undefined> => {
  const profileId = useProfileId();
  if (profileId) {
    try {
      // Check if the subscription exists
      const { subscriptions } = await FetchSubscription();
      let sub: Subscription;

      if (subscriptions.length) {
        // Update the subscription
        const { data } = await api.PUT(
          `/subscriptions/${subscriptions[0].id}`,
          {
            newsletterActive,
            smsActive,
          },
        );
        sub = data;
      } else {
        const { data } = await api.POST(`/subscriptions`, {
          profile: { id: profileId },
          newsletterActive,
          smsActive,
        });
        sub = data;
      }
      return sub;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  return;
};
