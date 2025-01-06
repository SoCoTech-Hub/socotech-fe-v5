import { api } from "../../api/api";
import { runQuery } from "../../graphql";
import { GET_SUBSCRIPTIONS } from "../../graphql/account/subscription";
import { useProfileId } from "../../utils";

export const FetchSubscription = async (profileId: string) => {
  return await runQuery<{
    subscriptions: {
      id: string;
      newsletterActive: boolean;
      smsActive: boolean;
    }[];
  }>(GET_SUBSCRIPTIONS, { profileId });
};

export const upsertSubscription = async ({
  newsletterActive,
  smsActive,
}: {
  newsletterActive: boolean;
  smsActive: boolean;
}): Promise<void> => {
  const profileId = useProfileId();
  if (profileId) {
    try {
      // Check if the subscription exists
      const { subscriptions } = await FetchSubscription(profileId);

      if (subscriptions.length) {
        // Update the subscription
        await api.PUT(`/subscriptions/${subscriptions[0].id}`, {
          newsletterActive,
          smsActive,
        });
      } else {
        // Create a new subscription
        await api.POST(`/subscriptions`, {
          profile: { id: profileId },
          newsletterActive,
          smsActive,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  }
};
