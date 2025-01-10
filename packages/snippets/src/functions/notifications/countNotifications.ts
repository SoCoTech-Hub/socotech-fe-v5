import { runQuery } from "../../graphql";
import { GET_NOTIFICATIONS_COUNT } from "../../graphql/notifications/getNotificationsCount";

interface CountNotificationsParams {
  userId: string;
}

interface CountNotificationsResponse {
  notifications: number;
}

export default async function countNotifications({
  userId,
}: CountNotificationsParams): Promise<CountNotificationsResponse> {
  try {
    const { notificationsConnection } = await runQuery<{
      notificationsConnection: {
        aggregate: { count: number };
      };
    }>(GET_NOTIFICATIONS_COUNT, { userId });

    return {
      notifications: notificationsConnection.aggregate.count,
    };
  } catch (error: any) {
    console.error("Error fetching notifications count:", error);
    return {
      notifications: 0,
    };
  }
}
