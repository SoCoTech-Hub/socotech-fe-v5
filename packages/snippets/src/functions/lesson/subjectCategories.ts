import { runQuery } from "../../graphql";
import { GET_SUBJECT_CATEGORIES } from "../../graphql/lesson/subjectCategory";

export const FetchSubjectCategories = async (organizationId: string) => {
  return await runQuery<{
    subjectCategories: {
      id: string;
      name: string;
      subjects: {
        id: string;
        name: string;
        color: string;
        icon: {
          url: string;
        };
      };
    }[];
  }>(GET_SUBJECT_CATEGORIES, { organizationId });
};
