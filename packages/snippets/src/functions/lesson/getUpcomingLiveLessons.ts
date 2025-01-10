import { grades, organizationId, provinces } from "../../context/constants";
import { runQuery } from "../../graphql";
import { GET_UPCOMING_LIVE_LESSONS } from "../../graphql/lessons/getUpcomingLiveLessons";

interface FeaturedImage {
  id: string;
  url: string;
}

interface Lesson {
  id: string;
  name: string;
  description: string;
  topic: string;
  duration: number;
  presenter: string;
  startDate: string;
  endDate: string;
  isLiveLesson: boolean;
  link: string;
  overview: string;
  notes: string;
  featuredImage: FeaturedImage | null;
  provinces: { id: string; name: string }[];
  grades: { id: string; name: string }[];
  subject: { id: string; name: string };
  subjectCategory: { id: string; name: string };
  lmsSurveys: { id: string; title: string }[];
  lmsQuizs: { id: string; title: string }[];
}

interface GetUpcomingLiveLessonsResponse {
  lessons: Lesson[];
}

export default async function getUpcomingLiveLessons(): Promise<GetUpcomingLiveLessonsResponse> {
  const currentDate = new Date();
  const endDate = new Date();
  endDate.setDate(currentDate.getDate() + 6);

  try {
    const { lessons } = await runQuery<{
      lessons: Lesson[];
    }>(GET_UPCOMING_LIVE_LESSONS, {
      organizationId,
      grades,
      provinces,
      currentDate: currentDate.toISOString(),
      endDate: endDate.toISOString(),
    });

    return {
      lessons: lessons || [],
    };
  } catch (error: any) {
    console.error("Error fetching upcoming live lessons:", error);
    return {
      lessons: [],
    };
  }
}
