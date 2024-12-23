import { runQuery } from "../../graphql";
import { GET_SCHOOLS_BY_DISTRICT } from "../../graphql/auth/school";

export const FetchSchoolsByDistrict = async (district: string) => {
  return await runQuery<{
    schools: {
      id?: string;
      name?: string;
    }[];
  }>(GET_SCHOOLS_BY_DISTRICT, { district });
};
