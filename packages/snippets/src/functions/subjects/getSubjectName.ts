import { runQuery } from "../../graphql";
import { GET_SUBJECT_BY_ID } from "../../graphql/subjects/getSubjectById";

interface Subject {
  id: string;
  name: string;
}

interface GetSubjectNameParams {
  subjectId: string;
}

interface GetSubjectNameResponse {
  subjects: Subject[];
}

export default async function getSubjectName({
  subjectId,
}: GetSubjectNameParams): Promise<GetSubjectNameResponse> {
  try {
    const { subjects } = await runQuery<{
      subjects: Subject[];
    }>(GET_SUBJECT_BY_ID, { subjectId });

    return {
      subjects,
    };
  } catch (error: any) {
    console.error("Error fetching subject name:", error);
    return {
      subjects: [],
    };
  }
}
