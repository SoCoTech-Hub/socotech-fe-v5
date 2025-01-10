import { api } from "../../api/api";

interface EventDetails {
  start: string;
  end: string;
  title: string;
  editable: boolean;
  extendedProps?: {
    location?: string;
    description?: string;
  };
}

interface AddOrChangeEventParams {
  id?: string;
  eventDetails: EventDetails;
}

export default async function AddOrChangeEvent({
  id,
  eventDetails,
}: AddOrChangeEventParams): Promise<void> {
  try {
    const payload: Record<string, any> = {
      start: eventDetails.start,
      end: eventDetails.end,
      title: eventDetails.title,
      editable: eventDetails.editable,
      ...(eventDetails.extendedProps?.location && {
        location: eventDetails.extendedProps.location,
      }),
      ...(eventDetails.extendedProps?.description && {
        description: eventDetails.extendedProps.description,
      }),
    };

    if (id) {
      await api.PUT(`/events/${id}`, payload);
    } else {
      await api.POST("/events", payload);
    }
  } catch (error: any) {
    console.error("Error adding or changing event:", error);
    throw error;
  }
}
