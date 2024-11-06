/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api/api";
import { useUser } from "../contexts/UserContext";

export interface NoteParams {
  id?: string;
  name?: string;
  note?: string;
  read?: boolean;
  lessonModuleId?: string | null;
  subjectId?: string | null;
  profile?: { id: string };
}
interface ApiResponse {
  data: any; // Adjust this to the actual expected type if known
}

export const saveNote = async ({
  id,
  name,
  note,
  read = false,
  lessonModuleId = null,
  subjectId = null,
}: NoteParams): Promise<any> => {
  if (typeof window === "undefined") {
    return;
  }
  const { user } = useUser();
  try {
    const payload: Record<string, any> = {
      name,
      note,
      read,
      profile: { id: user.profile.id },
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

export const deleteNote = async ({ id, profile }: NoteParams): Promise<any> => {
  if (typeof window === "undefined") {
    return;
  }
  const { user } = useUser();
  if (profile?.id != user?.profile.id) {
    return { ok: false, message: "Unauthorized" };
  }
  try {
    const response: ApiResponse = await api.delete(`/notes/${id}`);

    return response.data ?? null; // Return response data or null if empty
  } catch (e) {
    return e;
  }
};
