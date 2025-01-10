import { runQuery } from "../../graphql";
import { GET_NOTIFICATION_RESPONSES } from "../../graphql/notificationResponses/getNotificationResponses";

interface Notification {
  title: string;
  body: string;
}

interface NotificationResponse {
  id: string;
  notification: Notification;
}

interface GetNotificationResponsesParams {
  profileId: string;
}

interface GetNotificationResponsesResponse {
  notificationResponses: NotificationResponse[];
}

export default async function getNotificationResponses({
  profileId,
}: GetNotificationResponsesParams): Promise<GetNotificationResponsesResponse> {
  try {
    const { notificationResponses } = await runQuery<{
      notificationResponses: NotificationResponse[];
    }>(GET_NOTIFICATION_RESPONSES, { profileId });

    return {
      notificationResponses: notificationResponses || [],
    };
  } catch (error: any) {
    console.error("Error fetching notification responses:", error);
    return {
      notificationResponses: [],
    };
  }
}
