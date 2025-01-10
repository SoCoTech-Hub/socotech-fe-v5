import { api } from "../../api/api";
import { profileId } from "../../context/constants";

interface CreateNoteParams {
  name: string;
  note: string;
  read?: boolean;
  lessonModuleId?: string | null;
  subjectId?: string | null;
}

export default async function createNote({
  name,
  note,
  read = false,
  lessonModuleId = null,
  subjectId = null,
}: CreateNoteParams): Promise<any> {
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

    return await api.POST("/notes", payload);
  } catch (error: any) {
    console.error("Error creating note:", error);
    return error;
  }
}
