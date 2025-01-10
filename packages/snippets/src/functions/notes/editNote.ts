import { api } from "../../api/api";

interface EditNoteParams {
  id: string;
  name: string;
  note: string;
  read?: boolean;
  lessonModuleId?: string | null;
  subjectId?: string | null;
  profileId: string;
}

export default async function editNote({
  id,
  name,
  note,
  read = false,
  lessonModuleId = null,
  subjectId = null,
  profileId,
}: EditNoteParams): Promise<any> {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const payload: Record<string, any> = {
      name,
      note,
      read,
      profile: { id: profileId },
    };

    if (lessonModuleId) {
      payload.lessonModule = { id: lessonModuleId };
    }

    if (subjectId) {
      payload.subject = { id: subjectId };
    }

    const response = await api.PUT(`/notes/${id}`, payload);
    return response;
  } catch (error: any) {
    console.error("Error editing note:", error);
    return error;
  }
}
