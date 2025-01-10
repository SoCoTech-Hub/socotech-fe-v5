import { runQuery } from "../../graphql";
import { GET_IN_PROGRESSES } from "../../graphql/progresses/getInProgresses";

interface Progress {
  id: string;
  completedSteps: number;
  isComplete: boolean;
  timeSpent: number;
  totalSteps: number;
  user: { id: string };
  profile: { id: string; firstName: string; lastName: string };
  lesson: { id: string; name: string };
  province: { id: string; name: string };
  grade: { id: string; name: string };
  subject: { id: string; name: string };
  school: { id: string; name: string };
}

interface GetInProgressesParams {
  userId: string;
}

interface GetInProgressesResponse {
  progresses: Progress[];
}

export default async function getInProgresses({
  userId,
}: GetInProgressesParams): Promise<GetInProgressesResponse> {
  try {
    const { progresses } = await runQuery<{
      progresses: Progress[];
    }>(GET_IN_PROGRESSES, { userId });

    return {
      progresses: progresses || [],
    };
  } catch (error: any) {
    console.error("Error fetching in-progress progresses:", error);
    return {
      progresses: [],
    };
  }
}
