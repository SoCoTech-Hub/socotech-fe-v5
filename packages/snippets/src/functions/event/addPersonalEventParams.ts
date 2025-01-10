import { api } from "../../api/api";

interface AddPersonalEventParams {
  id?: string;
  start?: string;
  end?: string;
  title?: string;
  description?: string;
  image?: string;
  location?: string;
  authorId?: string;
  profileId?: string;
  orgId?: string;
  teacher?: string;
  province?: string;
  school?: string;
  grade?: string;
}

export default async function AddPersonalEvent({
  id,
  start,
  end,
  title,
  description,
  image,
  location,
  authorId,
  profileId,
  orgId,
  teacher,
  province,
  school,
  grade,
}: AddPersonalEventParams): Promise<void> {
  const data: Record<string, any> = {
    private: true,
    editable: true,
    ...(start && { start }),
    ...(end && { end }),
    ...(title && { title }),
    ...(description && { description }),
    ...(image && { image }),
    ...(location && { location }),
    ...(orgId && !id && { organization: { id: orgId } }),
    ...(teacher && { teacher: { id: teacher }, isLive: true }),
    ...(province && !id && { province: { id: province } }),
    ...(school && !id && { school: { id: school } }),
    ...(grade && !id && { grade: { id: grade } }),
    ...(profileId && { students: { id: profileId } }),
    ...(authorId && { author: { id: authorId } }),
  };

  try {
    if (id) {
      await api.PUT(`/events/${id}`, data);
    } else {
      await api.POST("/events", data);
    }
  } catch (error: any) {
    console.error("Error adding or updating the personal event:", error);
    throw error;
  }
}
