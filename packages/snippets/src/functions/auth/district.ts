import { runQuery } from "../../graphql";
import { GET_DISTRICTS_BY_PROVINCE } from "../../graphql/auth/district";


export const FetchDistrictsByProvince = async (province: string) => {
  return await runQuery<{
    districts: {
      id?: string;
      name?: string;
    }[];
  }>(GET_DISTRICTS_BY_PROVINCE, { province });
};