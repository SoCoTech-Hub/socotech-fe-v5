/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api/api";

interface NoteParams {
  id?: string;
  name?: string;
  note?: string;
  read?: boolean;
  lessonModuleId?: string | null;
  subjectId?: string | null;
  profileId: string;
}
interface ApiResponse {
  data: any; // Adjust this to the actual expected type if known
}

const saveNote = async ({
  id,
  name,
  note,
  read = false,
  lessonModuleId = null,
  subjectId = null,
  profileId,
}: NoteParams): Promise<any> => {
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

    const response: ApiResponse = id
      ? await api.put(`/notes/${id}`, payload)
      : await api.post("/notes", payload);

    return response.data ?? null; // Return response data or null if empty
  } catch (e) {
    return e;
  }
};

export default saveNote;
