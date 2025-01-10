import { api } from "../../api/api";

interface SetNoteReadParams {
  read: boolean;
  noteID: string;
}

export default async function setNoteRead({
  read,
  noteID,
}: SetNoteReadParams): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  try {
    await api.PUT(`/notes/${noteID}`, { read });
  } catch (error: any) {
    console.error("Error updating note read status:", error);
    throw error;
  }
}
