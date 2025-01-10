import { runQuery } from "../../graphql";
import { GET_NOTES_COUNT } from "../../graphql/notes/getNotesCount";

interface CountNotesParams {
  profileId: string;
}

interface CountNotesResponse {
  notes: number;
}

export default async function countNotes({
  profileId,
}: CountNotesParams): Promise<CountNotesResponse> {
  try {
    const { notesConnection } = await runQuery<{
      notesConnection: {
        aggregate: { count: number };
      };
    }>(GET_NOTES_COUNT, { profileId });

    return {
      notes: notesConnection.aggregate.count,
    };
  } catch (error: any) {
    console.error("Error fetching notes count:", error);
    return {
      notes: 0,
    };
  }
}
