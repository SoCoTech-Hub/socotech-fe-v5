import { runQuery } from "../../graphql";
import { GET_ALL_BURSARY_CATEGORIES } from "../../graphql/bursary/bursaryCategory";

export const FetchDistrictsByProvince = async () => {
  return await runQuery<{
    bursaryCategories: {
      id?: string;
      name?: string;
      description?: string;
      color?: string;
      icon?: { url: string };
    }[];
  }>(GET_ALL_BURSARY_CATEGORIES, {});
};
